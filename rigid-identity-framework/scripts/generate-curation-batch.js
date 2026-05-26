const fs = require("fs");
const path = require("path");
const { readJsonl } = require("./registry-lib");
const { writeJson } = require("./lib/pred-ext-01-evaluator");

const ROOT = path.resolve(__dirname, "..");
const THEOREMS_PATH = path.join(ROOT, "registry", "theorems.jsonl");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "REGISTRY_CURATION_BATCH_002_HUMAN_REVIEW.md");
const INDEX_PATH = path.join(ROOT, "docs", "reports", "REGISTRY_CURATION_BATCH_002_INDEX.json");

function priority(entry) {
  let score = 0;
  if (entry.curation_status === "draft_extracted") score += 5;
  if (entry.epistemic_status === "proved") score += 5;
  if (entry.paper === "paper5") score += 4;
  if (entry.paper === "paper3") score += 3;
  if (!entry.counterexample) score += 1;
  if (entry.type === "theorem") score += 2;
  return score;
}

function main() {
  const { records, errors } = readJsonl(THEOREMS_PATH);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  const selected = records
    .filter((entry) => ["proved", "conditional", "open_burden"].includes(entry.epistemic_status))
    .sort((a, b) => priority(b) - priority(a) || a.id.localeCompare(b.id))
    .slice(0, 50);

  const lines = [
    "# Registry Curation Batch 002: Human Mathematical Review",
    "",
    "Status: HUMAN_REVIEW_SCAFFOLD_NOT_SIGNED",
    "Date: 2026-05-26",
    "",
    "## Boundary",
    "",
    "This batch is a review scaffold. It does not confirm theorem truth, empirical support, external adjudication, consciousness, phenomenality, identity transfer, agency, moral status, or the full QICN framework.",
    "",
    "## Instructions",
    "",
    "A qualified reviewer should fill exactly one assessment box per entry, add required action text, and sign/date only after reviewing the cited LaTeX source.",
    "",
  ];

  selected.forEach((entry, index) => {
    lines.push(
      `## ${index + 1}. Entry: \`${entry.id}\``,
      "",
      `- **LaTeX source:** \`${entry.location?.file || "unknown"}:${entry.location?.line_start || "?"}\``,
      `- **Type:** \`${entry.type}\``,
      `- **Paper:** \`${entry.paper}\``,
      `- **Current epistemic status:** \`${entry.epistemic_status}\``,
      `- **Proof status:** \`${entry.proof_status || "unknown"}\``,
      `- **Curation status:** \`${entry.curation_status || "unknown"}\``,
      `- **Title:** ${entry.title || "Untitled"}`,
      "",
      "**Reviewer assessment:**",
      "",
      "- [ ] `confirmed_proved`",
      "- [ ] `downgrade_to_conditional`",
      "- [ ] `downgrade_to_heuristic`",
      "- [ ] `open_burden`",
      "- [ ] `false_claim`",
      "",
      "**Required action:**",
      "",
      "```text",
      "TBD by reviewer.",
      "```",
      "",
      "**Reviewer signature:**",
      "",
      "```text",
      "Name / affiliation / date.",
      "```",
      "",
    );
  });

  fs.writeFileSync(REPORT_PATH, `${lines.join("\n").trim()}\n`, "utf8");
  writeJson(INDEX_PATH, {
    schema_version: "1.0.0",
    batch_id: "002",
    status: "human_review_scaffold_not_signed",
    date: "2026-05-26",
    selected_count: selected.length,
    selected_ids: selected.map((entry) => entry.id)
  });
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
  console.log(`Wrote ${path.relative(ROOT, INDEX_PATH)}`);
}

if (require.main === module) main();
