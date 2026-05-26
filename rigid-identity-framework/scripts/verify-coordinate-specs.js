const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const COORDINATE_SPEC_PATH = path.join(ROOT, "docs", "reports", "PAPER8_COORDINATE_CONSTRUCTIVE_SPEC.md");

const REQUIRED_SECTIONS = [
  "Constructive Estimator",
  "Failure Case",
  "Positive Toy Case",
  "Rival",
  "Limit"
];

const MIN_SECTION_CHARS = 40;

const REQUIRED_GLOBAL_PATTERNS = [
  { label: "Boundary", pattern: /^##\s+Boundary$/m },
  { label: "Shared Input Contract", pattern: /^##\s+Shared Input Contract$/m },
  { label: "Known Edge Cases", pattern: /^##\s+Known Edge Cases$/m },
  { label: "Required Gate", pattern: /^##\s+Required Gate$/m }
];

function validateCoordinateSpecs() {
  if (!fs.existsSync(COORDINATE_SPEC_PATH)) {
    console.error(`[ERROR] Coordinate spec file not found at: ${COORDINATE_SPEC_PATH}`);
    process.exit(1);
  }

  const content = fs.readFileSync(COORDINATE_SPEC_PATH, "utf8");
  const errors = [];

  REQUIRED_GLOBAL_PATTERNS.forEach((entry) => {
    if (!entry.pattern.test(content)) {
      errors.push(`Global section missing: "## ${entry.label}"`);
    }
  });
  
  // Find all Coordinate headers, e.g., "## Coordinate 1: Self-Index"
  const coordinateRegex = /^##\s+Coordinate\s+(\d+):\s+(.+)$/gm;
  let match;
  const coordinates = [];

  while ((match = coordinateRegex.exec(content)) !== null) {
    coordinates.push({
      index: parseInt(match[1], 10),
      name: match[2].trim(),
      startIndex: match.index,
      header: match[0]
    });
  }

  if (coordinates.length === 0) {
    errors.push("No coordinates found in constructive specification file.");
  }
  if (coordinates.length < 3) {
    errors.push(`Expected at least 3 coordinate constructive specifications; found ${coordinates.length}.`);
  }

  const seenIndices = new Set();
  coordinates.forEach((coordinate) => {
    if (seenIndices.has(coordinate.index)) {
      errors.push(`Duplicate coordinate index: ${coordinate.index}`);
    }
    seenIndices.add(coordinate.index);
  });

  // Slice content for each coordinate and verify sections exist
  for (let i = 0; i < coordinates.length; i++) {
    const current = coordinates[i];
    const next = coordinates[i + 1];
    const sectionContent = content.substring(
      current.startIndex,
      next ? next.startIndex : content.length
    );

    REQUIRED_SECTIONS.forEach((section) => {
      // Look for markdown subheaders like "### Constructive Estimator" or "### Limit"
      const sectionRegex = new RegExp(`^###\\s+${section}`, "m");
      const sectionMatch = sectionRegex.exec(sectionContent);
      if (!sectionMatch) {
        errors.push(`Coordinate ${current.index} (${current.name}): Missing required section "### ${section}"`);
        return;
      }

      const sectionStart = sectionMatch.index + sectionMatch[0].length;
      const nextHeaderMatch = /^###\s+/gm;
      nextHeaderMatch.lastIndex = sectionStart;
      const nextHeader = nextHeaderMatch.exec(sectionContent);
      const body = sectionContent.substring(sectionStart, nextHeader ? nextHeader.index : sectionContent.length).trim();
      if (body.length < MIN_SECTION_CHARS) {
        errors.push(`Coordinate ${current.index} (${current.name}): Section "### ${section}" is too thin (${body.length} chars).`);
      }

      if (section === "Constructive Estimator" && !/[=<>]|```/.test(body)) {
        errors.push(`Coordinate ${current.index} (${current.name}): Constructive Estimator must contain a formula, inequality, or code block.`);
      }
    });
  }

  return {
    coordinatesCount: coordinates.length,
    errors
  };
}

try {
  console.log("====================================================");
  console.log("QICN Coordinate Specification Admissibility Gate");
  console.log("====================================================");
  
  const result = validateCoordinateSpecs();
  
  if (result.errors.length > 0) {
    console.error(`\n[FAIL] Admissibility validation failed with ${result.errors.length} error(s):`);
    result.errors.forEach((err) => console.error(`- ${err}`));
    process.exit(1);
  }
  
  console.log(`\n[PASS] Validated ${result.coordinatesCount} coordinate constructive specifications.`);
  console.log("All required sections conform to the Paper 8 Input Contract.");
  process.exit(0);
} catch (err) {
  console.error(`\n[FATAL] Gate execution failed: ${err.message}`);
  process.exit(1);
}

module.exports = { validateCoordinateSpecs };
