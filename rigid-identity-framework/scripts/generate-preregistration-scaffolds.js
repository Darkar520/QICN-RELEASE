const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REGISTRY_PATH = path.join(ROOT, "docs", "PREDICTION_REGISTRY_v1.json");
const CANON_MAP_PATH = path.join(ROOT, "registry", "prediction-canon-map.json");
const PREREG_DIR = path.join(ROOT, "docs", "preregistrations");
const COVERAGE_PATH = path.join(ROOT, "docs", "reports", "PREREGISTRATION_COVERAGE_MATRIX.md");

function bulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function thresholdRows(thresholds) {
  return thresholds.map((item) => (
    `| ${item.name} | ${item.status} | ${item.value === null ? "null" : item.value} | ${item.unit} |`
  )).join("\n");
}

function preregContent(prediction) {
  return `# ${prediction.id} Preregistration v0

Status: draft scaffold, not frozen, not executed.

## Boundary

This preregistration scaffold makes ${prediction.id} executable in principle.
It does not freeze thresholds, execute the prediction, report empirical support,
report external adjudication, validate consciousness, validate phenomenality,
validate identity transfer, agency, moral status, or validate the full QICN
framework.

## Required Header

- Prediction ID: \`${prediction.id}\`
- Claim target: \`${prediction.claim_target}\`
- Claim family: ${prediction.claim_family}
- Source: \`${prediction.source_paper}\`
- Preregistration version: \`v0\`
- Date frozen: \`not_frozen\`
- Execution status: \`not_executed\`

## Hypothesis And Rival

- Observable: ${prediction.observable}
- Manipulation: ${prediction.manipulation}
- Framework prediction: ${prediction.framework_prediction}
- Rival prediction: ${prediction.rival_prediction}
- Support condition: ${prediction.support_condition}
- Weakening condition: ${prediction.weakening_condition}
- Destruction condition: ${prediction.destruction_condition}

## Thresholds

| Threshold | Status | Value | Unit |
|---|---|---:|---|
${thresholdRows(prediction.thresholds)}

## Required Artifacts

${bulletList(prediction.required_artifacts)}

## Minimum Negative Controls

${bulletList(prediction.minimum_negative_controls)}

## Decision Record Slots

| Slot | Required before execution |
|---|---|
| Dataset or trace manifest | yes |
| Frozen thresholds | yes |
| Frozen seeds or deterministic generator | yes |
| Rival output | yes |
| Negative-control output | yes |
| Support / weakening / destruction / inconclusive verdict | yes |
| Claim-ledger update | yes |

## Epistemic Limit

${prediction.epistemic_limit}
`;
}

function statusFor(predictionId, preregPath) {
  if (predictionId === "PRED-EXT-01" && preregPath.endsWith("_v1.md")) {
    return "frozen_internal_synthetic_pilot_executed";
  }
  if (preregPath.includes("_v1")) return "registered_preregistration_scaffold";
  return "draft_preregistration_scaffold_not_frozen";
}

function run() {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
  const canonMap = JSON.parse(fs.readFileSync(CANON_MAP_PATH, "utf8"));
  fs.mkdirSync(PREREG_DIR, { recursive: true });

  const preferred = new Map();
  (canonMap.preregistration_files || []).forEach((entry) => {
    preferred.set(entry.prediction_id, entry.path);
  });
  if (fs.existsSync(path.join(ROOT, "docs", "preregistrations", "PRED-EXT-01_prereg_v1.md"))) {
    preferred.set("PRED-EXT-01", "docs/preregistrations/PRED-EXT-01_prereg_v1.md");
  }

  const created = [];
  registry.predictions.forEach((prediction) => {
    if (!preferred.has(prediction.id)) {
      const relativePath = `docs/preregistrations/${prediction.id}_prereg_v0.md`;
      preferred.set(prediction.id, relativePath);
      const absolutePath = path.join(ROOT, relativePath);
      if (!fs.existsSync(absolutePath)) {
        fs.writeFileSync(absolutePath, preregContent(prediction), "utf8");
        created.push(relativePath);
      }
    }
  });

  canonMap.preregistration_files = registry.predictions
    .map((prediction) => {
      const preregPath = preferred.get(prediction.id);
      return {
        prediction_id: prediction.id,
        path: preregPath,
        status: statusFor(prediction.id, preregPath)
      };
    })
    .sort((left, right) => left.prediction_id.localeCompare(right.prediction_id, undefined, { numeric: true }));

  fs.writeFileSync(CANON_MAP_PATH, `${JSON.stringify(canonMap, null, 2)}\n`, "utf8");

  const rows = registry.predictions
    .map((prediction) => {
      const prereg = canonMap.preregistration_files.find((item) => item.prediction_id === prediction.id);
      return `| \`${prediction.id}\` | \`${prereg.path}\` | ${prereg.status} |`;
    })
    .join("\n");

  const matrix = `# Preregistration Coverage Matrix v2

Status: FCR v15-pilot coverage audit.

Date: 2026-05-26

## Boundary

This matrix records preregistration coverage only. It does not execute every
prediction, report empirical support, validate consciousness, validate
phenomenality, validate identity transfer, or adjudicate the QICN framework
externally. Only PRED-EXT-01 has an executed internal synthetic pilot.

## Coverage

| Prediction | Preregistration artifact | Coverage status |
|---|---|---|
${rows}

## Interpretation

Every registered prediction now has at least a preregistration scaffold. Most
are still draft, not frozen, and not executed. This closes the documentation
gap; it does not close the evidential gap.
`;
  fs.writeFileSync(COVERAGE_PATH, matrix, "utf8");

  console.log("====================================================");
  console.log("QICN Preregistration Scaffold Generator");
  console.log("====================================================");
  console.log(`Created ${created.length} scaffold(s).`);
  created.forEach((item) => console.log(`- ${item}`));
  console.log(`Updated ${path.relative(ROOT, CANON_MAP_PATH)}`);
  console.log(`Updated ${path.relative(ROOT, COVERAGE_PATH)}`);
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[FATAL] Preregistration scaffold generation failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { run };
