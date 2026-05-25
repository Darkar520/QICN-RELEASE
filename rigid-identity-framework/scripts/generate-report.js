#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { runValidation } = require("./validate-corpus");
const { classifyMacroCollision, ensureDir, groupByLatexName, readJsonl } = require("./registry-lib");

function byPaper(entries) {
  const map = new Map();
  for (const entry of entries) {
    if (!map.has(entry.paper)) map.set(entry.paper, []);
    map.get(entry.paper).push(entry);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
}

function write(filePath, body) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${body.trim()}\n`, "utf8");
}

function escapeMarkdownCell(value) {
  return String(value ?? "n/a").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function mermaidNodeId(value) {
  return String(value).replace(/[^a-zA-Z0-9_]/g, "_");
}

function mermaidLabel(value) {
  return String(value).replace(/"/g, "'");
}

function generateMermaidGraph(entries) {
  const keyDeps = entries
    .filter((entry) => entry.depends_on?.length > 0 && ["theorem", "hypothesis", "conjecture"].includes(entry.type))
    .slice(0, 50);

  const lines = ["## Dependency Graph", "", "```mermaid", "graph TD"];
  const seen = new Set();
  for (const entry of keyDeps) {
    for (const dep of entry.depends_on) {
      const from = mermaidNodeId(dep);
      const to = mermaidNodeId(entry.id);
      const key = `${from}-->${to}`;
      if (seen.has(key)) continue;
      seen.add(key);
      lines.push(`    ${from}["${mermaidLabel(dep)}"] --> ${to}["${mermaidLabel(entry.id)}"]`);
    }
  }
  if (seen.size === 0) lines.push('    no_dependencies["No resolved dependencies"]');
  lines.push("```", "");
  return lines.join("\n");
}

function generateCorpusHealth(frameworkRoot, validation) {
  const lines = [
    "# Corpus Health Report",
    "",
    "Status: FCR structural registry generated from active LaTeX sources. This report is a validation surface, not a claim that the mathematics is proved.",
    "",
    "## Metrics",
    "",
    `- Formal registry entries: ${validation.stats.entries}`,
    `- Macro registry entries: ${validation.stats.macros}`,
    `- Theorem entries: ${validation.stats.theorem_entries}`,
    `- Hypothesis entries: ${validation.stats.hypothesis_entries}`,
    `- Conjecture entries: ${validation.stats.conjecture_entries}`,
    `- Audit v5 overlays: ${validation.stats.audit_overlaid_entries}`,
    `- False-status entries with required counterexample metadata: ${validation.stats.false_entries}`,
    `- Proved-status entries: ${validation.stats.proved_entries}`,
    `- Conditional-status entries: ${validation.stats.conditional_entries}`,
    `- Heuristic-status entries: ${validation.stats.heuristic_entries}`,
    `- Active macro-collision entries: ${validation.stats.high_risk_macros}`,
    `- Active macro-collision groups: ${validation.stats.macro_collision_groups}`,
    `- Blocking validation errors: ${validation.blockers.length}`,
    `- Non-blocking warnings: ${validation.warnings.length}`,
    "",
    "## Audit-Flagged Formal Entries",
    "",
  ];

  const flagged = validation.entries.filter((entry) => entry.audit_status);
  if (flagged.length === 0) {
    lines.push("None.");
  } else {
    lines.push("| ID | Status | Proof | Audit status | Location |");
    lines.push("|---|---|---|---|---|");
    for (const entry of flagged) {
      lines.push(
        `| ${entry.id} | ${entry.epistemic_status} | ${entry.proof_status} | ${entry.audit_status} | ${entry.location.file}:${entry.location.line_start} |`
      );
    }
  }

  lines.push("", "## Blockers", "");
  if (validation.blockers.length === 0) lines.push("None.");
  else validation.blockers.forEach((item) => lines.push(`- ${item}`));

  lines.push("", "## Warning Sample", "");
  if (validation.warnings.length === 0) lines.push("None.");
  else validation.warnings.slice(0, 80).forEach((item) => lines.push(`- ${item}`));
  if (validation.warnings.length > 80) {
    lines.push(`- ... ${validation.warnings.length - 80} additional warnings omitted here; run npm run verify:corpus-registry for the current full report.`);
  }

  lines.push("", generateMermaidGraph(validation.entries).trim());

  return lines.join("\n");
}

function generateDependencyGraph(entries) {
  const lines = ["digraph FCR_Dependencies {", "  rankdir=LR;", "  node [shape=box, fontsize=10];"];
  for (const entry of entries) {
    if (!entry.depends_on || entry.depends_on.length === 0) continue;
    for (const dep of entry.depends_on) {
      lines.push(`  "${entry.id}" -> "${dep}";`);
    }
  }
  if (lines.length === 3) {
    lines.push('  "dependency-curation-pending" [shape=note];');
  }
  lines.push("}");
  return lines.join("\n");
}

function generateMacroCollisionReport(macros) {
  const groups = groupByLatexName(macros);
  const activeRows = [];
  const policyCounts = new Map();
  for (const [name, group] of Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b))) {
    const classification = classifyMacroCollision(name, group);
    if (!classification.active) {
      policyCounts.set(classification.reason, (policyCounts.get(classification.reason) || 0) + 1);
      continue;
    }
    const owners = group.map((item) => `${item.owner}:${item.location.line_start}`).join(", ");
    const defs = classification.definitions.map((item) => `\`${item.replace(/\|/g, "\\|")}\``).join("<br>");
    activeRows.push(`| ${name} | high | ${owners} | ${defs} |`);
  }
  const lines = [
    "# Macro Collision Report",
    "",
    "Status: active semantic collision report. Repeated identical definitions, standard formatting parameters, and theorem-environment declarations are tracked as policy-exempt declarations rather than active collisions.",
    "",
    "## Active Semantic Collisions",
    "",
    "| Macro | Risk | Owners | Definitions |",
    "|---|---|---|---|",
  ];

  if (activeRows.length === 0) {
    lines.push("| None | low | n/a | n/a |");
  } else {
    lines.push(...activeRows);
  }

  lines.push("", "## Policy-Exempt Declaration Groups", "");
  lines.push("| Reason | Groups |");
  lines.push("|---|---:|");
  for (const [reason, count] of Array.from(policyCounts.entries()).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`| ${reason} | ${count} |`);
  }
  if (policyCounts.size === 0) lines.push("| None | 0 |");
  return lines.join("\n");
}

function generateRiskHeatmap(entries) {
  const lines = [
    "# Epistemic Risk Heatmap",
    "",
    "| Paper | Entries | False | Invalid proof | Missing proof | Heuristic/sketch | Conjectural |",
    "|---|---:|---:|---:|---:|---:|---:|",
  ];

  for (const [paper, group] of byPaper(entries)) {
    const count = (predicate) => group.filter(predicate).length;
    lines.push(
      `| ${paper} | ${group.length} | ${count((e) => e.epistemic_status === "false")} | ${count((e) => e.proof_status === "invalid")} | ${count((e) => e.proof_status === "missing")} | ${count((e) => ["heuristic", "sketch"].includes(e.proof_status))} | ${count((e) => e.epistemic_status === "conjectural")} |`
    );
  }

  lines.push(
    "",
    "Interpretation boundary: this is an inventory of registry metadata. It does not prove or disprove entries not explicitly overlaid by audit evidence."
  );
  return lines.join("\n");
}

function generateTheoremAtlas(result) {
  const lines = [
    "# QICN Theorem Atlas",
    "",
    "> Accessibility note: this atlas uses semantic Markdown with hierarchical headers, consistent table alignment, and plain-text identifiers. It is designed for screen-reader compatibility and rapid navigation without requiring LaTeX compilation.",
    "",
    "## Overview",
    "",
    `- Total formal entries: ${result.stats.entries}`,
    `- Theorem entries: ${result.stats.theorem_entries}`,
    `- Hypothesis entries: ${result.stats.hypothesis_entries}`,
    `- Conjecture entries: ${result.stats.conjecture_entries}`,
    `- Audit overlays: ${result.stats.audit_overlaid_entries}`,
    `- Proved-status entries: ${result.stats.proved_entries}`,
    "",
  ];

  for (const [paper, entries] of byPaper(result.entries)) {
    lines.push(`## ${paper.toUpperCase()}`, "");
    lines.push("| ID | Type | Label | Epistemic Status | Proof | Location |");
    lines.push("|---|---|---|---|---|---|");
    for (const entry of entries) {
      const loc = `${entry.location.file}:${entry.location.line_start}`;
      lines.push(
        `| ${escapeMarkdownCell(entry.id)} | ${escapeMarkdownCell(entry.type)} | ${escapeMarkdownCell(entry.label)} | ${escapeMarkdownCell(entry.epistemic_status)} | ${escapeMarkdownCell(entry.proof_status)} | ${escapeMarkdownCell(loc)} |`
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const frameworkRoot = path.resolve(__dirname, "..");
  const reportDir = path.join(frameworkRoot, "docs", "reports");
  const validation = runValidation({ frameworkRoot });
  const macroLoad = readJsonl(path.join(frameworkRoot, "registry", "macros.jsonl"));
  if (macroLoad.errors.length) {
    for (const error of macroLoad.errors) console.error(error);
    process.exit(1);
  }

  write(path.join(reportDir, "CORPUS_HEALTH_REPORT.md"), generateCorpusHealth(frameworkRoot, validation));
  write(path.join(reportDir, "DEPENDENCY_GRAPH.dot"), generateDependencyGraph(validation.entries));
  write(path.join(reportDir, "MACRO_COLLISION_REPORT.md"), generateMacroCollisionReport(macroLoad.records));
  write(path.join(reportDir, "EPISTEMIC_RISK_HEATMAP.md"), generateRiskHeatmap(validation.entries));
  write(path.join(reportDir, "THEOREM_ATLAS.md"), generateTheoremAtlas(validation));

  console.log("FCR reports generated.");
  console.log(`reports=${reportDir}`);
  console.log(`blockers=${validation.blockers.length}`);
  console.log(`warnings=${validation.warnings.length}`);
  process.exit(validation.blockers.length === 0 ? 0 : 1);
}

if (require.main === module) {
  main();
}
