const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const HASH_EXCLUDED_TOP_LEVEL_FIELDS = new Set(["package_sha256"]);
const PACKAGE_HASH_METHOD = "sha256(stable_json(package_without_top_level_package_sha256))";

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash("sha256").update(typeof value === "string" ? value : stableJson(value)).digest("hex");
}

function packageDigestObject(pkg) {
  const clone = {};
  for (const key of Object.keys(pkg || {}).sort()) {
    if (HASH_EXCLUDED_TOP_LEVEL_FIELDS.has(key)) continue;
    clone[key] = pkg[key];
  }
  return clone;
}

function packageSha256(pkg) {
  return sha256(packageDigestObject(pkg));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function assertUnique(ids, label, failures) {
  const seen = new Set();
  for (const id of ids) {
    if (!id || typeof id !== "string") failures.push(`${label} contains a missing or non-string id.`);
    if (seen.has(id)) failures.push(`${label} contains duplicate id: ${id}`);
    seen.add(id);
  }
}

function buildAdjacency(pkg) {
  const vertices = [
    ...(pkg.separators || []).map((item) => item.id),
    ...(pkg.responses || []).map((item) => item.id)
  ];
  const adjacency = new Map(vertices.map((id) => [id, new Set()]));
  for (const edge of pkg.incidence_edges || []) {
    if (!adjacency.has(edge.separator_id)) adjacency.set(edge.separator_id, new Set());
    if (!adjacency.has(edge.response_id)) adjacency.set(edge.response_id, new Set());
    adjacency.get(edge.separator_id).add(edge.response_id);
    adjacency.get(edge.response_id).add(edge.separator_id);
  }
  return adjacency;
}

function connectedComponents(adjacency) {
  const components = [];
  const visited = new Set();
  for (const start of adjacency.keys()) {
    if (visited.has(start)) continue;
    const component = [];
    const queue = [start];
    visited.add(start);
    for (let i = 0; i < queue.length; i += 1) {
      const node = queue[i];
      component.push(node);
      for (const next of adjacency.get(node) || []) {
        if (!visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }
    components.push(component.sort());
  }
  return components.sort((a, b) => a[0].localeCompare(b[0]));
}

function enumerateCanonicalCuts(vertices) {
  const sorted = [...vertices].sort();
  if (sorted.length === 0) return [];
  if (sorted.length > 30) throw new Error("Cut enumeration is exponential and capped at 30 vertices.");
  const anchor = sorted[0];
  const rest = sorted.slice(1);
  const cuts = [];
  const limit = 2 ** rest.length;
  for (let mask = 0; mask < limit; mask += 1) {
    const left = new Set([anchor]);
    const right = new Set();
    for (let i = 0; i < rest.length; i += 1) {
      if (mask & (1 << i)) left.add(rest[i]);
      else right.add(rest[i]);
    }
    if (right.size === 0) continue;
    cuts.push({ left: [...left].sort(), right: [...right].sort() });
  }
  return cuts;
}

function crossingEdgesForCut(pkg, cut) {
  const left = new Set(cut.left);
  const right = new Set(cut.right);
  const crossing = [];
  for (const edge of pkg.incidence_edges || []) {
    const a = edge.separator_id;
    const b = edge.response_id;
    if ((left.has(a) && right.has(b)) || (right.has(a) && left.has(b))) {
      crossing.push(edge.id || `${a}<->${b}`);
    }
  }
  return crossing;
}

function isNontrivialFactorCut(pkg, cut) {
  const left = new Set(cut.left);
  const right = new Set(cut.right);
  const separatorIds = new Set((pkg.separators || []).map((item) => item.id));
  const responseIds = new Set((pkg.responses || []).map((item) => item.id));
  function counts(side) {
    let separators = 0;
    let responses = 0;
    for (const id of side) {
      if (separatorIds.has(id)) separators += 1;
      if (responseIds.has(id)) responses += 1;
    }
    return { separators, responses };
  }
  const leftCounts = counts(left);
  const rightCounts = counts(right);
  return leftCounts.separators > 0 && rightCounts.separators > 0 && leftCounts.responses > 0 && rightCounts.responses > 0;
}

function summarizeFiniteSeparatorPackage(pkg, options = {}) {
  const separators = pkg.separators || [];
  const responses = pkg.responses || [];
  const edges = pkg.incidence_edges || [];
  const evidence = pkg.perturbation_records || [];
  const separatorIds = new Set(separators.map((item) => item.id));
  const responseIds = new Set(responses.map((item) => item.id));
  const adjacency = buildAdjacency(pkg);
  const components = connectedComponents(adjacency);
  const connected = components.length === 1 && separators.length > 0 && responses.length > 0;
  const vertices = [...separatorIds, ...responseIds].sort();
  const cuts = enumerateCanonicalCuts(vertices);
  const nontrivialCuts = cuts.filter((cut) => isNontrivialFactorCut(pkg, cut));
  const factorLocalCuts = [];
  for (const cut of nontrivialCuts) {
    const crossing = crossingEdgesForCut(pkg, cut);
    if (crossing.length === 0) factorLocalCuts.push(cut);
  }
  return {
    counts: {
      separators: separators.length,
      responses: responses.length,
      incidence_edges: edges.length,
      perturbation_records: evidence.length,
      connected_components: components.length,
      enumerated_binary_cuts: cuts.length,
      enumerated_nontrivial_factor_cuts: nontrivialCuts.length,
      factor_local_zero_crossing_cuts: factorLocalCuts.length
    },
    graph: {
      connected,
      components,
      factor_local_zero_crossing_cuts: factorLocalCuts.slice(0, options.maxCuts || 16)
    }
  };
}

function compareDeclaredAuditMetadata(pkg, summary, failures, warnings) {
  const declared = pkg.declared_audit_metadata;
  if (!declared) {
    warnings.push("declared_audit_metadata is absent; v22 packages should store derived cut/connectivity counts inside the package.");
    return;
  }
  const declaredCounts = declared.counts || {};
  for (const [key, value] of Object.entries(summary.counts)) {
    if (declaredCounts[key] !== value) {
      failures.push(`declared_audit_metadata.counts.${key}=${declaredCounts[key]} does not match recomputed value ${value}.`);
    }
  }
  if (declared.graph_connected !== summary.graph.connected) {
    failures.push(`declared_audit_metadata.graph_connected=${declared.graph_connected} does not match recomputed value ${summary.graph.connected}.`);
  }
  if (declared.factor_local_zero_crossing_cuts !== summary.counts.factor_local_zero_crossing_cuts) {
    failures.push("declared factor_local_zero_crossing_cuts does not match recomputed cut enumeration.");
  }
}

function validateFiniteSeparatorPackage(pkg, options = {}) {
  const failures = [];
  const warnings = [];
  if (!pkg || typeof pkg !== "object") failures.push("Package is not an object.");
  if (!pkg.package_id) failures.push("package_id is required.");
  if (!pkg.governance_boundary || !pkg.governance_boundary.includes("does not certify external support")) {
    failures.push("governance_boundary must state that the package does not certify external support.");
  }
  if (pkg.status !== "internal_synthetic_witness") {
    warnings.push("status should be internal_synthetic_witness unless this package has external evidence.");
  }
  if (!pkg.independence_boundary || /atomicity is assumed/i.test(pkg.independence_boundary)) {
    failures.push("independence_boundary must state construction without assuming atomicity.");
  }

  const separators = pkg.separators || [];
  const responses = pkg.responses || [];
  const edges = pkg.incidence_edges || [];
  const evidence = pkg.perturbation_records || [];
  assertUnique(separators.map((item) => item.id), "separators", failures);
  assertUnique(responses.map((item) => item.id), "responses", failures);
  assertUnique(edges.map((item) => item.id), "incidence_edges", failures);
  assertUnique(evidence.map((item) => item.id), "perturbation_records", failures);

  const separatorIds = new Set(separators.map((item) => item.id));
  const responseIds = new Set(responses.map((item) => item.id));
  const evidenceById = new Map(evidence.map((item) => [item.id, item]));
  const catalog = new Set(pkg.separator_catalog || []);
  if (catalog.size !== separatorIds.size || [...separatorIds].some((id) => !catalog.has(id))) {
    failures.push("separator_catalog must exactly match separators[].id for finite separator completeness.");
  }
  for (const response of responses) {
    if (!response.coordinate || typeof response.coordinate !== "string") failures.push(`response ${response.id} is missing coordinate.`);
  }
  for (const sep of separators) {
    if (!sep.test || typeof sep.test !== "string") failures.push(`separator ${sep.id} is missing a test description.`);
    if (!sep.admission_rule || typeof sep.admission_rule !== "string") warnings.push(`separator ${sep.id} should declare an admission_rule for independent catalog review.`);
  }
  for (const edge of edges) {
    if (!separatorIds.has(edge.separator_id)) failures.push(`edge ${edge.id} references unknown separator ${edge.separator_id}.`);
    if (!responseIds.has(edge.response_id)) failures.push(`edge ${edge.id} references unknown response ${edge.response_id}.`);
    if (!evidenceById.has(edge.evidence_id)) failures.push(`edge ${edge.id} references unknown evidence ${edge.evidence_id}.`);
    const ev = evidenceById.get(edge.evidence_id);
    if (ev) {
      if (ev.separator_id !== edge.separator_id || ev.response_id !== edge.response_id) {
        failures.push(`evidence ${ev.id} does not match edge ${edge.id}.`);
      }
      if (ev.identity_typing_preserved !== true || ev.history_typing_preserved !== true) {
        failures.push(`evidence ${ev.id} does not preserve identity/history typing.`);
      }
      if (!(Number(ev.delta_margin) > 0)) failures.push(`evidence ${ev.id} must have positive delta_margin.`);
      if (!ev.predeclared_measurement_rule) warnings.push(`evidence ${ev.id} should include a predeclared_measurement_rule.`);
    }
  }

  const separatorIncident = new Map([...separatorIds].map((id) => [id, 0]));
  const responseIncident = new Map([...responseIds].map((id) => [id, 0]));
  for (const edge of edges) {
    if (separatorIncident.has(edge.separator_id)) separatorIncident.set(edge.separator_id, separatorIncident.get(edge.separator_id) + 1);
    if (responseIncident.has(edge.response_id)) responseIncident.set(edge.response_id, responseIncident.get(edge.response_id) + 1);
  }
  const nonOperativeSeparators = [...separatorIncident.entries()].filter(([, count]) => count === 0).map(([id]) => id);
  const isolatedResponses = [...responseIncident.entries()].filter(([, count]) => count === 0).map(([id]) => id);
  if (nonOperativeSeparators.length > 0) failures.push(`non-operative separator vertices: ${nonOperativeSeparators.join(", ")}`);
  if (isolatedResponses.length > 0) failures.push(`isolated response vertices: ${isolatedResponses.join(", ")}`);

  const summary = summarizeFiniteSeparatorPackage(pkg, options);
  compareDeclaredAuditMetadata(pkg, summary, failures, warnings);

  const actualPackageSha = packageSha256(pkg);
  const declaredPackageSha = pkg.package_sha256 || null;
  if (!declaredPackageSha) {
    failures.push("package_sha256 is required.");
  } else if (declaredPackageSha !== actualPackageSha) {
    failures.push(`package_sha256 mismatch: declared ${declaredPackageSha}, recomputed ${actualPackageSha}.`);
  }
  if (pkg.package_hash_method && pkg.package_hash_method !== PACKAGE_HASH_METHOD) {
    failures.push(`package_hash_method must be ${PACKAGE_HASH_METHOD}.`);
  }

  const connected = summary.graph.connected;
  const factorLocalCuts = summary.graph.factor_local_zero_crossing_cuts;
  const passes = failures.length === 0 && connected && summary.counts.factor_local_zero_crossing_cuts === 0;
  const result = {
    package_id: pkg.package_id || null,
    package_sha256: actualPackageSha,
    declared_package_sha256: declaredPackageSha,
    package_hash_method: PACKAGE_HASH_METHOD,
    hash_verified: declaredPackageSha === actualPackageSha,
    result: passes ? "PASS" : "FAIL",
    failures,
    warnings,
    counts: summary.counts,
    graph: summary.graph,
    certificate_interpretation: passes
      ? "The finite package is separator-complete relative to its declared separator catalog and finite response-coordinate universe; connectedness blocks factor-local decomposition over the enumerated finite cuts. This is a conditional finite witness, not empirical validation or a global theorem over undeclared systems."
      : "The finite package does not support the connected-incidence atomicity certificate."
  };
  if (!connected) result.failures.push("incidence graph is not connected.");
  if (summary.counts.factor_local_zero_crossing_cuts > 0) result.failures.push("at least one nontrivial factor-local zero-crossing cut exists.");
  return result;
}

function attachAuditMetadataAndHash(pkg) {
  const summary = summarizeFiniteSeparatorPackage(pkg);
  const enriched = {
    ...pkg,
    package_hash_method: PACKAGE_HASH_METHOD,
    declared_audit_metadata: {
      counts: summary.counts,
      graph_connected: summary.graph.connected,
      factor_local_zero_crossing_cuts: summary.counts.factor_local_zero_crossing_cuts,
      enumerator: "scripts/lib/finite-separator-incidence.js::summarizeFiniteSeparatorPackage",
      interpretation_boundary: "Metadata is derived from the finite declared graph only; it is not empirical support and not global separator completeness."
    }
  };
  enriched.package_sha256 = packageSha256(enriched);
  return enriched;
}

module.exports = {
  stableJson,
  sha256,
  packageDigestObject,
  packageSha256,
  PACKAGE_HASH_METHOD,
  readJson,
  writeJson,
  validateFiniteSeparatorPackage,
  summarizeFiniteSeparatorPackage,
  attachAuditMetadataAndHash,
  buildAdjacency,
  connectedComponents,
  enumerateCanonicalCuts,
  crossingEdgesForCut
};
