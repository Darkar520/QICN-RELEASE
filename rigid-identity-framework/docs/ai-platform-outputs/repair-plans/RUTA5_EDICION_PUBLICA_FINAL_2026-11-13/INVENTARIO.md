# Inventario Baseline — Ruta 5 (`2d4fbcc`)

- **Base commit:** `2d4fbcc0bf436a181cd9371d1ec3408c4f9999c5`
- **Archivo máquina de huellas:** `INVENTARIO.json` (`60` archivos SHA-256 baseline, incluyendo `32` módulos Lean intactos).
- **Cobertura actual de Lean (referencia para Ruta 6):** `32` archivos `.lean` (`4,642` líneas, `248` `theorem`/`lemma` y `75` `def`/`structure`/`inductive`; `250` teoremas públicos reportados en Ruta 3) frente a `419` enunciados demostrables (`141` `theorem`, `214` `proposition`, `40` `corollary`, `24` `lemma`) dentro de `906` entradas del registro.

## Hallazgos editoriales pendientes sobre `2d4fbcc`

1. **`basecore/`**:
   - `BASECORE.tex`: abstracción alude a `source tree` y `PDF is a compiled artifact only`.
   - `01_foundation_from_core.tex:10`: regla de `LaTeX tree is the source of truth`.
   - `06_structural_classes_and_dynamics.tex:5, 38-40`: `source tree`, `Previous versions mixed...`, `release gate`.
   - `07_operational_criterion_absorbed.tex:146`: ruta literal `docs/ai-platform-outputs/analysis/QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md` dentro de `def:iint`.
   - `08_claim_boundary_and_falsation.tex:84` y `09_canonical_ledgers.tex:33-34, 77-86, 100`: `Stage 2 / Stage 3`, `derived artifact of the LaTeX tree`, `Redundancy Ledger` con historial de correcciones de borradores.
2. **`paper3/main.tex`**:
   - `L171`: `Earlier drafts used a supremum notation...` (requiere conservar `supremum notation.*superseded` para `audit-v25-superior-gaps.js`, retirando `Earlier drafts`).
   - Se preservan íntegros el comentario técnico `% v24 correction...` y `nonthm:estimator-gap` (`K_i`, `\omega_i`, `\varepsilon_i`, `\Delta^*`).
3. **`paper4/main.tex`**:
   - `L170`, `L826-830`, `L885`: `for debugging`, rutas `artifacts/raw/...json` y `artifacts/logs/...`, comandos `node research/scripts/generate_preliminary_pilot_dataset.v45.mjs` y `generate_latex_assets.v45.mjs`, y notación versionada `Score_{v4.5}`.
4. **`paper5_operational_consciousness/main.tex` & `paper7_operational_life_subjecthood/main.tex` & `paper_bridge_operational_subjecthood/main.tex`**:
   - Retórica defensiva tipo asistente (`not rhetorical caution`, `not rhetorical positioning`, `not more rhetoric`, `not a manifesto`), `BPF-2..BPF-6` y `merely a scaffold` en Bridge.
5. **`paper6_predictions_falsation/main.tex`**:
   - Lenguaje de ciclo interno de ingeniería (`Cycle 1..4`, `Mini-resolution`, `Residual resolution`, `Residual B`, `near_identity_v2`, `near_identity_v3`, `judge-v3`, `hardening`, `debug the pipeline`, `GitHub clean clone`, `fresh virtual environment on the same machine`, `same-program`, `not a moving target`).
6. **`paper8_first_person_subjectivity/main.tex`**:
   - `L440`: `AUDIT_MASTER coverage surfaces`.
   - `L1061-1100`: listados y tabla con ~25 nombres literales `.json`, además de antitéticas repetitivas (`not minimal rhetoric`, `not rhetorical apologies`). Se conserva intacta la cadena simbólica compatible con `splitKnownAlignedChainsForMonolithic`.
7. **`paper9_phenomenal_bridge_organization/main.tex`**:
   - Nomenclatura `BPF-0..BPF-6`, `scaffold`, `scaffolded bridge registries`, `scaffolding.cjs`, `PhenomenalBridgeSurfaceBuilder`, `.json` literales y párrafos meta-rhetoric (`sober premise`, `cease to be rhetorical`, etc.).
8. **`paper10_external_adjudication/main.tex`**:
   - Metadatos ausentes (`\author{QICN Program}` en lugar de `Johnny Andrey Pérez Ramírez`, sin `\hypersetup{pdftitle=..., pdfauthor=...}`).
   - Marcas `\sectionstatus{...}` en cada sección, `Stage3-RF/0..7`, `repo` / `repository` / `commit` / `source tree`, `npm ci`, `toolchain`, `clean-room`, `QICN-RELEASE/main@92d5d2c...`, `canonical_core_legacy`, y **Apéndices A–AE** (`L1344-1571`) con ~56 rutas `docs/*.v1.json` y `artifacts/...`.
9. **Cierre uniforme de autoría e IA (todos los 12 documentos + monolítico):**
   - Ausente en los 12 PDFs y en el monolítico; se añadirá de manera homogénea en Ruta 5.
10. **Términos `Historical alias.` en `Interpretation and Open Research Links`**:
    - Pulir a `Full reference title.` o nota bibliográfica limpia manteniendo íntegra `\section{Interpretation and Open Research Links}` (exigida 1 vez por unidad en `verify-prose-sync.py`).
