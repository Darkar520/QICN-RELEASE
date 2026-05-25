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
    frameworkRoot: path.resolve(__dirname, ".."),
    registryPath: null,
    targets: DEFAULT_TARGETS,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      args.dryRun = true;
      continue;
    }
    if (arg === "--root") {
      args.frameworkRoot = path.resolve(argv[++index]);
      continue;
    }
    if (arg === "--registry") {
      args.registryPath = path.resolve(argv[++index]);
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

function withSingleResyncNote(notes) {
  const marker = "Source-scoped cache resync from primary TeX declaration.";
  const stripped = String(notes || "")
    .replace(new RegExp(`(?:\\s*${marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})+`, "g"), "")
    .trim();
  return `${stripped} ${marker}`.trim();
}

function resyncMacroCache(options = {}) {
  const frameworkRoot = options.frameworkRoot || path.resolve(__dirname, "..");
  const registryPath = options.registryPath || path.join(frameworkRoot, "registry", "macros.jsonl");
  const targets = options.targets || DEFAULT_TARGETS;
  const dryRun = Boolean(options.dryRun);
  const { records: macros, errors } = readJsonl(registryPath);

  if (errors.length > 0) {
    throw new Error(`Cannot resync macro cache because macros.jsonl has parse errors:\n${errors.join("\n")}`);
  }

  const updates = [];

  for (const target of targets) {
    const relativeFile = normalizePath(target.file);
    const sourcePath = path.join(frameworkRoot, relativeFile);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Missing primary source for target: ${relativeFile}`);
    }

    const declarations = extractNewtheoremDeclarations(sourcePath);
    const sourceDeclaration = declarations.get(target.latexName);
    if (!sourceDeclaration) {
      throw new Error(`Primary source ${relativeFile} does not declare ${target.latexName}`);
    }

    const matches = macros.filter(
      (macro) => normalizePath(macro.location?.file || "") === relativeFile && macro.latex_name === target.latexName,
    );
    if (matches.length !== 1) {
      throw new Error(`Expected exactly one registry entry for ${target.latexName} in ${relativeFile}; found ${matches.length}`);
    }

    const entry = matches[0];
    const sourceLineChanged =
      entry.location?.line_start !== sourceDeclaration.line || entry.location?.line_end !== sourceDeclaration.line;
    const normalizedNotes = withSingleResyncNote(entry.notes);
    const notesChanged = entry.notes !== normalizedNotes;
    if (entry.definition !== sourceDeclaration.definition || sourceLineChanged || notesChanged) {
      updates.push({
        file: relativeFile,
        latexName: target.latexName,
        from: entry.definition,
        to: sourceDeclaration.definition,
        line_from: entry.location?.line_start,
        line_to: sourceDeclaration.line,
        sourceLine: sourceDeclaration.line,
      });
      entry.definition = sourceDeclaration.definition;
      if (entry.location) {
        entry.location.line_start = sourceDeclaration.line;
        entry.location.line_end = sourceDeclaration.line;
      }
      entry.notes = normalizedNotes;
    }
  }

  if (!dryRun && updates.length > 0) {
    writeJsonl(registryPath, sortMacros(macros));
  }

  return {
    target_count: targets.length,
    updates,
    dry_run: dryRun,
    boundary: "Source-scoped derived-artifact resync. This does not regenerate theorem entries or certify monolithic compilation.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = resyncMacroCache({
    frameworkRoot: args.frameworkRoot,
    registryPath: args.registryPath,
    targets: args.targets,
    dryRun: args.dryRun,
  });
  console.log(JSON.stringify(result, null, 2));
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  extractNewtheoremDeclarations,
  resyncMacroCache,
};
