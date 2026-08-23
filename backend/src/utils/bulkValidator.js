const { ALLOWED_MODELS, MAX_STAGES } = require("./bulkConfig");

function validateBulkOperationPayload(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return { valid: false, errors: [{ message: "Payload must be a JSON object" }] };
  }

  // Transaction wrapper validation
  if (payload.transaction) {
    if (!Array.isArray(payload.operations) || payload.operations.length === 0) {
      errors.push({ message: "Transaction payload must contain a non-empty 'operations' array" });
    } else {
      payload.operations.forEach((op, idx) => {
        const subValidation = validateSingleOperationPayload(op);
        if (!subValidation.valid) {
          subValidation.errors.forEach((err) => {
            errors.push({ index: idx, ...err });
          });
        }
      });
    }
    return { valid: errors.length === 0, errors };
  }

  return validateSingleOperationPayload(payload);
}

function validateSingleOperationPayload(payload) {
  const errors = [];
  const { model, operation, pipeline } = payload;

  if (!model) {
    errors.push({ field: "model", message: "Field 'model' is required" });
  } else if (!ALLOWED_MODELS[model]) {
    errors.push({
      field: "model",
      message: `Model '${model}' is not allowed or supported. Allowed models: ${Object.keys(ALLOWED_MODELS).join(", ")}`,
    });
  }

  const modelConfig = ALLOWED_MODELS[model];

  if (!operation && !pipeline) {
    errors.push({ message: "Either 'operation' or 'pipeline' must be specified" });
    return { valid: false, errors };
  }

  // Validate operation-based request
  if (operation) {
    const validOperations = ["createMany", "updateMany", "bulkUpdate", "deleteMany", "upsertMany"];
    if (!validOperations.includes(operation)) {
      errors.push({
        field: "operation",
        message: `Operation '${operation}' is not supported. Valid operations: ${validOperations.join(", ")}`,
      });
    }

    if (operation === "createMany") {
      if (!Array.isArray(payload.data) || payload.data.length === 0) {
        errors.push({ field: "data", message: "'data' must be a non-empty array of objects for createMany" });
      } else if (modelConfig) {
        payload.data.forEach((item, idx) => {
          validateRecordFields(item, modelConfig, idx, errors);
        });
      }
    }

    if (operation === "updateMany") {
      if (!payload.where || typeof payload.where !== "object") {
        errors.push({ field: "where", message: "'where' filter object is required for updateMany" });
      }
      if (!payload.data || typeof payload.data !== "object" || Object.keys(payload.data).length === 0) {
        errors.push({ field: "data", message: "'data' object with changes is required for updateMany" });
      }
    }

    if (operation === "bulkUpdate") {
      if (!Array.isArray(payload.data) || payload.data.length === 0) {
        errors.push({ field: "data", message: "'data' must be a non-empty array of {where, data} objects for bulkUpdate" });
      } else if (modelConfig) {
        payload.data.forEach((item, idx) => {
          if (!item.where || typeof item.where !== "object") {
            errors.push({ index: idx, field: "where", message: "Each item in bulkUpdate must have a 'where' object" });
          }
          if (!item.data || typeof item.data !== "object") {
            errors.push({ index: idx, field: "data", message: "Each item in bulkUpdate must have a 'data' object" });
          }
        });
      }
    }

    if (operation === "deleteMany") {
      const hasWhere = payload.where && typeof payload.where === "object" && Object.keys(payload.where).length > 0;
      const hasIds = Array.isArray(payload.ids) && payload.ids.length > 0;

      if (!hasWhere && !hasIds) {
        errors.push({
          message: "Safeguard Triggered: 'deleteMany' requires either a non-empty 'where' clause or an 'ids' array to prevent full-table deletion.",
        });
      }
    }

    if (operation === "upsertMany") {
      if (!Array.isArray(payload.data) || payload.data.length === 0) {
        errors.push({ field: "data", message: "'data' must be a non-empty array of objects for upsertMany" });
      }
      if (!payload.uniqueBy) {
        errors.push({ field: "uniqueBy", message: "'uniqueBy' field name (e.g., 'email' or 'id') is required for upsertMany" });
      }
    }
  }

  // Validate pipeline-based request
  if (pipeline) {
    if (!Array.isArray(pipeline)) {
      errors.push({ field: "pipeline", message: "'pipeline' must be an array of stage objects" });
    } else if (pipeline.length > MAX_STAGES) {
      errors.push({ field: "pipeline", message: `Pipeline exceeds maximum stage count limit of ${MAX_STAGES}` });
    }
  }

  return { valid: errors.length === 0, errors };
}

function validateRecordFields(record, modelConfig, idx, errors) {
  if (!record || typeof record !== "object") {
    errors.push({ index: idx, message: "Record must be an object" });
    return;
  }

  // Field mapping for common snake_case/legacy aliases to valid camelCase schema fields
  const fieldAliases = {
    card_name: "name",
    annual_charge: "annualFee",
    joining_charge: "joiningFee",
    joining_fee: "joiningFee",
    annual_fee: "annualFee",
    charge_type: "category",
    reward_rate: "rewardRate",
    features: "tags",
    apply_url: "applyUrl",
    button_text: "buttonText",
    image_url: "imageUrl",
    image_alt: "imageAlt",
  };

  Object.keys(record).forEach((key) => {
    let targetKey = key;
    if (fieldAliases[key]) {
      targetKey = fieldAliases[key];
      record[targetKey] = record[key];
      delete record[key];
    }
  });

  // Default missing 'bank' if 'name' contains a bank name or default to 'HDFC Bank'
  if (!record.bank && record.name) {
    const lowerName = record.name.toLowerCase();
    if (lowerName.includes("hdfc")) record.bank = "HDFC Bank";
    else if (lowerName.includes("sbi")) record.bank = "SBI Card";
    else if (lowerName.includes("icici")) record.bank = "ICICI Bank";
    else if (lowerName.includes("axis")) record.bank = "Axis Bank";
    else record.bank = "HDFC Bank";
  }

  // Normalize 'category' Enum values (Cashback, Travel, Rewards, Premium)
  if (record.category) {
    const val = String(record.category).toLowerCase();
    if (val.includes("cash") || val.includes("shopping")) record.category = "Cashback";
    else if (val.includes("travel")) record.category = "Travel";
    else if (val.includes("reward") || val.includes("annual")) record.category = "Rewards";
    else if (val.includes("premium")) record.category = "Premium";
    else record.category = "Rewards";
  } else {
    record.category = "Rewards";
  }

  // Normalize 'rating' to a valid float
  if (record.rating !== undefined) {
    if (typeof record.rating === "string") {
      const parsed = parseFloat(record.rating);
      record.rating = isNaN(parsed) ? 4.2 : parsed;
    }
  } else {
    record.rating = 4.5;
  }

  Object.keys(record).forEach((key) => {
    if (!modelConfig.fields.includes(key)) {
      errors.push({
        index: idx,
        field: key,
        message: `Field '${key}' is not allowed for model. Allowed fields: ${modelConfig.fields.join(", ")}`,
      });
    }
  });
}

module.exports = { validateBulkOperationPayload };
