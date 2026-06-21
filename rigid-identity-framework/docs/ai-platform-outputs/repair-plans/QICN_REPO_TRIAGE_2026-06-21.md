# QICN — Triaje de Repositorio Completo (ruido vs útil)

Status: `NON_CANONICAL_AI_OUTPUT` · Human review: `REQUIRED`
`external_support_certified = false` · **read-only / no destructivo**
Fecha: 2026-06-21 · Agente: Kiro (auditor interno)

> Este plan NO borra ni mueve nada. Propone decisiones carpeta-por-carpeta para
> que tú las apruebes. Todo hecho verificado ejecutando contra el repo real
> (`git ls-files`, inventario SHA256, lectura de contenido). Soporte:
> `reports/INVENTORY_TRACEABILITY_QICN-FRAMEWORK_2026-06-21.{md,json}`.

---

## 0. Hallazgo estructural de fondo (la causa raíz del ruido)

El repo git es la raíz padre `QICN-FRAMEWORK/` (remote `QICN-RELEASE.git`).
Dentro vive el proyecto del corpus `rigid-identity-framework/` con su **propio**
`package.json`, `scripts/`, `docs/`, `release/`. Es decir: hay **dos niveles
paralelos** de `docs/`, `release/`, `scripts/`. Esa duplicación de capas es el
origen principal de la confusión de "muchas versiones" y del ruido.

- **2348 archivos** en el padre; de ellos **1542 son artefactos de build**.
- **122 grupos de duplicados exactos** (mismo SHA256) entre niveles.
- Gran parte del peso del padre **no está trackeada en git** (es ruido de disco).

Decisión transversal recomendada (tuya): declarar **una** raíz canónica
(propongo `rigid-identity-framework/` como fuente de verdad del corpus, que es
donde están el tooling, basecore y la gobernanza) y tratar lo demás del padre
como release/infra o como ruido a archivar.

---

## 1. Zonas de RUIDO de alta confianza (no trackeadas → seguras de remover)

Verificado: `git ls-files` devuelve **0** para todas estas. No afectan historial.

| Zona | Archivos | Tracked | Qué es | Recomendación |
|---|---|---|---|---|
| `photoshop-mcp/` | 162 | **0** | Servidor MCP de Photoshop (UXP, capas). **Nada que ver con QICN.** Contaminación. | **REMOVER** del repo (o mover fuera). Reversible: no está en git. |
| `artifacts/` | 1379 | **0** | Artefactos generados de predicción/experimentos + `__pycache__/*.pyc` + `_tmp_*.json`. Reproducibles. | **REMOVER**/gitignore. Regenerables por tooling. |
| `rigid-identity-paper/`, `phenomenological-regimes-paper/`, `phenomenological-instability-paper/` | ~30 | **0** | Solo restos de compilación (`.aux/.bbl/.log/.out…`), **sin `.tex` ni `.pdf`**. Basura de build. | **REMOVER**. No hay fuente ni salida que preservar. |
| `nul` (raíz) | 1 | **0** | Archivo espurio (nombre reservado de Windows, de un `> nul` accidental). | **REMOVER**. |
| `_build/`, `.venv-phase7/`, `__pyphi_cache__/`, `.pnpm-store/`, `.playwright-mcp/` | (excluidos del inventario) | — | Cachés/entornos pesados. | **GITIGNORE** si no lo están; no versionar. |
| `ANALISIS_GENERAL_PROYECTO.md` (raíz) | 1 | **0** | Análisis general no trackeado. | REVISAR contenido → archivar en `docs/` o remover. |

> Nota: aunque no están trackeadas, son cambios "difíciles de revertir" si no hay
> copia. Antes de remover: inventario + hashes (ya hecho en el JSON) y tu OK.

---

## 2. Zonas TRACKEADAS que requieren decisión humana (no borrar a ciegas)

| Zona | Archivos | Qué es | Recomendación |
|---|---|---|---|
| `corpus/pdf_release/` | 29 (tracked) | `pdf_corpus.zip` + manifests SHA256. Empaquetado de release. | **KEEP** (es release reproducible). Verificar que el zip no duplique PDFs ya versionados. |
| `release/` (padre, 47) | tracked | Infra de release v1: `CANON_MAP.v1.json`, `claim_registry.v1.json`, `layer_boundaries.v1.json`, `editorial_audit_v1/`, `qualia_qo_planning_v1/`, `FREEZE_AUDIT_v1/`. | **KEEP** mayormente. `commands_run.txt` contiene una ruta ajena (`TRADING 3.0`) → revisar/limpiar. |
| `docs/` (padre, 18) | tracked | Mezcla: canónicos (`CANON_MANIFEST`, `CANON_SOURCE_OF_TRUTH`, `LAYER_BOUNDARIES`, `CLAIM_REGISTRY`) **+** outputs de IA (`CODEX_PROMPT_FCR_v10`, `GITLAB_DUO_AUDIT_*`, `AUDIT_FCR_v9/v10`, `QICN_*_v40`). | **SEPARAR**: canónicos se quedan; prompts/auditorías de IA → mover a `docs/ai-platform-outputs/` (o consolidar). |
| Raíz `*.md` de auditoría | tracked | `AUDIT_FORMAL_PROFUNDO_QICN_v28.md`, `PATCH_AUDIT_SUMMARY.md`, `CHANGELOG_QICN_PATCH.md`, `RELEASE_NOTES.md`. | **CONSOLIDAR** en `docs/`/`CHANGELOG.md`. La raíz solo debería tener README/CHANGELOG/gobernanza. |
| `scripts/` (padre, 7 `.cjs`) | tracked | Gates de release (`verify-canonical-*`, `build-canonical-release-bundle`, `sync-public-trunk-*`). 5 marcados ORPHAN_CANDIDATE = invocados por CI/manual, no por `package.json`. | **KEEP** (gobernanza protege gates). Confirmar invocación desde `.gitlab-ci.yml`. |

---

## 3. Lo que NO se toca (protegido por gobernanza)

- `rigid-identity-framework/basecore/` — fuente de verdad foundational.
- `rigid-identity-framework/scripts/` versionados **v22..v35** y `scripts/legacy/` —
  prohibido borrar/renombrar (cadenas de gates preservadas).
- `rigid-identity-framework/registry/` — FCR (schema + jsonl).
- `paper1..paper10`, `paper_bridge_*`, `monolithic/` — fuente LaTeX canónica.
- Cualquier `.tex/.bib/.lean` **referenciado** (bucket KEEP).

---

## 4. Importantes pero potencialmente DESACTUALIZADOS (candidatos a UPDATE)

Detectados por duplicado exacto o por etiqueta de versión divergente:

| Archivo | Señal | Acción sugerida |
|---|---|---|
| `docs/reports/SESSION_ZERO_..._v31.md` == `..._v34.md` | **mismo hash, distinto label** | Conservar uno; el otro es etiqueta-fantasma. Decidir versión canónica. |
| `rigid-identity-framework/release/references.bib`, `paper1..3/references.bib` | `.bib` locales **sin uso** (papers apuntan a `../../release/`) | Confirmar y remover copias locales muertas, o re-apuntar. |
| `basecore/core/sections/11_discrete_bridge.tex` | existe pero **no** está en `BASECORE.tex` (solo 01–10) | Decidir: cablear al volumen o marcar explícitamente como no-incluido. |
| `docs/` (padre) roadmaps `v40` vs `ROADMAP.md` (rigid) | dos roadmaps de distinto nivel | Unificar a un roadmap canónico; el resto a histórico. |

---

## 4-bis. CORRECCIÓN POST-EJECUCIÓN (2026-06-21, verificado con gates)

Al ejecutar A/B y preparar C/D, la verificación contra el repo real **corrigió
varias suposiciones del plan original**:

- **`RELEASE_NOTES.md` (raíz) es CANÓNICO**, no consolidable: el gate
  `verify-canonical-integrity.cjs` valida su existencia. Igual que `README.md`,
  `CHANGELOG.md`, `docs/CANON_SOURCE_OF_TRUTH.md`, `docs/CANON_MANIFEST.md`,
  `docs/CLAIM_REGISTRY.md`, `docs/LAYER_BOUNDARIES.md`,
  `docs/THEORY_SYSTEM_INTERFACE.md`, `docs/CANONICAL_RELEASE_NOTES.md`,
  `release/CANON_MAP.v1.json`, `release/canon_manifest.v1.json`,
  `release/claim_registry.v1.json`, `release/_non_canonical/README.md`,
  `release/FREEZE_AUDIT_v1/git_tags.txt`, `git_log_1.txt`. **NO MOVER NINGUNO.**
- **`docs/reports/PDF_RELEASE_REPRODUCIBILITY_REPAIR_PLAN.md` NO es ruido**: es
  citado por `QICN_GLOBAL_ROADMAP_v40.md`, `QICN_V40_PHASE5A_*`, el ledger y un
  prompt, que **afirman que está en la raíz del repo**. Moverlo rompe referencias
  e historia. KEEP en su sitio.
- **`docs/CODEX_PROMPT_FCR_v10.md`** es citado por ruta en
  `QICN_THEORY_FALSIFIABILITY_ROADMAP.md`. Moverlo rompe el enlace.
- Conclusión: los `.md` de `docs/`/`docs/reports/` del padre son un **sistema
  interconectado de roadmap/release**, no basura suelta. La consolidación
  (Fase C) **no puede ser un `git mv` masivo**; cada movimiento exige actualizar
  sus referrers en el mismo commit atómico, y varios candidatos resultaron ser
  KEEP.

### Estado real de fases

- **Fase A — HECHA**: `photoshop-mcp/`, `artifacts/`, 3 papers-restos, `nul`
  movidos a `_TRIAGE_QUARANTINE_2026-06-21/` (reversible). 0 archivos trackeados
  borrados. Gates canónicos EXIT=0 tras la operación.
- **Fase B — HECHA**: `.gitignore` del padre +`__pyphi_cache__/`,
  `**/__pyphi_cache__/`, `_TRIAGE_QUARANTINE_2026-06-21/`. Verificado con
  `git check-ignore`.
- **Fase C — REQUIERE APROBACIÓN POR ÍTEM**: no es bulldozable. Solo movimientos
  atómicos con actualización de referrers, archivo por archivo. Candidatos con
  CERO referencias externas (posibles): `AUDIT_HANDOFF_FCR_v9.md`,
  `AUDIT_FCR_v10_IMPLEMENTATION.md`, `GITLAB_DUO_AUDIT_TRIAGE_v1.md`,
  `GITLAB_DUO_AUDIT_IMPLEMENTATION_v1.md`, `AUDIT_FORMAL_VERIFICATION_QICN_v1.md`.
  El resto (repair-plan, prompts, roadmaps v40) = KEEP.
- **Fase D — REQUIERE DECISIÓN HUMANA / CLAIM-SENSIBLE**: cablear
  `11_discrete_bridge.tex` en `BASECORE.tex` es una decisión de contenido/claim
  (riesgo de inflación) — NO automatizable. Los `.bib` locales "muertos" y el
  duplicado `SESSION_ZERO_*_v34.md` requieren confirmar 0 referrers antes de
  cualquier borrado.

## 5. Protocolo de ejecución (cuando apruebes, por fases)

1. **Fase A — ruido no trackeado (riesgo mínimo):** `photoshop-mcp/`,
   `artifacts/`, 3 papers-restos, `nul`, cachés. Inventario+hashes ya existen.
   No toca git history. Reversible si hay copia.
2. **Fase B — gitignore** de cachés/entornos para que no reaparezcan.
3. **Fase C — consolidación trackeada (con commit acotado):** mover outputs de
   IA de `docs/` padre a `docs/ai-platform-outputs/`, consolidar `.md` de raíz.
   Sin `git add -A`; archivo por archivo; un commit por objetivo.
4. **Fase D — updates** de archivos importantes desactualizados (§4).

Cada fase: inventario previo → cambio acotado → verificación (`npm run verify`,
gates de release) → entrada en `IMPLEMENTATION_TRACE_LEDGER.md`. Nada se sube
hasta cerrar la fase.

---

## 6. Resumen ejecutivo (una línea)

El ruido grande y seguro de quitar es **no-trackeado y ajeno** (`photoshop-mcp`,
`artifacts`, papers-restos, `nul`, cachés ≈ 1700+ archivos de disco). El ruido
"de credibilidad" (outputs de IA, auditorías sueltas, dobles roadmaps) es
**trackeado** y se resuelve **consolidando**, no borrando. La fuente científica
(basecore, papers, registry, gates versionados) **no se toca**.
