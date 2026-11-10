"""Reproduce the public QICN P5 checkpoint in an isolated directory."""

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import unicodedata
import zipfile
from pathlib import Path

CHECKPOINT = "2919fe897d2d0d05e0f32ee0d7178676e42eef46"
LEAN_VERSION = "4.31.0"
LEAN_COMMIT = "68218e876d2a38b1985b8590fff244a83c321783"
THEOREMS = (
    "fixed_point_common_of_unique",
    "alternating_reference_fixed",
    "truncation_commutes_away_from_boundary",
    "truncation_boundary_digit_defect",
    "cycle_transport_iff_even",
    "clean_abstention_risk_scaled",
    "risk_contamination_scaled",
)
AXIOMS = {"propext", "Classical.choice", "Quot.sound"}
RAW_VERDICTS = {
    "verify:v25": "INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY",
    "verify:v27": "BLOCKED_MULTIPLE_GATES",
    "adjudicate:v28": "BLOCKED_MULTIPLE_GATES",
    "verify:v30": "BLOCKED_MULTIPLE_GATES",
    "verify:v31": "BLOCKED_FOUNDATION_FIRST_GATES",
}
ROOT_CHECKS = (
    "verify-canonical-integrity",
    "verify-claim-registry",
    "verify-canonical-release",
)
CHECK_MONOLITH = Path(
    "docs/ai-platform-outputs/analysis/AUDITORIA_INTEGRAL_CODEX_2026-11-08/check-monolith.cjs"
)
PROOFS = {
    "prop:common-tower-phase-repair": "Viability and Active Phase Repair on the Common Tower",
    "thm:tower-native-lesion-obstruction": "Connected-Fibre Obstruction to Native Discrete Lesions",
    "thm:sigma-common-fixed-point": "Exact Commutation Requires a Common Fixed Point",
}
UNDEFINED = re.compile(
    r"undefined|multiply[- ]defined|Label\(s\) may have changed|"
    r"destination with the same identifier|duplicate ignored|duplicate entry key",
    re.IGNORECASE,
)


def require(condition, message):
    if not condition:
        raise SystemExit(message)


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def run(logs, name, command, cwd, env):
    print(f"Running {name}", flush=True)
    log = logs / f"{name}.log"
    with log.open("wb") as stream:
        result = subprocess.run(command, cwd=cwd, env=env, stdout=stream, stderr=subprocess.STDOUT)
    require(result.returncode == 0, f"{name} failed with exit {result.returncode}. See {log}.")
    return log.read_text(encoding="utf-8", errors="replace")


def executable(name):
    path = shutil.which(name)
    require(path is not None, f"Executable required on PATH: {name}")
    return path


def normalized(text):
    return re.sub(r"[^a-z0-9]", "", unicodedata.normalize("NFKC", text).casefold())


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", required=True, type=Path, help="New directory outside the checkout")
    parser.add_argument("--lean", type=Path, help="Path to the pinned Lean executable")
    args = parser.parse_args()

    repo = Path(__file__).resolve().parents[5]
    output = args.output.resolve()
    require(not output.is_relative_to(repo), "Place the output directory outside the checkout.")
    require(not output.exists(), f"Use a new output directory: {output}")
    tools = {name: executable(name) for name in ("git", "node", "pdflatex", "biber", "pdfinfo", "pdftotext")}
    npm = executable("npm.cmd" if os.name == "nt" else "npm")
    lean = str(args.lean.resolve()) if args.lean else executable("lean")

    logs = output / "logs"
    work = output / "workspace"
    temp = output / "temp"
    for path in (logs, work, temp):
        path.mkdir(parents=True)
    env = dict(os.environ, QICN_GOVERNANCE_BLINDED="true", PYTHONDONTWRITEBYTECODE="1",
               TMP=str(temp), TEMP=str(temp), TMPDIR=str(temp), LANG="C", LC_ALL="C", LC_CTYPE="C")

    archive = output / "checkpoint.zip"
    archive_command = [tools["git"], "-c", "core.autocrlf=false", "-c", "core.eol=lf",
                       "archive", "--format=zip", "-o", str(archive), CHECKPOINT]
    run(logs, "git-archive", archive_command, repo, env)
    with zipfile.ZipFile(archive) as snapshot:
        snapshot.extractall(work)
    inner = work / "rigid-identity-framework"
    lean_dir = inner / "docs/ai-platform-outputs/formal/lean"
    require((lean_dir / "lean-toolchain").read_text().strip() == f"leanprover/lean4:v{LEAN_VERSION}",
            "Unexpected project Lean pin.")
    version = run(logs, "lean-version", [lean, "--version"], lean_dir, env)
    require(f"version {LEAN_VERSION}," in version and LEAN_COMMIT in version, "Unexpected Lean binary.")

    obj = output / "lean-build/QICNLean"
    obj.mkdir(parents=True)
    source = "QICNLean/QICNFiniteP4.lean"
    lean_env = dict(env, LEAN_PATH=str(obj.parent))
    run(logs, "lean-module", [lean, "-DwarningAsError=true", "-o", str(obj / "QICNFiniteP4.olean"), source], lean_dir, lean_env)
    audit = output / "LeanAudit.lean"
    audit.write_text("import QICNLean.QICNFiniteP4\n" +
                     "".join(f"#print axioms QICNLean.{theorem}\n" for theorem in THEOREMS), encoding="utf-8")
    axioms_log = run(logs, "lean-axioms", [lean, "-DwarningAsError=true", str(audit)], lean_dir, lean_env)
    reports = re.findall(r"^'QICNLean\.([^']+)' (?:does not depend on any axioms|depends on axioms:\s*\[([^\]]*)\])",
                         axioms_log, re.MULTILINE)
    require([name for name, _ in reports] == list(THEOREMS), "Lean did not audit exactly the seven expected lemmas.")
    used = {axiom.strip() for _, group in reports for axiom in group.split(",") if axiom.strip()}
    require(used <= AXIOMS, f"Unexpected Lean axioms: {sorted(used - AXIOMS)}")

    for check in ROOT_CHECKS:
        run(logs, check, [tools["node"], f"scripts/{check}.cjs"], work, env)
    for command in ("verify:release", "verify:math", "verify:corpus-registry"):
        run(logs, command.replace(":", "-"), [npm, "run", command], inner, env)
    release = load_json(inner / "docs/reports/V35_ALL_LEGACY_VERIFICATION.json")
    steps = {step["name"]: step for step in release["steps"]}
    require(release["result"] == "PASS" and len(steps) == 6 and all(
        step["pass"] and step["status"] == 0 for step in steps.values()), "Expected six passing release gates.")
    raw = {}
    for step, verdict in RAW_VERDICTS.items():
        lines = [line for line in steps[step]["stdout_tail"] if f"verdict={verdict}" in line
                 and "external_support_certified=false" in line]
        require(len(lines) == 1, f"Unexpected adjudication in {step}.")
        raw[step] = lines[0]
    math = load_json(work / ".cache/qicn-math-regressions/summary.json")
    require(math["passed"] and len(math["results"]) == 17 and all(item["exit"] == 0 for item in math["results"]),
            "Expected seventeen passing math controls.")
    require("check_unified_tower.py" in {item["script"] for item in math["results"]}, "Tower control was not run.")
    registry = [json.loads(line) for line in (inner / "registry/theorems.jsonl").read_text(
        encoding="utf-8-sig").splitlines() if line.strip()]
    require(len(registry) == len({row["id"] for row in registry}) == 829, "Unexpected registry count.")
    require(PROOFS.keys() <= {row.get("label") for row in registry}, "Missing tower or bridge result in registry.")

    for tool in ("node", "pdflatex", "biber"):
        run(logs, f"{tool}-version", [tools[tool], "--version"], inner, env)
    run(logs, "npm-version", [npm, "--version"], inner, env)

    volume = inner / "monolithic/QICN_MONOLITHIC.pdf"
    with volume.open("rb") as stream:
        original_hash = hashlib.file_digest(stream, "sha256").hexdigest()
    run(logs, "compile-monolithic", [npm, "run", "compile:monolithic"], inner, env)
    run(logs, "compare-monolith", [tools["node"], str(CHECK_MONOLITH)], inner, env)
    sections = load_json(inner / CHECK_MONOLITH.parent / "MONOLITH_COMPARISON.json")["results"]
    require(len(sections) == 12 and all(row["equal"] for row in sections), "Monolith differs from the assembled sources.")
    volume_log = volume.with_suffix(".log").read_text(encoding="utf-8", errors="replace")
    require(not UNDEFINED.search(volume_log), f"Unresolved reference, citation or duplicate. See {volume.with_suffix('.log')}.")
    info = run(logs, "pdfinfo", [tools["pdfinfo"], str(volume)], inner, env)
    pages = re.search(r"^Pages:\s+(\d+)", info, re.MULTILINE)
    require(pages and int(pages[1]) == 372, "Expected a 372-page monolith in the reference TeX environment.")
    extracted = output / "monolith.txt"
    run(logs, "pdftotext", [tools["pdftotext"], "-enc", "UTF-8", str(volume), str(extracted)], inner, env)
    text = normalized(extracted.read_text(encoding="utf-8"))
    require(all(normalized(title) in text for title in PROOFS.values()), "Missing tower or bridge result in PDF.")
    with volume.open("rb") as stream:
        new_hash = hashlib.file_digest(stream, "sha256").hexdigest()

    summary = {
        "checkpoint": CHECKPOINT,
        "python": sys.version.split()[0],
        "lean": version.strip(),
        "lean_lemmas": list(THEOREMS),
        "lean_axioms": sorted(used),
        "root_checks": list(ROOT_CHECKS),
        "release_gates": "6/6",
        "math_controls": "17/17",
        "registry_entries": len(registry),
        "monolith_sections": len(sections),
        "monolith_pages": int(pages[1]),
        "committed_pdf_sha256": original_hash,
        "rebuilt_pdf_sha256": new_hash,
        "raw_adjudication": raw,
        "external_support_certified": False,
    }
    (output / "summary.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, indent=2), flush=True)


if __name__ == "__main__":
    main()
