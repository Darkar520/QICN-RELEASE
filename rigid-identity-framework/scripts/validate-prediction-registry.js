const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REGISTRY_PATH = path.join(ROOT, "docs", "PREDICTION_REGISTRY_v1.json");
const SCHEMA_PATH = path.join(ROOT, "registry", "prediction-schema.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validate() {
  const schema = readJson(SCHEMA_PATH);
  const registry = readJson(REGISTRY_PATH);
  const errors = [];
  const thresholdStatuses = new Set(schema.threshold_status_enum);
  const semver = new RegExp(schema.patterns.schema_version);
  const predictionId = new RegExp(schema.patterns.prediction_id);
  const isoDate = new RegExp(schema.patterns.iso_date);
  const rivalId = new RegExp(schema.patterns.rival_id);

  if (!semver.test(registry.schema_version || "")) {
    errors.push("schema_version: must match semver x.y.z");
  }

  if (!Array.isArray(registry.predictions) || registry.predictions.length === 0) {
    errors.push("predictions: must be a non-empty array");
    return errors;
  }

  const ids = new Set();
  registry.predictions.forEach((prediction, index) => {
    const basePath = `predictions[${index}]`;
    schema.prediction_required_fields.forEach((field) => {
      if (!(field in prediction)) {
        errors.push(`${basePath}.${field}: missing required field`);
      }
    });

    if (!predictionId.test(prediction.id || "")) {
      errors.push(`${basePath}.id: must match ${schema.patterns.prediction_id}`);
    }
    if (ids.has(prediction.id)) {
      errors.push(`${basePath}.id: duplicate id ${prediction.id}`);
    }
    ids.add(prediction.id);

    ["source_paper", "claim_target", "claim_family", "observable", "manipulation", "framework_prediction", "rival_prediction", "support_condition", "weakening_condition", "destruction_condition", "current_status"].forEach((field) => {
      if (!isNonEmptyString(prediction[field])) {
        errors.push(`${basePath}.${field}: must be a non-empty string`);
      }
    });

    if (!isNonEmptyString(prediction.epistemic_limit) || prediction.epistemic_limit.trim().length < 20) {
      errors.push(`${basePath}.epistemic_limit: must be at least 20 characters`);
    }

    ["required_artifacts", "minimum_negative_controls"].forEach((field) => {
      if (!Array.isArray(prediction[field]) || prediction[field].length === 0) {
        errors.push(`${basePath}.${field}: must be a non-empty array`);
      }
    });

    if ("linked_rivals" in prediction) {
      if (!Array.isArray(prediction.linked_rivals) || prediction.linked_rivals.length === 0) {
        errors.push(`${basePath}.linked_rivals: must be a non-empty array when present`);
      } else {
        prediction.linked_rivals.forEach((id, rivalIndex) => {
          if (!rivalId.test(id)) {
            errors.push(`${basePath}.linked_rivals[${rivalIndex}]: invalid rival id ${id}`);
          }
        });
      }
    }

    if (!Array.isArray(prediction.thresholds)) {
      errors.push(`${basePath}.thresholds: must be an array`);
      return;
    }

    prediction.thresholds.forEach((threshold, thresholdIndex) => {
      const thresholdPath = `${basePath}.thresholds[${thresholdIndex}]`;
      schema.threshold_required_fields.forEach((field) => {
        if (!(field in threshold)) {
          errors.push(`${thresholdPath}.${field}: missing required field`);
        }
      });

      if (!thresholdStatuses.has(threshold.status)) {
        errors.push(`${thresholdPath}.status: invalid status ${threshold.status}`);
      }

      if (typeof threshold.name !== "string" || threshold.name.trim().length === 0) {
        errors.push(`${thresholdPath}.name: must be a non-empty string`);
      }

      if (threshold.status && threshold.status.startsWith("frozen_")) {
        if (threshold.value === null || typeof threshold.value === "undefined") {
          errors.push(`${thresholdPath}.value: frozen thresholds must have a value`);
        }
        if (!isoDate.test(threshold.date_frozen || "")) {
          errors.push(`${thresholdPath}.date_frozen: frozen thresholds must use YYYY-MM-DD`);
        }
        if (!isNonEmptyString(threshold.rationale) || threshold.rationale.trim().length < 10) {
          errors.push(`${thresholdPath}.rationale: frozen thresholds need a rationale of at least 10 characters`);
        }
      }

      if (!Array.isArray(threshold.modification_log)) {
        errors.push(`${thresholdPath}.modification_log: must be an array`);
      }
    });
  });

  return errors;
}

if (require.main === module) {
  try {
    const errors = validate();
    if (errors.length > 0) {
      console.error("# Prediction Registry Validation");
      console.error("");
      console.error(`Errors: ${errors.length}`);
      errors.forEach((error) => console.error(`- ${error}`));
      process.exit(1);
    }
    const registry = readJson(REGISTRY_PATH);
    console.log(`Validated ${registry.predictions.length} predictions, 0 errors.`);
  } catch (error) {
    console.error(`Prediction registry validation failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { validate };
