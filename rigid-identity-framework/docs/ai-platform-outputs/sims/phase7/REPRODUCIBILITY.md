# Phase 7 Reproducibility

Status: `NON_CANONICAL_AI_OUTPUT_REPRODUCIBILITY_NOTE`

Human review: `REQUIRED`

Human curated status: `not_reviewed`

Scope: reproduce the Phase 7 toy-system rival/QICN-candidate run. This is not a
canonical theory artifact and does not validate QICN, GNW, IIT, consciousness,
agency, subjectivity, or external support.

## Python

Tested locally with the Codex bundled Python `3.12.13` and an isolated venv at
repo root:

```powershell
.\.venv-phase7\Scripts\python.exe --version
```

PyPhi `1.2.0` imports legacy ABC aliases from `collections`. Python versions
where those aliases moved to `collections.abc` require the compatibility shim in
`../qicn_phase7_pyphi_wrapper.py`. The shim only restores import aliases before
importing PyPhi; it does not patch PyPhi source files or alter Phi computation.

## Setup

Run from repo root `QICN-FRAMEWORK/`:

```powershell
python -m venv .venv-phase7
.\.venv-phase7\Scripts\python.exe -m pip install --disable-pip-version-check -r rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\requirements.txt
```

If `python` resolves to a project-specific interpreter without pip, use the
bundled Codex Python path that exists on this host:

```powershell
C:\Users\irisp\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m venv .venv-phase7
.\.venv-phase7\Scripts\python.exe -m pip install --disable-pip-version-check -r rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\requirements.txt
```

`.venv-phase7/` is intentionally ignored by `.gitignore`.

## Encoding

All JSON input and output for this phase is UTF-8 without BOM. The deterministic
runner writes files with `utf8`, and the PyPhi wrapper reads files/stdin with
explicit UTF-8 decoding. A BOM is treated as an input error.

## Commands

Bank v2 self-test:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\qicn_phase7_neutral_systems_bank_v2.js --self-test
```

PyPhi wrapper self-test:

```powershell
.\.venv-phase7\Scripts\python.exe rigid-identity-framework\docs\ai-platform-outputs\sims\qicn_phase7_pyphi_wrapper.py --self-test
```

GNW principles self-test:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\qicn_phase7_gnw_principles_detector.js --self-test
```

QICN candidate non-circularity self-test:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\qicn_phase7_qicn_candidate_noncircularity.js --self-test
```

Deterministic full run:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\phase7_run_all.js --out-dir rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\results\latest
```

Reproducibility sanity:

```powershell
node rigid-identity-framework\docs\ai-platform-outputs\sims\phase7\phase7_run_all.js --self-test
```

The self-test performs two independent runs under `.venv-phase7/phase7-runner-selftest/`
and requires equal run digests.

## Versioned latest snapshot

`results/latest` is a versioned deterministic snapshot; regenerating it should
not change the digest for the same code version. The manifest intentionally
omits the runtime-selected output directory and records artifact paths by stable
file name so that two runs to different directories remain byte-identical.
