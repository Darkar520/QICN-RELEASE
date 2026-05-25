#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { markdownValidationReport, validateCorpus } = require("./registry-lib");

function parseArgs(argv) {
  const args = {
    strictCrossRefs: false,
    report: null,
    json: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--strict-crossrefs") args.strictCrossRefs = true;
    if (arg === "--json") args.json = true;
    if (arg === "--report") args.report = argv[++index];
  }
  return args;
}

function runValidation(options = {}) {
  const frameworkRoot = options.frameworkRoot || path.resolve(__dirname, "..");
  return validateCorpus(frameworkRoot, {
    strictCrossRefs: Boolean(options.strictCrossRefs),
  });
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const frameworkRoot = path.resolve(__dirname, "..");
  const result = runValidation({
    frameworkRoot,
    strictCrossRefs: args.strictCrossRefs,
  });

  if (args.json) {
    console.log(JSON.stringify({
      stats: result.stats,
      blockers: result.blockers,
      warnings: result.warnings,
    }, null, 2));
  } else {
    const report = markdownValidationReport(result);
    console.log(report);
    if (args.report) {
      const reportPath = path.resolve(frameworkRoot, args.report);
      fs.mkdirSync(path.dirname(reportPath), { recursive: true });
      fs.writeFileSync(reportPath, report, "utf8");
    }
  }

  process.exit(result.blockers.length === 0 ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { runValidation };
