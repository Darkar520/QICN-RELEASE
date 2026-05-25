const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TERMS = [
  "phenomenal consciousness",
  "proof of consciousness",
  "identity transfer",
  "personal identity",
  "moral status",
  "human equivalence",
  "biological life equivalence",
  "external validation",
  "WCAG AAA",
  "monolithic compilation certification",
  "phenomenality",
  "consciousness"
];

const SKIP_FILES = new Set([
  "docs/NON_CLAIM_LEDGER_CANONICAL.md",
  "docs/PREDICTION_REGISTRY_v1.json",
  "docs/reports/CORPUS_HEALTH_REPORT.md"
]);

const SKIP_PREFIXES = [
  "docs/AUDIT_",
  "docs/CODEX_PROMPT_",
  "docs/PLAN_IMPLEMENTACION_",
  "docs/reports/FCR_",
  "docs/reports/THEOREM_ATLAS.md"
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!["node_modules", "build_logs", ".git"].includes(entry.name)) {
        walk(fullPath, out);
      }
    } else if (/\.(md|tex)$/i.test(entry.name)) {
      out.push(fullPath);
    }
  });
  return out;
}

function rel(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, "/");
}

function isSkipped(relativePath) {
  return SKIP_FILES.has(relativePath) || SKIP_PREFIXES.some((prefix) => relativePath.startsWith(prefix));
}

function isQuotedOrTableBoundary(line, index, term) {
  const before = line.slice(0, index);
  const after = line.slice(index + term.length);
  return /[`"']$/.test(before.trimEnd()) && /^[`"']/.test(after.trimStart());
}

function isAllowedContext(line, index, term, combinedContext) {
  const lower = line.toLowerCase();
  const windowStart = Math.max(0, index - 90);
  const windowEnd = Math.min(line.length, index + term.length + 90);
  const context = `${combinedContext} ${line.slice(windowStart, windowEnd)}`.toLowerCase();

  if (/^\s*>/.test(line)) return true;
  if (/^\s*\\(sub)?section\{relation to .*theories\}/i.test(line)) return true;
  if (isQuotedOrTableBoundary(line, index, term)) return true;
  if (/(does not|do not|did not|not|no|nothing|without|weaker than|blocked|prohibited|cannot|must not|should not|refuses|remains open|not settled|does not settle|not license|not licensed|not infer|not inferred|outside the mathematical scope|boundary|non-claim|non claim|no permission|no theorem|no proof|not proof|not evidence|not external|internal support only|what remains open|would be required|required before escalation|if one wanted to move|strictly weaker|downgrade)/.test(context)) return true;
  if (term === "consciousness" && (lower.includes("operational consciousness") || lower.includes("operational class of consciousness") || lower.includes("consciousness class") || lower.includes("consciousness margin") || lower.includes("consciousness burden") || lower.includes("life and consciousness") || lower.includes("consciousness}_{\\mathrm{op}") || lower.includes("\\cop"))) return true;
  if (term === "phenomenality" && (lower.includes("not phenomenality") || lower.includes("does not prove phenomenality"))) return true;
  if (term === "external validation" && (lower.includes("internal support") || lower.includes("external-validation") || lower.includes("external validation boundary"))) return true;
  return false;
}

function scanFile(filePath) {
  const relativePath = rel(filePath);
  if (isSkipped(relativePath)) return [];
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const violations = [];

  lines.forEach((line, lineIndex) => {
    const combinedContext = [
      lines[lineIndex - 5] || "",
      lines[lineIndex - 4] || "",
      lines[lineIndex - 3] || "",
      lines[lineIndex - 2] || "",
      lines[lineIndex - 1] || "",
      line,
      lines[lineIndex + 1] || "",
      lines[lineIndex + 2] || ""
    ].join(" ");
    TERMS.forEach((term) => {
      const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      let match;
      while ((match = regex.exec(line)) !== null) {
        if (!isAllowedContext(line, match.index, term.toLowerCase(), combinedContext)) {
          violations.push({
            file: relativePath,
            line: lineIndex + 1,
            column: match.index + 1,
            term,
            context: line.trim()
          });
        }
      }
    });
  });

  return violations;
}

function run() {
  const files = [
    ...walk(path.join(ROOT, "docs")),
    ...walk(path.join(ROOT, "basecore")),
    ...walk(path.join(ROOT, "paper1")),
    ...walk(path.join(ROOT, "paper2")),
    ...walk(path.join(ROOT, "paper3")),
    ...walk(path.join(ROOT, "paper4")),
    ...walk(path.join(ROOT, "paper5_operational_consciousness")),
    ...walk(path.join(ROOT, "paper6_predictions_falsation")),
    ...walk(path.join(ROOT, "paper7_operational_life_subjecthood")),
    ...walk(path.join(ROOT, "paper8_first_person_subjectivity")),
    ...walk(path.join(ROOT, "paper9_phenomenal_bridge_organization")),
    ...walk(path.join(ROOT, "paper10_external_adjudication")),
    ...walk(path.join(ROOT, "paper_bridge_operational_subjecthood"))
  ];
  const violations = files.flatMap(scanFile);
  if (violations.length > 0) {
    console.error("# Non-Claim Lint");
    console.error("");
    violations.forEach((v) => {
      console.error(`${v.file}:${v.line}:${v.column}: ${v.term} [${v.context}]`);
    });
    console.error("");
    console.error(`${violations.length} violation(s).`);
    return 1;
  }
  console.log("Non-claim lint: 0 violations.");
  return 0;
}

if (require.main === module) {
  process.exit(run());
}

module.exports = { run, scanFile };
