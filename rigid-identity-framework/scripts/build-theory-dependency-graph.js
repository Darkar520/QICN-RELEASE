const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REGISTRY_PATH = path.join(ROOT, "registry", "theorems.jsonl");
const OUT_PATH = path.join(ROOT, "docs", "theory_dependency_graph.v1.json");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "THEORY_DEPENDENCY_GRAPH_v1_REPORT.md");

const THEOREM_TYPES = new Set(["theorem"]);

function readRegistry() {
  return fs.readFileSync(REGISTRY_PATH, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`Invalid JSON on registry line ${index + 1}: ${error.message}`);
      }
    });
}

function normalizeLabel(label) {
  return String(label || "").trim();
}

function buildGraph(rows) {
  const labelToId = new Map();
  const idToRow = new Map();
  for (const row of rows) {
    if (row.id) idToRow.set(row.id, row);
    if (row.label) labelToId.set(normalizeLabel(row.label), row.id);
  }

  const theoremRows = rows.filter((row) => THEOREM_TYPES.has(row.type));
  const theoremIds = new Set(theoremRows.map((row) => row.id));
  const nodes = theoremRows.map((row) => ({
    id: row.id,
    label: row.label || null,
    title: row.title || null,
    paper: row.paper || null,
    source_declared_status: row.source_declared_status || row.epistemic_status || null,
    machine_extracted_status: row.machine_extracted_status || row.epistemic_status || null,
    human_curated_status: row.human_curated_status || null,
    effective_public_status: row.effective_public_status || row.epistemic_status || null,
    proof_status: row.proof_status || null,
    file: row.location ? row.location.file : null,
    line_start: row.location ? row.location.line_start : null
  }));

  const edges = [];
  const unresolved = [];
  for (const row of theoremRows) {
    const dependencyIds = new Set();
    for (const dep of row.depends_on || []) dependencyIds.add(dep);
    for (const ref of row.refs || []) {
      const target = labelToId.get(normalizeLabel(ref));
      if (target) dependencyIds.add(target);
      else unresolved.push({ source: row.id, ref });
    }
    for (const target of dependencyIds) {
      edges.push({ source: row.id, target, target_is_theorem: theoremIds.has(target) });
    }
  }

  const theoremEdges = edges.filter((edge) => edge.target_is_theorem);
  const adjacency = new Map(nodes.map((node) => [node.id, []]));
  for (const edge of theoremEdges) adjacency.get(edge.source).push(edge.target);

  const cycles = [];
  const visiting = new Set();
  const visited = new Set();
  const stack = [];

  function dfs(node) {
    if (visiting.has(node)) {
      const start = stack.indexOf(node);
      if (start !== -1) cycles.push([...stack.slice(start), node]);
      return;
    }
    if (visited.has(node)) return;
    visiting.add(node);
    stack.push(node);
    for (const next of adjacency.get(node) || []) dfs(next);
    stack.pop();
    visiting.delete(node);
    visited.add(node);
  }
  for (const node of adjacency.keys()) dfs(node);

  const inDegree = new Map(nodes.map((node) => [node.id, 0]));
  const outDegree = new Map(nodes.map((node) => [node.id, 0]));
  for (const edge of theoremEdges) {
    outDegree.set(edge.source, (outDegree.get(edge.source) || 0) + 1);
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  }

  const leaves = nodes.filter((node) => (inDegree.get(node.id) || 0) === 0).map((node) => node.id);
  const roots = nodes.filter((node) => (outDegree.get(node.id) || 0) === 0).map((node) => node.id);
  const conditional = nodes.filter((node) => /conditional|open|heuristic/i.test(`${node.effective_public_status || ""} ${node.source_declared_status || ""}`)).map((node) => node.id);
  const provedNotHumanReviewed = nodes.filter((node) => node.effective_public_status === "proved" && node.human_curated_status !== "reviewed").map((node) => node.id);

  return {
    schema_version: "1.0.0",
    generated_at: "2026-05-26",
    boundary: "This graph maps machine-extracted theorem dependencies. It does not prove consistency, completeness, theorem truth, external support, consciousness, phenomenality, identity transfer, or bridge-burden closure.",
    registry_source: path.relative(ROOT, REGISTRY_PATH),
    node_filter: { type_included: Array.from(THEOREM_TYPES) },
    summary: {
      registry_entries_total: rows.length,
      theorem_nodes: nodes.length,
      theorem_to_any_formal_edges: edges.length,
      theorem_to_theorem_edges: theoremEdges.length,
      unresolved_references: unresolved.length,
      cycles: cycles.length,
      leaves_not_used_by_other_theorems: leaves.length,
      roots_with_no_theorem_dependencies: roots.length,
      conditional_or_open_theorems: conditional.length,
      proved_but_not_human_reviewed_theorems: provedNotHumanReviewed.length
    },
    nodes,
    edges,
    theorem_edges: theoremEdges,
    cycles,
    leaves_not_used_by_other_theorems: leaves,
    roots_with_no_theorem_dependencies: roots,
    conditional_or_open_theorems: conditional,
    proved_but_not_human_reviewed_theorems: provedNotHumanReviewed,
    unresolved_references: unresolved
  };
}

function writeReport(graph) {
  const lines = [
    "# Theory Dependency Graph v1 Report",
    "",
    "## Governance boundary",
    "",
    graph.boundary,
    "",
    "## Summary",
    "",
    `- Registry entries total: ${graph.summary.registry_entries_total}`,
    `- Theorem nodes: ${graph.summary.theorem_nodes}`,
    `- Theorem-to-any-formal edges: ${graph.summary.theorem_to_any_formal_edges}`,
    `- Theorem-to-theorem edges: ${graph.summary.theorem_to_theorem_edges}`,
    `- Unresolved references: ${graph.summary.unresolved_references}`,
    `- Cycles: ${graph.summary.cycles}`,
    `- Leaves not used by other theorem nodes: ${graph.summary.leaves_not_used_by_other_theorems}`,
    `- Roots with no theorem dependencies: ${graph.summary.roots_with_no_theorem_dependencies}`,
    `- Conditional or open theorem nodes: ${graph.summary.conditional_or_open_theorems}`,
    `- Proved but not human-reviewed theorem nodes: ${graph.summary.proved_but_not_human_reviewed_theorems}`,
    "",
    "## Interpretation",
    "",
    "A zero-cycle result is a graph-structural observation only. It is not a proof of mathematical consistency. Leaves are not obsolete by default; they are simply not referenced by other theorem nodes in the machine-extracted registry.",
    ""
  ];
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, lines.join("\n"), "utf8");
}

function main() {
  const rows = readRegistry();
  const graph = buildGraph(rows);
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, `${JSON.stringify(graph, null, 2)}\n`, "utf8");
  writeReport(graph);
  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
  console.log(`Theorem nodes: ${graph.summary.theorem_nodes}`);
  console.log(`Cycles: ${graph.summary.cycles}`);
}

if (require.main === module) main();
