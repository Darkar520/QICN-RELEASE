const fs = require("fs");
const path = require("path");
const { sha256, writeJson } = require("./lib/pred-ext-01-evaluator");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-11_freeze_v1.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "PRED_11_INTERNAL_EXECUTION_DECISION_RECORD.json");

function buildRecord() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const pre = {
    integration_margin: 0.76,
    complexity_units: 120,
    activity_budget: 0.81,
    certification_score: 0.74
  };
  const post = {
    integration_margin: 0.11,
    complexity_units: 121,
    activity_budget: 0.80,
    certification_score: 0.34
  };
  const integrationDrop = pre.integration_margin - post.integration_margin;
  const complexityDelta = Math.abs(pre.complexity_units - post.complexity_units) / pre.complexity_units;
  const support =
    integrationDrop >= freeze.integration_loss_boundary &&
    complexityDelta <= freeze.complexity_preservation_epsilon &&
    post.certification_score < freeze.certification_threshold;
  const destruction =
    integrationDrop >= freeze.integration_loss_boundary &&
    complexityDelta <= freeze.complexity_preservation_epsilon &&
    post.certification_score >= freeze.certification_threshold;
  const result = {
    pre,
    post,
    integration_drop: integrationDrop,
    complexity_delta: complexityDelta,
    activity_delta: Math.abs(pre.activity_budget - post.activity_budget),
    verdict: support ? "support_rule_satisfied" : destruction ? "destruction_candidate" : "weakening_or_no_support",
    support_rule_satisfied: support,
    complexity_only_rival_prediction: "certification_persists_when_complexity_is_preserved"
  };
  return {
    schema_version: "1.0.0",
    prediction_id: "PRED-11",
    run_id: "pred-11-v1-internal-execution-001",
    date_executed: "2026-05-26",
    execution_class: "internal_synthetic_execution",
    status: "executed_internal_synthetic",
    verdict: result.verdict === "support_rule_satisfied" ? "internal_synthetic_support" : result.verdict,
    boundary: "Internal synthetic integration-loss execution only; no empirical support or external adjudication.",
    freeze,
    result,
    artifact_hashes: {
      freeze_sha256: sha256(freeze),
      result_sha256: sha256(result)
    }
  };
}

if (require.main === module) {
  const record = buildRecord();
  writeJson(REPORT_PATH, record);
  console.log(`PRED-11 status=${record.status}`);
  console.log(`PRED-11 verdict=${record.verdict}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
}

module.exports = { buildRecord };
