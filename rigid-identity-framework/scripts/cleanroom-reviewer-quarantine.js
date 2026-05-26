const fs = require("fs");
const path = require("path");
const { validateGeneratorDeterminism } = require("./lib/external-trace-generator");
const { sha256 } = require("./lib/pred-ext-01-evaluator");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-EXT-01_freeze_v2.json");
const RECORD_PATH = path.join(ROOT, "docs", "reports", "PRED_EXT_01_CLEANROOM_DECISION_RECORD.json");

function fail(reason) {
  return { status: "quarantine", reason };
}

function review() {
  if (!fs.existsSync(RECORD_PATH)) return fail("Decision record is missing.");
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const record = JSON.parse(fs.readFileSync(RECORD_PATH, "utf8"));
  if (record.artifact_hashes.freeze_sha256 !== sha256(freeze)) return fail("Freeze hash mismatch.");
  if (!freeze.required_seeds.includes(record.seed)) return fail("Record seed was not declared in freeze.");
  if (!validateGeneratorDeterminism(record.seed, freeze.trace_length, freeze.state_alphabet)) {
    return fail("Trace generator is not deterministic for declared seed.");
  }
  if (!record.control_summary || record.control_summary.controls_total < 4) {
    return fail("Fewer than four negative controls were evaluated.");
  }
  if (record.control_summary.destruction_risk) {
    return fail("At least one negative control satisfied the support rule.");
  }
  if (!String(record.boundary || "").includes("not external adjudication")) {
    return fail("Boundary does not block external-adjudication overclaim.");
  }
  return {
    status: "review_pass",
    freeze_sha256: record.artifact_hashes.freeze_sha256,
    controls_total: record.control_summary.controls_total,
    controls_passed: record.control_summary.controls_passed
  };
}

if (require.main === module) {
  const result = review();
  console.log(JSON.stringify(result, null, 2));
  if (result.status !== "review_pass") process.exit(1);
}

module.exports = { review };
