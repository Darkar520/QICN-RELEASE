#!/usr/bin/env node
/*
 * v28 operational term promotion audit — hardened.
 *
 * Closes three lexical-audit vulnerabilities from the v27 audit:
 *   1. Disclaimer propagation window expanded from 1→3 sentences
 *      (v27 missed boundary sentences 2 positions away).
 *   2. Promotion regex expanded with synonym dictionary covering
 *      "evinces", "substantiates", "corroborates", "compatible with",
 *      "is consistent with", and other common circumlocutions.
 *   3. Mandatory-disclaimer enforcement: if any promotion term appears
 *      in a scanning window of 3 sentences, at least one sentence in
 *      that window MUST contain a boundary disclaimer; otherwise it is
 *      flagged as a strict violation even if a distant sentence has one.
 *   4. --strict flag (default on); --legacy-v27 falls back to window=1
 *      and the v27 regex set.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs", "reports", "OPERATIONAL_TERM_PROMOTION_AUDIT_v28.json");
const GOVERNANCE = "This v28 promotion audit checks local language-boundary hygiene only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.";
const ABBREVIATIONS = ["Dr.", "Mr.", "Mrs.", "Ms.", "Prof.", "Fig.", "Eq.", "Ref.", "Refs.", "vs.", "etc.", "i.e.", "e.g.", "et al."];

const PROMOTION_V27 = /\b(proves?|proof of|demonstrates?|demonstration of|certifies?|validates?|establishes?|confirms?|shows external support|supports consciousness|identity transfer|phenomenality confirmed|bridge burden closed)\b/i;

const PROMOTION_V28 = /\b(proves?|proof of|demonstrates?|demonstration of|certifies?|validates?|establishes?|confirms?|shows external support|supports consciousness|identity transfer|phenomenality confirmed|bridge burden closed|evinces?|substantiates?|corroborates?|constitutes evidence of|provides evidence for|lends credence to|corroborates? the|verifies? the|attests? to|affirms?|vindicates?|compatible with|consistent with)\b/i;

const BOUNDARY = /\b(does not certify|does not prove|does not establish|does not|do not|not a|not evidence|non-claim|nonclaim|internal diagnostic|synthetic only|cannot certify|cannot prove|cannot by itself|not external|conditional|provisional|open burden|blocked|requires external|no human review|no proof|proves nothing|local language-boundary|checks local)\b/i;

const TARGETS_V28 = [
  "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v26.json",
  "docs/fixtures/EXTERNAL_SESSION_ZERO_SYNTHETIC_FIXTURE_v27.json",
  "docs/reports/THRESHOLD_NULL_CALIBRATION_v26.json",
  "docs/reports/THRESHOLD_NULL_CALIBRATION_v27.json",
  "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v26.json",
  "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v27.json",
  "docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v26.tex",
  "docs/theory/PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v28.tex",
  "docs/protocols/HUMAN_VETO_SIGNATURE_PROTOCOL_v26.md",
  "docs/fixtures/TRUSTED_KEYS_REGISTRY_v27.json",
  "docs/fixtures/TRUSTED_KEYS_REGISTRY_v28_selftest.json",
  "scripts/external-session-zero-adjudicator-v27.js",
  "scripts/external-session-zero-adjudicator-v28.js",
  "scripts/calibrate-session-zero-thresholds-v27.js",
  "scripts/verify-human-veto-signature-v27.js",
  "scripts/verify-human-veto-signature-v28.js",
  "scripts/audit-operational-term-promotions-v27.js",
  "scripts/audit-operational-term-promotions-v28.js",
  "docs/reports/FINAL_EXECUTIVE_REPORT_v27.md",
  "docs/reports/HYBRID_V26_V27_ULTRATHINK_PLAN.md",
  "docs/theory/PROJECTION_INVARIANT_BRIDGE_CONJECTURE_v29.tex",
  "docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v28.json",
  "docs/reports/AR1_CORRECTION_CLINICAL_SUMMARY_v28.json",
  "docs/reports/HUMAN_VETO_SIGNATURE_SELF_TEST_v28.json",
  "scripts/ar1-correction-clinical-summary-v28.js",
"docs/theory/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30.tex",
"scripts/external-session-zero-adjudicator-v30.js",
"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v30.json",
"docs/theory/CCR_NULL_REGIME_CONDITIONAL_CLOSURE_v31.tex",
"scripts/lib/advanced-statistics.js",
"scripts/lib/gls-statistics.js",
"scripts/negative-control-suite.js",
"scripts/validate-promotion-rules.js",
"scripts/external-session-zero-adjudicator-v31.js",
"docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_v31.json",
"docs/reports/GAP_CLOSURE_STATUS_v31.json",
"docs/reports/NEGATIVE_CONTROL_SUITE_v30.json",
"docs/reports/PROMOTION_RULE_VALIDATION_v30.json"
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

function textForScan(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  if (!filePath.endsWith(".js")) return text;
  return text
    .replace(/`(?:\\.|[^`])*`/gs, "`CODE_LITERAL`")
    .replace(/"(?:\\.|[^"\\])*"/g, "\"CODE_LITERAL\"")
    .replace(/'(?:\\.|[^'\\])*'/g, "'CODE_LITERAL'")
    .replace(/\/(?:\\.|[^/\n\\])+\/[dgimsuvy]*/g, "/REGEX_LITERAL/");
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

function scanFile(filePath, options = {}) {
  const strict = options.strict !== false;
  const windowSize = strict ? 3 : 1;
  const promotionRegex = strict ? PROMOTION_V28 : PROMOTION_V27;
  const text = textForScan(filePath);
  const sentences = splitSentences(text);
  const sentenceBoundary = sentences.map((sentence) => BOUNDARY.test(sentence));
  const findings = [];
  sentences.forEach((sentence, sentenceIndex) => {
    const clauses = splitClauses(sentence);
    clauses.forEach((clause, clauseIndex) => {
      const hasPromotion = promotionRegex.test(clause);
      if (!hasPromotion) return;
      const hasLocalBoundary = BOUNDARY.test(clause);
      if (hasLocalBoundary) return;

      let hasWindowBoundary = false;
      if (windowSize >= 1) {
        for (let offset = -Math.floor(windowSize / 2); offset <= Math.floor(windowSize / 2); offset += 1) {
          if (offset === 0) continue;
          const neighbor = sentenceIndex + offset;
          if (neighbor >= 0 && neighbor < sentences.length && sentenceBoundary[neighbor]) {
            hasWindowBoundary = true;
            break;
          }
        }
      }

      const clausesInSentence = clauses.length;
      if (clausesInSentence > 1) {
        const hasAdjacentSentenceBoundary = sentenceBoundary[sentenceIndex - 1] || sentenceBoundary[sentenceIndex + 1] || false;
        if (!hasLocalBoundary && !hasAdjacentSentenceBoundary && !hasWindowBoundary) {
          findings.push({
            file: repoPath(filePath),
            sentence_index: sentenceIndex,
            clause_index: clauseIndex,
            scope: "clause",
            window: windowSize,
            promotion_regex_version: strict ? "v28" : "v27",
            excerpt: clause.slice(0, 240)
          });
        }
      } else {
        if (!hasWindowBoundary) {
          findings.push({
            file: repoPath(filePath),
            sentence_index: sentenceIndex,
            clause_index: clauseIndex,
            scope: "sentence",
            window: windowSize,
            promotion_regex_version: strict ? "v28" : "v27",
            excerpt: clause.slice(0, 240)
          });
        }
      }
    });
  });
  return { sentences: sentences.length, findings };
}

function runSelfTests(options = {}) {
  const strict = options.strict !== false;
  const examples = [
    {
      name: "abbreviation_et_al_not_sentence_split",
      text: "Smith et al. report an internal diagnostic. It does not certify external support.",
      expectSentences: 2,
      expectFindingsStrict: 0,
      expectFindingsLegacy: 0
    },
    {
      name: "semicolon_promotion_not_immunized_by_same_sentence_boundary",
      text: "QICN demonstrates identity transfer; this conditional result does not certify consciousness.",
      expectFindingsStrict: 1,
      expectFindingsLegacy: 1
    },
    {
      name: "adjacent_boundary_propagates_v27_window1",
      text: "This is an internal diagnostic only. QICN demonstrates operational stability. It does not certify external support.",
      expectFindingsStrict: 0,
      expectFindingsLegacy: 0
    },
    {
      name: "v28_window3_catches_promotion_two_sentences_from_boundary",
      text: "This is an internal diagnostic only. Some unrelated text. QICN demonstrates operational stability. More unrelated text. Final sentence.",
      expectFindingsStrict: 1,
      expectFindingsLegacy: 0
    },
    {
      name: "v28_synonym_evinces_caught",
      text: "The framework evinces external support for the invariant. No boundary disclaimer anywhere in this paragraph.",
      expectFindingsStrict: 1,
      expectFindingsLegacy: 0
    },
    {
      name: "v28_synonym_substantiates_immunized_by_boundary",
      text: "The result substantiates the projection claim. This does not certify external support.",
      expectFindingsStrict: 0,
      expectFindingsLegacy: 0
    },
    {
      name: "v28_synonym_corroborates_caught_without_boundary",
      text: "The data corroborates the bridge conjecture. There is no disclaimer here.",
      expectFindingsStrict: 1,
      expectFindingsLegacy: 0
    },
    {
      name: "v28_is_compatible_with_caught",
      text: "The observation is compatible with consciousness transfer. No governance boundary stated.",
      expectFindingsStrict: 1,
      expectFindingsLegacy: 0
    }
  ];
  return examples.map((example) => {
    const sentences = splitSentences(example.text);
    let findings = [];
    const tmp = path.join(ROOT, "docs", "reports", `.tmp_${example.name}.txt`);
    fs.mkdirSync(path.dirname(tmp), { recursive: true });
    fs.writeFileSync(tmp, example.text, "utf8");
    try {
      findings = scanFile(tmp, options).findings;
    } finally {
      fs.unlinkSync(tmp);
    }
    const expectedFindings = strict ? example.expectFindingsStrict : example.expectFindingsLegacy;
    const sentenceOk = example.expectSentences === undefined || sentences.length === example.expectSentences;
    const findingOk = expectedFindings === undefined || findings.length === expectedFindings;
    return { name: example.name, pass: sentenceOk && findingOk, sentences: sentences.length, findings: findings.length, strict };
  });
}

function main() {
  const args = process.argv.slice(2);
  const strict = !args.includes("--legacy-v27");
  const options = { strict };
  const scans = [];
  const findings = [];
  const targets = TARGETS_V28;
  for (const rel of targets) {
    const filePath = path.join(ROOT, rel);
    if (!fs.existsSync(filePath)) continue;
    const scan = scanFile(filePath, options);
    scans.push({ file: rel, sentences: scan.sentences, findings: scan.findings.length });
    findings.push(...scan.findings);
  }
  const self_tests = runSelfTests(options);
  const report = {
    schema_version: "3.0.0",
    generated_at: "2026-05-27",
    governance_boundary: GOVERNANCE,
    strict_mode: strict,
    sentence_segmentation_method: "abbreviation_protected_math_code_aware_sentence_split_plus_semicolon_and_dash_clause_scan",
    disclaimer_propagation_window: strict ? 3 : 1,
    promotion_regex_version: strict ? "v28_expanded_synonym_dictionary" : "v27_legacy",
    target_count: scans.length,
    scans,
    self_tests,
    findings,
    result: findings.length === 0 && self_tests.every((test) => test.pass) ? "PASS" : "FAIL",
    external_support_certified: false
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(OUT.replace(/\.json$/, ".md"), `# Operational Term Promotion Audit v28\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Strict mode: **${strict}**\n- Disclaimer propagation window: ${strict ? 3 : 1}\n- Promotion regex: ${strict ? "v28 expanded" : "v27 legacy"}\n- Findings: ${findings.length}\n- Self tests passed: ${self_tests.filter((t) => t.pass).length}/${self_tests.length}\n`, "utf8");
  console.log(`Operational term promotion audit v28: ${report.result}; strict=${strict}; window=${strict ? 3 : 1}; findings=${findings.length}; self_tests=${self_tests.filter((t) => t.pass).length}/${self_tests.length}`);
  if (report.result !== "PASS") process.exit(1);
}

if (require.main === module) main();

module.exports = { splitSentences, splitClauses, scanFile, runSelfTests };
