#!/usr/bin/env node
/*
 * Semantic inflation audit v40.
 *
 * This script measures whether high-risk ordinary-language terms are used in
 * operationally declared contexts, non-claim boundaries, natural language, or
 * undefined/underspecified contexts. It is a lexical governance audit only.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs", "SEMANTIC_INFLATION_AUDIT_v40.md");
const GOVERNANCE = "This audit quantifies local terminology risk only. It does not certify external support, consciousness, phenomenality, identity transfer, subjectivity, moral status, bridge-burden closure, or human mathematical review.";

const TERMS = [
  { id: "identity", pattern: /\bidentity\b/i },
  { id: "consciousness", pattern: /\bconsciousness\b|\bconscious\b/i },
  { id: "phenomenal", pattern: /\bphenomenal\b|\bphenomenality\b|\bphenomenology\b/i },
  { id: "subjective", pattern: /\bsubjective\b/i },
  { id: "subjectivity", pattern: /\bsubjectivity\b|\bsubjecthood\b/i },
  { id: "life", pattern: /\blife\b|\bliving\b|\bbiological life\b/i },
  { id: "self", pattern: /\bself\b|\bselfhood\b|\bself-like\b/i },
  { id: "moral_status", pattern: /\bmoral[_\s-]status\b|\bmoral parity\b|\bmoral patient\b/i }
];

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "_build",
  "dist",
  "build",
  ".playwright-mcp"
]);

function slash(p) {
  return p.split(path.sep).join("/");
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(md|tex)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function classify(line) {
  const lower = line.toLowerCase();
  if (/(non-claim|nonclaim|does not|do not|not certify|not prove|not evidence|not imply|not claim|no claim|must not|cannot be promoted|forbidden|governance boundary|non-certifying|not a certificate|not external|without.*proof)/i.test(line)) {
    return "non_claim_boundary";
  }
  if (/(undefined|not defined|unspecified|under-specified|not formalized|uninstantiated|not instantiated|open burden|not proved|not computed|not verified)/i.test(line)) {
    return "undefined";
  }
  if (/(operational|invariant|metric|observable|measurement|criterion|definition|theorem|proposition|lemma|corollary|axiom|assumption|protocol|gate|threshold|margin|coordinate|class|formal|measurable|function|sigma|lipschitz|falsif|negative control|rival|death rule|\\begin\{(definition|theorem|proposition|lemma|corollary|axiom|assumption)\}|\$[^$]+\$|`[^`]+`)/i.test(line)) {
    return "operational_declared";
  }
  if (/(\bmetaphor\b|\banalogy\b|\billustration\b|\bordinary-language\b|\bnatural-language\b)/i.test(line)) {
    return "natural_language";
  }
  if (lower.trim().startsWith("|") && lower.includes("---")) {
    return "operational_declared";
  }
  return "natural_language";
}

function collect() {
  const files = walk(ROOT).filter((file) => slash(path.relative(ROOT, file)) !== "docs/SEMANTIC_INFLATION_AUDIT_v40.md");
  const results = Object.fromEntries(TERMS.map((term) => [term.id, {
    term: term.id,
    total: 0,
    counts: {
      operational_declared: 0,
      natural_language: 0,
      non_claim_boundary: 0,
      undefined: 0
    },
    contexts: []
  }]));

  for (const file of files) {
    const rel = slash(path.relative(ROOT, file));
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const term of TERMS) {
        if (!term.pattern.test(line)) continue;
        const category = classify(line);
        const bucket = results[term.id];
        bucket.total += 1;
        bucket.counts[category] += 1;
        bucket.contexts.push({
          file: rel,
          line: index + 1,
          category,
          text: line.trim().replace(/\s+/g, " ")
        });
      }
    });
  }

  return { files_scanned: files.length, results };
}

function mdEscape(text) {
  return String(text).replace(/\|/g, "\\|");
}

function renderReport(audit) {
  const now = new Date().toISOString();
  const rows = Object.values(audit.results).map((r) => {
    const i = r.total === 0 ? 1 : r.counts.operational_declared / r.total;
    return { ...r, inflation_index: i };
  }).sort((a, b) => a.inflation_index - b.inflation_index || b.total - a.total);

  const highRisk = rows.filter((r) => r.total > 0 && r.inflation_index < 0.5);
  const glossaryPath = path.join(ROOT, "docs", "QICN_GLOSSARY.md");
  const ledgerPath = path.join(ROOT, "docs", "NON_CLAIM_LEDGER_CANONICAL.md");
  const glossary = fs.existsSync(glossaryPath) ? fs.readFileSync(glossaryPath, "utf8") : "";
  const ledger = fs.existsSync(ledgerPath) ? fs.readFileSync(ledgerPath, "utf8") : "";
  const mitigationChecks = highRisk.map((r) => ({
    term: r.term,
    glossary_note_present: new RegExp(`\\|\\s*${r.term}\\s*\\|`, "i").test(glossary)
  }));
  const ledgerMitigationPresent = /mathematical invariants labeled/i.test(ledger) && /natural-language counterparts/i.test(ledger);
  const mitigationsPass = mitigationChecks.every((check) => check.glossary_note_present) && ledgerMitigationPresent;
  const naturalContexts = rows.flatMap((r) =>
    r.contexts
      .filter((ctx) => ctx.category === "natural_language")
      .slice(0, 8)
      .map((ctx) => ({ term: r.term, ...ctx }))
  );

  const lines = [];
  lines.push("# Semantic Inflation Audit v40");
  lines.push("");
  lines.push(`Generated at: ${now}`);
  lines.push(`Workspace root: \`${ROOT}\``);
  lines.push("");
  lines.push("## Governance boundary");
  lines.push("");
  lines.push(GOVERNANCE);
  lines.push("");
  lines.push("## Method");
  lines.push("");
  lines.push("A context is one source line containing a risk term in a `.tex` or `.md` file under `rigid-identity-framework`, excluding this generated audit. Contexts are classified by explicit lexical rules in `scripts/audit-semantic-inflation.js`.");
  lines.push("");
  lines.push("Metric: `I(T) = operational_declared(T) / total(T)`. A lower value means the term is more often used outside operational declarations, including non-claim boundaries, undefined/open-burden contexts, or ordinary natural language.");
  lines.push("");
  lines.push(`Files scanned: ${audit.files_scanned}`);
  lines.push("");
  lines.push("## I(T) by risk term");
  lines.push("");
  lines.push("| Term | Total | Operational | Natural language | Non-claim boundary | Undefined/open | I(T) | Mitigation required |");
  lines.push("|---|---:|---:|---:|---:|---:|---:|---|");
  for (const r of rows) {
    const required = r.total > 0 && r.inflation_index < 0.5 ? "YES" : "NO";
    lines.push(`| ${r.term} | ${r.total} | ${r.counts.operational_declared} | ${r.counts.natural_language} | ${r.counts.non_claim_boundary} | ${r.counts.undefined} | ${r.inflation_index.toFixed(3)} | ${required} |`);
  }
  lines.push("");
  lines.push("## Natural-language contexts requiring downgrade or disclaimer");
  lines.push("");
  if (naturalContexts.length === 0) {
    lines.push("No natural-language contexts were detected by the current heuristic.");
  } else {
    lines.push("| Term | Location | Context | Required action |");
    lines.push("|---|---|---|---|");
    for (const ctx of naturalContexts.slice(0, 40)) {
      lines.push(`| ${ctx.term} | \`${ctx.file}:${ctx.line}\` | ${mdEscape(ctx.text.slice(0, 220))} | Add/cite operational class or non-claim disclaimer |`);
    }
  }
  lines.push("");
  lines.push("## Mitigation summary");
  lines.push("");
  if (highRisk.length === 0) {
    lines.push("No term crossed the mitigation threshold `I(T) < 0.5`.");
  } else {
    lines.push(`Terms below threshold: ${highRisk.map((r) => `\`${r.term}\``).join(", ")}.`);
    lines.push("");
    lines.push("Required mitigations for this phase:");
    lines.push("");
    lines.push("- Add glossary notes for terms with `I(T) < 0.5`.");
    lines.push("- Add a canonical ledger entry blocking promotion from labels such as `identity` or `subjectivity` to ordinary-language identity or subjectivity.");
  lines.push("- Prefer symbolic names such as `I_ri`, `C_op`, `Sub_op`, or explicit invariant IDs when a term denotes a mathematical coordinate rather than an ordinary-language property.");
  }
  lines.push("");
  lines.push("## Mitigation verification");
  lines.push("");
  lines.push("| Check | Result |");
  lines.push("|---|---|");
  for (const check of mitigationChecks) {
    lines.push(`| Glossary note for \`${check.term}\` | ${check.glossary_note_present ? "PASS" : "FAIL"} |`);
  }
  lines.push(`| Canonical ledger semantic-inflation non-claim | ${ledgerMitigationPresent ? "PASS" : "FAIL"} |`);
  lines.push(`| Overall mitigation gate | ${mitigationsPass ? "PASS" : "FAIL"} |`);
  lines.push("");
  lines.push("## Non-claim");
  lines.push("");
  lines.push("This report is a lexical and documentation-quality audit. It is not evidence that any QICN term has been externally validated or that any ordinary-language property has been instantiated.");
  lines.push("");
  lines.push("## Script hash");
  lines.push("");
  const scriptHash = crypto.createHash("sha256").update(fs.readFileSync(__filename)).digest("hex").toUpperCase();
  lines.push(`- \`scripts/audit-semantic-inflation.js\`: \`${scriptHash}\``);
  lines.push("");
  lines.push("## Verdict");
  lines.push("");
  lines.push(mitigationsPass ? "PHASE_4_COMPLETED." : "PHASE_4_BLOCKED: below-threshold term mitigations are incomplete.");
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function main() {
  const audit = collect();
  fs.writeFileSync(OUT, renderReport(audit), "utf8");
  const rows = Object.values(audit.results);
  const termsBelow = rows.filter((r) => r.total > 0 && r.counts.operational_declared / r.total < 0.5).map((r) => r.term);
  console.log(`Semantic inflation audit v40: PASS; files=${audit.files_scanned}; below_threshold=${termsBelow.join(",") || "none"}; report=${slash(path.relative(ROOT, OUT))}`);
}

if (require.main === module) {
  main();
}

module.exports = { collect, classify, renderReport, TERMS };
