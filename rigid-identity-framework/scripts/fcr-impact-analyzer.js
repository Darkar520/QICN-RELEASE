#!/usr/bin/env node

const path = require("path");
const { readJsonl } = require("./registry-lib");

function parseArgs(argv) {
  const args = {
    auditOverlays: false,
    json: false,
    target: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--audit-overlays") {
      args.auditOverlays = true;
    } else if (arg === "--json") {
      args.json = true;
    } else if (arg === "--target") {
      args.target = argv[++index];
    } else if (!args.target && !arg.startsWith("--")) {
      args.target = arg;
    } else {
      throw new Error(`Unknown or incomplete argument: ${arg}`);
    }
  }

  return args;
}

function usage() {
  return [
    "Usage:",
    "  node scripts/fcr-impact-analyzer.js --target <registry-id>",
    "  node scripts/fcr-impact-analyzer.js --target <registry-id> --json",
    "  node scripts/fcr-impact-analyzer.js --audit-overlays",
    "",
    "Examples:",
    "  node scripts/fcr-impact-analyzer.js --target basecore:hypothesis:hyp-phi-regularity",
    "  node scripts/fcr-impact-analyzer.js --audit-overlays --json",
  ].join("\n");
}

function countBy(items, selector) {
  const counts = new Map();
  for (const item of items) {
    const key = selector(item) || "unknown";
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Object.fromEntries(Array.from(counts.entries()).sort(([a], [b]) => a.localeCompare(b)));
}

function buildGraph(entries) {
  const byId = new Map();
  const dependentsById = new Map();
  const missingDependencies = [];
  const duplicateIds = [];

  for (const entry of entries) {
    if (byId.has(entry.id)) duplicateIds.push(entry.id);
    byId.set(entry.id, entry);
    dependentsById.set(entry.id, []);
  }

  for (const entry of entries) {
    for (const depId of entry.depends_on || []) {
      if (!byId.has(depId)) {
        missingDependencies.push({ entryId: entry.id, missingDependency: depId });
        continue;
      }
      dependentsById.get(depId).push(entry.id);
    }
  }

  for (const dependents of dependentsById.values()) {
    dependents.sort((a, b) => a.localeCompare(b));
  }

  return { byId, dependentsById, duplicateIds, missingDependencies };
}

function detectCycles(entries, byId) {
  const visiting = new Set();
  const visited = new Set();
  const cycles = [];

  function visit(id, trail) {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      const start = trail.indexOf(id);
      cycles.push([...trail.slice(start), id]);
      return;
    }

    visiting.add(id);
    const entry = byId.get(id);
    for (const depId of entry?.depends_on || []) {
      if (byId.has(depId)) visit(depId, [...trail, id]);
    }
    visiting.delete(id);
    visited.add(id);
  }

  for (const entry of entries) visit(entry.id, []);
  return cycles;
}

function summarizeImpact(impactedEntries) {
  return {
    byPaper: countBy(impactedEntries, (entry) => entry.paper),
    byType: countBy(impactedEntries, (entry) => entry.type),
    byEpistemicStatus: countBy(impactedEntries, (entry) => entry.epistemic_status),
    auditOverlaid: impactedEntries.filter((entry) => entry.audit_status).map((entry) => entry.id).sort(),
    provedImpacted: impactedEntries.filter((entry) => entry.epistemic_status === "proved").map((entry) => entry.id).sort(),
    conditionalImpacted: impactedEntries.filter((entry) => entry.epistemic_status === "conditional").map((entry) => entry.id).sort(),
    heuristicImpacted: impactedEntries.filter((entry) => entry.epistemic_status === "heuristic").map((entry) => entry.id).sort(),
    conjecturalImpacted: impactedEntries.filter((entry) => entry.epistemic_status === "conjectural").map((entry) => entry.id).sort(),
  };
}

function analyzeTarget(targetId, graph) {
  const { byId, dependentsById } = graph;
  const target = byId.get(targetId);
  if (!target) {
    throw new Error(`Target entry ID not found in registry: ${targetId}`);
  }

  const directDependents = [...(dependentsById.get(targetId) || [])].sort((a, b) => a.localeCompare(b));
  const depths = new Map();
  const queue = directDependents.map((id) => ({ id, depth: 1 }));

  while (queue.length > 0) {
    const current = queue.shift();
    const priorDepth = depths.get(current.id);
    if (priorDepth !== undefined && priorDepth <= current.depth) continue;
    depths.set(current.id, current.depth);

    const nextDependents = dependentsById.get(current.id) || [];
    for (const dependentId of nextDependents) {
      queue.push({ id: dependentId, depth: current.depth + 1 });
    }
    queue.sort((a, b) => a.depth - b.depth || a.id.localeCompare(b.id));
  }

  const impactedIds = Array.from(depths.keys()).sort((a, b) => {
    const depthDelta = depths.get(a) - depths.get(b);
    return depthDelta || a.localeCompare(b);
  });
  const impactedEntries = impactedIds.map((id) => byId.get(id));
  const maxDepth = impactedIds.reduce((max, id) => Math.max(max, depths.get(id)), 0);

  return {
    target: summarizeEntry(target),
    directDependents,
    transitiveDependents: impactedIds,
    transitiveCount: impactedIds.length,
    directCount: directDependents.length,
    maxDepth,
    summary: summarizeImpact(impactedEntries),
    impactedEntries: impactedEntries.map((entry) => ({
      ...summarizeEntry(entry),
      impactDepth: depths.get(entry.id),
    })),
    limitation: "Syntactic/FCR-explicit dependency impact only. This does not prove semantic dependence, theorem truth, empirical support, or external validation.",
  };
}

function summarizeEntry(entry) {
  return {
    id: entry.id,
    type: entry.type,
    paper: entry.paper,
    title: entry.title || null,
    label: entry.label || null,
    epistemicStatus: entry.epistemic_status,
    proofStatus: entry.proof_status,
    auditStatus: entry.audit_status || null,
    location: entry.location || null,
  };
}

function analyzeAuditOverlays(graph) {
  const overlays = Array.from(graph.byId.values())
    .filter((entry) => entry.audit_status)
    .sort((a, b) => a.id.localeCompare(b.id));
  return overlays.map((entry) => analyzeTarget(entry.id, graph));
}

function formatCounts(counts) {
  const entries = Object.entries(counts);
  if (entries.length === 0) return "- None.";
  return entries.map(([key, value]) => `- ${key}: ${value}`).join("\n");
}

function formatLocation(location) {
  if (!location?.file) return "unknown";
  if (location.line_start) return `${location.file}:${location.line_start}`;
  return location.file;
}

function formatTargetReport(report) {
  const lines = [
    "# FCR Deductive Impact Report",
    "",
    `Target: ${report.target.id}`,
    `Type: ${report.target.type}`,
    `Paper: ${report.target.paper}`,
    `Epistemic status: ${report.target.epistemicStatus}`,
    `Proof status: ${report.target.proofStatus}`,
    `Audit status: ${report.target.auditStatus || "none"}`,
    `Location: ${formatLocation(report.target.location)}`,
    "",
    "## Impact Counts",
    "",
    `- Direct dependents: ${report.directCount}`,
    `- Transitive dependents: ${report.transitiveCount}`,
    `- Maximum dependency depth: ${report.maxDepth}`,
    "",
    "## Impact By Paper",
    "",
    formatCounts(report.summary.byPaper),
    "",
    "## Impact By Type",
    "",
    formatCounts(report.summary.byType),
    "",
    "## Impact By Epistemic Status",
    "",
    formatCounts(report.summary.byEpistemicStatus),
    "",
    "## Direct Dependents",
    "",
    report.directDependents.length ? report.directDependents.map((id) => `- ${id}`).join("\n") : "- None.",
    "",
    "## Transitive Impact Cascade",
    "",
  ];

  if (report.impactedEntries.length === 0) {
    lines.push("- None. This entry is currently a leaf with no downstream FCR-explicit dependents.");
  } else {
    for (const entry of report.impactedEntries) {
      lines.push(`- depth ${entry.impactDepth}: ${entry.id} (${entry.type}, ${entry.epistemicStatus})`);
    }
  }

  lines.push(
    "",
    "## Limitation",
    "",
    report.limitation,
    "",
  );

  return lines.join("\n");
}

function formatAuditOverlayReport(reports) {
  const lines = [
    "# FCR Audit Overlay Impact Summary",
    "",
    "This report ranks audit-overlaid entries by downstream FCR-explicit impact.",
    "It is a maintenance and sensitivity surface, not proof of theorem truth or external validation.",
    "",
    "| Target | Paper | Type | Status | Direct | Transitive | Max depth |",
    "|---|---|---|---|---:|---:|---:|",
  ];

  const sorted = [...reports].sort((a, b) => {
    const impactDelta = b.transitiveCount - a.transitiveCount;
    return impactDelta || a.target.id.localeCompare(b.target.id);
  });

  for (const report of sorted) {
    lines.push([
      report.target.id,
      report.target.paper,
      report.target.type,
      report.target.epistemicStatus,
      report.directCount,
      report.transitiveCount,
      report.maxDepth,
    ].join(" | ").replace(/^/, "| ").replace(/$/, " |"));
  }

  lines.push("");
  return lines.join("\n");
}

function loadGraph(frameworkRoot) {
  const theoremPath = path.join(frameworkRoot, "registry", "theorems.jsonl");
  const { records, errors } = readJsonl(theoremPath);
  if (errors.length > 0) {
    throw new Error(`Registry parse errors:\n${errors.map((item) => `- ${item}`).join("\n")}`);
  }

  const graph = buildGraph(records);
  if (graph.duplicateIds.length > 0) {
    throw new Error(`Duplicate registry ids:\n${graph.duplicateIds.map((id) => `- ${id}`).join("\n")}`);
  }
  if (graph.missingDependencies.length > 0) {
    throw new Error(
      `Missing dependency ids:\n${graph.missingDependencies
        .map((item) => `- ${item.entryId} -> ${item.missingDependency}`)
        .join("\n")}`,
    );
  }

  const cycles = detectCycles(records, graph.byId);
  if (cycles.length > 0) {
    throw new Error(`Dependency cycles detected:\n${cycles.map((cycle) => `- ${cycle.join(" -> ")}`).join("\n")}`);
  }

  return graph;
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error("");
    console.error(usage());
    process.exit(1);
  }

  if (!args.target && !args.auditOverlays) {
    console.error(usage());
    process.exit(1);
  }

  const frameworkRoot = path.resolve(__dirname, "..");
  try {
    const graph = loadGraph(frameworkRoot);
    if (args.auditOverlays) {
      const reports = analyzeAuditOverlays(graph);
      if (args.json) console.log(JSON.stringify(reports, null, 2));
      else console.log(formatAuditOverlayReport(reports));
      return;
    }

    const report = analyzeTarget(args.target, graph);
    if (args.json) console.log(JSON.stringify(report, null, 2));
    else console.log(formatTargetReport(report));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  analyzeAuditOverlays,
  analyzeTarget,
  buildGraph,
  detectCycles,
  loadGraph,
};
