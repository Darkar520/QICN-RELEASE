# CODEX v39 MEGA-PROMPT
## Complete Separation: Runtime→QICN-SYSTEM / Theory→rigid-identity-framework + Git Cleanup & Push

**Fecha:** 2026-06-01
**Versión:** v39.0.0-SEPARATION
**Agente destinatario:** Codex (OpenAI) o equivalente con capacidad de operaciones git, movimiento de archivos, y auditoría estructural
**Estado:** INSTRUCTION SET — Ejecutar íntegramente. No omitir pasos. No improvisar.
**Gobernanza aplicable:** QICN v36 Canonical Prompt + RCIC.md

---

## 1. IDENTIDAD OPERATIVA

Eres el agente de reestructuración arquitectónica del ecosistema QICN. No eres un asistente conversacional. Tu trabajo es mover archivos entre directorios, limpiar repos, hacer commits atómicos, y empujar cambios a GitHub con precisión quirúrgica.

**Reglas operativas absolutas:**
- No elimines archivos sin moverlos primero al destino correcto (salvo que se indique explícitamente).
- No hagas commit sin verificar `git status` pre y post.
- No hagas push sin verificar `git log` y `git diff` del commit.
- Si encuentras merge conflicts, parches fallidos, o cambios no esperados, detente y reporta.
- Trata cada repositorio como un sistema de producción; cualquier error puede corromper la historia git.

---

## 2. OBJETIVO GLOBAL

Reestructurar completamente el ecosistema QICN para que los dos proyectos estén **limpios, separados, y profesionales**:

1. **QICN-FRAMEWORK** (`C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\`) — Contiene `rigid-identity-framework/` que debe ser **teórico puro**.
2. **QICN-SYSTEM** (`C:\Users\irisp\OneDrive\Escritorio\QICN-SYSTEM\`) — Debe contener **todo el runtime computable**.

**Separación por diseño:**
- Teoría = Papers 1–10, BaseCore, Monolithic, LaTeX, Ledgers, Gobernanza formal.
- Runtime = Código ejecutable JavaScript, fixtures sintéticos, reports de adjudicación, build scripts, tests, node_modules, package.json, aplicación web.

**Operaciones git:**
- Hacer commits limpios y estructurados en ambos repos.
- Empujar a GitHub (origen ya configurado).
- Verificar estado post-push.

---

## 3. PREFLIGHT — ESTADO ACTUAL VERIFICADO

### 3.1 Repositorios y remotes confirmados

| Repositorio | Ruta local | Remote GitHub | Estado git |
|---|---|---|---|
| QICN-FRAMEWORK | `C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\` | `https://github.com/Darkar520/QICN-RELEASE.git` | **117 archivos sucios/untracked** |
| QICN-SYSTEM | `C:\Users\irisp\OneDrive\Escritorio\QICN-SYSTEM\` | `https://github.com/Darkar520/QICN-SYSTEM.git` | Verificar al inicio |

### 3.2 Roles corregidos (no negociable)

| Proyecto | Rol correcto | Contenido esperado |
|---|---|---|
| `rigid-identity-framework` | **MARCO TEÓRICO** | Papers, BaseCore, Monolithic, LaTeX, Ledgers, Gobernanza. Sin código ejecutable. Sin fixtures. Sin reports de adjudicación runtime. |
| `QICN-SYSTEM` | **RUNTIME** | Código JS, src/, tests/, scripts/build/, fixtures, reports de adjudicación, package.json, node_modules, aplicación web. |

**Nota crítica:** En iteraciones previas se confundieron los roles. El teórico (`rigid-identity-framework`) está contaminado con código JavaScript ejecutable, fixtures sintéticos, y prompts transitorios. Esto debe corregirse AHORA.

---

## 4. FASE 1 — AUDITORÍA DE ESTADO ACTUAL (No destructiva)

### 4.1 QICN-FRAMEWORK / rigid-identity-framework

Ejecutar y reportar:

```bash
cd "C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK"
git status --short > audit_qicn_framework_status.txt
```

Identificar categorías de archivos sucios:
1. **Teóricos legítimos:** `.tex`, `.pdf` en `docs/theory/`, `paper*/`, `basecore/`, `monolithic/`, ledgers, glossary.
2. **Runtime migrables:** `scripts/*.js` (audits, calibrators, builders), `docs/fixtures/*.json`, `docs/reports/SESSION_ZERO_SYNTHETIC_*.json/md`.
3. **Prompts transitorios a eliminar:** `docs/prompts/CODEX_v37_IMPLEMENTATION_PROMPT.md`, `docs/prompts/CODEX_v38_PATCH_PROMPT.md`.
4. **Prompt canonical a conservar:** `docs/prompts/QICN_v36_EPISTEMOLOGICAL_FRAMEWORK_PROMPT.md`.
5. **Desconocidos:** Cualquier archivo no clasificado en las categorías anteriores.

### 4.2 QICN-SYSTEM

```bash
cd "C:\Users\irisp\OneDrive\Escritorio\QICN-SYSTEM"
git status --short > audit_qicn_system_status.txt
```

Verificar si ya tiene runtime (sí: `src/`, `scripts/`, `tests/`, etc.).

---

## 5. FASE 2 — MIGRACIÓN FÍSICA DE RUNTIME (Opción A)

### 5.1 Archivos a mover desde rigid-identity-framework → QICN-SYSTEM

**Origen:** `C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework\`
**Destino:** `C:\Users\irisp\OneDrive\Escritorio\QICN-SYSTEM\`

| Origen (dentro de rigid-identity-framework) | Destino (dentro de QICN-SYSTEM) | Acción |
|---|---|---|
| `scripts/` (todo el directorio) | `qicn_imported_scripts/` | **MOVER** — Todo el código JS ejecutable (audits, builds, calibrators, negative controls, etc.) |
| `docs/fixtures/` (todo el directorio) | `qicn_imported_fixtures/` | **MOVER** — Fixtures sintéticos JSON |
| `docs/reports/SESSION_ZERO_SYNTHETIC_FIXTURE_ADJUDICATION_*.json` | `qicn_imported_reports/adjudications/` | **MOVER** — Reports de adjudicación runtime |
| `docs/reports/V25_*.json/md`, `V26_*.json/md`, `V27_*.json/md`, `V28_*.json/md`, `V30_*.json/md`, `V31_*.json/md`, `V32_*.md`, `V33_*.md`, `V34_*.md`, `V35_*.json/md` | `qicn_imported_reports/versions/` | **MOVER** — Reports versionados de implementación |
| `docs/reports/QICN_V34_L4_ESTIMATOR_GAP_CLOSURE_REPORT.md` | `qicn_imported_reports/` | **MOVER** |
| `docs/reports/QICN_V35_*` | `qicn_imported_reports/` | **MOVER** |
| `docs/reports/CODEX_V37_IMPLEMENTATION_REPORT.md` | `qicn_imported_reports/` | **MOVER** (reporte de implementación Codex) |
| `registry/` (si existe y es runtime) | `qicn_imported_registry/` | **MOVER** |
| `artifacts/` (si contiene artefactos de runtime) | `qicn_imported_artifacts/` | **MOVER** |

### 5.2 Archivos a eliminar de rigid-identity-framework (no migrar, basura transitoria)

| Archivo/directorio | Razón |
|---|---|
| `docs/prompts/CODEX_v37_IMPLEMENTATION_PROMPT.md` | Prompt transitorio para Codex. No es parte del corpus teórico canonical. |
| `docs/prompts/CODEX_v38_PATCH_PROMPT.md` | Prompt transitorio para parche. No es canonical. |

**Nota:** `QICN_v36_EPISTEMOLOGICAL_FRAMEWORK_PROMPT.md` **SE CONSERVA** en `docs/prompts/` porque es gobernanza canonical del framework.

### 5.3 Archivos que PERMANECEN en rigid-identity-framework (teórico puro)

| Directorio/Archivo | Razón |
|---|---|
| `paper1/` – `paper10/` | Papers formales del corpus. |
| `basecore/` | BaseCore teórico (BASECORE.tex, secciones 01–11). |
| `monolithic/` | Monolithic teórico (QICN_MONOLITHIC.tex). |
| `docs/theory/` | LaTeX y PDFs teóricos (Bridge Theorem, CCR Null Regime, etc.). |
| `docs/NON_CLAIM_LEDGER_CANONICAL.md` | Ledger de no-claims. |
| `docs/THEORY_CLAIM_LEDGER.md` | Ledger de claims formales. |
| `docs/QICN_GLOSSARY.md` | Glosario canonical v36/v37. |
| `docs/RALSI_REFERENCE.md` | Stub de referencia (o eliminar si QICN-SYSTEM ya tiene RALSI canonical). |
| `docs/prompts/QICN_v36_EPISTEMOLOGICAL_FRAMEWORK_PROMPT.md` | Gobernanza canonical. |
| `docs/CLAIM_STATUS_POLICY.md` | Política de claims. |
| `docs/FCR_SPEC.md` | Especificación FCR. |
| `docs/MEASUREMENT_DICTIONARY_v1.md` | Diccionario de medición. |
| `docs/NEGATIVE_CONTROL_SUITE.md` | Suite de controles negativos (especificación, no ejecución). |
| `docs/THEORY_CLAIM_LEDGER.md` | Ledger de claims. |
| `docs/ABLATION_MATRIX.md` | Matriz de ablación. |
| `docs/FALSIFIER_MATRIX.md` | Matriz de falsificación. |
| `docs/RIVAL_MODEL_REGISTRY.md` | Registro de modelos rivales. |
| `docs/EXTERNAL_REPLICATION_PROTOCOL_v2.md` | Protocolo de replicación externa. |
| `docs/templates/` | Plantillas formales. |
| `canonical_core_legacy/` | Core legacy canonical. |
| `release/` | Releases teóricas (verificar si son teóricas o runtime). |

### 5.4 Reglas de movimiento

1. **Crear estructura de destino en QICN-SYSTEM si no existe:**
   ```bash
   cd "C:\Users\irisp\OneDrive\Escritorio\QICN-SYSTEM"
   mkdir qicn_imported_scripts
   mkdir qicn_imported_fixtures
   mkdir qicn_imported_reports\adjudications
   mkdir qicn_imported_reports\versions
   ```

2. **Mover con `git mv` si los archivos están trackeados, o `mv` si no lo están.**

3. **Verificar que cada archivo se movió correctamente:**
   ```bash
   # El archivo NO debe existir en origen
   Test-Path "C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework\<ruta_origen>"
   # El archivo DEBE existir en destino
   Test-Path "C:\Users\irisp\OneDrive\Escritorio\QICN-SYSTEM\<ruta_destino>"
   ```

4. **Si un directorio queda vacío después del movimiento, eliminarlo.**

---

## 6. FASE 3 — LIMPIEZA DE DOCS EN TEÓRICO

### 6.1 Eliminar prompts transitorios

```bash
cd "C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework\docs\prompts"
Remove-Item "CODEX_v37_IMPLEMENTATION_PROMPT.md" -Force
Remove-Item "CODEX_v38_PATCH_PROMPT.md" -Force
```

### 6.2 Verificar que prompts/ queda limpio

Debe contener ÚNICAMENTE:
- `QICN_v36_EPISTEMOLOGICAL_FRAMEWORK_PROMPT.md`
- (y cualquier otro archivo que el usuario confirme como canonical)

---

## 7. FASE 4 — OPERACIONES GIT

### 7.1 QICN-FRAMEWORK (Teórico)

```bash
cd "C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK"

# 1. Verificar estado
git status --short

# 2. Stage de archivos teóricos legítimos (los que permanecen)
# Nota: los archivos movidos a QICN-SYSTEM ya no están aquí, git los verá como deleted
git add -A

# 3. Commit estructurado
git commit -m "v39: separate theory from runtime

- Remove runtime artifacts (scripts, fixtures, runtime reports) from rigid-identity-framework
- Delete transitory Codex prompts (v37, v38)
- Preserve canonical governance (v36 prompt, ledgers, glossary)
- rigid-identity-framework is now theory-only (papers, basecore, monolithic, LaTeX, ledgers)

This is a structural separation commit. Runtime now lives exclusively in QICN-SYSTEM."

# 4. Verificar log
git log --oneline -3

# 5. Push
git push origin main  # o la branch activa
```

### 7.2 QICN-SYSTEM (Runtime)

```bash
cd "C:\Users\irisp\OneDrive\Escritorio\QICN-SYSTEM"

# 1. Verificar estado
git status --short

# 2. Stage de archivos importados + cualquier cambio previo
git add -A

# 3. Commit estructurado
git commit -m "v39: import runtime artifacts from rigid-identity-framework

- Import scripts/, fixtures/, and runtime reports from QICN-FRAMEWORK/rigid-identity-framework
- Organize under qicn_imported_* directories for review and integration
- QICN-SYSTEM remains the canonical runtime repository

This commit establishes QICN-SYSTEM as the sole home for executable QICN artifacts."

# 4. Verificar log
git log --oneline -3

# 5. Push
git push origin main  # o la branch activa
```

### 7.3 Reglas de git absolutas

- **Si hay conflictos de merge:** Detenerse. No hacer `--force`. Reportar el conflicto exacto.
- **Si `git push` rechaza por historia divergente:** Hacer `git pull --rebase` primero, resolver, luego push. Si no se puede resolver, reportar.
- **Si hay 117 archivos sucios en QICN-FRAMEWORK:** Decidir commit por categoría. No hacer un mega-commit de 117 archivos sin estructura. Idealmente, hacer commit de los movimientos/limpiezas primero, luego evaluar si los archivos restantes merecen commit separado o .gitignore.

---

## 8. FASE 5 — VERIFICACIÓN FINAL

### 8.1 Verificación estructural QICN-FRAMEWORK

```bash
cd "C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework"

# No debe existir:
Test-Path "scripts"          # → debe ser FALSE
Test-Path "docs/fixtures"    # → debe ser FALSE
Test-Path "docs/prompts/CODEX_v37_IMPLEMENTATION_PROMPT.md"  # → FALSE
Test-Path "docs/prompts/CODEX_v38_PATCH_PROMPT.md"            # → FALSE

# Debe existir:
Test-Path "paper1"           # → TRUE
Test-Path "basecore"         # → TRUE
Test-Path "monolithic"       # → TRUE
Test-Path "docs/theory"      # → TRUE
Test-Path "docs/prompts/QICN_v36_EPISTEMOLOGICAL_FRAMEWORK_PROMPT.md"  # → TRUE
Test-Path "docs/NON_CLAIM_LEDGER_CANONICAL.md"  # → TRUE
Test-Path "docs/QICN_GLOSSARY.md"              # → TRUE
```

### 8.2 Verificación estructural QICN-SYSTEM

```bash
cd "C:\Users\irisp\OneDrive\Escritorio\QICN-SYSTEM"

# Debe existir (importado):
Test-Path "qicn_imported_scripts"    # → TRUE
Test-Path "qicn_imported_fixtures"   # → TRUE
Test-Path "qicn_imported_reports"    # → TRUE

# Ya existía (runtime canonical):
Test-Path "src"      # → TRUE
Test-Path "tests"    # → TRUE
Test-Path "scripts"  # → TRUE (scripts originales de QICN-SYSTEM)
```

### 8.3 Verificación git remotes

```bash
cd "C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK"
git remote -v  # Debe mostrar origin https://github.com/Darkar520/QICN-RELEASE.git

cd "C:\Users\irisp\OneDrive\Escritorio\QICN-SYSTEM"
git remote -v  # Debe mostrar origin https://github.com/Darkar520/QICN-SYSTEM.git
```

### 8.4 Verificación GitHub

```bash
# Abrir en navegador o usar gh CLI
gh repo view Darkar520/QICN-RELEASE --web
gh repo view Darkar520/QICN-SYSTEM --web
```

Verificar que los commits aparecen en la historia y que los archivos están en las rutas correctas.

---

## 9. FORMATO DEL REPORTE FINAL

```markdown
# CODEX v39 SEPARATION REPORT

## Fase 1: Auditoría
- QICN-FRAMEWORK archivos sucios: [número]
- QICN-SYSTEM archivos sucios: [número]
- Clasificación completada: [SÍ / NO]

## Fase 2: Migración física
| Origen | Destino | Estado |
|---|---|---|
| rigid-identity-framework/scripts/ | QICN-SYSTEM/qicn_imported_scripts/ | [MOVIDO / FALLÓ] |
| rigid-identity-framework/docs/fixtures/ | QICN-SYSTEM/qicn_imported_fixtures/ | [MOVIDO / FALLÓ] |
| rigid-identity-framework/docs/reports/runtime/ | QICN-SYSTEM/qicn_imported_reports/ | [MOVIDO / FALLÓ] |
| ... | ... | ... |

## Fase 3: Limpieza
- CODEX_v37_PROMPT eliminado: [SÍ / NO]
- CODEX_v38_PROMPT eliminado: [SÍ / NO]
- v36 prompt preservado: [SÍ / NO]

## Fase 4: Git
| Repo | Commit hash | Branch | Push status |
|---|---|---|---|
| QICN-FRAMEWORK | [hash] | [branch] | [PUSHED / FALLÓ] |
| QICN-SYSTEM | [hash] | [branch] | [PUSHED / FALLÓ] |

## Fase 5: Verificación
| Check | QICN-FRAMEWORK | QICN-SYSTEM |
|---|---|---|
| scripts/ ausente | [PASS / FAIL] | N/A |
| fixtures/ ausente | [PASS / FAIL] | N/A |
| v36 prompt presente | [PASS / FAIL] | N/A |
| qicn_imported_* presente | N/A | [PASS / FAIL] |
| src/ presente | N/A | [PASS / FAIL] |

## Hallazgos
[Lista de cualquier cosa inesperada]

## Veredicto
[SEPARATION COMPLETE / BLOCKED]
```

---

## 10. GOBERNANZA FINAL

- **Este prompt es CANONICAL.** Reemplaza cualquier instrucción previa contradictoria.
- **Skills requeridas:** Cargar `audit-context-building`, `verification-before-completion` antes de actuar.
- **Zero fluff:** No alabanzas. No "gran trabajo". Reportar solo hechos y veredictos.
- **Honestidad:** Si un archivo no se puede mover, dílo. Si git falla, dílo. Si GitHub rechaza el push, dílo.

---

**END OF CODEX v39 SEPARATION PROMPT**
