const { ALLOWED_MODELS, MAX_LIMIT } = require("./bulkConfig");

function translateMatchCondition(matchObj, modelConfig) {
  if (!matchObj || typeof matchObj !== "object") return {};

  const where = {};

  for (const [key, value] of Object.entries(matchObj)) {
    // Logical top-level operators: $and, $or, $nor, $not
    if (key === "$and" && Array.isArray(value)) {
      where.AND = value.map((cond) => translateMatchCondition(cond, modelConfig));
      continue;
    }
    if (key === "$or" && Array.isArray(value)) {
      where.OR = value.map((cond) => translateMatchCondition(cond, modelConfig));
      continue;
    }
    if (key === "$not" && typeof value === "object") {
      where.NOT = translateMatchCondition(value, modelConfig);
      continue;
    }

    // Check JSONB nested path e.g. "metadata.country"
    if (key.includes(".")) {
      const parts = key.split(".");
      const topField = parts[0];
      const subPath = parts.slice(1);

      if (modelConfig.jsonbFields && modelConfig.jsonbFields.includes(topField)) {
        where[topField] = {
          path: subPath,
          equals: value,
        };
        continue;
      }
    }

    // Check allowed model fields
    if (!modelConfig.fields.includes(key) && key !== "id" && key !== "_id") {
      continue;
    }

    const fieldName = key === "_id" ? "id" : key;

    // Direct scalar equality or null check
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      if (Array.isArray(value)) {
        where[fieldName] = { in: value };
      } else {
        where[fieldName] = value;
      }
      continue;
    }

    // Operator mapping e.g. { rating: { $gte: 4.5 } }
    const fieldCondition = {};
    for (const [op, opValue] of Object.entries(value)) {
      switch (op) {
        case "$eq":
          fieldCondition.equals = opValue;
          break;
        case "$ne":
          fieldCondition.not = opValue;
          break;
        case "$gt":
          fieldCondition.gt = opValue;
          break;
        case "$gte":
          fieldCondition.gte = opValue;
          break;
        case "$lt":
          fieldCondition.lt = opValue;
          break;
        case "$lte":
          fieldCondition.lte = opValue;
          break;
        case "$in":
          fieldCondition.in = Array.isArray(opValue) ? opValue : [opValue];
          break;
        case "$nin":
          fieldCondition.notIn = Array.isArray(opValue) ? opValue : [opValue];
          break;
        case "$contains":
          fieldCondition.contains = opValue;
          fieldCondition.mode = "insensitive";
          break;
        case "$startsWith":
          fieldCondition.startsWith = opValue;
          fieldCondition.mode = "insensitive";
          break;
        case "$endsWith":
          fieldCondition.endsWith = opValue;
          fieldCondition.mode = "insensitive";
          break;
        default:
          break;
      }
    }

    if (Object.keys(fieldCondition).length > 0) {
      where[fieldName] = fieldCondition;
    }
  }

  return where;
}

function translatePipelineToPrisma(pipeline, modelConfig) {
  const query = {
    where: {},
    orderBy: undefined,
    skip: undefined,
    take: MAX_LIMIT,
    select: undefined,
    include: undefined,
  };

  let isGroupStage = false;
  let groupConfig = null;

  for (const stage of pipeline) {
    if (stage.$match) {
      const matchWhere = translateMatchCondition(stage.$match, modelConfig);
      query.where = { ...query.where, ...matchWhere };
    }

    if (stage.$sort) {
      const orderBy = [];
      for (const [field, direction] of Object.entries(stage.$sort)) {
        const fieldName = field === "_id" ? "id" : field;
        if (modelConfig.fields.includes(fieldName)) {
          orderBy.push({
            [fieldName]: direction === 1 || direction === "asc" ? "asc" : "desc",
          });
        }
      }
      if (orderBy.length > 0) {
        query.orderBy = orderBy;
      }
    }

    if (typeof stage.$skip === "number" && stage.$skip >= 0) {
      query.skip = stage.$skip;
    }

    if (typeof stage.$limit === "number" && stage.$limit > 0) {
      query.take = Math.min(stage.$limit, MAX_LIMIT);
    }

    if (stage.$select && typeof stage.$select === "object") {
      const select = {};
      for (const [field, inc] of Object.entries(stage.$select)) {
        const fieldName = field === "_id" ? "id" : field;
        if (modelConfig.fields.includes(fieldName) && inc) {
          select[fieldName] = true;
        }
      }
      if (Object.keys(select).length > 0) {
        query.select = select;
      }
    }

    if (stage.$lookup && typeof stage.$lookup === "object") {
      const { from, as } = stage.$lookup;
      // Map relation lookup
      const relationEntry = Object.entries(modelConfig.relations).find(
        ([relName, relConfig]) => relName === from || relName === as || relConfig.model === from
      );

      if (relationEntry) {
        const [relationName] = relationEntry;
        if (!query.select) {
          query.include = query.include || {};
          query.include[relationName] = true;
        }
      }
    }

    if (stage.$group && typeof stage.$group === "object") {
      isGroupStage = true;
      groupConfig = stage.$group;
    }
  }

  return { query, isGroupStage, groupConfig };
}

module.exports = {
  translateMatchCondition,
  translatePipelineToPrisma,
};
