#!/usr/bin/env node
/*
 * v27 operational term promotion audit.
 *
 * This is a lexical governance gate, not a semantic proof checker. v27 adds
 * abbreviation protection, code/math spans, clause splitting, and disclaimer
 * propagation over adjacent sentences.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs", "reports", "OPERATIONAL_TERM_PROMOTION_AUDIT_v27.json");
const GOVERNANCE = "This v27 promotion audit checks local language-boundary hygiene only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.";
const ABBREVIATIONS = ["Dr.", "Mr.", "Mrs.", "Ms.", "Prof.", "Fig.", "Eq.", "Ref.", "Refs.", "vs.", "etc.", "i.e.", "e.g.", "et al."];
const PROMOTION = /\b(proves?|proof of|demonstrates?|demonstration of|certifies?|validates?|establishes?|confirms?|shows external support|supports consciousness|identity transfer|phenomenality confirmed|bridge burden closed)\b/i;
const BOUNDARY = /\b(does not|do not|not a|not evidence|non-claim|nonclaim|internal diagnostic|synthetic only|governance boundary|cannot certify|does not certify|cannot prove|cannot by itself|not external|conditional|provisional|open burden|blocked|requires external|no human review)\b/i;
const TARGETS = [
  "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
  "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json",
  "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
  "docs/reports/THRESHOLD_NULL_CALIBRATION_v27.json",
  "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
  "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27.json",
  "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
  "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
  "docs/fixtures/TRUSTED_KEYS_REGISTRY_v27.json",
  "scripts/external-session-zero-adjudicator-v27.js",
  "scripts/calibrate-session-zero-thresholds-v27.js",
  "scripts/verify-human-veto-signature-v27.js"
];

function repoPath(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function protectSpans(text) {
  const spans = [];
  const stash = (match) => {
    const token = `@@SPAN_${spans.length}@@`;
    spans.push([token, match]);
    return token;
  };
  let out = text.replace(/`[^`]*`/g, stash).replace(/\$[^$]*\$/g, stash);
  for (const abbr of ABBREVIATIONS) out = out.replaceAll(abbr, abbr.replaceAll(".", "@@DOT@@"));
  return { text: out, spans };
}

function restore(text, spans) {
  let out = text.replaceAll("@@DOT@@", ".");
  for (const [token, value] of spans) out = out.replaceAll(token, value);
  return out;
}

function splitSentences(text) {
  const protectedText = protectSpans(text);
  const raw = protectedText.text
    .replace(/\r\n/g, "\n")
    .split(/(?<=[.!?])\s+|\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return raw.map((sentence) => restore(sentence, protectedText.spans));
}

function splitClauses(sentence) {
  return sentence.split(/\s*(?:;|--|—)\s*/).map((clause) => clause.trim()).filter(Boolean);
}

function scanFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const sentences = splitSentences(text);
  const sentenceBoundary = sentences.map((sentence) => BOUNDARY.test(sentence));
  const propagatedBoundary = sentenceBoundary.map((value, index) => value || sentenceBoundary[index - 1] || sentenceBoundary[index + 1] || false);
  const findings = [];
  sentences.forEach((sentence, sentenceIndex) => {
    const clauses = splitClauses(sentence);
    clauses.forEach((clause, clauseIndex) => {
      const hasPromotion = PROMOTION.test(clause);
      const hasLocalBoundary = BOUNDARY.test(clause);
      const hasAdjacentSentenceBoundary = sentenceBoundary[sentenceIndex - 1] || sentenceBoundary[sentenceIndex + 1] || false;
      const hasEffectiveBoundary = hasLocalBoundary || (clauses.length === 1 ? propagatedBoundary[sentenceIndex] : hasAdjacentSentenceBoundary);
      if (hasPromotion && !hasEffectiveBoundary) {
        findings.push({
          file: repoPath(filePath),
          sentence_index: sentenceIndex,
          clause_index: clauseIndex,
          scope: clauses.length > 1 ? "clause" : "sentence",
          excerpt: clause.slice(0, 240)
        });
      }
    });
  });
  return { sentences: sentences.length, findings };
}

function runSelfTests() {
  const examples = [
    {
      name: "abbreviation_et_al_not_sentence_split",
      text: "Smith et al. report an internal diagnostic. It does not certify external support.",
      expectSentences: 2
    },
    {
      name: "semicolon_promotion_not_immunized_by_same_sentence_boundary",
      text: "QICN demonstrates identity transfer; this conditional result does not certify consciousness.",
      expectFindings: 1
    },
    {
      name: "adjacent_boundary_propagates",
      text: "This is an internal diagnostic only. QICN demonstrates operational stability. It does not certify external support.",
      expectFindings: 0
    }
  ];
  return examples.map((example) => {
    const sentences = splitSentences(example.text);
    let findings = [];
    const tmp = path.join(ROOT, "docs", "reports", `.tmp_${example.name}.txt`);
    fs.mkdirSync(path.dirname(tmp), { recursive: true });
    fs.writeFileSync(tmp, example.text, "utf8");
    try {
      findings = scanFile(tmp).findings;
    } finally {
      fs.unlinkSync(tmp);
    }
    const sentenceOk = example.expectSentences === undefined || sentences.length === example.expectSentences;
    const findingOk = example.expectFindings === undefined || findings.length === example.expectFindings;
    return { name: example.name, pass: sentenceOk && findingOk, sentences: sentences.length, findings: findings.length };
  });
}

function main() {
  const scans = [];
  const findings = [];
  for (const rel of TARGETS) {
    const filePath = path.join(ROOT, rel);
    if (!fs.existsSync(filePath)) continue;
    const scan = scanFile(filePath);
    scans.push({ file: rel, sentences: scan.sentences, findings: scan.findings.length });
    findings.push(...scan.findings);
  }
  const self_tests = runSelfTests();
  const report = {
    schema_version: "2.0.0",
    generated_at: "2026-05-27",
    governance_boundary: GOVERNANCE,
    sentence_segmentation_method: "abbreviation_protected_math_code_aware_sentence_split_plus_semicolon_and_dash_clause_scan",
    disclaimer_propagation_window: 1,
    target_count: scans.length,
    scans,
    self_tests,
    findings,
    result: findings.length === 0 && self_tests.every((test) => test.pass) ? "PASS" : "FAIL",
    external_support_certified: false
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(OUT.replace(/\.json$/, ".md"), `# Operational Term Promotion Audit v27\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Findings: ${findings.length}\n- Self tests passed: ${self_tests.filter((t) => t.pass).length}/${self_tests.length}\n`, "utf8");
  console.log(`Operational term promotion audit v27: ${report.result}; findings=${findings.length}; self_tests=${self_tests.filter((t) => t.pass).length}/${self_tests.length}`);
  if (report.result !== "PASS") process.exit(1);
}

if (require.main === module) main();

module.exports = { splitSentences, splitClauses, scanFile, runSelfTests };
