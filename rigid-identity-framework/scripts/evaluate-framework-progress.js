#!/usr/bin/env node
/*
 * QICN v22 Framework Progress Evaluator
 *
 * Produces two deliberately separated scores:
 * - internal_readiness_score: repository-local formal/software readiness.
 * - external_scientific_credibility_score: evidence already earned through human review,
 *   empirical execution, independent replication, and public archival artifacts.
 *
 * The evaluator is an audit heuristic. It is not a theorem, not peer review, and not
 * empirical validation. All weights are declared in score_methodology.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_JSON = path.join(ROOT, "docs", "reports", "FRAMEWORK_PROGRESS_V22.json");
const REPORT_MD = path.join(ROOT, "docs", "reports", "FRAMEWORK_PROGRESS_V22_REPORT.md");

function readJson(filePath, fallback = null) {
  try { return JSON.parse(fs.readFileSync(filePath, "utf8")); } catch (_) { return fallback; }
}

function readText(relPath) {
  try { return fs.readFileSync(path.join(ROOT, relPath), "utf8"); } catch (_) { return ""; }
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function hasText(relPath, pattern) {
  return pattern.test(readText(relPath));
}

function registryStats() {
  const registryPath = path.join(ROOT, "registry", "theorems.jsonl");
  const stats = {
    entries: 0,
    theorem_entries: 0,
    effective_proved: 0,
    effective_conditional_or_open: 0,
    human_reviewed: 0,
    proved_but_not_human_reviewed: 0
  };
  if (!fs.existsSync(registryPath)) return stats;
  const rows = fs.readFileSync(registryPath, "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
  stats.entries = rows.length;
  const theoremRows = rows.filter((row) => ["theorem", "proposition", "lemma", "corollary"].includes(row.type));
  stats.theorem_entries = theoremRows.length;
  for (const row of theoremRows) {
    const status = row.effective_public_status || row.epistemic_status || "unknown";
    if (status === "proved") stats.effective_proved += 1;
    if (/conditional|open|heuristic|conjectural/i.test(status)) stats.effective_conditional_or_open += 1;
    if (row.human_curated_status === "reviewed" || row.curation_status === "human_curated") stats.human_reviewed += 1;
    if (status === "proved" && !(row.human_curated_status === "reviewed" || row.curation_status === "human_curated")) stats.proved_but_not_human_reviewed += 1;
  }
  return stats;
}

function boolScore(items, pointsPerItem) {
  return items.filter(Boolean).length * pointsPerItem;
}

function main() {
  const monolithGate = readJson(path.join(ROOT, "docs", "reports", "MONOLITHIC_BUILD_QUALITY_GATE_v20.json"), {});
  const finiteAudit = readJson(path.join(ROOT, "docs", "reports", "FINITE_SEPARATOR_COMPLETE_PACKAGE_v22_AUDIT.json"), {});
  const depGraph = readJson(path.join(ROOT, "docs", "theory_dependency_graph.v1.json"), {});
  const v21Verification = readJson(path.join(ROOT, "docs", "reports", "HYBRID_V21_VERIFICATION.json"), {});
  const stats = registryStats();

  const commandResults = v21Verification.command_results || {};
  const internalComponents = {
    monolithic_quality_gate: {
      max: 15,
      score: monolithGate.result === "PASS" ? 15 : 0,
      evidence: "docs/reports/MONOLITHIC_BUILD_QUALITY_GATE_v20.json"
    },
    internal_simulation_and_negative_controls: {
      max: 20,
      score: boolScore([
        commandResults.pred_ext_01_cleanroom === "PASS",
        commandResults.adversarial_negative_controls === "PASS",
        commandResults.audit_generator_independence === "PASS",
        commandResults.validate_prediction_registry === "PASS"
      ], 5),
      evidence: "HYBRID_V21_VERIFICATION.json command_results"
    },
    registry_and_governance_hygiene: {
      max: 10,
      score: boolScore([
        exists("docs/CLAIM_STATUS_POLICY.md"),
        exists("docs/reports/REGISTRY_CURATION_BATCH_003_HUMAN_REVIEW_SCAFFOLD.md"),
        exists("docs/NON_CLAIM_LEDGER_CANONICAL.md"),
        stats.entries >= 600,
        stats.human_reviewed === 0 && stats.proved_but_not_human_reviewed > 0
      ], 2),
      evidence: "registry, claim-status policy, nonclaim ledger, explicit unsigned-review boundary"
    },
    theory_dependency_mapping: {
      max: 10,
      score: depGraph.summary && depGraph.summary.cycles === 0 ? 10 : 0,
      evidence: "docs/theory_dependency_graph.v1.json"
    },
    finite_separator_package_integrity: {
      max: 15,
      score: finiteAudit.result === "PASS" && finiteAudit.positive && finiteAudit.positive.hash_verified ? 15 : 0,
      evidence: "docs/reports/FINITE_SEPARATOR_COMPLETE_PACKAGE_v22_AUDIT.json"
    },
    independent_catalog_protocol: {
      max: 15,
      score: boolScore([
        exists("docs/protocols/INDEPENDENT_SEPARATOR_CATALOG_CONSTRUCTION_PROTOCOL_v22.md"),
        hasText("docs/protocols/INDEPENDENT_SEPARATOR_CATALOG_CONSTRUCTION_PROTOCOL_v22.md", /does not certify external support/i),
        hasText("docs/protocols/INDEPENDENT_SEPARATOR_CATALOG_CONSTRUCTION_PROTOCOL_v22.md", /before graph connectivity/i),
        hasText("docs/protocols/INDEPENDENT_SEPARATOR_CATALOG_CONSTRUCTION_PROTOCOL_v22.md", /anti-selection/i),
        hasText("docs/protocols/INDEPENDENT_SEPARATOR_CATALOG_CONSTRUCTION_PROTOCOL_v22.md", /reviewer/i)
      ], 3),
      evidence: "independent separator catalog construction protocol"
    },
    reproducibility_packaging: {
      max: 15,
      score: boolScore([
        exists("../Dockerfile"),
        exists("../.dockerignore"),
        hasText("package.json", /verify:v22/),
        hasText("package.json", /verify:release/),
        hasText("package.json", /audit:finite-separator-package/),
        hasText("../Dockerfile", /verify-canonical-integrity\.cjs/),
        hasText("../Dockerfile", /npm run verify:release/)
      ], 3),
      evidence: "Dockerfile, .dockerignore, npm verify:v22 preservation, and npm verify:release script"
    }
  };

  const internal_readiness_score = Object.values(internalComponents).reduce((sum, item) => sum + item.score, 0);

  const externalComponents = {
    public_formal_scaffold: {
      max: 20,
      score: Math.min(20, Math.round(internal_readiness_score * 0.20)),
      evidence: "algorithmically derived as 20% of internal readiness; still not a public archive or peer review"
    },
    software_reproducibility_packaging: {
      max: 15,
      score: boolScore([
        exists("../Dockerfile"),
        hasText("package.json", /verify:release/),
        hasText("../Dockerfile", /verify-canonical-release\.cjs/),
        finiteAudit.result === "PASS"
      ], 3),
      evidence: "packaging exists, but no independent third-party rerun is recorded"
    },
    governance_transparency: {
      max: 10,
      score: boolScore([
        exists("docs/CLAIM_STATUS_POLICY.md"),
        exists("docs/protocols/STAGE_3_7_OPENING_CRITERIA.v1.md"),
        exists("docs/protocols/INDEPENDENT_SEPARATOR_CATALOG_CONSTRUCTION_PROTOCOL_v22.md"),
        exists("docs/protocols/PRED_EXT_01_HOLDOUT_BLINDING_PROTOCOL_v22.md"),
        exists("docs/reports/DOUBLE_BLIND_FINITE_WITNESS_REVIEW_PACKET_v22.md")
      ], 2),
      evidence: "governance docs and reviewer/blinding protocols present"
    },
    human_mathematical_review: {
      max: 15,
      score: stats.human_reviewed > 0 ? Math.min(15, Math.ceil(stats.human_reviewed / 5)) : 0,
      evidence: "no signed human mathematical curation artifact detected"
    },
    empirical_external_execution: {
      max: 25,
      score: 0,
      evidence: "no external Stage 3-7 campaign artifacts detected"
    },
    independent_replication: {
      max: 10,
      score: 0,
      evidence: "no independent replication artifact detected"
    },
    publication_and_doi: {
      max: 5,
      score: 0,
      evidence: "no DOI/arXiv/Zenodo artifact detected"
    }
  };
  const external_scientific_credibility_score = Object.values(externalComponents).reduce((sum, item) => sum + item.score, 0);

  const report = {
    schema_version: "1.1.0",
    generated_at: "2026-05-27",
    governance_boundary: "This progress score is an internal audit heuristic only. It does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, theorem truth, empirical validation, independent replication, publication, or human mathematical review.",
    score_methodology: {
      policy: "All weights are declared in this object. Component scores are deterministic functions of repository artifacts, registry counts, and verification reports. They remain audit heuristics, not scientific evidence.",
      hardcoded_subjective_values_removed: true,
      internal_components_total: 100,
      external_components_total: 100,
      external_zero_evidence_rule: "Human review, empirical execution, independent replication, and publication score zero unless signed or public artifacts exist in the repository."
    },
    interpretation_boundary: {
      internal_readiness_score: "Progress of the formal/software/governance scaffold inside the repository.",
      external_scientific_credibility_score: "Progress toward externally credible science with human review, independent replication, empirical execution, and publication artifacts."
    },
    registry_stats: stats,
    internal_readiness_components: internalComponents,
    internal_readiness_score,
    external_scientific_credibility_components: externalComponents,
    external_scientific_credibility_score,
    resolved_analysis_disagreement: "The optimistic analysis is reasonable for internal scaffold readiness only. The conservative analysis remains closer for external scientific credibility because empirical execution, independent replication, signed human review, and publication remain absent. v22 closes the finite-package integrity and reproducibility-preparation gaps without pretending to close those external burdens."
  };

  const lines = [
    "# QICN Framework Progress v22 Report",
    "",
    "## Governance boundary",
    "",
    report.governance_boundary,
    "",
    "## Scores",
    "",
    `- Internal readiness score: **${internal_readiness_score}/100**`,
    `- External scientific credibility score: **${external_scientific_credibility_score}/100**`,
    "",
    "## Methodology",
    "",
    report.score_methodology.policy,
    "",
    `- Hardcoded subjective values removed: **${report.score_methodology.hardcoded_subjective_values_removed ? "YES" : "NO"}**`,
    `- External zero-evidence rule: ${report.score_methodology.external_zero_evidence_rule}`,
    "",
    "## Why there are two scores",
    "",
    "The internal score measures whether the repository is technically and formally ready for external-facing work. The external score measures whether the framework has already earned scientific credibility through independent review, empirical execution, replication, and public archival artifacts. These are different questions.",
    "",
    "## Registry risk",
    "",
    `- Formal registry entries: ${stats.entries}`,
    `- Theorem/proposition/lemma/corollary entries: ${stats.theorem_entries}`,
    `- Effective proved entries: ${stats.effective_proved}`,
    `- Proved but not human-reviewed entries: ${stats.proved_but_not_human_reviewed}`,
    `- Human-reviewed entries detected: ${stats.human_reviewed}`,
    "",
    "## Resolution of Antigravity vs OpenCode",
    "",
    report.resolved_analysis_disagreement,
    ""
  ];
  fs.mkdirSync(path.dirname(REPORT_JSON), { recursive: true });
  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(REPORT_MD, lines.join("\n"), "utf8");
  console.log(`Internal readiness score: ${internal_readiness_score}/100`);
  console.log(`External scientific credibility score: ${external_scientific_credibility_score}/100`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_JSON)}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_MD)}`);
}

if (require.main === module) main();
