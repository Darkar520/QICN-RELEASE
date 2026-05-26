const fs = require("fs");
const path = require("path");
const { sha256, writeJson } = require("./lib/pred-ext-01-evaluator");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-02_freeze_v1.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "PRED_02_INTERNAL_EXECUTION_DECISION_RECORD.json");

function scorePanel(panel, freeze) {
  const certificationDrop = panel.certification_pre - panel.certification_post;
  const relativeRupture = certificationDrop / Math.max(panel.certification_pre, freeze.delta_amb);
  const support =
    certificationDrop > freeze.delta_amb &&
    panel.pre_ablation_headroom > freeze.delta_amb &&
    relativeRupture >= freeze.rho_rupture;
  const destruction = panel.invariant_loss_verified && panel.certification_post >= panel.certification_pre;
  const weakening = !support && certificationDrop > 0 && !destruction;
  return {
    ...panel,
    certification_drop: certificationDrop,
    relative_rupture: relativeRupture,
    verdict: support ? "support_rule_satisfied" : destruction ? "destruction_candidate" : weakening ? "weakening_or_boundary_ambiguous" : "no_support",
    support_rule_satisfied: support
  };
}

function buildRecord() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const panels = {
    invariant_loss_positive: {
      certification_pre: 0.82,
      certification_post: 0.24,
      pre_ablation_headroom: 0.17,
      invariant_loss_verified: true
    },
    boundary_ambiguous_control: {
      certification_pre: 0.54,
      certification_post: 0.50,
      pre_ablation_headroom: 0.03,
      invariant_loss_verified: true
    }
  };
  const results = Object.fromEntries(Object.entries(panels).map(([id, panel]) => [id, scorePanel(panel, freeze)]));
  const positive = results.invariant_loss_positive;
  const boundaryControl = results.boundary_ambiguous_control;
  const verdict =
    positive.support_rule_satisfied && !boundaryControl.support_rule_satisfied
      ? "internal_synthetic_support_with_boundary_control_passed"
      : positive.support_rule_satisfied
        ? "internal_synthetic_support_with_control_warning"
        : "internal_synthetic_no_support";
  return {
    schema_version: "1.0.0",
    prediction_id: "PRED-02",
    run_id: "pred-02-v1-internal-execution-001",
    date_executed: "2026-05-26",
    execution_class: "internal_synthetic_execution",
    status: "executed_internal_synthetic",
    verdict,
    boundary: "Internal synthetic invariant-ablation execution only; no empirical support or external adjudication.",
    freeze,
    panel_results: results,
    artifact_hashes: {
      freeze_sha256: sha256(freeze),
      panel_results_sha256: sha256(results)
    }
  };
}

if (require.main === module) {
  const record = buildRecord();
  writeJson(REPORT_PATH, record);
  console.log(`PRED-02 status=${record.status}`);
  console.log(`PRED-02 verdict=${record.verdict}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
}

module.exports = { buildRecord, scorePanel };
