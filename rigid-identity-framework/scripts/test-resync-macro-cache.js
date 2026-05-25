#!/usr/bin/env node

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { readJsonl, writeJsonl } = require("./registry-lib");
const { resyncMacroCache } = require("./resync-macro-cache");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  const tempRoot = fs.mkdtempSync(path.join(process.cwd(), ".tmp-resync-macro-cache-"));
  try {
    const paperDir = path.join(tempRoot, "paper8_first_person_subjectivity");
    const registryDir = path.join(tempRoot, "registry");
    ensureDir(paperDir);
    ensureDir(registryDir);

    const source = [
      "\\documentclass{article}",
      "\\newtheorem{theorem}{Theorem}[section]",
      "\\newtheorem{axiom}[theorem]{Axiom}",
      "\\begin{document}",
      "\\end{document}",
      "",
    ].join("\n");
    fs.writeFileSync(path.join(paperDir, "main.tex"), source, "utf8");

    const registryPath = path.join(registryDir, "macros.jsonl");
    writeJsonl(registryPath, [
      {
        name: "axiom",
        latex_name: "\\begin{axiom}",
        definition: "Bridge Axiom",
        arity: 0,
        owner: "paper8",
        command: "newtheorem",
        canonical: false,
        aliases: [],
        collision_risk: "high",
        notes: "Fixture stale cache.",
        location: {
          file: "paper8_first_person_subjectivity/main.tex",
          line_start: 99,
          line_end: 99,
        },
        registry_version: "test",
      },
    ]);

    const targets = [{ file: "paper8_first_person_subjectivity/main.tex", latexName: "\\begin{axiom}" }];
    const dryRun = resyncMacroCache({ frameworkRoot: tempRoot, registryPath, targets, dryRun: true });
    assert.strictEqual(dryRun.updates.length, 1);
    assert.strictEqual(dryRun.updates[0].from, "Bridge Axiom");
    assert.strictEqual(dryRun.updates[0].to, "Axiom");
    assert.strictEqual(dryRun.updates[0].line_to, 3);

    let stale = readJsonl(registryPath).records[0];
    assert.strictEqual(stale.definition, "Bridge Axiom");
    assert.strictEqual(stale.location.line_start, 99);

    const writeRun = resyncMacroCache({ frameworkRoot: tempRoot, registryPath, targets, dryRun: false });
    assert.strictEqual(writeRun.updates.length, 1);

    const synced = readJsonl(registryPath).records[0];
    assert.strictEqual(synced.definition, "Axiom");
    assert.strictEqual(synced.location.line_start, 3);
    assert.strictEqual(synced.location.line_end, 3);
    assert.match(synced.notes, /Source-scoped cache resync/);

    const secondRun = resyncMacroCache({ frameworkRoot: tempRoot, registryPath, targets, dryRun: false });
    assert.strictEqual(secondRun.updates.length, 0);

    console.log("resync-macro-cache self-test passed.");
  } finally {
    if (tempRoot.startsWith(process.cwd())) {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`resync-macro-cache self-test failed: ${error.message}`);
    process.exit(1);
  }
}
