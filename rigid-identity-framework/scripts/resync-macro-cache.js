#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { readJsonl, writeJsonl } = require("./registry-lib");

const DEFAULT_TARGETS = [
  {
    file: "paper8_first_person_subjectivity/main.tex",
    latexName: "\\begin{axiom}",
  },
  {
    file: "paper9_phenomenal_bridge_organization/main.tex",
    latexName: "\\begin{axiom}",
  },
];

function normalizePath(value) {
  return value.replace(/\\/g, "/");
}

function parseArgs(argv) {
  const args = {
    dryRun: false,
    targets: DEFAULT_TARGETS,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      args.dryRun = true;
      continue;
    }
    if (arg === "--target") {
      const raw = argv[++index];
      const [file, latexName] = raw.split("::");
      if (!file || !latexName) {
        throw new Error("--target expects file::latexName");
      }
      if (args.targets === DEFAULT_TARGETS) args.targets = [];
      args.targets.push({ file: normalizePath(file), latexName });
    }
  }

  return args;
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function lineForIndex(text, index) {
  return text.slice(0, index).split("\n").length;
}

function extractNewtheoremDeclarations(filePath) {
  const text = readText(filePath);
  const pattern = /\\newtheorem\{([^}]+)\}(?:\[[^\]]+\])?\{([^}]+)\}(?:\[[^\]]+\])?/g;
  const declarations = new Map();
  let match;

  while ((match = pattern.exec(text)) !== null) {
    declarations.set(`\\begin{${match[1]}}`, {
      definition: match[2],
      line: lineForIndex(text, match.index),
    });
  }

  return declarations;
}

function sortMacros(macros) {
  return macros.sort((a, b) => {
    const nameCmp = a.latex_name.localeCompare(b.latex_name);
    if (nameCmp !== 0) return nameCmp;
    const ownerCmp = a.owner.localeCompare(b.owner);
    if (ownerCmp !== 0) return ownerCmp;
    const fileCmp = (a.location?.file || "").localeCompare(b.location?.file || "");
    if (fileCmp !== 0) return fileCmp;
    return (a.location?.line_start || 0) - (b.location?.line_start || 0);
  });
}

function main() {
  const frameworkRoot = path.resolve(__dirname, "..");
  const registryPath = path.join(frameworkRoot, "registry", "macros.jsonl");
  const args = parseArgs(process.argv.slice(2));
  const { records: macros, errors } = readJsonl(registryPath);

  if (errors.length > 0) {
    console.error(`Cannot resync macro cache because macros.jsonl has parse errors:\n${errors.join("\n")}`);
    process.exit(1);
  }

  const updates = [];

  for (const target of args.targets) {
    const relativeFile = normalizePath(target.file);
    const sourcePath = path.join(frameworkRoot, relativeFile);
    if (!fs.existsSync(sourcePath)) {
      console.error(`Missing primary source for target: ${relativeFile}`);
      process.exit(1);
    }

    const declarations = extractNewtheoremDeclarations(sourcePath);
    const sourceDeclaration = declarations.get(target.latexName);
    if (!sourceDeclaration) {
      console.error(`Primary source ${relativeFile} does not declare ${target.latexName}`);
      process.exit(1);
    }

    const matches = macros.filter(
      (macro) => normalizePath(macro.location?.file || "") === relativeFile && macro.latex_name === target.latexName,
    );
    if (matches.length !== 1) {
      console.error(`Expected exactly one registry entry for ${target.latexName} in ${relativeFile}; found ${matches.length}`);
      process.exit(1);
    }

    const entry = matches[0];
    if (entry.definition !== sourceDeclaration.definition) {
      updates.push({
        file: relativeFile,
        latexName: target.latexName,
        from: entry.definition,
        to: sourceDeclaration.definition,
        sourceLine: sourceDeclaration.line,
      });
      entry.definition = sourceDeclaration.definition;
      entry.notes = `${entry.notes || ""} Source-scoped cache resync from primary TeX declaration.`.trim();
    }
  }

  if (!args.dryRun && updates.length > 0) {
    writeJsonl(registryPath, sortMacros(macros));
  }

  console.log(JSON.stringify({
    target_count: args.targets.length,
    updates,
    dry_run: args.dryRun,
    boundary: "Source-scoped derived-artifact resync. This does not regenerate theorem entries or certify monolithic compilation.",
  }, null, 2));
}

if (require.main === module) {
  main();
}
