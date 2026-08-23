const prisma = require("../config/prisma");
const { ALLOWED_MODELS } = require("../utils/bulkConfig");
const { validateBulkOperationPayload } = require("../utils/bulkValidator");
const { translateMatchCondition, translatePipelineToPrisma } = require("../utils/pipelineTranslator");

const CHUNK_SIZE = 500;

// Execute individual bulk operation
async function executeBulkOperation(payload, txPrisma = prisma) {
  const { model, operation, data, where, ids, uniqueBy } = payload;
  const modelConfig = ALLOWED_MODELS[model];
  const delegate = txPrisma[modelConfig.prismaDelegate];

  switch (operation) {
    case "createMany": {
      // Chunk payload to avoid memory/SQL parameter limits
      let insertedCount = 0;
      for (let i = 0; i < data.length; i += CHUNK_SIZE) {
        const chunk = data.slice(i, i + CHUNK_SIZE);
        const res = await delegate.createMany({
          data: chunk,
          skipDuplicates: true,
        });
        insertedCount += res.count;
      }
      return { operation: "createMany", success: true, count: insertedCount };
    }

    case "updateMany": {
      const prismaWhere = translateMatchCondition(where, modelConfig);
      const res = await delegate.updateMany({
        where: prismaWhere,
        data,
      });
      return { operation: "updateMany", success: true, count: res.count };
    }

    case "bulkUpdate": {
      // Execute batched updates in transaction
      let updatedCount = 0;
      const updateTasks = data.map((item) => {
        const prismaWhere = translateMatchCondition(item.where, modelConfig);
        return delegate.updateMany({
          where: prismaWhere,
          data: item.data,
        });
      });

      const results = await Promise.all(updateTasks);
      updatedCount = results.reduce((acc, curr) => acc + curr.count, 0);
      return { operation: "bulkUpdate", success: true, count: updatedCount };
    }

    case "deleteMany": {
      let prismaWhere = {};
      if (ids && Array.isArray(ids)) {
        prismaWhere = { id: { in: ids } };
      } else if (where && typeof where === "object") {
        prismaWhere = translateMatchCondition(where, modelConfig);
      }

      const res = await delegate.deleteMany({
        where: prismaWhere,
      });
      return { operation: "deleteMany", success: true, count: res.count };
    }

    case "upsertMany": {
      const key = uniqueBy || "id";
      let upsertedCount = 0;

      for (const record of data) {
        const keyValue = record[key];
        if (!keyValue) continue;

        const whereUnique = { [key]: keyValue };
        const updateData = { ...record };
        delete updateData[key];

        await delegate.upsert({
          where: whereUnique,
          update: updateData,
          create: record,
        });
        upsertedCount++;
      }
      return { operation: "upsertMany", success: true, count: upsertedCount };
    }

    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

// Execute JSON pipeline stage query
async function executePipelineQuery(payload) {
  const { model, pipeline } = payload;
  const modelConfig = ALLOWED_MODELS[model];
  const delegate = prisma[modelConfig.prismaDelegate];

  const { query, isGroupStage, groupConfig } = translatePipelineToPrisma(pipeline, modelConfig);

  // Group aggregation query handling
  if (isGroupStage && groupConfig) {
    const byFields = [];
    if (groupConfig._id) {
      if (typeof groupConfig._id === "string" && groupConfig._id.startsWith("$")) {
        const fieldName = groupConfig._id.slice(1);
        if (modelConfig.fields.includes(fieldName)) byFields.push(fieldName);
      } else if (typeof groupConfig._id === "object") {
        for (const val of Object.values(groupConfig._id)) {
          if (typeof val === "string" && val.startsWith("$")) {
            const fieldName = val.slice(1);
            if (modelConfig.fields.includes(fieldName)) byFields.push(fieldName);
          }
        }
      }
    }

    if (byFields.length === 0 && modelConfig.fields.includes("category")) {
      byFields.push("category");
    }

    const groupResult = await delegate.groupBy({
      by: byFields,
      where: query.where,
      _count: { _all: true },
    });

    return groupResult;
  }

  // Normal query pipeline
  const results = await delegate.findMany(query);

  const formattedResults = results.map((item) => ({
    ...item,
    _id: item.id,
  }));

  return formattedResults;
}

// Controller function for POST /api/data/bulk
async function handleBulkOperation(req, res, next) {
  try {
    const payload = req.body;

    // 1. Validate payload structure & Whitelists
    const validation = validateBulkOperationPayload(payload);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: "Bulk request validation failed",
        errors: validation.errors,
      });
    }

    // 2. Multi-operation Transaction execution
    if (payload.transaction) {
      const txResults = await prisma.$transaction(async (txPrisma) => {
        const results = [];
        for (const opPayload of payload.operations) {
          const result = await executeBulkOperation(opPayload, txPrisma);
          results.push(result);
        }
        return results;
      });

      return res.json({
        success: true,
        transaction: true,
        results: txResults,
      });
    }

    // 3. Single Pipeline Query execution
    if (payload.pipeline) {
      const data = await executePipelineQuery(payload);
      return res.json({
        success: true,
        model: payload.model,
        count: Array.isArray(data) ? data.length : 1,
        data,
      });
    }

    // 4. Single Bulk Operation execution
    const result = await executeBulkOperation(payload);
    return res.json({
      success: true,
      model: payload.model,
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  handleBulkOperation,
  executeBulkOperation,
  executePipelineQuery,
};
