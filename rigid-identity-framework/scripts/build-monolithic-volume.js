const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const { ensureDir } = require("./lib/pred-ext-01-evaluator");

const ROOT = path.resolve(__dirname, "..");
const MONO_DIR = path.join(ROOT, "monolithic");
const BUILD_DIR = path.join(MONO_DIR, "build");
const SECTION_DIR = path.join(BUILD_DIR, "sections");
const PREAMBLE_DIR = path.join(MONO_DIR, "preamble");
const REPORT_PATH = path.join(ROOT, "docs", "reports", "MONOLITHIC_BUILD_REPORT.md");

const SOURCES = [
  ["BaseCore", "basecore/BASECORE.tex"],
  ["Paper 1", "paper1/main.tex"],
  ["Paper 2", "paper2/main.tex"],
  ["Paper 3", "paper3/main.tex"],
  ["Paper 4", "paper4/main.tex"],
  ["Paper 5", "paper5_operational_consciousness/main.tex"],
  ["Paper 6", "paper6_predictions_falsation/main.tex"],
  ["Paper 7", "paper7_operational_life_subjecthood/main.tex"],
  ["Paper 8", "paper8_first_person_subjectivity/main.tex"],
  ["Paper 9", "paper9_phenomenal_bridge_organization/main.tex"],
  ["Paper 10", "paper10_external_adjudication/main.tex"],
  ["Bridge Paper", "paper_bridge_operational_subjecthood/main.tex"]
];

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
  const packages = [];
  const setup = [];
  const sections = [];
  const failures = [];

  SOURCES.forEach(([title, relPath], index) => {
    const fullPath = path.join(ROOT, relPath);
    const content = fs.readFileSync(fullPath, "utf8");
    packages.push(...gatherPreambleLine(content, /^\\usepackage/));
    setup.push(...gatherPreambleLine(content, /^\\(newcommand|renewcommand|DeclareMathOperator|DeclareRobustCommand|newtheorem|theoremstyle|numberwithin|newcolumntype)/));
    const sectionName = `${String(index + 1).padStart(2, "0")}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.tex`;
    try {
      let body = bodyOf(content);
      if (title === "BaseCore") {
        body = body.replace(/core\/sections\//g, "../basecore/core/sections/");
      }
      fs.writeFileSync(
        path.join(SECTION_DIR, sectionName),
        `\\chapter*{${title}}\n\\addcontentsline{toc}{chapter}{${title}}\n${body}\n`,
        "utf8"
      );
      sections.push({ title, relPath, sectionName, status: "extracted" });
    } catch (error) {
      failures.push({ title, relPath, error: error.message });
    }
  });

  const dedupped = dedupePackages(packages);
  const biblatexIndex = dedupped.findIndex((line) => line.includes("biblatex"));
  if (biblatexIndex !== -1) {
    dedupped.splice(biblatexIndex + 1, 0, "\\addbibresource{../release/references.bib}");
  } else {
    dedupped.push("\\addbibresource{../release/references.bib}");
  }

  fs.writeFileSync(path.join(PREAMBLE_DIR, "packages.tex"), `${dedupped.join("\n")}\n`, "utf8");

  const cleanSetup = uniqueLines(setup)
    .filter((line) => !line.includes("\\AuthorVisible") && !line.includes("\\AuthorMetadata"))
    .filter((line) => !line.includes("\\blockedresultstatus") && !line.includes("\\codestate") && !line.includes("\\sectionstatus"))
    .filter((line) => !line.includes("\\newtheorem") && !line.includes("\\theoremstyle") && !line.includes("\\arraystretch"));

  const customTheorems = [
    "",
    "\\theoremstyle{plain}",
    "\\newtheorem{theorem}{Theorem}[section]",
    "\\newtheorem{proposition}[theorem]{Proposition}",
    "\\newtheorem{lemma}[theorem]{Lemma}",
    "\\newtheorem{corollary}[theorem]{Corollary}",
    "\\newtheorem{criterion}[theorem]{Criterion}",
    "\\newtheorem{axiom}[theorem]{Axiom}",
    "\\newtheorem{nontheorem}[theorem]{Non-Theorem}",
    "\\newtheorem{conjecture}[theorem]{Conjecture}",
    "",
    "\\theoremstyle{definition}",
    "\\newtheorem{definition}[theorem]{Definition}",
    "\\newtheorem{example}[theorem]{Example}",
    "\\newtheorem{assumption}[theorem]{Assumption}",
    "\\newtheorem{caveat}[theorem]{Caveat}",
    "\\newtheorem{prediction}[theorem]{Prediction}",
    "\\newtheorem{protocol}[theorem]{Protocol}",
    "\\newtheorem{hypothesis}[theorem]{Hypothesis}",
    "",
    "\\theoremstyle{remark}",
    "\\newtheorem{remark}[theorem]{Remark}",
    "",
    "\\newenvironment{abstract}%",
    "{\\begin{quotation}\\noindent\\textbf{Abstract.} }%",
    "{\\end{quotation}}",
    "",
    "\\newcommand{\\sectionstatus}[1]{\\paragraph{Section status.}\\texttt{\\detokenize{#1}}.}",
    "\\newcommand{\\codestate}[1]{\\texttt{\\detokenize{#1}}}",
    "\\newenvironment{blocked_until_execution}%",
    "{\\par\\medskip\\noindent\\begin{minipage}{0.96\\textwidth}\\textbf{\\texttt{blocked\\_until\\_execution}.}\\enspace}%",
    "{\\end{minipage}\\par\\medskip}",
    "\\newcommand{\\blockedresultstatus}{%",
    "\\begin{blocked_until_execution}%",
    "This section requires executed campaigns with human participants, frozen external filing records, populated admissible datasets, actual reviewer and adjudicator assignments, reviewer-governed evidence assessment, real collection-start events, and later adjudicator-layer completion. It contains no results and must remain non-result-bearing until those artifacts exist.%",
    "\\end{blocked_until_execution}%",
    "}",
    "",
    "\\renewcommand{\\arraystretch}{1.18}"
  ].join("\n");

  fs.writeFileSync(
    path.join(PREAMBLE_DIR, "setup.tex"),
    `${cleanSetup.join("\n")}\n${customTheorems}\n`,
    "utf8"
  );

  const root = [
    "\\documentclass[11pt,a4paper]{book}",
    "\\input{preamble/packages}",
    "\\input{preamble/setup}",
    "\\title{QICN: A Rigid Identity Framework}",
    "\\author{Johnny Andrey P{\\'e}rez Ram{\\'i}rez}",
    "\\date{2026-05-26}",
    "\\begin{document}",
    "\\frontmatter",
    "\\maketitle",
    "\\tableofcontents",
    "\\mainmatter",
    ...sections.map((section) => `\\input{build/sections/${section.sectionName}}`),
    "\\end{document}",
    ""
  ].join("\n");
  fs.writeFileSync(path.join(MONO_DIR, "QICN_MONOLITHIC.tex"), root, "utf8");

  const compileScript = [
    "pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex",
    "biber QICN_MONOLITHIC",
    "pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex",
    "pdflatex -interaction=nonstopmode QICN_MONOLITHIC.tex"
  ].join("\n") + "\n";

  fs.writeFileSync(path.join(MONO_DIR, "compile.ps1"), compileScript, "utf8");
  return { sections, failures };
}

function compile() {
  console.log("Running pdflatex (Pass 1)...");
  let result = childProcess.spawnSync("pdflatex", ["-interaction=nonstopmode", "-halt-on-error", "QICN_MONOLITHIC.tex"], {
    cwd: MONO_DIR,
    encoding: "utf8"
  });
  if (result.status === 0) {
    console.log("Running biber...");
    childProcess.spawnSync("biber", ["QICN_MONOLITHIC"], {
      cwd: MONO_DIR,
      encoding: "utf8"
    });
    console.log("Running pdflatex (Pass 2)...");
    childProcess.spawnSync("pdflatex", ["-interaction=nonstopmode", "-halt-on-error", "QICN_MONOLITHIC.tex"], {
      cwd: MONO_DIR,
      encoding: "utf8"
    });
    console.log("Running pdflatex (Pass 3)...");
    result = childProcess.spawnSync("pdflatex", ["-interaction=nonstopmode", "-halt-on-error", "QICN_MONOLITHIC.tex"], {
      cwd: MONO_DIR,
      encoding: "utf8"
    });
  }
  return {
    status: result.status === 0 ? "compiled" : "failed",
    exit_code: result.status,
    stdout_tail: (result.stdout || "").split(/\r?\n/).slice(-25),
    stderr_tail: (result.stderr || "").split(/\r?\n/).slice(-25),
    pdf_exists: fs.existsSync(path.join(MONO_DIR, "QICN_MONOLITHIC.pdf"))
  };
}

function writeReport(buildResult, compileResult) {
  const lines = [
    "# Monolithic Build Report v1",
    "",
    "Status: MONOLITHIC_SCAFFOLD_ATTEMPTED",
    "Date: 2026-05-26",
    "",
    "## Boundary",
    "",
    "This report records a physical LaTeX monolith build attempt. It does not certify theorem truth, empirical support, consciousness, phenomenality, identity transfer, agency, moral status, or external adjudication.",
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
    "## Stdout Tail",
    "",
    "```text",
    ...compileResult.stdout_tail,
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
