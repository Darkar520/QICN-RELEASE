#!/usr/bin/env node
/* Governance boundary: this audit checks v24 gap-closure predicates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure. */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "docs", "reports", "V24_CRITICAL_GAP_AUDIT.json");
const OUT_MD = path.join(ROOT, "docs", "reports", "V24_CRITICAL_GAP_AUDIT.md");
const GOVERNANCE = "This audit checks v24 gap-closure predicates only. It does not certify external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.";
function read(rel) { return fs.readFileSync(path.join(ROOT, rel), "utf8"); }
function json(rel) { return JSON.parse(read(rel)); }
function exists(rel) { return fs.existsSync(path.join(ROOT, rel)); }
function check(id, description, ok, evidence) { return { id, description, result: ok ? "PASS" : "FAIL", evidence }; }
function main() {
  const p1 = read("paper1/main.tex");
  const p3 = read("paper3/main.tex");
  const p4 = read("paper4/main.tex");
  const p5 = read("paper5_operational_consciousness/main.tex");
  const runner = read("scripts/external-session-zero-adjudicator.js");
  const downgrade = read("scripts/propose-fcr-downgrades-from-adjudication.js");
  const promo = read("scripts/audit-operational-term-promotions.js");
  const fixture = json("docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE.json");
  const ablation = json("docs/ablation_matrix.v1.json");
  const pointIds = new Set((fixture.measurement_points || []).map((p) => p.id));
  const unknownExclusions = (fixture.exclusion_log || []).filter((ex) => !pointIds.has(ex.point_id));
  const checks = [
    check("V01", "Paper 3 uses infimum convention for M_Omega, not supremum", /Ontological Mass, infimum convention/.test(p3) && !/\\MO\s*:=\s*\\sup_\{\\epsilon/.test(p3), "paper3/main.tex"),
    check("V02", "Invalid finite-energy perturbation inference from M_Omega=+infty withdrawn", /v24 correction of the former Step 2/.test(p3) && !/Such perturbations exist because/.test(p3), "paper3/main.tex"),
    check("V03", "Session Zero predictor does not copy observed_delta", !/max\(pt\.noise_floor,\s*pt\.observed_delta\)/.test(runner) && /pt\.qicn_prediction/.test(runner), "scripts/external-session-zero-adjudicator.js"),
    check("V04", "AIC no longer uses Math.max(rss, 1e-12)", !/Math\.max\(rss,\s*1e-12\)/.test(runner) && /instrument_variance_floor/.test(runner), "scripts/external-session-zero-adjudicator.js"),
    check("V05", "Identity-map toy example no longer claimed as non-degenerate CCR", /Identity tower is a degenerate toy model/.test(p1) && /claim is withdrawn/.test(p1), "paper1/main.tex"),
    check("V07", "Ablation entries include frozen v24 death-rule parameters", (ablation.entries || []).every((e) => e.frozen_decision_parameters_v24 && e.frozen_decision_parameters_v24.death_rule_frozen === true), "docs/ablation_matrix.v1.json"),
    check("V09", "Continuous-to-discrete bridge burden is explicitly documented", exists("docs/protocols/CONTINUOUS_TO_DISCRETE_BRIDGE_BURDEN_v24.md"), "docs/protocols/CONTINUOUS_TO_DISCRETE_BRIDGE_BURDEN_v24.md"),
    check("V10", "Small-n confidence intervals use t critical values", /tCritical975/.test(runner) && /t_critical_975/.test(runner), "scripts/external-session-zero-adjudicator.js"),
    check("V12", "Promotion audit uses paragraph-level synonym-aware scan", /paragraph_level_synonym_lexicon/.test(promo) && /TERM_SYNONYMS/.test(promo), "scripts/audit-operational-term-promotions.js"),
    check("V15", "SE model no longer uses max(SE_theor, SE_emp)", !/Math\.max\(seFromWeights,\s*empiricalSe/.test(runner) && /hc1_residual_sandwich/.test(runner), "scripts/external-session-zero-adjudicator.js"),
    check("V16", "Fixture exclusion log references existing points", unknownExclusions.length === 0, `unknown exclusions: ${unknownExclusions.map((e) => e.point_id).join(",") || "none"}`),
    check("V17", "Downgrade consumer verifies adjudication report hash", /verifyReportHash/.test(downgrade) && /report_hash_verification/.test(downgrade), "scripts/propose-fcr-downgrades-from-adjudication.js"),
    check("V18", "Promotion boundary is paragraph-level rather than file-level", /paragraph_level_boundary_present/.test(promo) && /paragraphize\(text\)/.test(promo), "scripts/audit-operational-term-promotions.js"),
    check("V20", "Operational qualia terminology demoted to response-equivalence classes", /Operational response-equivalence classes/.test(p5) && /qualia in the philosophical sense/.test(p5), "paper5_operational_consciousness/main.tex"),
    check("V22", "Unrealistic Cohen d=10.737 removed", !/10\.737/.test(p4) && /deliberately avoids extreme/.test(p4), "paper4/main.tex"),
    check("V24", "Promotion audit excludes its own output files", /path\.resolve\(p\) !== path\.resolve\(OUT_JSON\)/.test(promo), "scripts/audit-operational-term-promotions.js"),
    check("V25", "Real rival engagement protocol added", exists("docs/protocols/REAL_RIVAL_ENGAGEMENT_PROTOCOL_v24.md"), "docs/protocols/REAL_RIVAL_ENGAGEMENT_PROTOCOL_v24.md")
  ];
  const remainingOpen = [
    { id: "V06", status: "OPEN_BURDEN", reason: "No non-synthetic external execution exists; code cannot invent external datasets." },
    { id: "V08", status: "CONDITIONAL", reason: "I_int remains conditionally closed under finite separator-complete witness assumptions, not globally proven from weak premises." },
    { id: "V11", status: "PARTIAL", reason: "Synthetic fixture is still synthetic, but no longer tautological and is marked fixture-only." },
    { id: "V13", status: "OPEN_BURDEN", reason: "Cop subdetermination requires external decoder/admissible-support governance." },
    { id: "V14", status: "DOCUMENTED_OPEN", reason: "Cross-paper notation remains heterogeneous; fixing all notation would be a major editorial migration." },
    { id: "V19", status: "DOCUMENTED_OPEN", reason: "Forced continuity depth is not upgraded; no new claim added." },
    { id: "V21", status: "PARTIAL", reason: "Real-rival protocol added; actual IIT/GNWT/HOT implementations require future datasets and scopes." },
    { id: "V23", status: "DOCUMENTED_OPEN", reason: "Vocabulary mapping not fully migrated across all legacy documents." }
  ];
  const failures = checks.filter((c) => c.result !== "PASS");
  const report = {
    schema_version: "1.0.0",
    generated_at: "2026-05-27",
    governance_boundary: GOVERNANCE,
    checks,
    remaining_open_burdens: remainingOpen,
    result: failures.length === 0 ? "PASS" : "FAIL"
  };
  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(OUT_MD, `# V24 Critical Gap Audit\n\n## Governance boundary\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- PASS checks: ${checks.filter((c) => c.result === "PASS").length}/${checks.length}\n- Remaining open burdens: ${remainingOpen.length}\n\n`, "utf8");
  console.log(`V24 critical gap audit: ${report.result}; pass=${checks.filter((c) => c.result === "PASS").length}/${checks.length}`);
  if (report.result !== "PASS") process.exit(1);
}
if (require.main === module) main();
