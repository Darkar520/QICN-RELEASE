#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { readJson, writeJson, validateFiniteSeparatorPackage } = require("./lib/finite-separator-incidence");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_POSITIVE = path.join(ROOT, "docs", "theory", "FINITE_SEPARATOR_COMPLETE_PACKAGE_v22.json");
const DEFAULT_NEGATIVE = path.join(ROOT, "docs", "theory", "FINITE_SEPARATOR_COMPLETE_PACKAGE_PRODUCT_NEGATIVE_CONTROL_v22.json");
const OUT_JSON = path.join(ROOT, "docs", "reports", "FINITE_SEPARATOR_COMPLETE_PACKAGE_v22_AUDIT.json");
const OUT_MD = path.join(ROOT, "docs", "reports", "FINITE_SEPARATOR_COMPLETE_PACKAGE_v22_REPORT.md");

function markdownReport(report) {
  const p = report.positive;
  const n = report.negative_control;
  const lines = [
    "# Finite Separator-Complete Incidence Package v22 Audit Report",
    "",
    "## Governance boundary",
    "",
    report.governance_boundary,
    "",
    "## Objective",
    "",
    "This audit verifies a finite response-separator incidence package constructed independently from a declared separator catalog, response-coordinate catalog, admission rules, and typed perturbation records. It does not certify empirical support or human mathematical review.",
    "",
    "## Hash integrity policy",
    "",
    `- Hash method: \`${p.package_hash_method}\``,
    `- Positive declared hash verified: **${p.hash_verified ? "PASS" : "FAIL"}**`,
    `- Negative declared hash verified: **${n.hash_verified ? "PASS" : "FAIL"}**`,
    "",
    "The package hash excludes only the top-level `package_sha256` field, preventing the self-referential digest bug present in v21 while keeping declared audit metadata inside the digest.",
    "",
    "## Positive package result",
    "",
    `- Package: \`${p.package_id}\``,
    `- Result: **${p.result}**`,
    `- SHA-256: \`${p.package_sha256}\``,
    `- Separators: ${p.counts.separators}`,
    `- Responses: ${p.counts.responses}`,
    `- Incidence edges: ${p.counts.incidence_edges}`,
    `- Connected components: ${p.counts.connected_components}`,
    `- Enumerated binary cuts: ${p.counts.enumerated_binary_cuts}`,
    `- Enumerated nontrivial factor cuts: ${p.counts.enumerated_nontrivial_factor_cuts}`,
    `- Factor-local zero-crossing cuts: ${p.counts.factor_local_zero_crossing_cuts}`,
    "",
    "Interpretation: connectedness plus finite separator coverage blocks every enumerated factor-local zero-crossing cut in the declared finite universe. This is a finite conditional witness, not a global proof over undeclared systems.",
    "",
    "## Product-separator negative control",
    "",
    `- Package: \`${n.package_id}\``,
    `- Raw audit result: **${n.result}**`,
    `- Expected rejection observed: **${report.negative_control_expected_rejection_observed ? "PASS" : "FAIL"}**`,
    `- Connected components: ${n.counts.connected_components}`,
    `- Factor-local zero-crossing cuts: ${n.counts.factor_local_zero_crossing_cuts}`,
    "",
    "## Reviewer burden",
    "",
    "A human reviewer must verify that the finite separator catalog and response-coordinate catalog are obtained operationally without presupposing atomicity. If catalog completeness is established by already knowing that no factor-local separator partition exists, then the certificate is circular and must be rejected.",
    "",
    "## Final gate",
    "",
    `Overall result: **${report.result}**`,
    ""
  ];
  return lines.join("\n");
}

function main() {
  const positivePath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_POSITIVE;
  const negativePath = process.argv[3] ? path.resolve(process.argv[3]) : DEFAULT_NEGATIVE;
  if (!fs.existsSync(positivePath)) throw new Error(`Missing positive package: ${positivePath}`);
  if (!fs.existsSync(negativePath)) throw new Error(`Missing negative control package: ${negativePath}`);
  const positive = validateFiniteSeparatorPackage(readJson(positivePath));
  const negative = validateFiniteSeparatorPackage(readJson(negativePath));
  const negativeRejected = negative.result === "FAIL" && negative.counts.connected_components > 1 && negative.counts.factor_local_zero_crossing_cuts > 0;
  const report = {
    schema_version: "1.1.0",
    generated_at: "2026-05-27",
    gate: "finite-separator-complete-incidence-v22",
    governance_boundary: "This audit checks finite formal certificates only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.",
    verified_v21_gaps_closed: {
      self_referential_sha256_bug: positive.hash_verified && negative.hash_verified,
      explicit_positive_cut_count_metadata: Boolean(readJson(positivePath).declared_audit_metadata && readJson(positivePath).declared_audit_metadata.counts),
      explicit_negative_cut_count_metadata: Boolean(readJson(negativePath).declared_audit_metadata && readJson(negativePath).declared_audit_metadata.counts),
      product_negative_control_rejected: negativeRejected
    },
    positive_package_path: path.relative(ROOT, positivePath),
    negative_control_path: path.relative(ROOT, negativePath),
    positive,
    negative_control: negative,
    negative_control_expected_rejection_observed: negativeRejected,
    result: positive.result === "PASS" && negativeRejected && positive.hash_verified && negative.hash_verified ? "PASS" : "FAIL"
  };
  writeJson(OUT_JSON, report);
  fs.writeFileSync(OUT_MD, markdownReport(report), "utf8");
  console.log(`Finite separator package audit: ${report.result}`);
  console.log(`Positive: ${positive.result}; hash verified: ${positive.hash_verified ? "PASS" : "FAIL"}`);
  console.log(`Negative rejection observed: ${negativeRejected ? "PASS" : "FAIL"}; hash verified: ${negative.hash_verified ? "PASS" : "FAIL"}`);
  console.log(`Report JSON: ${path.relative(ROOT, OUT_JSON)}`);
  console.log(`Report MD: ${path.relative(ROOT, OUT_MD)}`);
  if (report.result !== "PASS") process.exit(1);
}

if (require.main === module) main();
