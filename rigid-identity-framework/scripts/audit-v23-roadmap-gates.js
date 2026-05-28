#!/usr/bin/env node
/* Governance boundary: this gate audits roadmap artifacts only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review. */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "docs", "reports", "V23_ROADMAP_GATE_AUDIT.json");
const OUT_MD = path.join(ROOT, "docs", "reports", "V23_ROADMAP_GATE_AUDIT.md");
const GOVERNANCE = "This gate checks whether v23 scaffold and runner artifacts exist and remain non-inflationary. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.";
function exists(rel){return fs.existsSync(path.join(ROOT,rel));}
function read(rel){try{return fs.readFileSync(path.join(ROOT,rel),"utf8");}catch(_){return "";}}
function json(rel){return JSON.parse(read(rel));}
function checkBoundary(rel){return /does not certify external support/.test(read(rel));}
function main(){
  const required = [
    "docs/ABLATION_MATRIX.md",
    "docs/ablation_matrix.v1.json",
    "docs/OPERATIONAL_TERM_PROMOTION_RULES.md",
    "docs/operational_term_promotion_rules.v1.json",
    "docs/protocols/EXTERNAL_SESSION_ZERO_ADJUDICATION_PROTOCOL_v23.md",
    "docs/ACCESSIBLE_FALSIFIER_TABLE_v23.md",
    "docs/templates/EXTERNAL_SESSION_ZERO_MANIFEST.template.json",
    "docs/templates/FCR_DOWNGRADE_DECISION_RECORD.template.json",
    "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE.json",
    "scripts/external-session-zero-adjudicator.js",
    "scripts/audit-operational-term-promotions.js",
    "scripts/propose-fcr-downgrades-from-adjudication.js",
    "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json",
    "docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json",
    "docs/reports/OPERATIONAL_TERM_PROMOTION_AUDIT_v23.json"
  ];
  const missing = required.filter((rel)=>!exists(rel));
  const boundaryFailures = required.filter((rel)=>/\.(md|json)$/.test(rel) && exists(rel) && !checkBoundary(rel));
  const session = exists("docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json") ? json("docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json") : {};
  const downgrade = exists("docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json") ? json("docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json") : {};
  const claims = {
    ablation_matrix_missing_gap_closed: exists("docs/ABLATION_MATRIX.md") && exists("docs/ablation_matrix.v1.json"),
    operational_term_rules_gap_closed: exists("docs/OPERATIONAL_TERM_PROMOTION_RULES.md") && exists("docs/operational_term_promotion_rules.v1.json"),
    external_runner_engineering_gap_closed: exists("scripts/external-session-zero-adjudicator.js") && exists("docs/templates/EXTERNAL_SESSION_ZERO_MANIFEST.template.json"),
    noise_and_exclusion_controls_present: /confidence interval|exclusion/i.test(read("docs/protocols/EXTERNAL_SESSION_ZERO_ADJUDICATION_PROTOCOL_v23.md")),
    downgrade_dry_run_present: exists("scripts/propose-fcr-downgrades-from-adjudication.js") && downgrade.registry_modified === false,
    no_external_support_claim_from_fixture: session.external_support_certified === false && session.synthetic_fixture === true,
    human_review_still_not_simulated: !/human_curated.*true|signed_by.*ChatGPT|external_adjudicator.*ChatGPT/i.test(read("docs/reports/FCR_DOWNGRADE_DRY_RUN_v23.json") + read("docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v23.json"))
  };
  const failures = [];
  if(missing.length) failures.push(`missing required artifacts: ${missing.join(", ")}`);
  if(boundaryFailures.length) failures.push(`missing governance boundary: ${boundaryFailures.join(", ")}`);
  for(const [k,v] of Object.entries(claims)) if(!v) failures.push(`claim check failed: ${k}`);
  const report = {schema_version:"1.0.0", generated_at:"2026-05-27", governance_boundary:GOVERNANCE, required_artifacts:required.map((rel)=>({path:rel,exists:exists(rel),boundary_present:/\.(md|json)$/.test(rel)?checkBoundary(rel):null})), claims, unresolved_external_debts:["human reviewer signatures", "non-synthetic datasets", "independent replication", "DOI/arXiv/Zenodo archival", "executed ablation campaigns"], failures, result:failures.length?"FAIL":"PASS"};
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report,null,2)}\n`, "utf8");
  fs.writeFileSync(OUT_MD, `# V23 Roadmap Gate Audit\n\n## Governance boundary\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Missing artifacts: ${missing.length}\n- Boundary failures: ${boundaryFailures.length}\n- Unresolved external debts: ${report.unresolved_external_debts.join(", ")}\n\n`, "utf8");
  console.log(`V23 roadmap gate audit: ${report.result}`);
  if(report.result!=="PASS") process.exit(1);
}
if(require.main===module) main();
