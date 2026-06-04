#!/usr/bin/env node
/*
 * Validator for the operational term-promotion rules.
 *
 * The validator checks that the hardened lexical audit has regression tests
 * for abbreviations, semicolon bypasses, synonym promotions, and local
 * disclaimer propagation. It does not validate scientific claims.
 */

const fs = require("fs");
const path = require("path");
const { runSelfTests } = require("./audit-operational-term-promotions-v28");

const ROOT = path.resolve(__dirname, "..");
const AUDIT_SCRIPT = path.join(ROOT, "scripts", "audit-operational-term-promotions-v28.js");
const OUT = path.join(ROOT, "docs", "reports", "PROMOTION_RULE_VALIDATION_v30.json");
const GOVERNANCE = "This promotion-rule validation checks local language-boundary tooling only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human review.";

function sourceContains(pattern) {
  return pattern.test(fs.readFileSync(AUDIT_SCRIPT, "utf8"));
}

function generate() {
  const selfTests = runSelfTests({ strict: true });
  const sourceChecks = [
    {
      id: "abbreviation_protection",
      pass: sourceContains(/ABBREVIATIONS/)
    },
    {
      id: "semicolon_clause_scan",
      pass: sourceContains(/splitClauses/) && sourceContains(/;\|--/)
    },
    {
      id: "expanded_synonym_dictionary",
      pass: sourceContains(/evinces\?/) && sourceContains(/consistent with/)
    },
    {
      id: "disclaimer_window_three",
      pass: sourceContains(/windowSize = strict \? 3 : 1/)
    },
    {
      id: "v30_targets_included",
      pass: sourceContains(/PROJECTION_INVARIANT_BRIDGE_THEOREM_v30/) && sourceContains(/external-session-zero-adjudicator-v30/)
    }
  ];
  const report = {
    schema_version: "1.0.0",
    generated_at: "2026-05-29",
    governance_boundary: GOVERNANCE,
    audit_script: path.relative(ROOT, AUDIT_SCRIPT).split(path.sep).join("/"),
    source_checks: sourceChecks,
    self_tests: selfTests,
    result: sourceChecks.every((check) => check.pass) && selfTests.every((test) => test.pass) ? "PASS" : "FAIL",
    external_support_certified: false
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(OUT.replace(/\.json$/, ".md"), `# Promotion Rule Validation v30\n\n${GOVERNANCE}\n\n- Result: **${report.result}**\n- Source checks passed: ${sourceChecks.filter((check) => check.pass).length}/${sourceChecks.length}\n- Self tests passed: ${selfTests.filter((test) => test.pass).length}/${selfTests.length}\n`, "utf8");
  return report;
}

if (require.main === module) {
  const report = generate();
  console.log(`Promotion-rule validation v30: ${report.result}; source_checks=${report.source_checks.filter((check) => check.pass).length}/${report.source_checks.length}; self_tests=${report.self_tests.filter((test) => test.pass).length}/${report.self_tests.length}`);
  if (report.result !== "PASS") process.exit(1);
}

module.exports = { generate };
