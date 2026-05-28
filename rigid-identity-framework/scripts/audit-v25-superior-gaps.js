#!/usr/bin/env node
/* Governance boundary: this audit verifies v25 gap closures and demarcations. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human review. */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "docs", "reports", "V25_SUPERIOR_GAP_AUDIT.json");
const OUT_MD = path.join(ROOT, "docs", "reports", "V25_SUPERIOR_GAP_AUDIT.md");
function read(p) { return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : ""; }
function exists(rel) { return fs.existsSync(path.join(ROOT, rel)); }
function status(ok, evidence, closure) { return { status: ok ? "PASS" : "FAIL", evidence, closure }; }
function includes(rel, needle) { return read(path.join(ROOT, rel)).includes(needle); }
function regex(rel, re) { return re.test(read(path.join(ROOT, rel))); }

const runner = read(path.join(ROOT, "scripts", "external-session-zero-adjudicator.js"));
const downgrade = read(path.join(ROOT, "scripts", "propose-fcr-downgrades-from-adjudication.js"));
const promo = read(path.join(ROOT, "scripts", "audit-operational-term-promotions.js"));
const fixture = JSON.parse(read(path.join(ROOT, "docs", "fixtures", "EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v25.json")) || "{}");
const report = exists("docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json") ? JSON.parse(read(path.join(ROOT, "docs", "reports", "SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v25.json"))) : null;

const checks = {
  bridge_theorem_documented: status(exists("docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md") && includes("docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md", "finite projection-invariant claim"), "Conditional bridge theorem exists and blocks global inference.", "OPEN_BURDEN_REDUCED_TO_CONDITIONAL_FINITE_BRIDGE"),
  no_naked_parameter_counts: status(!runner.includes("?? 6") && runner.includes("qicn_free_parameters") && fixture.model_parameters && Array.isArray(fixture.model_parameters.qicn_free_parameters) && !('qicn_parameter_count' in fixture.model_parameters), "Runner derives k from free-parameter arrays; fixture has no qicn_parameter_count shortcut.", "CLOSED_IMPLEMENTATION"),
  no_tautological_predictor: status(!/max\s*\(\s*pt\.noise_floor\s*,\s*pt\.observed_delta\s*\)/.test(runner) && runner.includes("pt.qicn_prediction") && runner.includes("point ${pt.id} has qicn_prediction exactly equal to observed_delta"), "Outcome-copy predictor removed and exact observed-delta copies are blocked.", "CLOSED_IMPLEMENTATION"),
  no_rss_floor_aic: status(!runner.includes("instrument_variance_floor") && runner.includes("independent_gaussian_aic_using_declared_measurement_sigma_no_rss_floor"), "AIC comparison uses Gaussian NLL with declared sigma and no RSS/instrument variance floor.", "CLOSED_IMPLEMENTATION"),
  t_interval_present: status(runner.includes("tCritical975") && runner.includes("8: 2.306") && runner.includes("degrees_of_freedom"), "t critical table used for small n; df-specific values including df=8 are present.", "CLOSED_IMPLEMENTATION"),
  synthetic_support_blocked: status(report && report.synthetic_fixture === true && report.external_support_certified === false && /^INTERNAL_DIAGNOSTIC_/.test(report.verdict), "Synthetic fixture yields diagnostic-only verdict and external_support_certified=false.", "CLOSED_IMPLEMENTATION"),
  provenance_chain_bound: status(report && report.provenance && report.provenance.runner_sha256 && report.provenance.manifest_sha256 && downgrade.includes("verifyProvenance"), "Report binds runner and manifest hashes; downgrade verifies provenance.", "CLOSED_IMPLEMENTATION"),
  threshold_calibration_demarcated: status(exists("docs/protocols/THRESHOLD_CALIBRATION_AND_DEATH_RULES_v25.md") && fixture.decision_thresholds.threshold_calibration_status === "synthetic_engineering_gate", "Threshold calibration status is explicit; synthetic thresholds cannot promote support.", "CLOSED_OR_DEMARCATED"),
  external_ablations_demarcated: status(exists("docs/protocols/EXTERNAL_ABLATION_EXECUTION_PROTOCOL_v25.md") && includes("docs/protocols/EXTERNAL_ABLATION_EXECUTION_PROTOCOL_v25.md", "no external ablation record has been executed"), "Ablations are executable obligations, not evidence.", "DOCUMENTED_OPEN_EXTERNAL"),
  human_veto_traceability: status(exists("docs/protocols/HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md") && downgrade.includes("HUMAN_VETO_TRACEABILITY_PROTOCOL_v25.md"), "Downgrade proposals point to human veto protocol.", "CLOSED_PROTOCOL"),
  semantic_audit_expanded: status(promo.includes("phenomenal character") && promo.includes("what it is like") && promo.includes("sentence_and_paragraph"), "Promotion audit lexicon expanded and labelled v25.", "PARTIAL_DETERMINISTIC_GATE"),
  real_rivals_demarcated: status(exists("docs/protocols/REAL_RIVAL_EXECUTION_REQUIREMENTS_v25.md") && includes("docs/protocols/REAL_RIVAL_EXECUTION_REQUIREMENTS_v25.md", "not executed rivals"), "Real rival requirements exist; execution remains open.", "DOCUMENTED_OPEN_EXTERNAL"),
  paper3_triviality_demarcated: status(regex("paper3/main.tex", /surviving result is conditional on an independently specified extension witness/) && includes("docs/protocols/PROJECTION_INVARIANT_BRIDGE_THEOREM_v25.md", "conditional firewall"), "Paper 3 v24 caveat preserved and bridge theorem labels this as conditional, not independent prediction.", "DEMARCATED_NOT_PROMOTED"),
  momega_infimum_consistency: status(regex("paper3/main.tex", /Ontological Mass, infimum convention/) && regex("paper3/main.tex", /supremum notation.*superseded/), "Paper 3 uses infimum convention and explicitly supersedes old supremum notation.", "CLOSED_FROM_V23"),
  no_external_data_invented: status(report && report.manifest_status === "synthetic_fixture" && report.external_support_certified === false, "No dataset is represented as external in v25 self-test.", "BOUNDARY_PRESERVED")
};
const failures = Object.entries(checks).filter(([, v]) => v.status !== "PASS").map(([k, v]) => `${k}: ${v.evidence}`);
const out = {
  schema_version: "1.0.0",
  generated_at: "2026-05-27",
  governance_boundary: "This audit verifies implementation/demarcation only; it does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human review.",
  audited_baseline: "v24-critical-refoundation",
  v25_result: failures.length === 0 ? "PASS" : "FAIL",
  checks,
  failures
};
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_JSON, `${JSON.stringify(out, null, 2)}\n`, "utf8");
fs.writeFileSync(OUT_MD, `# V25 Superior Gap Audit\n\n- Result: **${out.v25_result}**\n- Checks: ${Object.keys(checks).length}\n- Failures: ${failures.length}\n\nThis report verifies implementation/demarcation only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human review.\n`, "utf8");
console.log(`V25 superior gap audit: ${out.v25_result}; pass=${Object.keys(checks).length - failures.length}/${Object.keys(checks).length}`);
if (failures.length) process.exit(1);
