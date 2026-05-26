const fs = require("fs");
const path = require("path");
const { sha256, writeJson } = require("./lib/pred-ext-01-evaluator");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-04c_freeze_v2.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "PRED_04C_INTERNAL_EXECUTION_DECISION_RECORD.json");

function maxAbsDelta(left, right) {
  return Math.max(...Object.keys(left).map((key) => Math.abs(left[key] - right[key])));
}

function buildRecord() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const profinite = { Iper: 0.72, Iri: 0.69, Iint: 0.66, Icont: 0.71, Idiff: 0.63, Ileg: 0.68 };
  const sft = { Iper: 0.70, Iri: 0.68, Iint: 0.64, Icont: 0.70, Idiff: 0.62, Ileg: 0.66 };
  const equivDistance = 0.04;
  const invariantDelta = maxAbsDelta(profinite, sft);
  const classAgreement = true;
  const support = equivDistance < freeze.eps_equiv && invariantDelta < freeze.eps_invariant && classAgreement;
  const destruction = !classAgreement && equivDistance < freeze.eps_equiv && invariantDelta < freeze.eps_invariant;
  const result = {
    equiv_distance: equivDistance,
    invariant_delta: invariantDelta,
    class_agreement: classAgreement,
    substrate_label_rival_prediction: "divergence_by_substrate_label",
    verdict: support ? "support_rule_satisfied" : destruction ? "destruction_candidate" : "no_support",
    support_rule_satisfied: support,
    invariant_vectors: { profinite, sft }
  };
  return {
    schema_version: "1.0.0",
    prediction_id: "PRED-04c",
    run_id: "pred-04c-v2-internal-execution-001",
    date_executed: "2026-05-26",
    execution_class: "internal_synthetic_execution",
    status: "executed_internal_synthetic",
    verdict: result.verdict === "support_rule_satisfied" ? "internal_synthetic_support" : result.verdict,
    boundary: "Internal synthetic cross-substrate execution only; no empirical support or external adjudication.",
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
  console.log(`PRED-04c status=${record.status}`);
  console.log(`PRED-04c verdict=${record.verdict}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
}

module.exports = { buildRecord };
