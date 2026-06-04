const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

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
    title: "BaseCore",
    relPath: "basecore/BASECORE.tex",
    sectionName: "01-basecore.tex"
  },
  {
    kind: "paper",
    number: 1,
    title: "Rigid Identity as an Inverse Limit in Observable Channels",
    relPath: "paper1/main.tex",
    sectionName: "02-rigid-identity-as-an-inverse-limit-in-observable-channels.tex"
  },
  {
    kind: "paper",
    number: 2,
    title: "Phenomenological Regimes Induced by Structural Identity",
    relPath: "paper2/main.tex",
    sectionName: "03-phenomenological-regimes-induced-by-structural-identity.tex"
  },
  {
    kind: "paper",
    number: 3,
    title: "Structural Instability of the Phenomenological Null Regime in Causally Rigid Channels",
    relPath: "paper3/main.tex",
    sectionName: "04-structural-instability-of-the-phenomenological-null-regime.tex"
  },
  {
    kind: "paper",
    number: 4,
    title: "Falsifiable Predictions Under Forensic Constraints",
    relPath: "paper4/main.tex",
    sectionName: "05-falsifiable-predictions-under-forensic-constraints.tex"
  },
  {
    kind: "paper",
    number: 5,
    title: "A Structural Criterion for Substrate-Invariant Operational Consciousness",
    relPath: "paper5_operational_consciousness/main.tex",
    sectionName: "06-structural-criterion-for-substrate-invariant-operational-consciousness.tex"
  },
  {
    kind: "paper",
    number: 6,
    title: "Predictions, Discriminators, and Failure Modes for the Causally Rigid Operational Consciousness Framework",
    relPath: "paper6_predictions_falsation/main.tex",
    sectionName: "07-predictions-discriminators-and-failure-modes.tex"
  },
  {
    kind: "paper",
    number: 7,
    title: "Operational Life, Structural Class, and Subjecthood in a Causally Rigid Framework",
    relPath: "paper7_operational_life_subjecthood/main.tex",
    sectionName: "08-operational-life-structural-class-and-subjecthood.tex"
  },
  {
    kind: "paper",
    number: 8,
    title: "First-Person Indexed Subjectivity",
    relPath: "paper8_first_person_subjectivity/main.tex",
    sectionName: "09-first-person-indexed-subjectivity.tex"
  },
  {
    kind: "paper",
    number: 9,
    title: "Phenomenal Bridge Organization",
    relPath: "paper9_phenomenal_bridge_organization/main.tex",
    sectionName: "10-phenomenal-bridge-organization.tex"
  },
  {
    kind: "paper",
    number: 10,
    title: "External Adjudication of Bridge-Formalized Machine Subjectivity",
    relPath: "paper10_external_adjudication/main.tex",
    sectionName: "11-external-adjudication-of-bridge-formalized-machine-subjectivity.tex"
  },
  {
    kind: "recovery",
    title: "Operational Consciousness to Operational Subjecthood Bridge",
    relPath: "paper_bridge_operational_subjecthood/main.tex",
    sectionName: "12-operational-consciousness-to-operational-subjecthood-bridge.tex",
    fallbackSectionName: "12-bridge-paper.tex"
  }
];

const EDITORIAL_PREFACE = String.raw`\chapter*{Editorial Preface and Claim Boundary}
\addcontentsline{toc}{chapter}{Editorial Preface and Claim Boundary}
\markboth{Editorial Preface and Claim Boundary}{Editorial Preface and Claim Boundary}

This monolithic volume is an editorial consolidation of the QICN rigid-identity corpus. BaseCore is treated as the foundational layer of the framework rather than as Paper 0. The downstream works are indexed in the table of contents by their direct research titles; internal labels such as paper numbers are retained only as provenance handles where the source text itself requires them.

The claims in this volume remain conditional, formal, and operational. The volume does not assert biological consciousness, phenomenal consciousness, agency, moral status, identity transfer, or external validation. Runtime measurements, finite estimators, and internal support artifacts are implementation evidence only when explicitly marked as such; they are not substitutes for theorem proof or externally reproduced empirical adjudication.

The editorial policy is conservative: preserve source content, expose dependency order, avoid title-level bookkeeping labels, and keep ontology, mathematical model, implementation, language, and interpretation separated.`;

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
  return content.replace(/^\uFEFF/u, "").replace(/^ï»¿/u, "");
}

function rewriteAppendixForMonolithic(content) {
  return content.replace(/\\appendix\b/g, [
    "\\section*{Appendix}",
    "\\addcontentsline{toc}{section}{Appendix}",
    "\\markright{Appendix}"
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

function applyMonolithicLayoutTransforms(content, relPath) {
  return fitLongDisplayMathForMonolithic(
    splitKnownAlignedChainsForMonolithic(
      insertTextBreakHintsForMonolithic(
        tightenDenseTablesForMonolithic(
          rewriteCodeTokensForMonolithic(
            rewriteBacktickCodeForMonolithic(rewriteRelativeAssetPaths(content, relPath))
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
      paperNumberingPrefix(source.number),
      `\\chapter{${source.title}}`,
      content,
      "\\clearpage"
    ].join("\n");
  }
  return [
    "\\clearpage",
    "\\chapter*{Operational Consciousness to Operational Subjecthood Bridge}",
    "\\addcontentsline{toc}{chapter}{Operational Consciousness to Operational Subjecthood Bridge}",
    "\\markboth{Operational Consciousness to Operational Subjecthood Bridge}{Operational Consciousness to Operational Subjecthood Bridge}",
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

  if (!fs.existsSync(path.join(PREAMBLE_DIR, "packages.tex"))) {
    fs.writeFileSync(path.join(PREAMBLE_DIR, "packages.tex"), `${dedupePackages(packages).join("\n")}\n`, "utf8");
  }
  if (!fs.existsSync(path.join(PREAMBLE_DIR, "setup.tex"))) {
    fs.writeFileSync(
      path.join(PREAMBLE_DIR, "setup.tex"),
      `${uniqueLines(setup)
        .filter((line) => !line.includes("\\AuthorVisible") && !line.includes("\\AuthorMetadata"))
        .join("\n")}\n`,
      "utf8"
    );
  }

  const root = [
    "\\documentclass[11pt,a4paper,openany]{book}",
    "\\input{preamble/packages}",
    "\\input{preamble/setup}",
    "% --- Document metadata ---",
    "\\title{\\textbf{QICN: A Rigid Identity Framework}}",
    "\\author{Johnny Andrey P{\\'e}rez Ram{\\'i}rez}",
    "\\date{2026}",
    "\\hypersetup{%",
    "  pdftitle={QICN: A Rigid Identity Framework},%",
    "  pdfauthor={Johnny Andrey Perez Ramirez},%",
    "  pdfsubject={Operational Identity, Category Theory, Consciousness},%",
    "  pdfkeywords={rigid identity, inverse limit, ontological mass, CCR, falsifiability},%",
    "  pdfcreator={pdfLaTeX}%",
    "}",
    "\\begin{document}",
    "\\frontmatter",
    "\\maketitle",
    EDITORIAL_PREFACE,
    "\\tableofcontents",
    "\\mainmatter",
    ...sections.map((section) => `\\input{build/sections/${section.sectionName}}`),
    "\\backmatter",
    "\\printbibliography[heading=bibintoc]",
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
