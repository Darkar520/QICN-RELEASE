const fs = require("fs");
const path = require("path");
const { runAdversarialNegativeControls } = require("./lib/adversarial-negative-controls");
const { ensureDir, writeJson } = require("./lib/pred-ext-01-evaluator");

const ROOT = path.resolve(__dirname, "..");
const FREEZE_PATH = path.join(ROOT, "docs", "preregistrations", "PRED-EXT-01_freeze_v3.json");
const REPORT_MD = path.join(ROOT, "docs", "reports", "ADVERSARIAL_NEGATIVE_CONTROL_REPORT.md");
const REPORT_JSON = path.join(ROOT, "docs", "reports", "ADVERSARIAL_NEGATIVE_CONTROL_DECISION_RECORD.json");

function writeMarkdown(record) {
  const lines = [
    "# Adversarial Negative Control Report",
    "",
    `Date: ${new Date().toISOString()}`,
    "",
    `Status: ${record.status}`,
    `Support blocked: ${record.support_blocked}`,
    "",
    "## Boundary",
    "",
    record.boundary,
    "",
    "## Layer separation",
    "",
    "- Ontology: finite-state synthetic negative-control families only.",
    "- Mathematical model: distributional and trace-shuffle controls over declared alphabet.",
    "- Implementation: candidate search maximizes support-like score within each negative family.",
    "- Language/documentation: a pass is internal harness hygiene, not validation.",
    "- Interpretation: a failure blocks internal support pending revision; a pass does not upgrade external claims.",
    "- Internal evidence: see per-family best candidates below.",
    "- External evidence: none.",
    "",
    "## Best candidates by seed/family",
    "",
    "| Seed | Family | Best candidate | Support rule | rho | Margin |",
    "|---|---|---|---:|---:|---:|"
  ];
  for (const [seed, seedResult] of Object.entries(record.seed_results)) {
    for (const [family, familyResult] of Object.entries(seedResult.family_results)) {
      const c = familyResult.best_candidate;
      lines.push(`| ${seed} | ${family} | ${c.candidate_id} | ${c.support_rule_satisfied} | ${(c.metrics?.rho_selective ?? 0).toFixed(6)} | ${c.margin_to_threshold.toFixed(6)} |`);
    }
  }
  lines.push("", "## Decision record", "", "```json", JSON.stringify(record, null, 2), "```", "");
  ensureDir(path.dirname(REPORT_MD));
  fs.writeFileSync(REPORT_MD, lines.join("\n"), "utf8");
}

function run() {
  const freeze = JSON.parse(fs.readFileSync(FREEZE_PATH, "utf8"));
  const record = runAdversarialNegativeControls(freeze);
  writeJson(REPORT_JSON, record);
  writeMarkdown(record);
  console.log("====================================================");
  console.log("QICN Adversarial Negative Control Search");
  console.log("====================================================");
  console.log(`Wrote ${path.relative(ROOT, REPORT_JSON)}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_MD)}`);
  console.log(`Status: ${record.status}`);
  console.log("Boundary: internal synthetic negative-control search only; no empirical support or external adjudication.");
  if (record.status === "NEGATIVE_CONTROL_FAILURE") process.exit(1);
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[FATAL] adversarial negative-control run failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { run };
