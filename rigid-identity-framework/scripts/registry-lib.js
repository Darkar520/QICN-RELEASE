const fs = require("fs");
const path = require("path");

const FORMAL_ENVIRONMENTS = [
  "theorem",
  "hypothesis",
  "conjecture",
  "lemma",
  "proposition",
  "corollary",
  "definition",
  "remark",
  "caveat",
  "nontheorem",
  "assumption",
  "axiom",
  "example",
  "observation",
  "criterion",
  "prediction",
  "protocol",
  "principle",
  "claim",
  "openproblem",
];

const THEOREM_LIKE = new Set([
  "theorem",
  "lemma",
  "proposition",
  "corollary",
]);

const NON_PROOF_ENVIRONMENTS = new Set([
  "definition",
  "hypothesis",
  "remark",
  "caveat",
  "assumption",
  "axiom",
  "example",
  "observation",
  "criterion",
  "prediction",
  "protocol",
  "principle",
  "nontheorem",
  "openproblem",
]);

const HEURISTIC_FORMAL_ENVIRONMENTS = new Set([
  "remark",
  "caveat",
  "example",
  "nontheorem",
  "observation",
  "prediction",
  "protocol",
  "openproblem",
]);

const STANDARD_FORMATTING_MACROS = new Set(["\\arraystretch"]);

function groupByLatexName(macros) {
  const groups = new Map();
  for (const macro of macros) {
    if (!groups.has(macro.latex_name)) groups.set(macro.latex_name, []);
    groups.get(macro.latex_name).push(macro);
  }
  return groups;
}

function uniqueMacroDefinitions(group) {
  return Array.from(new Set(group.map((item) => item.definition)));
}

function classifyMacroCollision(latexName, group) {
  const definitions = uniqueMacroDefinitions(group);
  if (STANDARD_FORMATTING_MACROS.has(latexName)) {
    return {
      active: false,
      reason: "standard_formatting_macro",
      definitions,
    };
  }
  if (group.length > 0 && group.every((item) => item.command === "newtheorem")) {
    return {
      active: false,
      reason: "theorem_environment_declaration",
      definitions,
    };
  }
  if (definitions.length <= 1) {
    return {
      active: false,
      reason: "identical_definition_repeated",
      definitions,
    };
  }
  return {
    active: true,
    reason: "distinct_active_definitions",
    definitions,
  };
}

const AUDIT_OVERRIDES = [
  {
    match: { paper: "paper1", label: "thm:stone-classification" },
    proof_status: "not_applicable",
    epistemic_status: "heuristic",
    audit_status: "corrected_to_boundary_remark",
    counterexample: {
      description:
        "Projective limits of Prob(S_t) are connected when S_t is connected; Stone duality applies to profinite clopen algebras, not arbitrary probability-measure projective limits.",
      mathematical_object: "S_t=[0,1] with Prob(S_t) under weak-* topology",
      source: "../docs/AUDIT_MASTER_v5.md Section 6",
      verified_by: "audit-agent-v5",
      date_verified: "2026-05-24",
    },
    tags: ["audit-v5", "stone-space", "topology", "demoted-to-remark"],
  },
  {
    match: { paper: "paper1", label: "thm:aleph-unique" },
    proof_status: "present",
    epistemic_status: "conditional",
    audit_status: "corrected_with_strict_convexity_hypothesis",
    counterexample: {
      description:
        "A weighted sum of metrics is not strictly convex in general; discrete metric factors give non-unique minimizers.",
      mathematical_object: "Finite discrete metric factors with tied nearest points",
      source: "../docs/AUDIT_MASTER_v5.md Section 6",
      verified_by: "audit-agent-v5",
      date_verified: "2026-05-24",
    },
    tags: ["audit-v5", "aleph", "strict-convexity", "conditional-correction"],
  },
  {
    match: { paper: "paper1", label: "thm:info-isolation" },
    proof_status: "not_applicable",
    epistemic_status: "heuristic",
    audit_status: "corrected_to_epistemic_boundary",
    counterexample: {
      description:
        "Mutual information with a deterministic set is not a well-formed random-variable claim.",
      mathematical_object: "I(prefix; I) where I is a deterministic identity set rather than a random variable",
      source: "../docs/AUDIT_MASTER_v5.md Section 6",
      verified_by: "audit-agent-v5",
      date_verified: "2026-05-24",
    },
    tags: ["audit-v5", "mutual-information", "category-boundary"],
  },
  {
    match: { paper: "paper2", label: "hyp:phi-paper2" },
    proof_status: "not_applicable",
    epistemic_status: "conditional",
    audit_status: "corrected_from_false_theorem",
    counterexample: {
      description:
        "The previous theorem form is refuted by Phi(x)=arctan(x) on R; Paper 2 now carries the lower bound as an explicit hypothesis.",
      mathematical_object: "arctan: R -> (-pi/2, pi/2)",
      source: "../docs/AUDIT_MASTER_v5.md Section 4.1",
      verified_by: "audit-agent-v5",
      date_verified: "2026-05-24",
    },
    tags: ["audit-v5", "phi-regularity", "lower-lipschitz", "demoted-to-hypothesis"],
  },
  {
    match: { paper: "basecore", label: "hyp:phi-regularity" },
    proof_status: "not_applicable",
    epistemic_status: "conditional",
    audit_status: "corrected_from_false_theorem",
    counterexample: {
      description:
        "The previous theorem form is refuted by the same arctan counterexample as Paper 2; BaseCore now carries the lower bound as an explicit hypothesis.",
      mathematical_object: "arctan: R -> (-pi/2, pi/2)",
      source: "../docs/AUDIT_MASTER_v5.md Section 4.1",
      verified_by: "audit-agent-v5",
      date_verified: "2026-05-24",
    },
    tags: ["audit-v5", "basecore", "phi-regularity", "demoted-to-hypothesis"],
  },
  {
    match: { paper: "paper3", label: "thm:instability" },
    proof_status: "present",
    epistemic_status: "conditional",
    audit_status: "corrected_pointwise_c3",
    counterexample: {
      description:
        "The proof applies a pointwise compatibility condition to sets and conflates proximity with equality.",
      mathematical_object: "C3 pointwise lower-bound clause applied to image sets Phi(I), Phi(I_tilde)",
      source: "../docs/AUDIT_MASTER_v5.md Section 6",
      verified_by: "audit-agent-v5",
      date_verified: "2026-05-24",
    },
    tags: ["audit-v5", "null-regime", "pointwise-c3"],
  },
  {
    match: { paper: "paper3", title: "Conditional Profinite Bound" },
    proof_status: "not_expected",
    epistemic_status: "conjectural",
    audit_status: "demoted_to_conjecture",
    counterexample: {
      description:
        "The proof reverses Lipschitz and triangle inequalities in the profinite coupling lower bound.",
      mathematical_object: "Lipschitz f gives upper bounds, not lower bounds; |sum a_n| need not exceed sum |a_n|",
      source: "../docs/AUDIT_MASTER_v5.md Section 6",
      verified_by: "audit-agent-v5",
      date_verified: "2026-05-24",
    },
    tags: ["audit-v5", "profinite", "demoted-to-conjecture"],
  },
  {
    match: { paper: "paper3", label: "thm:sim-cond" },
    proof_status: "present",
    epistemic_status: "conditional",
    audit_status: "corrected_to_conditional",
    counterexample: {
      description:
        "Each level-N truncation is finite and can be embedded exactly in finite-dimensional space; the asserted positive lower bound does not follow.",
      mathematical_object: "Finite set I_N with p^N points embedded exactly in R^(p^N)",
      source: "../docs/AUDIT_MASTER_v5.md Section 6",
      verified_by: "audit-agent-v5",
      date_verified: "2026-05-24",
    },
    tags: ["audit-v5", "simulation", "finite-truncation", "conditional-correction"],
  },
  {
    match: { paper: "basecore", label: "thm:minimal-positive-regime" },
    proof_status: "present",
    epistemic_status: "conditional",
    audit_status: "assumption_explicit",
    counterexample: {
      description:
        "AUDIT_MASTER_v5 reported a missing order-completeness assumption; BaseCore now states the needed positive-regime completeness assumption explicitly.",
      source: "../docs/AUDIT_MASTER_v5.md Section 6",
      verified_by: "audit-agent-v5",
      date_verified: "2026-05-24",
    },
    tags: ["audit-v5", "basecore", "assumption-explicit"],
  },
  {
    match: { paper: "basecore", label: "thm:rigidity-inheritance" },
    proof_status: "not_expected",
    epistemic_status: "conjectural",
    audit_status: "demoted_to_conjecture",
    counterexample:
      "docs/AUDIT_MASTER_v5.md identifies this BaseCore Section 05 item as originally stated without proof; it is now retained as a conjecture.",
    tags: ["audit-v5", "basecore", "demoted-to-conjecture"],
  },
  {
    match: { paper: "basecore", label: "thm:null-categorical-universality" },
    proof_status: "not_expected",
    epistemic_status: "conjectural",
    audit_status: "demoted_to_conjecture",
    counterexample:
      "docs/AUDIT_MASTER_v5.md identifies this BaseCore Section 05 item as originally stated without proof; it is now retained as a conjecture.",
    tags: ["audit-v5", "basecore", "demoted-to-conjecture"],
  },
  {
    match: { paper: "basecore", label: "thm:null-simulation-lower-bound" },
    proof_status: "not_expected",
    epistemic_status: "conjectural",
    audit_status: "demoted_to_conjecture",
    counterexample:
      "docs/AUDIT_MASTER_v5.md identifies this BaseCore Section 05 item as originally stated without proof; it is now retained as a conjecture.",
    tags: ["audit-v5", "basecore", "demoted-to-conjecture"],
  },
  {
    match: { paper: "basecore", label: "thm:null-closure-by-non-alternatives" },
    proof_status: "not_expected",
    epistemic_status: "conjectural",
    audit_status: "demoted_to_conjecture",
    counterexample:
      "docs/AUDIT_MASTER_v5.md identifies this BaseCore Section 05 item as originally stated without proof; it is now retained as a conjecture.",
    tags: ["audit-v5", "basecore", "demoted-to-conjecture"],
  },
  {
    match: { paper: "paper10", label: "thm:null-forced" },
    proof_status: "present",
    epistemic_status: "conditional",
    audit_status: "corrected_forced_choice_variant",
    counterexample: {
      description:
        "The loss treats tie as zero-loss; under H0 the always-tie rule gives R(a)=0, violating the claimed chance lower bound.",
      mathematical_object: "a(Y)=tie for all Y under loss L(a(Y),ell)=1[a(Y)!=ell and a(Y)!=tie]",
      source: "../docs/AUDIT_MASTER_v5.md Section 6",
      verified_by: "audit-agent-v5",
      date_verified: "2026-05-24",
    },
    tags: ["audit-v5", "adjudication", "null-error-bound", "forced-choice-correction"],
  },
  {
    match: { paper: "paper8", label: "thm:selfindex-emergence" },
    proof_status: "heuristic",
    epistemic_status: "conditional",
    audit_status: "proof_gap",
    counterexample:
      "docs/AUDIT_MASTER_v5.md reports undefined normalized local margins and continuity assumptions not proved in the text.",
    tags: ["audit-v5", "paper8", "proof-gap"],
  },
  {
    match: { paper: "paper8", label: "thm:ownership-nontransfer" },
    proof_status: "invalid",
    epistemic_status: "tautology",
    audit_status: "circular_definition",
    counterexample:
      "docs/AUDIT_MASTER_v5.md reports that ownership-preserving morphism is defined by invariant preservation and then restated as a prohibition.",
    tags: ["audit-v5", "paper8", "circularity"],
  },
  {
    match: { paper: "paper8", label: "thm:five-field-reduction" },
    proof_status: "sketch",
    epistemic_status: "conjectural",
    audit_status: "proof_sketch",
    counterexample:
      "docs/AUDIT_MASTER_v5.md reports that the proof is a construction sketch rather than a derivation.",
    tags: ["audit-v5", "paper8", "proof-sketch"],
  },
  {
    match: { paper: "paper9", label: "thm:predicate-independence" },
    proof_status: "not_expected",
    epistemic_status: "conjectural",
    audit_status: "demoted_to_conjecture_circular_witness",
    counterexample:
      "docs/AUDIT_MASTER_v5.md reports that the Boolean witness model sets one bit to 0 and the rest to 1, giving only an indication of independence until coupling through loss, intervention, or governance terms is ruled out.",
    tags: ["audit-v5", "paper9", "independence", "circularity", "demoted-to-conjecture"],
  },
  {
    match: { paper: "paper9", label: "thm:registry-independence" },
    proof_status: "not_expected",
    epistemic_status: "conjectural",
    audit_status: "demoted_to_conjecture_circular_witness",
    counterexample:
      "docs/AUDIT_MASTER_v5.md reports that the Boolean witness model assumes independence rather than deriving it from the B1--B10 registry; this remains conjectural until completed bridge semantics rule out implicit coupling.",
    tags: ["audit-v5", "paper9", "independence", "circularity", "demoted-to-conjecture"],
  },
  {
    match: { paper: "paper9", label: "thm:bridge-realization-exists" },
    proof_status: "heuristic",
    epistemic_status: "tautology",
    audit_status: "vacuous_non_emptiness",
    counterexample:
      "docs/AUDIT_MASTER_v5.md reports that setting all ten bits to 1 is formally non-empty but gives no realizability evidence.",
    tags: ["audit-v5", "paper9", "vacuity"],
  },
  {
    match: { paper: "paper5", label: "prop:integration-transfer" },
    proof_status: "heuristic",
    epistemic_status: "open_burden",
    audit_status: "iint_factorization_burden_open",
    counterexample: {
      description:
        "I_INT_FORMAL_BURDEN_REVIEW.md reports that prop:integration-transfer is a plausible prose consolidation argument, but not yet a typed standalone factorization-triviality theorem.",
      mathematical_object:
        "An admissible factorization category preserving histories, identity maps, and intervention responses has not yet been defined and ruled out up to trivial isomorphism.",
      source: "../docs/reports/I_INT_FORMAL_BURDEN_REVIEW.md",
      verified_by: "audit-agent-v15",
      date_verified: "2026-05-26",
    },
    curation: {
      status: "curated_open_burden",
      by: "audit-agent-v15",
      date: "2026-05-26",
      reason: "Materialized I_int overlay: no independent factorization-triviality lemma is present.",
    },
    tags: ["audit-v15", "i-int", "factorization", "open-burden", "paper5"],
  },
];

const REQUIRED_AUDIT_COVERAGE = [
  { description: "Paper 1 Stone theorem", match: { paper: "paper1", label: "thm:stone-classification" } },
  { description: "Paper 1 aleph uniqueness", match: { paper: "paper1", label: "thm:aleph-unique" } },
  { description: "Paper 1 prefix information isolation", match: { paper: "paper1", label: "thm:info-isolation" } },
  { description: "Paper 2 Phi-Regularity hypothesis", match: { paper: "paper2", label: "hyp:phi-paper2" } },
  { description: "BaseCore Phi-Regularity hypothesis", match: { paper: "basecore", label: "hyp:phi-regularity" } },
  { description: "Paper 3 instability", match: { paper: "paper3", label: "thm:instability" } },
  { description: "Paper 3 profinite coupling", match: { paper: "paper3", title: "Conditional Profinite Bound" } },
  { description: "Paper 3 simulation lower bound conditional", match: { paper: "paper3", label: "thm:sim-cond" } },
  { description: "Paper 10 null error lower bound forced-choice correction", match: { paper: "paper10", label: "thm:null-forced" } },
  { description: "Paper 8 self-index emergence", match: { paper: "paper8", label: "thm:selfindex-emergence" } },
  { description: "Paper 8 ownership nontransfer", match: { paper: "paper8", label: "thm:ownership-nontransfer" } },
  { description: "Paper 8 five-field reduction", match: { paper: "paper8", label: "thm:five-field-reduction" } },
  { description: "Paper 9 predicate independence", match: { paper: "paper9", label: "thm:predicate-independence" } },
  { description: "Paper 9 registry independence", match: { paper: "paper9", label: "thm:registry-independence" } },
  { description: "Paper 9 bridge realization exists", match: { paper: "paper9", label: "thm:bridge-realization-exists" } },
];

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizePath(filePath, root) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function walkFiles(dirPath, predicate, options = {}) {
  const results = [];
  const skip = new Set(options.skipDirs || []);

  function walk(current) {
    for (const item of fs.readdirSync(current, { withFileTypes: true })) {
      if (item.isDirectory()) {
        if (skip.has(item.name)) continue;
        walk(path.join(current, item.name));
      } else if (!predicate || predicate(path.join(current, item.name))) {
        results.push(path.join(current, item.name));
      }
    }
  }

  walk(dirPath);
  results.sort((a, b) => a.localeCompare(b));
  return results;
}

function isExcludedRegistrySnapshot(filePath, frameworkRoot) {
  const relative = normalizePath(filePath, frameworkRoot);
  const basename = path.basename(relative);
  if (relative.startsWith("docs/ai-platform-outputs/recovery-candidates/")) return true;
  if (/_v\d+\.tex$/i.test(basename)) return true;
  return /^docs\/theory\/PROJECTION_INVARIANT_BRIDGE_.*_v[^/]*\.tex$/i.test(relative);
}

function activeTexFiles(frameworkRoot, options = {}) {
  const skipDirs = options.includeLegacy
    ? ["node_modules"]
    : ["node_modules", "canonical_core_legacy", "archive", "assets", "submission", "monolithic", "reports"];
  return walkFiles(
    frameworkRoot,
    (filePath) =>
      filePath.toLowerCase().endsWith(".tex") &&
      !isExcludedRegistrySnapshot(filePath, frameworkRoot),
    { skipDirs }
  );
}

function lineOfIndex(text, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (text.charCodeAt(i) === 10) line += 1;
  }
  return line;
}

function slugify(value) {
  return String(value || "untitled")
    .normalize("NFKD")
    .replace(/[^\w\s:-]/g, "")
    .trim()
    .replace(/[:\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "untitled";
}

function paperFromPath(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/").toLowerCase();
  if (normalized.startsWith("basecore/")) return "basecore";
  if (normalized.startsWith("paper_bridge_operational_subjecthood/")) return "bridge";
  const match = normalized.match(/^(paper\d+)/);
  if (match) return match[1];
  return normalized.split("/")[0].replace(/[^a-z0-9]+/g, "-");
}

function extractFirstLabel(texBlock) {
  const match = texBlock.match(/\\label\{([^}]+)\}/);
  return match ? match[1] : null;
}

function extractRefs(texBlock) {
  const refs = new Set();
  const refPattern = /\\(?:ref|eqref|autoref|cref|Cref)\{([^}]+)\}/g;
  let match;
  while ((match = refPattern.exec(texBlock)) !== null) {
    for (const ref of match[1].split(",")) {
      const cleaned = ref.trim();
      if (cleaned) refs.add(cleaned);
    }
  }
  return Array.from(refs).sort();
}

function stripTex(value) {
  return String(value || "")
    .replace(/%.*$/gm, "")
    .replace(/\\label\{[^}]+\}/g, "")
    .replace(/\\(begin|end)\{[^}]+\}/g, "")
    .replace(/\\([a-zA-Z]+)\*?(?:\[[^\]]*\])?/g, " $1 ")
    .replace(/\\(?![a-zA-Z])/g, " ")
    .replace(/[{}$]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 800);
}

function inferProofStatus(env, followingText) {
  if (env === "conjecture") return "not_expected";
  if (NON_PROOF_ENVIRONMENTS.has(env)) return "not_applicable";
  if (!THEOREM_LIKE.has(env)) return "unknown";

  const window = followingText.slice(0, 2500);
  if (!/\\begin\{proof\}/.test(window)) return "missing";
  if (/proof\s+omitted|left\s+for\s+future|future\s+work/i.test(window)) {
    return "missing";
  }
  if (/heuristic|indication|sketch/i.test(window)) return "heuristic";
  return "present";
}

function defaultEpistemicStatus(env, proofStatus) {
  if (env === "conjecture") return "conjectural";
  if (env === "hypothesis" || env === "assumption" || env === "axiom") {
    return "conditional";
  }
  if (HEURISTIC_FORMAL_ENVIRONMENTS.has(env)) {
    return "heuristic";
  }
  if (proofStatus === "missing" || proofStatus === "heuristic" || proofStatus === "sketch") {
    return "conditional";
  }
  if (env === "definition") return "conditional";
  if (THEOREM_LIKE.has(env) && proofStatus === "present") return "proved";
  return "conditional";
}

function matchesOverride(entry, override) {
  const match = override.match || {};
  if (match.paper && entry.paper !== match.paper) return false;
  if (match.label && entry.label !== match.label) return false;
  if (match.title && entry.title !== match.title) return false;
  return Boolean(match.label || match.title);
}

function applyAuditOverrides(entry) {
  const override = AUDIT_OVERRIDES.find((item) => matchesOverride(entry, item));
  if (!override) return entry;
  const counterexample =
    typeof override.counterexample === "string"
      ? {
          description: override.counterexample,
          source: "../docs/AUDIT_MASTER_v5.md",
        }
      : override.counterexample || entry.counterexample;

  return {
    ...entry,
    proof_status: override.proof_status || entry.proof_status,
    epistemic_status: override.epistemic_status || entry.epistemic_status,
    audit_status: override.audit_status || "audit_v5_flagged",
    counterexample,
    curation_status: "audit_overlaid",
    curation: override.curation || {
      status: "curated",
      by: "audit-agent-v8",
      date: "2026-05-25",
      reason: override.audit_status || "AUDIT_MASTER_v5 overlay applied by FCR",
    },
    tags: Array.from(new Set([...(entry.tags || []), ...(override.tags || [])])).sort(),
    history: [
      ...(entry.history || []),
      {
        date: "2026-05-24",
        action: "audit_v5_overlay",
        reason: override.audit_status || "flagged by AUDIT_MASTER_v5",
      },
    ],
  };
}

function extractFormalEnvironments(frameworkRoot, options = {}) {
  const envPattern = FORMAL_ENVIRONMENTS.join("|");
  const beginPattern = new RegExp(`\\\\begin\\{(${envPattern})\\}(?:\\s*\\[([^\\]]*)\\])?`, "g");
  const entries = [];

  for (const filePath of activeTexFiles(frameworkRoot, options)) {
    const text = readText(filePath);
    const relative = normalizePath(filePath, frameworkRoot);
    const paper = paperFromPath(relative);
    let match;

    while ((match = beginPattern.exec(text)) !== null) {
      const env = match[1];
      const title = (match[2] || "").replace(/\s+/g, " ").trim();
      const startIndex = match.index;
      const contentStart = beginPattern.lastIndex;
      const endIndex = findEnvironmentEnd(text, env, contentStart);
      if (endIndex === -1) continue;
      const endToken = `\\end{${env}}`;
      const blockEndIndex = endIndex + endToken.length;
      const texBlock = text.slice(startIndex, blockEndIndex);
      const proofBlock = extractImmediateProofBlock(text, blockEndIndex);
      const lineStart = lineOfIndex(text, startIndex);
      const lineEnd = lineOfIndex(text, blockEndIndex);
      const label = extractFirstLabel(texBlock);
      const proofStatus = inferProofStatus(env, text.slice(blockEndIndex));
      const idCore = label ? slugify(label) : `${slugify(title || env)}-l${lineStart}`;
      const refs = Array.from(new Set([...extractRefs(texBlock), ...extractRefs(proofBlock)])).sort();
      const entry = applyAuditOverrides({
        id: `${paper}:${env}:${idCore}`,
        type: env,
        paper,
        section: null,
        title: title || null,
        label,
        statement: stripTex(texBlock).slice(0, 800),
        statement_tex: texBlock.trim(),
        proof_status: proofStatus,
        proof: proofBlock ? "proof_block_present_in_source" : null,
        depends_on: [],
        refs,
        location: {
          file: relative,
          line_start: lineStart,
          line_end: lineEnd,
        },
        epistemic_status: defaultEpistemicStatus(env, proofStatus),
        counterexample: null,
        curation_status: "draft_extracted",
        curation: {
          status: "draft_extracted",
          by: null,
          date: null,
          reason: null,
        },
        tags: ["draft-extracted"],
        history: [
          {
            date: "2026-05-24",
            action: "extracted_from_tex",
            reason: "FCR v6 bootstrap; requires human mathematical curation before being treated as canonical.",
          },
        ],
      });

      entries.push(entry);
      beginPattern.lastIndex = blockEndIndex;
    }
  }

  entries.sort((a, b) => {
    const fileCmp = a.location.file.localeCompare(b.location.file);
    return fileCmp || a.location.line_start - b.location.line_start;
  });
  dedupeEntryIds(entries);
  populateDependencies(entries);
  return entries;
}

function populateDependencies(entries) {
  const labelToIds = new Map();
  for (const entry of entries) {
    if (!entry.label) continue;
    if (!labelToIds.has(entry.label)) labelToIds.set(entry.label, []);
    labelToIds.get(entry.label).push(entry.id);
  }

  for (const entry of entries) {
    const deps = new Set();
    for (const ref of entry.refs || []) {
      const candidates = labelToIds.get(ref);
      if (!candidates || candidates.length === 0) continue;
      const samePaper = candidates.find((id) => id.startsWith(`${entry.paper}:`) && id !== entry.id);
      const nonSelf = candidates.find((id) => id !== entry.id);
      const selected = samePaper || nonSelf;
      if (selected) deps.add(selected);
    }
    entry.depends_on = Array.from(deps).sort();
  }
}

function dedupeEntryIds(entries) {
  const counts = new Map();
  for (const entry of entries) {
    counts.set(entry.id, (counts.get(entry.id) || 0) + 1);
  }
  const seen = new Map();
  for (const entry of entries) {
    if (counts.get(entry.id) <= 1) continue;
    const originalId = entry.id;
    const index = (seen.get(originalId) || 0) + 1;
    seen.set(originalId, index);
    const fileSlug = slugify(entry.location.file.replace(/\.tex$/i, ""));
    entry.id = `${originalId}-${fileSlug}-l${entry.location.line_start}`;
    entry.history = [
      ...(entry.history || []),
      {
        date: "2026-05-24",
        action: "deduplicated_registry_id",
        reason: `Original label-derived id ${originalId} appeared ${counts.get(originalId)} times when case and punctuation were normalized; occurrence ${index} was disambiguated by file and line.`,
      },
    ];
  }
}

function findBalancedBraceEnd(text, openBraceIndex) {
  let depth = 0;
  for (let i = openBraceIndex; i < text.length; i += 1) {
    const ch = text[i];
    const prev = i > 0 ? text[i - 1] : "";
    if (ch === "{" && prev !== "\\") depth += 1;
    if (ch === "}" && prev !== "\\") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findEnvironmentEnd(text, envName, searchStart) {
  const openToken = `\\begin{${envName}}`;
  const closeToken = `\\end{${envName}}`;
  let depth = 1;
  let index = searchStart;

  while (index < text.length && depth > 0) {
    const nextOpen = text.indexOf(openToken, index);
    const nextClose = text.indexOf(closeToken, index);
    if (nextClose === -1) return -1;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      index = nextOpen + openToken.length;
      continue;
    }
    depth -= 1;
    if (depth === 0) return nextClose;
    index = nextClose + closeToken.length;
  }

  return -1;
}

function extractImmediateProofBlock(text, searchStart) {
  const after = text.slice(searchStart);
  const match = after.match(/^\s*\\begin\{proof\}(?:\[[^\]]*\])?/);
  if (!match) return "";
  const proofStart = searchStart + match.index;
  const contentStart = searchStart + match[0].length;
  const endIndex = findEnvironmentEnd(text, "proof", contentStart);
  if (endIndex === -1) return "";
  return text.slice(proofStart, endIndex + "\\end{proof}".length);
}

function extractMacroDefinitions(frameworkRoot, options = {}) {
  const newcmdPattern = /\\(newcommand|renewcommand|providecommand)\s*\{\\([A-Za-z]+)\}\s*(?:\[(\d+)\])?\s*(?:\[[^\]]*\])?\s*\{/g;
  const defPattern = /\\def\\([A-Za-z]+)\s*\{/g;
  const declOpPattern = /\\DeclareMathOperator\{\\([A-Za-z]+)\}\{([^}]*)\}/g;
  const newenvPattern = /\\newenvironment\{([^}]+)\}\s*(?:\[(\d+)\])?\s*(?:\[[^\]]*\])?\s*\{/g;
  const newtheoremPattern = /\\newtheorem\{([^}]+)\}(?:\[[^\]]+\])?\{([^}]+)\}(?:\[[^\]]+\])?/g;
  const macros = [];

  for (const filePath of activeTexFiles(frameworkRoot, options)) {
    const text = readText(filePath);
    const relative = normalizePath(filePath, frameworkRoot);
    const owner = paperFromPath(relative);
    let match;

    while ((match = newcmdPattern.exec(text)) !== null) {
      const command = match[1];
      const name = match[2];
      const arity = match[3] ? Number(match[3]) : 0;
      const definitionOpen = newcmdPattern.lastIndex - 1;
      const definitionEnd = findBalancedBraceEnd(text, definitionOpen);
      if (definitionEnd === -1) continue;
      const definition = text.slice(definitionOpen + 1, definitionEnd).trim();
      const lineStart = lineOfIndex(text, match.index);
      const canonical = owner === "basecore" && command === "newcommand";
      macros.push(createMacroRecord(name, `\\${name}`, definition, arity, owner, command, canonical, relative, lineStart, lineOfIndex(text, definitionEnd)));
      newcmdPattern.lastIndex = definitionEnd + 1;
    }

    while ((match = defPattern.exec(text)) !== null) {
      const name = match[1];
      const definitionOpen = defPattern.lastIndex - 1;
      const definitionEnd = findBalancedBraceEnd(text, definitionOpen);
      if (definitionEnd === -1) continue;
      const definition = text.slice(definitionOpen + 1, definitionEnd).trim();
      const lineStart = lineOfIndex(text, match.index);
      macros.push(createMacroRecord(name, `\\${name}`, definition, 0, owner, "def", false, relative, lineStart, lineOfIndex(text, definitionEnd)));
      defPattern.lastIndex = definitionEnd + 1;
    }

    while ((match = declOpPattern.exec(text)) !== null) {
      const name = match[1];
      const definition = match[2].trim();
      const lineStart = lineOfIndex(text, match.index);
      macros.push(createMacroRecord(name, `\\${name}`, definition, 0, owner, "DeclareMathOperator", false, relative, lineStart, lineStart));
    }

    while ((match = newenvPattern.exec(text)) !== null) {
      const name = match[1];
      const arity = match[2] ? Number(match[2]) : 0;
      const beginOpen = newenvPattern.lastIndex - 1;
      const beginEnd = findBalancedBraceEnd(text, beginOpen);
      if (beginEnd === -1) continue;
      let endOpen = beginEnd + 1;
      while (endOpen < text.length && /\s/.test(text[endOpen])) endOpen += 1;
      if (text[endOpen] !== "{") continue;
      const endEnd = findBalancedBraceEnd(text, endOpen);
      if (endEnd === -1) continue;
      const beginDef = text.slice(beginOpen + 1, beginEnd).trim();
      const endDef = text.slice(endOpen + 1, endEnd).trim();
      const lineStart = lineOfIndex(text, match.index);
      macros.push(createMacroRecord(name, `\\begin{${name}}`, `BEGIN:${beginDef} END:${endDef}`, arity, owner, "newenvironment", false, relative, lineStart, lineOfIndex(text, endEnd)));
      newenvPattern.lastIndex = endEnd + 1;
    }

    while ((match = newtheoremPattern.exec(text)) !== null) {
      const name = match[1];
      const definition = match[2].trim();
      const lineStart = lineOfIndex(text, match.index);
      macros.push(createMacroRecord(name, `\\begin{${name}}`, definition, 0, owner, "newtheorem", false, relative, lineStart, lineStart));
    }
  }

  const byName = new Map();
  for (const macro of macros) {
    if (!byName.has(macro.latex_name)) byName.set(macro.latex_name, []);
    byName.get(macro.latex_name).push(macro);
  }

  for (const group of byName.values()) {
    const definitions = new Set(group.map((item) => item.definition));
    const risk = definitions.size > 1 ? "high" : group.length > 1 ? "medium" : "low";
    const canonical = group.find((item) => item.canonical);
    for (const macro of group) {
      macro.collision_risk = risk;
      if (canonical && macro !== canonical) {
        canonical.aliases.push(`${macro.owner}:${macro.latex_name}`);
      }
      if (risk === "high") {
        macro.notes = `${macro.notes} Collision detected: same macro name has multiple definitions in the active corpus.`;
      }
    }
  }

  macros.sort((a, b) => {
    const nameCmp = a.latex_name.localeCompare(b.latex_name);
    if (nameCmp) return nameCmp;
    return a.location.file.localeCompare(b.location.file);
  });
  return macros;
}

function createMacroRecord(name, latexName, definition, arity, owner, command, canonical, file, lineStart, lineEnd) {
  return {
    name,
    latex_name: latexName,
    definition,
    arity,
    owner,
    command,
    canonical,
    aliases: [],
    collision_risk: "low",
    notes: canonical
      ? "Extracted from active BaseCore preamble; treated as canonical until a curated macro map supersedes it."
      : "Extracted from downstream or non-canonical source; compare against BaseCore before reuse.",
    location: {
      file,
      line_start: lineStart,
      line_end: lineEnd,
    },
  };
}

function writeJsonl(filePath, records) {
  ensureDir(path.dirname(filePath));
  const body = records.map((record) => JSON.stringify(record)).join("\n");
  fs.writeFileSync(filePath, body ? `${body}\n` : "", "utf8");
}

function readJsonl(filePath) {
  const records = [];
  const errors = [];
  if (!fs.existsSync(filePath)) {
    return { records, errors: [`Missing JSONL file: ${filePath}`] };
  }

  const lines = readText(filePath).split("\n");
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    try {
      records.push(JSON.parse(trimmed));
    } catch (error) {
      errors.push(`${filePath}:${index + 1}: ${error.message}`);
    }
  });
  return { records, errors };
}

function collectLabelsAndRefs(frameworkRoot, options = {}) {
  const labels = new Set();
  const refs = [];
  const labelPattern = /\\label\{([^}]+)\}/g;
  const refPattern = /\\(?:ref|eqref|autoref|cref|Cref)\{([^}]+)\}/g;

  for (const filePath of activeTexFiles(frameworkRoot, options)) {
    const text = readText(filePath);
    const relative = normalizePath(filePath, frameworkRoot);
    let match;

    while ((match = labelPattern.exec(text)) !== null) {
      labels.add(match[1]);
    }
    while ((match = refPattern.exec(text)) !== null) {
      for (const ref of match[1].split(",")) {
        const cleaned = ref.trim();
        if (!cleaned) continue;
        refs.push({
          ref: cleaned,
          file: relative,
          line: lineOfIndex(text, match.index),
        });
      }
    }
  }

  return { labels, refs };
}

function validateNoCycles(entries) {
  const blockers = [];
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const visiting = new Set();
  const visited = new Set();

  function visit(id, trail) {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      blockers.push(`Dependency cycle detected: ${[...trail, id].join(" -> ")}`);
      return;
    }
    visiting.add(id);
    const entry = byId.get(id);
    for (const dep of entry?.depends_on || []) {
      if (byId.has(dep)) visit(dep, [...trail, id]);
    }
    visiting.delete(id);
    visited.add(id);
  }

  for (const entry of entries) visit(entry.id, []);
  return blockers;
}

function validateCorpus(frameworkRoot, options = {}) {
  const registryDir = path.join(frameworkRoot, "registry");
  const theoremPath = path.join(registryDir, "theorems.jsonl");
  const macroPath = path.join(registryDir, "macros.jsonl");
  const theoremLoad = readJsonl(theoremPath);
  const macroLoad = readJsonl(macroPath);
  const entries = theoremLoad.records;
  const macros = macroLoad.records;
  const blockers = [...theoremLoad.errors, ...macroLoad.errors];
  const warnings = [];

  const ids = new Map();
  for (const entry of entries) {
    if (!entry.id) blockers.push(`Registry entry without id at ${entry.location?.file || "unknown"}`);
    if (ids.has(entry.id)) blockers.push(`Duplicate registry id: ${entry.id}`);
    ids.set(entry.id, entry);
  }

  for (const entry of entries) {
    for (const field of ["id", "type", "paper", "epistemic_status", "proof_status", "location", "curation_status", "curation"]) {
      if (entry[field] === undefined || entry[field] === null) {
        blockers.push(`${entry.id || "unknown"} missing required field: ${field}`);
      }
    }
    if (entry.epistemic_status === "false" && !entry.counterexample?.description) {
      blockers.push(`${entry.id} is false but lacks counterexample.description`);
    }
    if (
      entry.type === "theorem" &&
      entry.epistemic_status === "canonical" &&
      ["missing", "sketch", "heuristic", "invalid"].includes(entry.proof_status)
    ) {
      blockers.push(`${entry.id} is canonical theorem with non-final proof_status=${entry.proof_status}`);
    }
    for (const dep of entry.depends_on || []) {
      if (!ids.has(dep)) blockers.push(`${entry.id} depends on missing registry id ${dep}`);
    }
  }
  blockers.push(...validateNoCycles(entries));

  for (const required of REQUIRED_AUDIT_COVERAGE) {
    const entry = entries.find((candidate) => matchesOverride(candidate, required));
    if (!entry) {
      blockers.push(`Required AUDIT_MASTER_v5 coverage missing from FCR: ${required.description}`);
      continue;
    }
    if (!entry.audit_status) {
      blockers.push(`Required AUDIT_MASTER_v5 entry lacks audit_status overlay: ${required.description}`);
    }
    if (entry.epistemic_status === "false" && !entry.counterexample?.description) {
      blockers.push(`Required false audit entry lacks counterexample metadata: ${required.description}`);
    }
  }

  const canonicalMacroNames = new Map();
  const macroGroups = groupByLatexName(macros);
  for (const macro of macros) {
    if (!macro.latex_name || !macro.owner) {
      blockers.push(`Macro entry missing latex_name or owner: ${JSON.stringify(macro)}`);
      continue;
    }
    if (macro.canonical) {
      if (canonicalMacroNames.has(macro.latex_name)) {
        blockers.push(`Multiple canonical macro entries for ${macro.latex_name}`);
      }
      canonicalMacroNames.set(macro.latex_name, macro);
    }
  }
  const activeMacroCollisions = [];
  for (const [latexName, group] of macroGroups.entries()) {
    const classification = classifyMacroCollision(latexName, group);
    if (classification.active) {
      activeMacroCollisions.push({ latexName, group, classification });
      warnings.push(`${latexName} has ${classification.definitions.length} distinct definitions across active corpus`);
    }
  }

  const { labels, refs } = collectLabelsAndRefs(frameworkRoot, options);
  const entryLabels = new Set(entries.map((entry) => entry.label).filter(Boolean));
  for (const item of refs) {
    if (!labels.has(item.ref)) {
      const message = `${item.file}:${item.line} references missing label ${item.ref}`;
      if (options.strictCrossRefs) blockers.push(message);
      else warnings.push(message);
    } else if (/^(thm|lem|prop|cor|def|hyp|ass|ax|rem|conj):/.test(item.ref) && !entryLabels.has(item.ref)) {
      warnings.push(`${item.file}:${item.line} references formal label ${item.ref} not represented in FCR`);
    }
  }

  const stats = {
    entries: entries.length,
    macros: macros.length,
    false_entries: entries.filter((entry) => entry.epistemic_status === "false").length,
    proved_entries: entries.filter((entry) => entry.epistemic_status === "proved").length,
    conditional_entries: entries.filter((entry) => entry.epistemic_status === "conditional").length,
    heuristic_entries: entries.filter((entry) => entry.epistemic_status === "heuristic").length,
    theorem_entries: entries.filter((entry) => entry.type === "theorem").length,
    hypothesis_entries: entries.filter((entry) => entry.type === "hypothesis").length,
    conjecture_entries: entries.filter((entry) => entry.type === "conjecture").length,
    audit_overlaid_entries: entries.filter((entry) => entry.audit_status).length,
    high_risk_macros: activeMacroCollisions.reduce((sum, item) => sum + item.group.length, 0),
    macro_collision_groups: activeMacroCollisions.length,
  };

  return { blockers, warnings, stats, entries, macros };
}

function markdownValidationReport(result) {
  const lines = [
    "# FCR Validation Report",
    "",
    `- Formal entries: ${result.stats.entries}`,
    `- Macro entries: ${result.stats.macros}`,
    `- Theorem entries: ${result.stats.theorem_entries}`,
    `- Hypothesis entries: ${result.stats.hypothesis_entries}`,
    `- Conjecture entries: ${result.stats.conjecture_entries}`,
    `- Audit-overlaid entries: ${result.stats.audit_overlaid_entries}`,
    `- False-status entries: ${result.stats.false_entries}`,
    `- Proved-status entries: ${result.stats.proved_entries}`,
    `- Conditional-status entries: ${result.stats.conditional_entries}`,
    `- Heuristic-status entries: ${result.stats.heuristic_entries}`,
    `- Active macro-collision entries: ${result.stats.high_risk_macros}`,
    `- Active macro-collision groups: ${result.stats.macro_collision_groups}`,
    "",
    "## Blockers",
    "",
  ];
  if (result.blockers.length === 0) lines.push("None.");
  else result.blockers.forEach((item) => lines.push(`- ${item}`));
  lines.push("", "## Warnings", "");
  if (result.warnings.length === 0) lines.push("None.");
  else result.warnings.slice(0, 250).forEach((item) => lines.push(`- ${item}`));
  if (result.warnings.length > 250) {
    lines.push(`- ... ${result.warnings.length - 250} additional warnings omitted from console report.`);
  }
  return `${lines.join("\n")}\n`;
}

module.exports = {
  AUDIT_OVERRIDES,
  FORMAL_ENVIRONMENTS,
  activeTexFiles,
  classifyMacroCollision,
  ensureDir,
  extractFormalEnvironments,
  extractMacroDefinitions,
  groupByLatexName,
  markdownValidationReport,
  normalizePath,
  readJsonl,
  stripTex,
  uniqueMacroDefinitions,
  validateCorpus,
  walkFiles,
  writeJsonl,
};
