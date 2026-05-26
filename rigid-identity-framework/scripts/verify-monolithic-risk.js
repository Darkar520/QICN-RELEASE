#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  classifyMacroCollision,
  ensureDir,
  groupByLatexName,
  readJsonl,
} = require("./registry-lib");

function formatOwners(group) {
  return group
    .map((item) => `${item.owner}:${item.location?.file || "unknown"}:${item.location?.line_start || "?"}`)
    .sort()
    .join(", ");
}

function uniqueDefinitions(group) {
  return Array.from(new Set(group.map((item) => item.definition || ""))).sort();
}

function mdCell(value) {
  return String(value ?? "n/a").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function classifyMonolithicGroup(name, group) {
  const fcrClass = classifyMacroCollision(name, group);
  const definitions = uniqueDefinitions(group);
  const commands = Array.from(new Set(group.map((item) => item.command || "unknown"))).sort();

  if (fcrClass.active) {
    return {
      name,
      risk: "active-semantic-conflict",
      monolithicRisk: "blocker",
      reason: "Distinct active definitions remain after FCR policy filtering.",
      definitions,
      commands,
      group,
    };
  }

  if (fcrClass.reason === "standard_formatting_macro") {
    return {
      name,
      risk: "standard-formatting-override",
      monolithicRisk: "local-scope-required",
      reason: "Formatting overrides such as \\arraystretch are acceptable in local paper builds but should be grouped or normalized in a unified volume.",
      definitions,
      commands,
      group,
    };
  }

  if (fcrClass.reason === "theorem_environment_declaration") {
    return {
      name,
      risk: definitions.length === 1 ? "repeated-theorem-environment" : "distinct-theorem-environment-declarations",
      monolithicRisk: definitions.length === 1 ? "shared-preamble-required" : "manual-review-required",
      reason:
        definitions.length === 1
          ? "The theorem environment declaration repeats identically and should be hoisted to a shared preamble before unified compilation."
          : "The theorem environment has distinct declaration strings; unified compilation can fail or change numbering/display semantics.",
      definitions,
      commands,
      group,
    };
  }

  if (fcrClass.reason === "identical_definition_repeated") {
    return {
      name,
      risk: "identical-definition-repeated",
      monolithicRisk: "shared-preamble-required",
      reason: "Identical repeated definitions are not active semantic conflicts, but duplicate definitions can still fail in a unified LaTeX preamble.",
      definitions,
      commands,
      group,
    };
  }

  return {
    name,
    risk: fcrClass.reason,
    monolithicRisk: "review",
    reason: "Unhandled policy-exempt group; review before unified compilation.",
    definitions,
    commands,
    group,
  };
}

function generateReport(groups) {
  const repeatedGroups = groups.filter((item) => item.group.length > 1);
  const activeConflicts = repeatedGroups.filter((item) => item.monolithicRisk === "blocker");
  const formattingOverrides = repeatedGroups.filter((item) => item.risk === "standard-formatting-override");
  const theoremDeclarations = repeatedGroups.filter((item) => item.risk.includes("theorem-environment"));
  const identicalRepeated = repeatedGroups.filter((item) => item.risk === "identical-definition-repeated");
  const manualReview = repeatedGroups.filter((item) => item.monolithicRisk === "manual-review-required");

  const overall =
    activeConflicts.length > 0
      ? "RED: active semantic blockers exist"
      : manualReview.length > 0
        ? "YELLOW: no active FCR semantic blockers, but unified-volume declarations need manual review"
        : repeatedGroups.length > 0
          ? "YELLOW: no active FCR semantic blockers, but shared-preamble work remains before monolithic compilation"
          : "GREEN: no repeated macro groups detected";

  const lines = [
    "# Monolithic Compilation Risk Audit v1",
    "",
    "Status: FCR v10 lexical audit for unified LaTeX volume risk.",
    "",
    "## Governance Boundary",
    "",
    "This audit records lexical and preamble-level risks for possible monolithic LaTeX compilation. It does not certify theorem truth, empirical support, consciousness, phenomenality, identity transfer, agency, moral status, accessibility compliance, or external adjudication.",
    "",
    "A clean FCR macro gate means there are no active semantic macro-collision warnings under the current policy. It does not mean a unified LaTeX volume can be compiled without a shared preamble, local grouping, or manual review of repeated theorem environments.",
    "",
    "## Current Risk Status",
    "",
    `- Overall monolithic risk: ${overall}`,
    `- Active semantic conflict groups: ${activeConflicts.length}`,
    `- Identical repeated definition groups: ${identicalRepeated.length}`,
    `- Standard typographic formatting override groups: ${formattingOverrides.length}`,
    `- Theorem-environment declaration groups: ${theoremDeclarations.length}`,
    `- Manual-review theorem declaration groups: ${manualReview.length}`,
    `- Total repeated macro/declaration groups: ${repeatedGroups.length}`,
    "",
    "## Risk Classes",
    "",
    "| Macro/Declaration | Risk class | Monolithic risk | Definitions | Occurrences |",
    "|---|---|---|---|---|",
  ];

  for (const item of repeatedGroups.sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(
      `| ${mdCell(item.name)} | ${mdCell(item.risk)} | ${mdCell(item.monolithicRisk)} | ${mdCell(item.definitions.join("<br>"))} | ${mdCell(formatOwners(item.group))} |`,
    );
  }
  if (repeatedGroups.length === 0) lines.push("| None | none | none | n/a | n/a |");

  lines.push(
    "",
    "## Required Next Gate Before Unified Volume",
    "",
    "1. Hoist repeated theorem environments and canonical macros into a shared preamble.",
    "2. Replace paper-local typographic overrides with local groups or table-local commands.",
    "3. Re-run FCR extraction and macro validation.",
    "4. Compile the intended unified volume as a separate LaTeX gate.",
    "",
    "Until those steps are complete, the correct status is shared-preamble readiness work pending, not monolithic compilation certified.",
    "",
  );

  return lines.join("\n");
}

function main() {
  const frameworkRoot = path.resolve(__dirname, "..");
  const macroPath = path.join(frameworkRoot, "registry", "macros.jsonl");
  const reportPath = path.join(frameworkRoot, "docs", "reports", "MONOLITHIC_COMPILE_RISK_AUDIT.md");
  const { records: macros, errors } = readJsonl(macroPath);

  if (errors.length > 0) {
    console.error(`Cannot audit monolithic risk because macros.jsonl has parse errors:\n${errors.join("\n")}`);
    process.exit(1);
  }

  const groups = Array.from(groupByLatexName(macros).entries()).map(([name, group]) =>
    classifyMonolithicGroup(name, group),
  );
  const report = generateReport(groups);
  ensureDir(path.dirname(reportPath));
  fs.writeFileSync(reportPath, `${report.trim()}\n`, "utf8");
  console.log(`Wrote ${path.relative(frameworkRoot, reportPath).replace(/\\/g, "/")}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  classifyMonolithicGroup,
  generateReport,
};
