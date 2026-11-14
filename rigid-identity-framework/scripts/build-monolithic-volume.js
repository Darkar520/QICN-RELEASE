const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const MONO_DIR = path.join(ROOT, "monolithic");
const BUILD_DIR = path.join(MONO_DIR, "build");
const SECTION_DIR = path.join(BUILD_DIR, "sections");
const PREAMBLE_DIR = path.join(MONO_DIR, "preamble");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "MONOLITHIC_BUILD_REPORT.md");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const SOURCES = [
  {
    kind: "basecore",
    title: "Mathematical Foundations for Controlled Projective Systems",
    relPath: "basecore/BASECORE.tex",
    sectionName: "01-basecore.tex"
  },
  {
    kind: "paper",
    number: 1,
    title: "Projective Compatibility and Sectorial Deformation Resistance",
    relPath: "paper1/main.tex",
    sectionName: "02-rigid-identity-as-an-inverse-limit-in-observable-channels.tex"
  },
  {
    kind: "paper",
    number: 2,
    title: "Controlled Structural Assignments on Projective Limits",
    relPath: "paper2/main.tex",
    sectionName: "03-phenomenological-regimes-induced-by-structural-identity.tex"
  },
  {
    kind: "paper",
    number: 3,
    title: "Witness-Relative Exclusion of Joint Null Readouts",
    relPath: "paper3/main.tex",
    sectionName: "04-structural-instability-of-the-phenomenological-null-regime.tex"
  },
  {
    kind: "paper",
    number: 4,
    title: "Reproducible Intervention and Comparator Protocols",
    relPath: "paper4/main.tex",
    sectionName: "05-falsifiable-predictions-under-forensic-constraints.tex"
  },
  {
    kind: "paper",
    number: 5,
    title: "A Six-Predicate Operational Criterion and Certified Response Classes",
    relPath: "paper5_operational_consciousness/main.tex",
    sectionName: "06-structural-criterion-for-substrate-invariant-operational-consciousness.tex"
  },
  {
    kind: "paper",
    number: 6,
    title: "Prediction Contracts, Controls, and Evidence Status",
    relPath: "paper6_predictions_falsation/main.tex",
    sectionName: "07-predictions-discriminators-and-failure-modes.tex"
  },
  {
    kind: "paper",
    number: 7,
    title: "Viability, Active Recovery, and Operational Descriptors",
    relPath: "paper7_operational_life_subjecthood/main.tex",
    sectionName: "08-operational-life-structural-class-and-subjecthood.tex"
  },
  {
    kind: "paper",
    number: 8,
    title: "Indexed Operational Certificates and Matched Model Comparisons",
    relPath: "paper8_first_person_subjectivity/main.tex",
    sectionName: "09-first-person-indexed-subjectivity.tex"
  },
  {
    kind: "paper",
    number: 9,
    title: "Cross-Mode Transport, Interaction, and Comparison Obligations",
    relPath: "paper9_phenomenal_bridge_organization/main.tex",
    sectionName: "10-phenomenal-bridge-organization.tex"
  },
  {
    kind: "paper",
    number: 10,
    title: "Blind Adjudication Protocols and Coverage-Aware Risk Bounds",
    relPath: "paper10_external_adjudication/main.tex",
    sectionName: "11-external-adjudication-of-bridge-formalized-machine-subjectivity.tex"
  },
  {
    kind: "recovery",
    title: "Dependencies between Operational Criteria and Indexed Certificates",
    relPath: "paper_bridge_operational_subjecthood/main.tex",
    sectionName: "12-operational-consciousness-to-operational-subjecthood-bridge.tex",
    fallbackSectionName: "12-bridge-paper.tex"
  }
];

const READING_PARTS = [
  { title: "Mathematical Foundations and Structural Dynamics", paths: ["basecore/BASECORE.tex", "paper1/main.tex", "paper2/main.tex", "paper3/main.tex"] },
  { title: "Operational Criteria, Indexed Subjectivity, and Theoretical Bridge", paths: ["paper5_operational_consciousness/main.tex", "paper7_operational_life_subjecthood/main.tex", "paper8_first_person_subjectivity/main.tex", "paper9_phenomenal_bridge_organization/main.tex", "paper_bridge_operational_subjecthood/main.tex"] },
  { title: "Experimental Contracts, Falsification, and Blind Adjudication", paths: ["paper4/main.tex", "paper6_predictions_falsation/main.tex", "paper10_external_adjudication/main.tex"] }
];
let volumeChapter = 0;
for (const part of READING_PARTS) for (const relPath of part.paths) {
  const source = SOURCES.find(item => item.relPath === relPath);
  if (!source) throw new Error("Unknown reading-order source: " + relPath);
  if (source.kind !== "basecore") source.volumeChapter = ++volumeChapter;
}

const EDITORIAL_PREFACE = String.raw`\chapter*{Scope and Methodological Approach}
\addcontentsline{toc}{chapter}{Scope and Methodological Approach}
\markboth{Scope and Methodological Approach}{Scope and Methodological Approach}

QICN studies projective structures, controlled dynamics and operational
certificates. Its mathematical conclusions hold under their stated hypotheses;
explicit constructions and counterexamples delimit those conclusions.
Identifying an artificial or biological realization requires observation,
intervention and calibration contracts. Whether sufficiently realized
structures correspond to phenomenal experience remains deliberately open as
an independent bridge hypothesis, subject to further empirical and philosophical
criteria. Normative interpretation likewise requires its own premises.
The current external-evidence status is
\texttt{external\_support\_certified=false}.

\section*{Architecture and Reading Guide}
\addcontentsline{toc}{section}{Architecture and Reading Guide}
The volume separates mathematical derivation from empirical identification.
Part~I contains BaseCore and the original Papers I--III: controlled dynamics,
projective compatibility and witness-relative structural conclusions.
Part~II contains the original Papers V, VII--IX and the theoretical bridge:
joint operational criteria, viability, indexed organization and transport.
Part~III contains the original Papers IV, VI and X: experimental contracts,
falsification and blind adjudication. The original paper numbers identify
publications; book chapters follow this reading order.

\begin{center}\small
\begin{tabular}{ll}
\toprule Original unit & Book location \\ \midrule
BaseCore & Foundational chapter, section prefix B \\
I, II, III & Chapters 1, 2, 3 \\
V, VII, VIII, IX & Chapters 4, 5, 6, 7 \\
Theoretical bridge & Chapter 8 \\
IV, VI, X & Chapters 9, 10, 11 \\ \bottomrule
\end{tabular}
\end{center}

Proofs in Parts~I and II retain their axioms independently of whether a
physical experiment in Part~III has been executed. Some protocol theorems
in Part~III, including risk bounds, are also mathematical results. Empirical
work tests an identified realization and its predictions; a pending campaign
is therefore distinct from a missing mathematical proof.

\paragraph{Constructive results.}
BaseCore Proposition~\ref{mono:basecore:prop:base-wedge-metric-sector} and
Chapter~1 Theorem~\ref{mono:p01:thm:wedge-bilipschitz-gap} specify the metric
sector and bounded-distortion gap of the Hilbert wedge. The common infinite
plant is defined in~\ref{mono:p05:def:asymmetric-native-plant}; its six-predicate
certificate is Theorem~\ref{mono:p05:thm:asymmetric-native-six}. The same plant
supports Propositions~\ref{mono:p07:prop:asymmetric-native-life}
and~\ref{mono:p07:prop:asymmetric-native-subject}, followed by the indexed class
of Theorem~\ref{mono:p08:thm:native-nonempty-subfp} under its specified causal
grammar. Corollary~\ref{mono:bridge:cor:native-indexed-selfreference-boundary}
retains the obstruction to exact global self-reference. The coherent and
incoherent transport extensions in~\ref{mono:p09:prop:bridge-transport-cycle}
separate local certification from the additional cross-mode requirements.

\clearpage
\section*{Comparative Positioning and Mathematical Contribution}
\addcontentsline{toc}{section}{Comparative Positioning and Mathematical Contribution}
This map compares the cited formulations and the objects explicitly studied
here. Classical ingredients are distinguished from the joint constructions
proposed for review. The comparison specifies research questions rather than
asserting priority over every formulation of a theory.

\begingroup\small
\begin{longtable}{@{}p{0.22\linewidth}p{0.31\linewidth}p{0.39\linewidth}@{}}
\toprule Comparison axis & Established ingredient or target & QICN construction and comparison obligation \\ \midrule
\endfirsthead
\toprule Comparison axis & Established ingredient or target & QICN construction and comparison obligation \\ \midrule
\endhead
Inverse limits and categories \cite{maclane1998,ribes} & Compatibility and universal constructions. & A specified weighted metric, sectorial deformation cost and product-separation bounds, with explicit distortion and nondegeneracy assumptions. \\ \addlinespace
Contractive dynamics \cite{banach,katok1995} & Fixed points and convergence under declared contraction hypotheses. & Parameterized persistence, qualified energy-barrier exclusions and controls where distortion or factor size degenerates. Physical irreversibility requires a separate identification argument. \\ \addlinespace
IIT, 2004 formulation \cite{tononi2004} & A proposed relation between information integration and consciousness. & A conjunction of distinct identity, causal, viability and indexing certificates. Its assignment and integration objects must be compared by their domains and tasks, not by sharing a symbol. \\ \addlinespace
GWT, Baars formulation \cite{baars1988} & A workspace account of cognitive architecture. & Architecture is a model choice to be identified; certification then uses stated observation and intervention contracts. No architectural comparison is supplied by a name alone. \\ \addlinespace
HOT, Rosenthal formulation \cite{rosenthal1986} & Higher-order awareness as a condition on conscious states. & Indexed response and ownership contracts, with a separate conditional self-reference layer. Relating those objects to the higher-order condition requires a specified model and matched test. \\ \bottomrule
\end{longtable}
\endgroup

The joint realization is the concrete comparison target: non-finite
projective identity, causal nonfactorization, viable recovery and indexed
asymmetry are assessed on the declared plant and protocols. The indexed
margin is relative to its explicit causal grammar and budget. Admitting an
unrestricted emulator at the same information and cost removes that margin;
IIT, GWT and HOT are not automatically members of the tested weak family.

\paragraph{Evidence and remaining mathematical interfaces.}
Analytical arguments in the manuscripts include infinite constructions and
topological obstructions. Lean~4.31.0 checks identified algebraic, ordered and
finite kernels; exact rational controls check reproducible instances. These
evidence surfaces have different scopes. In the discrete-to-continuous bridge,
Theorem~\ref{mono:basecore:thm:bridge} fixes auxiliary energy/phase coordinates;
a coupled evolution needs an additional theorem. The calibration quantities
of~\ref{mono:p03:nonthm:estimator-gap}, the complete bridge comparator class and
empirical identification remain explicit research obligations.
`;

const AUTHORIAL_NOTE = String.raw`% BEGIN_AUTHORIAL_NOTE
\section*{Authorial Note and Methodological Provenance}
\addcontentsline{toc}{section}{Authorial Note and Methodological Provenance}
The conception, theoretical direction, mathematical architecture, development,
and integration of the QICN research programme were undertaken by a single
independent researcher, Johnny Andrey P\'erez Ram\'irez, over more than one year.
This account of provenance is supplied by the author. Several artificial
intelligence systems and formal verification tools assisted with technical
drafting, proof exploration, consistency checks, and mechanized kernels under
his direction. The author retains intellectual responsibility for the
programme, its claims, and any remaining errors. Analytical manuscript proofs,
machine-checked kernels, and internal tests have distinct scopes; independent
mathematical review and empirical validation remain separate obligations.
\texttt{external\_support\_certified=false}.
% END_AUTHORIAL_NOTE`;

function bodyOf(content) {
  const begin = content.indexOf("\\begin{document}");
  const end = content.lastIndexOf("\\end{document}");
  if (begin === -1 || end === -1 || end <= begin) throw new Error("Source does not contain document environment.");
  return content
    .slice(begin + "\\begin{document}".length, end)
    .replace(/\\maketitle/g, "")
    .replace(/\\tableofcontents/g, "")
    .replace(/\\printbibliography(\[[^\]]*\])?/g, "")
    .trim();
}

function rewriteRelativeAssetPaths(content, relPath) {
  const sourceDir = path.dirname(relPath).replace(/\\/g, "/");
  return content.replace(/\\(input|include|includegraphics)(\[[^\]]*\])?\{([^}]+)\}/g, (match, command, options = "", target) => {
    if (
      target.startsWith("/") ||
      target.startsWith("./") ||
      target.startsWith("../") ||
      /^[A-Za-z]:/.test(target)
    ) {
      return match;
    }
    return `\\${command}${options}{../${sourceDir}/${target}}`;
  });
}

function expandLocalInputs(content, relPath, seen = new Set()) {
  const sourceDir = path.dirname(relPath);
  return content.replace(/\\input\{([^}]+)\}/g, (match, target) => {
    if (target.startsWith("/") || target.startsWith("../") || /^[A-Za-z]:/.test(target)) return match;
    const candidate = target.endsWith(".tex") ? target : `${target}.tex`;
    const resolved = path.normalize(path.join(sourceDir, candidate));
    const fullPath = path.join(ROOT, resolved);
    if (!fullPath.startsWith(ROOT) || !fs.existsSync(fullPath)) return match;
    if (seen.has(fullPath)) throw new Error(`Recursive input detected while expanding ${relPath}: ${target}`);
    const nextSeen = new Set(seen);
    nextSeen.add(fullPath);
    return expandLocalInputs(stripEncodingNoise(fs.readFileSync(fullPath, "utf8")), resolved, nextSeen);
  });
}

function stripEncodingNoise(content) {
  return content.replace(/^\uFEFF/u, "").replace(/^ï»¿/u, "").replace(/\r\n/g, "\n");
}

function rewriteAppendixForMonolithic(content) {
  return content.replace(/\\appendix\b/g, [
    "\\setcounter{section}{0}",
    "\\setcounter{subsection}{0}",
    "\\setcounter{subsubsection}{0}",
    "\\renewcommand{\\thesection}{\\thechapter.\\Alph{section}}"
  ].join("\n"));
}

function rewriteCodeTokensForMonolithic(content) {
  const rewritten = content.replace(/\\texttt\{([^{}]+)\}/g, (match, value) => {
    if (value.length < 18 && !/[\\/_<>.=:-]/.test(value)) return match;
    return `\\codepath{${value}}`;
  });
  return rewritten.replace(/\\\[\s*\\begin\{aligned\}[\s\S]*?\\end\{aligned\}\s*\\\]/g, (block) =>
    block.replace(/\\codepath\{([^{}]+)\}/g, "\\mathtt{$1}")
  );
}

function rewriteBacktickCodeForMonolithic(content) {
  const rewrite = (match, value) => {
    if (value.length < 5 && !/[\\/_<>.=:-]/.test(value)) return match;
    return `\\codepath{${value}}`;
  };
  return content
    .replace(/(?<!`)`([^`\n]+)`(?!`)/g, rewrite)
    .replace(/`OntologicalSingularityCore\.selfModelSigma'/g, "\\codepath{OntologicalSingularityCore.selfModelSigma}");
}

function insertTextBreakHintsForMonolithic(content) {
  const replacements = new Map([
    ["PASS/AMBIGUOUS/FAIL", "PASS/\\allowbreak{}AMBIGUOUS/\\allowbreak{}FAIL"],
    ["derived/interventional", "derived/\\allowbreak{}interventional"],
    ["condition/batch/campaign/candidate/audit", "condition/\\allowbreak{}batch/\\allowbreak{}campaign/\\allowbreak{}candidate/\\allowbreak{}audit"],
    ["condition/batch/campaign", "condition/\\allowbreak{}batch/\\allowbreak{}campaign"],
    ["comparator/intervention/drift/governance", "comparator/\\allowbreak{}intervention/\\allowbreak{}drift/\\allowbreak{}governance"],
    ["blocked\\_until\\_execution", "blocked\\_\\allowbreak{}until\\_\\allowbreak{}execution"],
    ["blocked\\_until\\_external\\_adjudication", "blocked\\_\\allowbreak{}until\\_\\allowbreak{}external\\_\\allowbreak{}adjudication"],
    ["forbidden\\_claim\\_surface", "forbidden\\_\\allowbreak{}claim\\_\\allowbreak{}surface"]
  ]);
  let rewritten = content;
  for (const [from, to] of replacements.entries()) rewritten = rewritten.replaceAll(from, to);
  return rewritten;
}

function splitKnownAlignedChainsForMonolithic(content) {
  return content.replace(
    /\\begin\{aligned\}\s*\\mathtt\{self\\_index\\_state\}\s*&\\longrightarrow\s*\\mathtt\{ownership\\_attribution\\_report\}\s*\\longrightarrow\s*\\mathtt\{subjective\\_continuity\\_report\}\s*\\\\\s*&\\longrightarrow\s*\\mathtt\{first\\_person\\_perspective\\_report\}\s*\\longrightarrow\s*\\mathtt\{subjective\\_valuation\\_report\}\s*\\\\\s*&\\longrightarrow\s*\\mathtt\{subjectivity\\_reducibility\\_report\}\s*\\longrightarrow\s*\\mathtt\{subjectivity\\_gate\\_result\}\.\s*\\end\{aligned\}/g,
    [
      "\\begin{aligned}",
      "\\mathtt{self\\_index\\_state}",
      "&\\longrightarrow \\mathtt{ownership\\_attribution\\_report} \\\\",
      "&\\longrightarrow \\mathtt{subjective\\_continuity\\_report} \\\\",
      "&\\longrightarrow \\mathtt{first\\_person\\_perspective\\_report} \\\\",
      "&\\longrightarrow \\mathtt{subjective\\_valuation\\_report} \\\\",
      "&\\longrightarrow \\mathtt{subjectivity\\_reducibility\\_report} \\\\",
      "&\\longrightarrow \\mathtt{subjectivity\\_gate\\_result}.",
      "\\end{aligned}"
    ].join("\n")
  );
}

function fitLongDisplayMathForMonolithic(content) {
  return content.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (match, body) => {
    const compact = body.trim();
    if (
      compact.length < 150 ||
      /\\begin\{|\\label\{|\\\\/.test(compact) ||
      /\\resizebox\{/.test(compact)
    ) {
      return match;
    }
    return [
      "\\[",
      "\\resizebox{0.98\\textwidth}{!}{$\\displaystyle",
      compact,
      "$}",
      "\\]"
    ].join("\n");
  });
}

function tightenDenseTablesForMonolithic(content) {
  return content
    .replace(/\\setlength\{\\tabcolsep\}\{[0-9.]+pt\}/g, "\\setlength{\\tabcolsep}{2pt}")
    .replace(/\\small(?=\s*(?:\\renewcommand\{\\arraystretch\}\{[^}]+\}\s*)?(?:\\setlength\{\\tabcolsep\}\{[^}]+\}\s*)?\\begin\{tabularx?\})/g, "\\scriptsize")
    .replace(/\\begin\{tabular\}\{lcccccc\}/g, "\\begin{tabular}{@{}lcccccc@{}}");
}

// Monolithic-only table-width fixes (v20 build-quality gate: O1/O2/O6/O7).
//
// These overfull \hbox cases are layout debt of the ASSEMBLED a4/1in geometry,
// not of the per-paper standalone PDFs. The transforms are strictly
// content-neutral: no datum, number, row, or symbol is changed. They only
// adjust table width (uniform \resizebox scale, or fixed column widths absorbed
// by the trailing X/Y column so the table stays at \textwidth). They are applied
// only while generating the monolithic sections, so the canonical per-paper
// sources and their standalone PDFs are untouched.
//
// The three remaining display-math overfulls (O3/O4/O5) are deliberately NOT
// touched here: reshaping display equations would alter mathematical content,
// which the governance rules forbid. They remain documented mathematical layout
// debt.
function fitWideTablesForMonolithic(content) {
  let out = content;

  // O1 -- Paper 4 "Cross-run variability by system" (\begin{tabular}{lcccc}).
  // The tabular's natural width exceeds \textwidth (long row labels such as
  // "DYNAMIC CONTROL NO SELF MODEL"). Scale the whole tabular uniformly to
  // \textwidth; every cell value is preserved, only the rendered size shrinks.
  out = out.replace(
    /\\begin\{tabular\}\{lcccc\}([\s\S]*?)\\end\{tabular\}/g,
    (match, body) => `\\resizebox{\\textwidth}{!}{%\n\\begin{tabular}{lcccc}${body}\\end{tabular}}`
  );

  // O2 -- Paper 5 "Corpus Dependency Ledger" tabularx. The single long token
  // "Phenomenological" overflows the narrow first column; widen it from 1.55cm
  // to 2.4cm. The trailing X (Y) column absorbs the difference, so the table
  // width stays \textwidth.
  out = out.replace(
    /\\begin\{tabularx\}\{\\textwidth\}\{>\{\\raggedright\\arraybackslash\}p\{1\.55cm\} >\{\\raggedright\\arraybackslash\}p\{4\.5cm\} Y\}/g,
    "\\begin{tabularx}{\\textwidth}{>{\\raggedright\\arraybackslash}p{2.4cm} >{\\raggedright\\arraybackslash}p{4.5cm} Y}"
  );

  // O6 -- Bridge "Properties not implied by membership in $\Cop$" tabularx. The
  // header cell "Implied by $\Cop$?" (where \Cop expands to a wide token)
  // overflows the middle column; widen it from 2.8cm to 3.2cm. X (Y) absorbs it.
  out = out.replace(
    /\\begin\{tabularx\}\{\\textwidth\}\{>\{\\raggedright\\arraybackslash\}p\{4\.1cm\} >\{\\raggedright\\arraybackslash\}p\{2\.8cm\} Y\}/g,
    "\\begin{tabularx}{\\textwidth}{>{\\raggedright\\arraybackslash}p{4.1cm} >{\\raggedright\\arraybackslash}p{3.2cm} Y}"
  );

  // O7 -- Bridge "Computational Verification Status" tabularx. The code token
  // "OntologicalSingularityCore." overflows the second column by ~3pt; widen it
  // from 5.2cm to 5.5cm. X (Y) absorbs it.
  out = out.replace(
    /\\begin\{tabularx\}\{\\textwidth\}\{>\{\\raggedright\\arraybackslash\}p\{2\.2cm\} >\{\\raggedright\\arraybackslash\}p\{5\.2cm\} Y\}/g,
    "\\begin{tabularx}{\\textwidth}{>{\\raggedright\\arraybackslash}p{2.2cm} >{\\raggedright\\arraybackslash}p{5.5cm} Y}"
  );

  return out;
}

function applyMonolithicLayoutTransforms(content, relPath) {
  // BaseCore's article divisions are local headings, not volume-level parts.
  if (relPath === "basecore/BASECORE.tex")
    content = content.replace(/\\part\{([^}]+)\}/g, "\\section*{$1}");
  // Appendix contract tables keep the standalone row spacing in the volume.
  if (relPath === "paper10_external_adjudication/main.tex")
    content = content.replaceAll("\\begingroup\\small\n\\setlength{\\tabcolsep}{5pt}", "\\begingroup\\small\n\\renewcommand{\\arraystretch}{1}\n\\setlength{\\tabcolsep}{5pt}");
  // Equivalent binomial typography: avoid the obsolete TeX primitive warning.
  content = content.replaceAll("{n\\choose j}", "\\binom{n}{j}");
  // Article-level scope notes are consolidated into the volume's opening scope.
  const scopes = content.match(/% BEGIN_OPERATIONAL_SCOPE[\s\S]*?% END_OPERATIONAL_SCOPE/g) || [];
  if (scopes.length !== 1) throw new Error("Expected one operational scope in " + relPath);
  content = content.replace(scopes[0], "");
  // Authorial provenance is printed once after the collected bibliography.
  const notes = content.match(/% BEGIN_AUTHORIAL_NOTE[\s\S]*?% END_AUTHORIAL_NOTE/g) || [];
  if (notes.length !== 1) throw new Error("Expected one authorial note in " + relPath);
  content = content.replace(notes[0], "");
  return fitWideTablesForMonolithic(
    fitLongDisplayMathForMonolithic(
      splitKnownAlignedChainsForMonolithic(
        insertTextBreakHintsForMonolithic(
          tightenDenseTablesForMonolithic(
            rewriteCodeTokensForMonolithic(
              rewriteBacktickCodeForMonolithic(rewriteRelativeAssetPaths(content, relPath))
            )
          )
        )
      )
    )
  );
}

function labelNamespace(source) {
  if (source.kind === "basecore") return "mono:basecore:";
  if (source.kind === "paper") return `mono:p${String(source.number).padStart(2, "0")}:`;
  return "mono:bridge:";
}

function readReusableSections() {
  const reusable = new Map();
  SOURCES.forEach((source) => {
    if (!source.fallbackSectionName) return;
    const fallbackPath = path.join(SECTION_DIR, source.fallbackSectionName);
    const activePath = path.join(SECTION_DIR, source.sectionName);
    if (fs.existsSync(activePath)) {
      reusable.set(source.sectionName, { content: fs.readFileSync(activePath, "utf8"), alreadyWrapped: true });
      return;
    }
    if (fs.existsSync(fallbackPath)) {
      reusable.set(source.sectionName, { content: fs.readFileSync(fallbackPath, "utf8"), alreadyWrapped: false });
    }
  });
  return reusable;
}

function cleanGeneratedSectionDir() {
  const resolvedSectionDir = path.resolve(SECTION_DIR);
  const expectedParent = path.resolve(BUILD_DIR);
  if (path.dirname(resolvedSectionDir) !== expectedParent) {
    throw new Error(`Refusing to clean unexpected section directory: ${resolvedSectionDir}`);
  }
  fs.readdirSync(resolvedSectionDir)
    .filter((name) => name.endsWith(".tex"))
    .forEach((name) => fs.unlinkSync(path.join(resolvedSectionDir, name)));
}

function namespaceLabelsAndRefs(content, source) {
  const prefix = labelNamespace(source);
  const labels = new Set(Array.from(content.matchAll(/\\label\{([^}]+)\}/g), (match) => match[1]));
  if (labels.size === 0) return content;

  const withLabels = content.replace(/\\label\{([^}]+)\}/g, (match, label) => {
    if (label.startsWith(prefix)) return match;
    return `\\label{${prefix}${label}}`;
  });

  return withLabels
    .replace(/\\(eqref|ref|pageref|autoref|nameref|cref|Cref)\{([^}]+)\}/g, (match, command, targetList) => {
      const rewritten = targetList
        .split(",")
        .map((target) => {
          const trimmed = target.trim();
          if (!trimmed || !labels.has(trimmed) || trimmed.startsWith(prefix)) return trimmed;
          return `${prefix}${trimmed}`;
        })
        .join(",");
      return `\\${command}{${rewritten}}`;
    })
    .replace(/\\hyperref\[([^\]]+)\]/g, (match, target) => {
      if (!labels.has(target) || target.startsWith(prefix)) return match;
      return `\\hyperref[${prefix}${target}]`;
    });
}

function hyperAnchorPrefixLines(prefix) {
  const safePrefix = prefix.replace(/[:]/g, ".");
  return [
    `\\providecommand{\\theHchapter}{${safePrefix}\\thechapter}`,
    `\\renewcommand{\\theHchapter}{${safePrefix}\\thechapter}`,
    `\\providecommand{\\theHsection}{${safePrefix}\\thesection}`,
    `\\renewcommand{\\theHsection}{${safePrefix}\\thesection}`,
    `\\providecommand{\\theHsubsection}{${safePrefix}\\thesubsection}`,
    `\\renewcommand{\\theHsubsection}{${safePrefix}\\thesubsection}`,
    `\\providecommand{\\theHsubsubsection}{${safePrefix}\\thesubsubsection}`,
    `\\renewcommand{\\theHsubsubsection}{${safePrefix}\\thesubsubsection}`,
    `\\providecommand{\\theHtheorem}{${safePrefix}\\thetheorem}`,
    `\\renewcommand{\\theHtheorem}{${safePrefix}\\thetheorem}`
  ];
}

function paperNumberingPrefix(number) {
  const prefix = `mono.p${String(number).padStart(2, "0")}.`;
  return [
    "\\clearpage",
    "\\makeatletter",
    `\\setcounter{chapter}{${number - 1}}`,
    "\\setcounter{section}{0}",
    "\\setcounter{subsection}{0}",
    "\\setcounter{subsubsection}{0}",
    "\\setcounter{theorem}{0}",
    "\\renewcommand{\\thechapter}{\\arabic{chapter}}",
    "\\renewcommand{\\thesection}{\\thechapter.\\arabic{section}}",
    "\\renewcommand{\\thesubsection}{\\thesection.\\arabic{subsection}}",
    "\\renewcommand{\\thesubsubsection}{\\thesubsection.\\arabic{subsubsection}}",
    "\\renewcommand{\\thetheorem}{\\thechapter.\\arabic{theorem}}",
    ...hyperAnchorPrefixLines(prefix),
    "\\def\\@chapapp{\\chaptername}",
    "\\renewcommand{\\chaptermark}[1]{\\markboth{\\thechapter.\\ #1}{}}",
    "\\makeatother"
  ].join("\n");
}

function wrapSection(source, content) {
  if (source.kind === "basecore") {
    return [
      "\\clearpage",
      "\\chapter*{BaseCore}",
      "\\addcontentsline{toc}{chapter}{BaseCore}",
      "\\markboth{BaseCore}{BaseCore}",
      "\\renewcommand{\\thechapter}{B}",
      "\\setcounter{section}{0}",
      "\\setcounter{subsection}{0}",
      "\\setcounter{subsubsection}{0}",
      "\\renewcommand{\\thesection}{B\\arabic{section}}",
      "\\renewcommand{\\thesubsection}{\\thesection.\\arabic{subsection}}",
      "\\renewcommand{\\thesubsubsection}{\\thesubsection.\\arabic{subsubsection}}",
      "\\setcounter{theorem}{0}",
      "\\renewcommand{\\thetheorem}{B\\arabic{theorem}}",
      ...hyperAnchorPrefixLines("mono.basecore."),
      content,
      "\\clearpage"
    ].join("\n");
  }
  if (source.kind === "paper") {
    return [
      paperNumberingPrefix(source.volumeChapter || source.number),
      `\\chapter{${source.title}}`,
      content,
      "\\clearpage"
    ].join("\n");
  }
  return [
    paperNumberingPrefix(source.volumeChapter || 11),
    "\\chapter{Dependencies between Operational Criteria and Indexed Certificates}",
    ...hyperAnchorPrefixLines("mono.bridge."),
    content.replace(/^\\chapter\{Bridge Paper\}\s*/u, ""),
    "\\clearpage"
  ].join("\n");
}

function gatherPreambleLine(content, pattern) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => pattern.test(line));
}

function uniqueLines(lines) {
  return Array.from(new Set(lines)).filter(Boolean).sort();
}

function packageNames(line) {
  const match = line.match(/^\\usepackage(?:\[[^\]]*\])?\{([^}]+)\}/);
  if (!match) return [];
  return match[1].split(",").map((name) => name.trim()).filter(Boolean);
}

function dedupePackages(lines) {
  const seen = new Set();
  const chosen = [];
  lines.forEach((line) => {
    const names = packageNames(line);
    if (names.length === 0) return;
    if (names.some((name) => seen.has(name))) return;
    names.forEach((name) => seen.add(name));
    chosen.push(line);
  });
  const first = chosen.filter((line) => /inputenc|fontenc|babel/.test(line));
  const last = chosen.filter((line) => /hyperref|cleveref/.test(line));
  const middle = chosen.filter((line) => !first.includes(line) && !last.includes(line));
  return [...first, ...middle, ...last];
}

function build() {
  ensureDir(SECTION_DIR);
  ensureDir(PREAMBLE_DIR);
  const reusableSections = readReusableSections();
  cleanGeneratedSectionDir();
  const packages = [];
  const setup = [];
  const sections = [];
  const failures = [];

  SOURCES.forEach((source) => {
    const fullPath = path.join(ROOT, source.relPath);
    try {
      if (!fs.existsSync(fullPath) && source.fallbackSectionName) {
        const reusableSection = reusableSections.get(source.sectionName);
        if (!reusableSection) throw new Error(`Missing reusable generated section: ${source.fallbackSectionName}`);
        const sectionContent = reusableSection.alreadyWrapped
          ? reusableSection.content
          : `${wrapSection(source, applyMonolithicLayoutTransforms(reusableSection.content, source.relPath))}\n`;
        fs.writeFileSync(path.join(SECTION_DIR, source.sectionName), sectionContent, "utf8");
        sections.push({ title: source.title, relPath: source.relPath, sectionName: source.sectionName, status: "reused_existing_section" });
        return;
      }

      const content = fs.readFileSync(fullPath, "utf8");
      packages.push(...gatherPreambleLine(content, /^\\usepackage/));
      setup.push(...gatherPreambleLine(content, /^\\(newcommand|renewcommand|DeclareMathOperator|DeclareRobustCommand|newtheorem|theoremstyle|numberwithin)/));
      const expandedBody = rewriteAppendixForMonolithic(expandLocalInputs(stripEncodingNoise(bodyOf(content)), source.relPath));
      const namespacedBody = namespaceLabelsAndRefs(expandedBody, source);
      const body = applyMonolithicLayoutTransforms(namespacedBody, source.relPath);
      fs.writeFileSync(path.join(SECTION_DIR, source.sectionName), `${wrapSection(source, body)}\n`, "utf8");
      sections.push({ title: source.title, relPath: source.relPath, sectionName: source.sectionName, status: "extracted" });
    } catch (error) {
      failures.push({ title: source.title, relPath: source.relPath, error: error.message });
    }
  });

  const contractPath = path.join(PREAMBLE_DIR, "source-contract.json");
  if (!fs.existsSync(contractPath)) throw new Error("Missing audited preamble contract; restore the versioned preamble inputs.");
  const contract = JSON.parse(fs.readFileSync(contractPath,"utf8"));
  const digest = text => crypto.createHash("sha256").update(text.replace(/\r\n/g,"\n")).digest("hex");
  for (const source of SOURCES) {
    const preamble = fs.readFileSync(path.join(ROOT,source.relPath),"utf8").split("\\begin{document}")[0];
    if (digest(preamble)!==contract.sources[source.relPath]) throw new Error("Preamble drift in "+source.relPath+"; review packages/macros and explicitly update the audited contract.");
  }
  for (const name of ["packages.tex","setup.tex"]) {
    const file=path.join(PREAMBLE_DIR,name);
    if(!fs.existsSync(file)||digest(fs.readFileSync(file,"utf8"))!==contract.customizations[name]) throw new Error("Missing or changed audited preamble customization: "+name);
  }

  const root = [
    "\\documentclass[11pt,a4paper,openany]{book}",
    "\\input{preamble/packages}",
    "\\input{preamble/setup}",
    "% --- Document metadata ---",
    "\\title{\\textbf{QICN: Projective Structures and Operational Certificates}}",
    "\\author{Johnny Andrey P{\\'e}rez Ram{\\'i}rez}",
    "\\date{2026}",
    "\\hypersetup{%",
    "  pdftitle={QICN: Projective Structures and Operational Certificates},%",
    "  pdfauthor={Johnny Andrey P{\\'e}rez Ram{\\'i}rez},%",
    "  pdfsubject={Projective structures, controlled dynamics and operational certificates},%",
    "  pdfkeywords={inverse limit, sectorial resistance, multiscale robustness, controlled dynamics, certified response classes},%",
    "  pdfcreator={pdfLaTeX}%",
    "}",
    "\\begin{document}",
    "\\frontmatter",
    "\\maketitle",
    EDITORIAL_PREFACE,
    "\\tableofcontents",
    "\\mainmatter",
    ...READING_PARTS.flatMap(part => [
      `\\part{${part.title}}`,
      ...part.paths.map(relPath => {
        const section = sections.find(item => item.relPath === relPath);
        if (!section) throw new Error("Missing assembled source: " + relPath);
        return `\\input{build/sections/${section.sectionName}}`;
      })
    ]),
    "\\backmatter",
    "\\printbibliography[heading=bibintoc]",
    "\\clearpage",
    AUTHORIAL_NOTE,
    "\\end{document}",
    ""
  ].join("\n");
  fs.writeFileSync(path.join(MONO_DIR, "QICN_MONOLITHIC.tex"), root, "utf8");
  fs.writeFileSync(
    path.join(MONO_DIR, "compile.ps1"),
    [
      "pdflatex -interaction=nonstopmode -halt-on-error QICN_MONOLITHIC.tex",
      "biber QICN_MONOLITHIC",
      "pdflatex -interaction=nonstopmode -halt-on-error QICN_MONOLITHIC.tex",
      "pdflatex -interaction=nonstopmode -halt-on-error QICN_MONOLITHIC.tex",
      ""
    ].join("\n"),
    "utf8"
  );
  return { sections, failures };
}

function runCompileStep(label, command, args) {
  const result = childProcess.spawnSync(command, args, {
    cwd: MONO_DIR,
    encoding: "utf8"
  });
  return {
    label,
    command: [command, ...args].join(" "),
    status: result.status,
    stdout_tail: (result.stdout || "").split(/\r?\n/).slice(-15),
    stderr_tail: (result.stderr || "").split(/\r?\n/).slice(-15)
  };
}

function compile() {
  const steps = [];
  const sequence = [
    ["pdflatex pass 1", "pdflatex", ["-interaction=nonstopmode", "-halt-on-error", "QICN_MONOLITHIC.tex"]],
    ["biber", "biber", ["QICN_MONOLITHIC"]],
    ["pdflatex pass 2", "pdflatex", ["-interaction=nonstopmode", "-halt-on-error", "QICN_MONOLITHIC.tex"]],
    ["pdflatex pass 3", "pdflatex", ["-interaction=nonstopmode", "-halt-on-error", "QICN_MONOLITHIC.tex"]]
  ];
  for (const [label, command, args] of sequence) {
    const step = runCompileStep(label, command, args);
    steps.push(step);
    if (step.status !== 0) break;
  }
  const failedStep = steps.find((step) => step.status !== 0);
  return {
    status: failedStep ? "failed" : "compiled",
    exit_code: failedStep ? failedStep.status : 0,
    steps,
    stdout_tail: steps.flatMap((step) => [`[${step.label}]`, ...step.stdout_tail]).slice(-35),
    stderr_tail: steps.flatMap((step) => [`[${step.label}]`, ...step.stderr_tail]).slice(-35),
    pdf_exists: fs.existsSync(path.join(MONO_DIR, "QICN_MONOLITHIC.pdf"))
  };
}

function writeReport(buildResult, compileResult) {
  const reportDate = new Date().toISOString().slice(0, 10);
  const reportStatus = compileResult.status === "compiled"
    ? "MONOLITHIC_COMPILED"
    : "MONOLITHIC_SCAFFOLD_ATTEMPTED";
  const lines = [
    "# Monolithic Build Report v2",
    "",
    `Status: ${reportStatus}`,
    `Date: ${reportDate}`,
    "",
    "## Boundary",
    "",
    "This report records a physical LaTeX monolith build attempt. It does not certify theorem truth, empirical support, consciousness, phenomenality, identity transfer, agency, moral status, or external adjudication.",
    "",
    "Editorial policy: BaseCore is treated as the foundational layer rather than Paper 0; paper chapters are projected by direct research title rather than internal paper labels; recovered generated sections are reused when their source path is absent so the build does not delete existing monolith content.",
    "",
    "## Source Extraction",
    "",
    "| Source | Status |",
    "|---|---|",
    ...buildResult.sections.map((section) => `| ${section.relPath} | ${section.status} |`),
    ...buildResult.failures.map((failure) => `| ${failure.relPath} | failed: ${failure.error} |`),
    "",
    "## Compile Result",
    "",
    `- Status: ${compileResult.status}`,
    `- Exit code: ${compileResult.exit_code}`,
    `- PDF exists: ${compileResult.pdf_exists}`,
    "",
    "## Compile Steps",
    "",
    "| Step | Command | Exit code |",
    "|---|---|---:|",
    ...(compileResult.steps || []).map((step) => `| ${step.label} | \`${step.command}\` | ${step.status} |`),
    "",
    "## Stdout Tail",
    "",
    "```text",
    ...compileResult.stdout_tail,
    "```",
    "",
    "## Stderr Tail",
    "",
    "```text",
    ...compileResult.stderr_tail,
    "```",
    ""
  ];
  fs.writeFileSync(REPORT_PATH, `${lines.join("\n").trim()}\n`, "utf8");
}

function main() {
  const buildResult = build();
  const shouldCompile = process.argv.includes("--compile");
  const compileResult = shouldCompile
    ? compile()
    : { status: "not_run", exit_code: null, stdout_tail: [], stderr_tail: [], pdf_exists: false };
  writeReport(buildResult, compileResult);
  console.log(`Wrote ${path.relative(ROOT, path.join(MONO_DIR, "QICN_MONOLITHIC.tex"))}`);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}`);
  console.log(`Compile status: ${compileResult.status}`);
  if (shouldCompile && compileResult.status !== "compiled") process.exit(1);
}

if (require.main === module) main();
