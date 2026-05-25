const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const LEDGER_PATH = path.join(ROOT, "docs", "THEORY_CLAIM_LEDGER.md");
const OUTPUT_PATH = path.join(ROOT, "docs", "reports", "CLAIM_LEDGER_SNAPSHOT.json");
const ALLOWED_STATUS = new Set([
  "formal-only",
  "implementation-support",
  "internal-support",
  "preregistered-test",
  "external-adjudicated",
  "prohibited",
  "refuted",
  "high_risk_control_surface"
]);

function splitRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function stripAnchor(value) {
  const match = value.match(/<a id="([^"]+)"><\/a>(.*)/);
  if (!match) return { id: null, text: value.trim() };
  return { id: match[1], text: match[2].trim() };
}

function parseLedger(markdown) {
  const lines = markdown.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) => line.includes("| Claim family | Corpus locus | Permitted formulation |"));
  if (headerIndex === -1) {
    throw new Error("Claim ledger table header not found");
  }
  const tableLines = [];
  for (let index = headerIndex; index < lines.length; index += 1) {
    const line = lines[index];
    if (!/^\|/.test(line.trim())) break;
    tableLines.push(line);
  }
  if (tableLines.length < 3) {
    throw new Error("Claim ledger table not found");
  }
  const rows = tableLines.slice(2);
  const entries = [];
  const ids = new Set();

  rows.forEach((row, index) => {
    const cells = splitRow(row);
    if (cells.length !== 6) {
      throw new Error(`Row ${index + 1} has ${cells.length} cells; expected 6`);
    }
    const first = stripAnchor(cells[0]);
    if (!first.id) {
      throw new Error(`Row ${index + 1} is missing an HTML anchor id`);
    }
    if (ids.has(first.id)) {
      throw new Error(`Duplicate claim id ${first.id}`);
    }
    ids.add(first.id);
    const currentStatus = cells[5];
    if (!ALLOWED_STATUS.has(currentStatus)) {
      throw new Error(`Row ${index + 1} has invalid status ${currentStatus}`);
    }
    entries.push({
      id: first.id,
      claim_family: first.text,
      corpus_locus: cells[1],
      permitted_formulation: cells[2],
      required_burden: cells[3],
      primary_falsifier: cells[4],
      current_status: currentStatus
    });
  });
  return entries;
}

function run() {
  const markdown = fs.readFileSync(LEDGER_PATH, "utf8");
  const entries = parseLedger(markdown);
  if (entries.length < 10) {
    throw new Error(`Expected at least 10 claim entries, found ${entries.length}`);
  }
  const snapshot = {
    schema_version: "1.0.0",
    generated_at: "deterministic-from-source",
    source: "docs/THEORY_CLAIM_LEDGER.md",
    source_sha256: crypto.createHash("sha256").update(markdown).digest("hex"),
    status_boundary: "Machine-readable claim ledger snapshot only; does not promote claims.",
    entries
  };
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`Wrote docs/reports/CLAIM_LEDGER_SNAPSHOT.json with ${entries.length} entries.`);
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`Claim ledger extraction failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { parseLedger };
