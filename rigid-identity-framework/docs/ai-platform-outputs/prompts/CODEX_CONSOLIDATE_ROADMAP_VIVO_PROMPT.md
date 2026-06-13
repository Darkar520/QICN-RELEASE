# PROMPT CODEX — Iteración sobre ROADMAP.md existente (consolidación post-auditorías)

## INSTRUCCIONES DE USO

Este prompt es para Codex (OpenAI). Se debe ejecutar dentro del repositorio
`C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework`
con permisos de escritura.

**REGLA CRÍTICA**: Este prompt te pide **ITERAR sobre `ROADMAP.md`**, NO
crear un archivo nuevo. El `ROADMAP.md` actual (1091 líneas) ya contiene
la VERSION 1 y VERSION 2 literales proporcionadas por el usuario. Tu
trabajo es **AMPLIARLO** agregando secciones consolidadas al final
(después de la VERSION 2), absorbiendo el contenido de las 4 auditorías
externas y de los reportes de fase ejecutados.

---

## 0. Contexto del proyecto

**QICN-FRAMEWORK** es un framework teórico-matemático sobre "identidad
rígida". Tiene tres componentes:

1. **rigid-identity-framework/**: marco teórico LaTeX (10 papers + BaseCore
   + monolito).
2. **QICN-SYSTEM/**: runtime React/Netlify que operacionaliza invariantes.
3. **release/, registry/, corpus/, artifacts/**: artefactos inmutables.

El proyecto ha pasado por Fases 0, 1, 2 (5 iteraciones), 3 (2
iteraciones), 4 (5 iteraciones), 5A, 5B, 5D, 6.1, y está próximo a 6.2.
Hay ~28 reportes de fase y 4 auditorías externas recientes que
necesitan consolidarse en el roadmap.

---

## 1. Reglas de gobernanza (NO NEGOCIABLES)

Lee primero:

- `rigid-identity-framework/INSTRUCCIONES.md`
- `rigid-identity-framework/AGENTS.md` (si existe)
- `rigid-identity-framework/docs/CANON_SOURCE_OF_TRUTH.md`
- `rigid-identity-framework/docs/CLAIM_REGISTRY.md`
- `rigid-identity-framework/docs/LAYER_BOUNDARIES.md`

Reglas absolutas:

- **NUNCA** toques `.tex`, PDFs, `release/`, `corpus/`, `artifacts/`,
  macros, labels, scripts, ni registry.
- **SÍ puedes** iterar sobre `rigid-identity-framework/ROADMAP.md`.
- **SÍ puedes** actualizar `IMPLEMENTATION_TRACE_LEDGER.md`.
- **NO** crees archivos nuevos de roadmap (NO `ROADMAP_VIVO.md` ni
  `ROADMAP_V4.md`). Itera sobre el existente.
- **NO** borres la VERSION 1 ni la VERSION 2 del `ROADMAP.md`. Son
  literales del usuario.
- **SÍ** puedes agregar nuevas secciones al final del `ROADMAP.md`,
  después de la VERSION 2, con título claro.
- **NO** uses `git add -A`, commits amplios, ni pushes globales.
- **NO** borres archivos históricos (los roadmaps previos quedan como
  referencia).

---

## 2. El archivo ROADMAP.md actual (LO QUE VAS A AMPLIAR)

**Path**: `C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework\ROADMAP.md`

**Estado actual**:
- Tamaño: ~1091 líneas
- Hash SHA256 actual: `A53C49B141D2737D772F4E91B503A278E308E3B790D5EFD374EE18321700A8F5`
- Contiene: VERSION 1 (líneas 14-?) y VERSION 2 (a partir de línea ?)
- Estructura: nota de gobierno + VERSION 1 literal + VERSION 2 literal

**Tu objetivo**: agregar al final del archivo (después de VERSION 2)
las siguientes secciones consolidadas, sin reemplazar nada:

```
## VERSION 3 - Consolidación post-auditorías (Codex, 2026-06-11)

Esta versión NO reemplaza VERSION 1 ni VERSION 2. Las preserva como
texto literal. VERSION 3 es una extensión consolidada que absorbe:

- 4 auditorías externas recientes
- 28 reportes de fase ejecutados
- Estado actual del monolito, registry, runtime
- Hoja de ruta priorizada para Fases 6.2 a 8+

### 3.1 Auditorías externas integradas

### 3.2 Estado técnico actual

### 3.3 Hallazgos críticos abiertos (consolidados)

### 3.4 Deuda rastreada (no bloqueante)

### 3.5 Inflación de claims a desinflar (de Fable 5)

### 3.6 Hoja de ruta priorizada (Fases 6.2 a 8+)

### 3.7 Subfases de Fase 6 (ya iniciadas)

### 3.8 Comandos canónicos de verificación

### 3.9 Riesgos residuales activos

### 3.10 Cronología completa de fases
```

---

## 3. Material a absorber (NO crear, solo destilar)

### 3.1 Auditorías externas a integrar

**Auditoría 1: Fable 5 (en frío, matemática)** — el usuario te la
compartirá por aparte. Contiene:

- Veredicto global del proyecto
- 11 hallazgos matemáticos principales con severidad
- Inventario de supuestos por teorema central
- Tabla de inflación de claims a desinflar
- Hoja de ruta priorizada (hardening → nuevos resultados → deuda
  formal → deuda empírica)
- Posicionamiento frente a IIT, GNW, HOT
- QICN-SYSTEM no inspeccionado directamente

**Auditoría 2: OpenCode (Fase 5B — higiene PDF)** — ya está en el
ledger. Contiene:

- Verificación de hashes SHA256
- Conteo de labels/refs en monolito
- Evaluación del builder monolítico
- Hallazgo: `\codestate` triple definición
- Bridge paper sin source path
- Hash monolito: `D2AA44352A967A77F12F770CDD9B8FCB1E1BFF2C90A9EDFC17D4E7CAD425A785`
- 334 páginas, 2,837,340 bytes
- 8 overfull, 331 underfull (deuda de layout)
- 401 labels únicos, 0 duplicados
- 284 refs, 0 faltantes

**Auditoría 3: OpenCode (Fase 6 — implementación Codex)** — ya está
en el ledger. Contiene:

- Scope respetado: solo 2 archivos
- SHA256 reporte: `64E6B0B91FCE6C3163C04A7F562BD9DD2A3DCA1E933BE7393E42772D92803A79`
- SHA256 ledger: `AEFE321E3A680144718D92DBC89E5EC35287C624813492AF0006F986028C501C`
- **HALLAZGO CRÍTICO**: 3 scripts `verify-*` citados no existen
- Gap adversarial-negative-controls v2/v3 confirmado
- Tests: trace-memory PASS, negative-controls PASS 6/6, adversarial FAIL
- Veredicto: PASS_WITH_ADVERSARIAL_HARNESS_COMPATIBILITY_GAP

**Auditoría 4: OpenCode (QICN-SYSTEM runtime)** — ya está en el
ledger. Contiene:

- `SimulationEngine.jsx`: ~12,000 líneas (god component)
- `OntologicalSingularityCore.js`: "Ascension", "Anti-Yo",
  "Singularidad Ontológica"
- `services/config.js`: `TOTAL_NODES: 10_000_000`,
  `HYPERCOHERENCE_VALUE: 9999.0`
- `selfpatch-apply.js`: auto-modificación de código
- `comparative_program/`: 92 archivos, mayoría stubs
- `package.json` nombre "versiones-de-interfaz"
- AGENTS.md con paths rotos

### 3.2 Reportes de fase a destilar (NO copiar, solo extraer
decisiones)

**Roadmaps existentes** (mantener como referencia, mencionar pero no
copiar):

- `rigid-identity-framework/ROADMAP.md` (el archivo que estás
  editando, VERSION 1+2 literales)
- `rigid-identity-framework/docs/reports/QICN_GLOBAL_ROADMAP_v40.md`
- `rigid-identity-framework/docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md`

**Reportes V3** (destilar decisiones y status):

- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE0_BASELINE.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE1_AUDIT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE2_CLOSURE_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE2_ITERATION1_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE2_ITERATION2_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE2_ITERATION3_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE2_ITERATION4B_PAPER2_NORMALIZATION_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE2_ITERATION4_OWNERSHIP_AUDIT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE2_ITERATION5A_PAPER1_3_OPENINGS_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE2_ITERATION5B_PAPER8_9_HIGH_RISK_OPENINGS_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE3_ITERATION1_LANGUAGE_ALIAS_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE3_ITERATION2_PAPER7_ALIAS_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE4_ITERATION1_MATH_HARDENING_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE4_ITERATION2_PAPER2_MATH_HARDENING_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE4_ITERATION3_PAPER5_IMPORT_LANGUAGE_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE4_ITERATION4_PAPER8_9_HIGH_RISK_SEMANTIC_AUDIT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE4_ITERATION5_ONE_SHOT_PAPER8_9_HARDENING_REPORT.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_PHASE6_RIVALS_LIMITED_INVENTORY.md`
- `docs/ai-platform-outputs/reports/QICN_ROADMAP_V3_POST_ITERATION3_MONOLITHIC_SYNC_REPORT.md`

**Reportes Fase 5** (destilar hashes, status, decisiones de cierre):

- `docs/reports/QICN_V40_PHASE5_PDF_REPRODUCIBILITY_STATUS.md`
- `docs/reports/QICN_V40_PHASE5A_AUDIT_AND_INVENTORY_REPORT.md`
- `docs/reports/QICN_V40_PHASE5B_PDF_HYGIENE_AND_TRANSVERSAL_AUDIT_REPORT.md`
- `docs/reports/QICN_V40_PHASE5D_WORKSPACE_CHANGE_CLASSIFICATION_REPORT.md`
- `docs/reports/QICN_V40_PHASE5_FINAL_CLOSURE_REPORT.md`
- `docs/reports/QICN_V40_OPENCODE_CROSS_AUDIT_GAP_CLOSURE_REPORT.md`
- `docs/reports/MONOLITHIC_BUILD_REPORT.md`
- `docs/reports/MONOLITHIC_COMPILE_RISK_AUDIT.md`

**Ledger activo**:

- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`

---

## 4. Estructura objetivo de la VERSION 3 a agregar

Al final del `ROADMAP.md` actual (después de VERSION 2), agrega esta
sección con la siguiente estructura. Tamaño objetivo: 600-900 líneas
adicionales (total final del archivo: 1700-2000 líneas).

```markdown
---

# VERSION 3 - Consolidación post-auditorías (Codex, 2026-06-11)

> **Nota de gobierno**: esta versión NO reemplaza VERSION 1 ni
> VERSION 2, que se preservan como texto literal del usuario.
> VERSION 3 es una **extensión consolidada** que absorbe el estado
> técnico, los hallazgos críticos y la hoja de ruta priorizada
> derivados de las auditorías externas recientes y de los reportes
> de fase ejecutados.
>
> **Fuentes absorbidas** (sin reemplazar):
> - 3 auditorías OpenCode (Fase 5B, Fase 6, QICN-SYSTEM) — ver
>   ledger líneas 2822+
> - 1 auditoría Fable 5 (matemática, en frío) — compartida por
>   el usuario
> - 20 reportes V3 en `docs/ai-platform-outputs/reports/`
> - 8 reportes Fase 5 en `docs/reports/`
> - 2 roadmaps históricos en `docs/reports/` (referencia)
>
> **Estado del monolito al cierre de Fase 5B**:
> - 334 páginas, 2,837,340 bytes
> - SHA256: `D2AA44352A967A77F12F770CDD9B8FCB1E1BFF2C90A9EDFC17D4E7CAD425A785`
> - 401 labels únicos, 0 duplicados, 284 refs, 0 faltantes
> - 8 overfull, 331 underfull (deuda de layout rastreada)
> - Status: `MONOLITHIC_COMPILED`
>
> **Tests críticos al cierre de Fase 6.1**:
> - `npm run test:trace-memory-rival`: PASS
> - `npm run test:negative-controls`: PASS (6/6)
> - `npm run test:adversarial-negative-controls`: FAIL (gap v2/v3)

## 3.1 Veredicto global de las auditorías externas

(Resumen de 2-3 párrafos combinando los veredictos de las 4
auditorías. El de Fable 5 es el más reciente y riguroso.)

## 3.2 Hallazgos críticos abiertos (consolidados)

Tabla con todos los hallazgos CRÍTICOS y ALTOS de las 4 auditorías.
Para cada uno:
- ID
- Descripción (1-2 frases)
- Fuente (Fable 5 / OpenCode Fase 5B / OpenCode Fase 6 / OpenCode
  QICN-SYSTEM)
- Evidencia (archivo:línea)
- Severidad
- Estado (ABIERTO / EN_PROGRESO / CERRADO)

## 3.3 Deuda rastreada (no bloqueante)

Subsecciones:
- 3.3.1 Deuda de layout (monolito y papers)
- 3.3.2 Deuda de formalización (H5, lower Lipschitz, atomic
  separator, I_int)
- 3.3.3 Deuda de curación (registry 100% draft)
- 3.3.4 Deuda de runtime (QICN-SYSTEM god component,
  lenguaje pseudocientífico, selfpatch)
- 3.3.5 Deuda de tooling (scripts verify-* faltantes, gap v2/v3,
  bridge paper sin fuente)
- 3.3.6 Deuda empírica (0 validación externa)

## 3.4 Inflación de claims a desinflar (de Fable 5)

Tabla con la columna "Lenguaje actual" → "Reformulación técnica"
para cada término ontológicamente cargado:

| Lenguaje actual | Reformulación técnica |
|---|---|
| ontological mass | deformation-resistance scalar |
| forced continuity | continuity under CCR admissibility |
| non-simulability | non-factorization for faithful simulators |
| operational consciousness | operational structural criterion Cop |
| qualia | operational equivalence classes |
| runtime evidence | internal conformance output |
| bridge | typed mapping/coupling hypothesis |
| identity is unique | inverse limit unique up to iso |

## 3.5 Hoja de ruta priorizada (Fases 6.2 a 8+)

### A. Hardening de teoremas existentes (matemática)

1. Probar independencia de H5
2. Reescribir rigidez como estabilidad métrica
3. Localizar el spectral gap
4. Formalizar categoría de identidad

### B. Nuevos resultados necesarios

5. Teorema de identificabilidad de M_Ω
6. Existencia de atomic separator para clase no trivial
7. Lower Lipschitz para Φ concretos
8. Non-simulability taxonomy con jerarquía

### C. Resolver gaps de tooling

9. Localizar/corregir scripts `verify-*` faltantes
10. Resolver gap adversarial-negative-controls v2/v3
11. Crear source path canónico para Bridge paper

### D. Resolver deuda de runtime

12. Dividir SimulationEngine.jsx en <500 líneas por componente
13. Eliminar lenguaje pseudocientífico del código de producción
14. Sandbox-aislar selfpatch-apply.js
15. Limpiar 92 stubs de comparative_program/

### E. Deuda empírica

16. Diseñar benchmarks ciegos
17. Validar M_Ω contra perturbaciones controladas
18. Comparar contra IIT/GNW/HOT en datasets comunes
19. Congelar predicciones antes de experimentos

### F. Publicabilidad

20. Reducir inflación de claims siguiendo tabla §3.4
21. Separar runtime de claims científicos
22. Curación humana de al menos 50 teoremas centrales
23. Documentar I_int/atomic separator como deuda formal

## 3.6 Subfases de Fase 6 (ya iniciadas)

- 6.1: Rival literature seed and matrix inventory ✅
- 6.2: Claim-to-rival mapping contra registry (próxima)
- 6.3: Comparator protocol design
- 6.4: Local harness gap audit
- 6.5: Paper/report integration opcional

## 3.7 Posicionamiento frente a rivales (de Fable 5)

Resumen de 1 párrafo por rival:
- IIT: QICN compite mejor en continuidad/ruptura/identidad a
  través del tiempo. Predicción separadora: sistemas con
  similar integración causal IIT pero distinta rigidez
  inverse-limit.
- GNW: QICN puede distinguir persistencia de identidad e
  invariantes estructurales incluso cuando hay broadcast
  funcional.
- HOT: QICN no depende de metarrepresentación; puede formular
  criterios sin metacognición.
- PP / Active Inference / Functionalism: LITERATURE_DEBT.

## 3.8 Comandos canónicos de verificación

Lista exacta de comandos que SÍ funcionan y deberían ejecutarse
en cada fase de cierre:

```bash
cd rigid-identity-framework
npm run verify:v31
npm run test:trace-memory-rival
npm run test:negative-controls
npm run build:monolithic
npm run compile:monolithic
node scripts/audit-public-release-reproducibility.cjs
```

**ADVERTENCIA**: NO citar `scripts/verify-canonical-integrity.cjs`,
`scripts/verify-claim-registry.cjs`, ni
`scripts/verify-canonical-release.cjs` — no existen en este repo
interno. Si se necesitan, verificar primero con `Get-ChildItem
scripts/ -Filter "verify-*.cjs"`.

## 3.9 Riesgos residuales activos

Lista priorizada de riesgos críticos que deben cerrarse antes de
cualquier claim público fuerte:

1. H5 no derivada (matemática)
2. Lower Lipschitz no probada (matemática)
3. Atomic separator no garantizado (matemática)
4. 0% curación humana registry (curación)
5. 0% validación externa (empírica)
6. Scripts `verify-*` faltantes (tooling)
7. Selfpatch sin sandbox (seguridad)
8. Lenguaje pseudocientífico en runtime (comunicación)
9. Bridge paper sin fuente canónica (provenance)
10. I_int/atomic separator sin cierre (formal)

## 3.10 Cronología completa de fases

Tabla maestra cronológica:

| Fase | Subfase | Nombre | Status | Fecha |
|---|---|---|---|---|
| 0 | — | Baseline | ✅ | 2026-06-05 |
| 1 | — | Audit redundancia | ✅ | 2026-06-05 |
| 2 | 1 | Claim boundaries iter 1 | ✅ | 2026-06-05 |
| 2 | 2 | Claim boundaries iter 2 | ✅ | 2026-06-05 |
| 2 | 3 | Claim boundaries iter 3 | ✅ | 2026-06-05 |
| 2 | 4 | Ownership audit | ✅ | 2026-06-05 |
| 2 | 4B | Paper 2 normalization | ✅ | 2026-06-05 |
| 2 | 5A | Paper 1/3 openings | ✅ | 2026-06-05 |
| 2 | 5B | Paper 8/9 high-risk | ✅ | 2026-06-05 |
| 2 | cierre | Closure | ✅ | 2026-06-05 |
| 3 | 1 | Language aliases | ✅ | 2026-06-05 |
| 3 | 2 | Paper 7 aliases | ✅ | 2026-06-05 |
| 4 | 1 | Math hardening | ✅ | 2026-06-05 |
| 4 | 2 | Paper 2 math | ✅ | 2026-06-06 |
| 4 | 3 | Paper 5 import lang | ✅ | 2026-06-06 |
| 4 | 4 | Paper 8/9 semantic | ✅ | 2026-06-06 |
| 4 | 5 | Paper 8/9 one-shot | ✅ | 2026-06-06 |
| 5A | — | Audit & inventory | ✅ | 2026-06-04 |
| 5B | — | PDF hygiene | ✅ | 2026-06-04 |
| 5D | — | Workspace classification | ✅ | 2026-06-04 |
| 5 | cierre | Final closure | ✅ | 2026-06-04 |
| 6 | 1 | Rival inventory | ✅ | 2026-06-07 |
| 6 | 2 | Claim-to-rival mapping | ⏳ PRÓXIMA |
| 6 | 3 | Comparator protocol | ⏳ |
| 6 | 4 | Harness gap audit | ⏳ |
| 6 | 5 | Paper integration | ⏳ opcional |
| 7 | — | Public release prep | ⏳ |
| 8 | — | Submission prep | ⏳ |

## 3.11 Glosario de inflación a evitar

(50+ términos con su reformulación técnica, copiada de §3.4 y
extendida)

## 3.12 Referencias históricas (NO canónicas)

Lista de archivos que se mantienen como referencia histórica:

- `docs/reports/QICN_GLOBAL_ROADMAP_v40.md`
- `docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md`
- 20 reportes en `docs/ai-platform-outputs/reports/`
- 8 reportes de Fase 5 en `docs/reports/`
- `docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`
  (referencia continua)

## 3.13 Próximo paso inmediato

Una sola frase:

> Ejecutar Fase 6.2 (claim-to-rival mapping contra el claim
> registry), aplicando primero la tabla de inflación §3.4 para
> desinflar los claims centrales antes de cualquier comparación.
```

---

## 5. Instrucciones de ejecución paso a paso

### Paso 1: Preparación (5 min)

```bash
cd C:\Users\irisp\OneDrive\Escritorio\QICN-FRAMEWORK\rigid-identity-framework
git status
git log --oneline -5
```

Confirma que el working tree está limpio o que los cambios
pendientes son del scope actual.

### Paso 2: Lectura de gobernanza (15 min)

Lee en este orden:
1. `INSTRUCCIONES.md`
2. `AGENTS.md` (si existe)
3. `docs/CANON_SOURCE_OF_TRUTH.md`
4. `docs/CLAIM_REGISTRY.md`
5. `docs/LAYER_BOUNDARIES.md`
6. `docs/THEORY_SYSTEM_INTERFACE.md`

No edites nada todavía.

### Paso 3: Lectura del ROADMAP.md actual (10 min)

Lee el `ROADMAP.md` actual (1091 líneas) COMPLETO. Identifica:
- Dónde termina la VERSION 2 (última línea con contenido)
- Qué separador hay entre VERSION 1 y VERSION 2 (probablemente
  `---`)
- Qué estilo de markdown se usa (encabezados, separadores,
  formato de tablas)

### Paso 4: Absorción de roadmaps previos (30 min)

Lee los 2 roadmaps complementarios:
- `docs/reports/QICN_GLOBAL_ROADMAP_v40.md`
- `docs/reports/QICN_THEORY_FALSIFIABILITY_ROADMAP.md`

Documenta cualquier conflicto con la VERSION 1/2 del ROADMAP.md
principal en una nota interna (no en el archivo final).

### Paso 5: Absorción de reportes de fase (60 min)

Para cada uno de los 20+8 reportes:
- Lee el resumen ejecutivo
- Identifica qué status/findings deben pasar a §3.10 (cronología)
- Identifica qué deuda debe pasar a §3.3
- Identifica qué es efímero (no debe pasar)

**No copies texto literal. Destila.**

### Paso 6: Absorción de la auditoría Fable 5 (30 min)

Cuando el usuario te comparta la auditoría Fable 5:
- Léela completa
- Integra los 11 hallazgos en §3.2
- Integra la tabla de inflación en §3.4
- Integra la hoja de ruta priorizada en §3.5
- Integra la tabla de supuestos en §3.11 (glosario)
- Integra la posición frente a rivales en §3.7

### Paso 7: Absorción de las 3 auditorías OpenCode (45 min)

Para cada una de mis auditorías (Fase 5B, Fase 6, QICN-SYSTEM):
- Integra los hallazgos en §3.2
- Integra los hashes verificados en el header de VERSION 3
- Integra la deuda de runtime en §3.3.4
- Integra los gaps de tooling en §3.3.5

### Paso 8: Síntesis (30 min)

Cruza información:
- ¿Hay hallazgos duplicados entre auditorías? → Consolida
- ¿Hay conflictos entre auditorías? → Documenta ambos
- ¿Hay hallazgos que solo aparecen en una? → Prioriza por
  severidad

### Paso 9: ESCRITURA — agregar VERSION 3 al final del ROADMAP.md
(60 min)

**REGLA CRÍTICA**: NO crees un archivo nuevo. NO renombres el
existente. NO elimines VERSION 1 ni VERSION 2.

Abre `rigid-identity-framework/ROADMAP.md` y:

1. Lee la última línea actual
2. Si no termina con `\n`, añade `\n`
3. Añade `\n---\n\n` (separador)
4. Añade el contenido de VERSION 3 según §4 de este prompt
5. Tamaño objetivo de VERSION 3: 600-900 líneas adicionales
6. Tamaño total final del archivo: 1700-2000 líneas

### Paso 10: NO hacer commit ni push (importante)

Por la regla §1.3 de INSTRUCCIONES.md, este cambio requiere
auditoría externa antes de push. Deja el working tree modificado.

### Paso 11: Actualización del ledger (5 min)

Agrega entrada al `IMPLEMENTATION_TRACE_LEDGER.md` con:
- Fecha
- Plataforma (Codex)
- User request
- Objetivo operacional
- Archivos leídos
- Archivos modificados (SOLO `ROADMAP.md` y el ledger)
- Comandos ejecutados
- Verificación
- Hash del nuevo ROADMAP.md
- Riesgos residuales
- Próximo paso

### Paso 12: Reporte al usuario

Reporta:
1. SHA256 del `ROADMAP.md` actualizado
2. Conteo de líneas antes y después
3. Conteo de líneas de la VERSION 3 agregada
4. Resumen de qué se absorbió y qué se descartó
5. Hallazgos únicos que ninguna auditoría había detectado
6. Confirmación de que NO se tocaron archivos prohibidos
7. Recomendación: pedir auditoría externa antes de push

---

## 6. Criterios de éxito

El trabajo se considera exitoso si:

1. ✅ El `ROADMAP.md` tiene VERSION 1, VERSION 2 Y VERSION 3
2. ✅ VERSION 3 tiene 600-900 líneas
3. ✅ Tamaño total del archivo: 1700-2000 líneas
4. ✅ Las 4 auditorías están integradas en §3.2
5. ✅ La tabla de inflación de Fable 5 está en §3.4
6. ✅ La hoja de ruta priorizada está en §3.5
7. ✅ Los hashes verificados están en el header de VERSION 3
8. ✅ El ledger está actualizado
9. ✅ NO se tocaron .tex, PDFs, release/, corpus/, artifacts/,
   scripts/, ni registry
10. ✅ NO se creó ningún archivo nuevo de roadmap
11. ✅ NO se hizo commit ni push

---

## 7. Fórmulas de calidad

- **Austeridad**: cada sección debe caber en 1-2 páginas máximo
- **Citas**: cada hallazgo debe tener archivo:línea
- **Trazabilidad**: cada decisión debe poder rastrearse a su fuente
- **No inflación**: si una sección crece >2 páginas, subdivide
- **Honestidad**: marca explícitamente lo que NO sabes
- **Accionabilidad**: cada hallazgo debe tener una acción concreta

---

## 8. Frase de cierre

> Tu trabajo es AMPLIAR el `ROADMAP.md` existente, no crear
> uno nuevo. VERSION 1 y VERSION 2 son intocables. VERSION 3
> es tu extensión consolidada. Si dudas, pregunta al usuario.

---

FIN DEL PROMPT
