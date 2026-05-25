#!/usr/bin/env node

const path = require("path");
const { classifyMacroCollision, groupByLatexName, readJsonl } = require("./registry-lib");

function main() {
  const frameworkRoot = path.resolve(__dirname, "..");
  const macroPath = path.join(frameworkRoot, "registry", "macros.jsonl");
  const { records: macros, errors } = readJsonl(macroPath);
  const blockers = [...errors];
  const warnings = [];
  const canonicalByName = new Map();

  for (const macro of macros) {
    if (!macro.latex_name || !macro.definition || macro.arity === undefined) {
      blockers.push(`Incomplete macro entry: ${JSON.stringify(macro)}`);
      continue;
    }
    if (macro.canonical) {
      if (canonicalByName.has(macro.latex_name)) {
        blockers.push(`Multiple canonical definitions for ${macro.latex_name}`);
      }
      canonicalByName.set(macro.latex_name, macro);
    }
  }

  for (const [latexName, group] of groupByLatexName(macros).entries()) {
    const classification = classifyMacroCollision(latexName, group);
    if (classification.active) {
      warnings.push(`${latexName} has ${classification.definitions.length} distinct active definitions; collision_risk should remain high until manually resolved.`);
    }
  }

  console.log("# FCR Macro Validation");
  console.log("");
  console.log(`- Macro entries: ${macros.length}`);
  console.log(`- Canonical macro entries: ${canonicalByName.size}`);
  console.log(`- Blockers: ${blockers.length}`);
  console.log(`- Warnings: ${warnings.length}`);
  console.log("");
  console.log("## Blockers");
  console.log(blockers.length ? blockers.map((item) => `- ${item}`).join("\n") : "None.");
  console.log("");
  console.log("## Warnings");
  console.log(warnings.length ? warnings.map((item) => `- ${item}`).join("\n") : "None.");

  process.exit(blockers.length === 0 ? 0 : 1);
}

if (require.main === module) {
  main();
}
