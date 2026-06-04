# QICN Critical Gap Resolution Roadmap v1

Fecha: 2026-06-02
Alcance: QICN-FRAMEWORK + rigid-identity-framework
Fuente: triage local de los dos analisis GitLab Duo, auditoria local posterior y reportes canonicos existentes.
Estado: hoja de ruta interna. No certifica soporte externo, conciencia, fenomenalidad, identidad personal, transferencia de identidad, cierre de bridge-burden, revision humana independiente ni peer review.

## 0. Principio Rector

El objetivo no es obtener mas `PASS`. El objetivo es reducir ambiguedad, aumentar reproducibilidad, endurecer falsabilidad y separar con precision:

| Capa | Pregunta | Regla |
|---|---|---|
| Ontologia | Que intuicion o posicion metafisica motiva QICN? | No se presenta como resultado demostrado. |
| Modelo matematico | Que teoremas condicionales existen? | Toda hipotesis debe ser explicita y trazable. |
| Implementacion | Que gates, fixtures y scripts se ejecutan? | Un script local no equivale a evidencia externa. |
| Lenguaje | Que terminos fuertes aparecen? | Conciencia, identidad y fenomenalidad se degradan si no tienen definicion operacional. |
| Interpretacion | Que puede inferirse? | Solo lo permitido por datos, supuestos y no-claims. |

Un `BLOCKED` con derivacion formal es un resultado valido. Forzar un `PASS` cuando H3, H4, rivales o evidencia externa no cierran seria inflacion epistemica.

## 1. Estado Confirmado

### 1.1 Hallazgos de GitLab Duo que si eran validos

| Gap | Evidencia local | Estado actual |
|---|---|---|
| GitLab CI faltante | `.gitlab-ci.yml` no existia antes del hardening | Mitigado: CI agregado. |
| Dockerfile acoplado a `verify:v22` | Dockerfile historico ejecutaba solo v22 | Mitigado: ahora ejecuta cadena canonica + `verify:release`. |
| `PASS_PDF_ONLY` en release | `release/canon_manifest.v1.json`, `release/INDEX_PDFS.json` | Abierto y auditado. |
| `DROP` en manifest PDF | `corpus/pdf_release/manifest.json` | Abierto y auditado. |
| Rutas locales Windows/MiKTeX en manifest congelado | `corpus/pdf_release/manifest.json` | Abierto y auditado; no mutar sin regenerar release. |
| Claims siguen internos/no externos | claim registry + boundaries | Correcto; preservar. |

### 1.2 Hallazgos corregidos u obsoletos

| Claim externo | Estado local |
|---|---|
| `upstream_pin_status` no resuelto | Obsoleto: `release/release_freeze_manifest.json` lo marca como resuelto. |
| `verify:release` apuntaba a version antigua | Mitigado: ahora apunta a `verify:all-legacy`. |
| Proyecto GitLab default branch desconocido | No es gap local del repo; requiere verificacion remota si se audita GitLab. |

### 1.3 Gaps teoricos y epistemicos confirmados

| Gap | Lectura sobria | Severidad |
|---|---|---|
| L4/H4 falla operacionalmente | `Delta* = 0.15`, `L_h * sum(epsilon_i) = 0.60`; margen insuficiente | Critica |
| H3 no demostrado | No existe prueba de `C in sigma(F_1,...,F_6)` para claims fuertes | Critica |
| H1 externo no instanciado | No hay espacio latente externo `X`, topologia, continuidad de `pi` ni region `A` verificadas | Critica |
| Rivales fuertes aun no ejecutados | Hay registros/protocolos, pero no comparacion externa seria IIT/GNWT/HOT/FEP/baselines estadisticos | Alta |
| Datos empiricos externos ausentes | No hay dataset independiente, laboratorio, DOI/preprint ni replica | Critica |
| Monolithic v22 no strict-green | `audit:monolithic-build-quality` falla por 91 warnings LaTeX | Media |
| Reproducibilidad PDF incompleta | `PASS_PDF_ONLY`, `DROP`, rutas locales y fuentes no compilables | Alta |
| Lenguaje de alto riesgo | Terminos como consciousness/identity/phenomenality requieren downgrade constante | Alta |

## 2. Orden De Ataque

La ruta correcta no empieza por nuevos teoremas ambiciosos. Empieza por dejar el corpus reproducible, auditable y semanticamente controlado; luego se endurece el puente matematico; despues se abre la ruta empirica.

### Fase A - Baseline Canonico y No-Regresion

Objetivo: congelar una linea base verificable antes de tocar TeX, manifests o adjudicadores.

Tareas:
1. Ejecutar y guardar salida de:
   - `node scripts/verify-canonical-integrity.cjs`
   - `node scripts/verify-claim-registry.cjs`
   - `node scripts/verify-canonical-release.cjs`
   - `node scripts/audit-public-release-reproducibility.cjs`
   - `cd rigid-identity-framework && npm run verify:release`
2. Crear `docs/reports/QICN_BASELINE_VERIFICATION_<date>.md`.
3. Registrar branch, commit, dirty files y hashes de manifests.
4. Clasificar cambios locales en: canonicos, experimentales, generados, temporales.

Criterio de cierre:
- Todos los gates canonicos pasan.
- Los gaps conocidos aparecen como `PASS_WITH_TRACKED_GAPS`, no como silencio.
- No se modifica ningun manifest congelado.

Riesgo principal:
- Confundir dirty worktree con fallo teorico. Mitigacion: reporte de baseline antes de editar.

### Fase B - Reproducibilidad Publica Del Release

Objetivo: eliminar o justificar cada `PASS_PDF_ONLY`, `DROP` y ruta local del release publico.

Tareas granulares:
1. Extraer inventario exacto:
   - IDs `PASS_PDF_ONLY`
   - IDs `DROP`
   - rutas locales embebidas
   - fuente TeX asociada, si existe
   - PDF canonico asociado, si existe
2. Para cada `DROP`, decidir una de tres acciones:
   - reparar TeX y compilar,
   - degradar a artefacto no release,
   - remover del release regenerado con justificacion.
3. Para cada `PASS_PDF_ONLY`, reconstruir fuente TeX o marcar como PDF-preserved-only con razon historica.
4. Regenerar `corpus/pdf_release/manifest.json` solo en una pasada intencional con nuevos hashes y sidecars.
5. Agregar auditor que falle si un nuevo release contiene rutas absolutas locales no sanitizadas.

Artefactos:
- `docs/reports/PDF_RELEASE_REPRODUCIBILITY_REPAIR_PLAN.md`
- `docs/reports/PDF_RELEASE_REGENERATION_RECORD.json`
- manifests regenerados solo si la fase se ejecuta completa.

Criterio de cierre:
- Cero `DROP` no justificados.
- Cero rutas `C:\Users\...` en manifests publicos regenerados.
- Cada PDF tiene una fuente reproducible o una etiqueta explicita `preserved_pdf_only_nonreproducible`.

No hacer:
- Editar el manifest congelado a mano para "limpiar" rutas. Eso rompe proveniencia.

### Fase C - Higiene LaTeX y Monolith Strict-Green

Objetivo: convertir el monolith de "compila con warnings" a una construccion publicable o, si no es razonable, separar build editorial de build canonico.

Tareas:
1. Reproducir `npm run verify:v22` y capturar el reporte de 91 warnings.
2. Clasificar warnings:
   - overfull/underfull cosmeticos,
   - referencias/citas,
   - macro collisions,
   - paquetes obsoletos,
   - problemas que cambian semantica.
3. Reparar primero semanticos y referencias; dejar cosmeticos para pase editorial.
4. Agregar thresholds:
   - `strict_publication_build`: cero errores, cero undefined refs, warnings semanticamente relevantes cero.
   - `editorial_build`: puede aceptar overfull leve documentado.
5. Reejecutar compilacion monolitica y papers individuales.

Artefactos:
- `docs/reports/MONOLITHIC_WARNING_BURN_DOWN.md`
- `docs/reports/MONOLITHIC_STRICT_GREEN_REPORT.md`

Criterio de cierre:
- `verify:v22` pasa o queda reemplazado por un gate explicitamente versionado que no oculte warnings.
- No se degradan teoremas ni macros por limpieza cosmetica.

### Fase D - Control De Superficie De Claims

Objetivo: impedir que el lenguaje del marco teorico prometa mas que los gates.

Tareas:
1. Ejecutar auditor de promociones semanticas sobre todo el corpus, no solo lista corta de archivos.
2. Expandir lexicon de riesgo:
   - proves, certifies, demonstrates, establishes
   - consciousness, identity transfer, phenomenality, subjecthood, external support
   - formulaciones pasivas y sustantivadas: "demonstration of", "is consistent with", "evidence for"
3. Agregar clasificacion por capa M/T/R a cada hallazgo.
4. Para cada claim fuerte:
   - si es teorema formal, citar hipotesis;
   - si es proxy runtime, degradar;
   - si es interpretacion, mover a non-claim o conjecture.
5. Crear un "Forbidden Claim Gate" que falle CI si aparece certificacion externa sin decision record externo.

Artefactos:
- `docs/reports/CLAIM_SURFACE_AUDIT_FULL_CORPUS.md`
- `rigid-identity-framework/docs/FORBIDDEN_CLAIMS_POLICY.md`
- script `audit-forbidden-claims-full-corpus.js`

Criterio de cierre:
- Cero claims fuertes sin capa y estado epistemico.
- CI falla ante nueva inflacion semantica.

### Fase E - Bridge Theorem: H1/H2/H3/H4 Honesto

Objetivo: separar lo operacionalmente verificado de lo topologicamente no probado.

Estado actual:
- H2 operacional: parcialmente certificado por fixture v34.
- H4 operacional: falla honestamente.
- H3: no probado.
- H1 externo: no instanciado.

Tareas:
1. Crear `BRIDGE_HYPOTHESIS_LEDGER.md` con una fila por H1-H4:
   - definicion formal,
   - artefacto que intenta satisfacerla,
   - estado,
   - falsador,
   - bloqueo actual.
2. Para H4:
   - no reducir `epsilon_i` post hoc;
   - buscar si el margen puede aumentar mediante predicciones preregistradas nuevas o rival mas fuerte;
   - si no, mantener `BLOCKED_ESTIMATOR_UNVERIFIED`.
3. Para H3:
   - definir claim algebra `C`,
   - declarar sigma-algebra generada por invariantes,
   - intentar prueba Doob-Dynkin o producir contraejemplo.
4. Para H1:
   - definir candidato de espacio latente externo `X`,
   - observacion `Y`,
   - proyeccion `pi`,
   - continuidad/measurabilidad,
   - region admisible `A`.
5. Actualizar adjudicador para reportar H1/H2/H3/H4 por separado, nunca como un unico booleano.

Artefactos:
- `rigid-identity-framework/docs/BRIDGE_HYPOTHESIS_LEDGER.md`
- `docs/reports/BRIDGE_H3_FACTORISATION_ATTEMPT.md`
- `docs/reports/BRIDGE_H1_EXTERNAL_INSTANTIATION_SPEC.md`

Criterio de cierre:
- Cada H tiene estado: `proved_formal`, `operational_only`, `failed`, `not_instantiated`, o `externally_pending`.
- Ningun reporte usa "bridge closed" si H3/H1 siguen abiertos.

### Fase F - Rivales Serios y Controles Negativos

Objetivo: reemplazar rivales hombres de paja por competidores capaces de ganar.

Tareas:
1. Congelar familias rivales:
   - baseline media/AR(1)/GLS,
   - reward bookkeeping,
   - semantic density,
   - reportability/GNWT-like,
   - HOT/meta-representation,
   - IIT/FEP proxies si hay implementacion razonable.
2. Para cada rival:
   - parametros libres,
   - datos requeridos,
   - criterio de victoria,
   - penalizacion estadistica,
   - falsador QICN.
3. Implementar primero rivales estadisticos simples porque son auditables.
4. Despues implementar rivales teoricos como proxies documentados, no como versiones caricatura.
5. Ejecutar negative controls y ablations antes de cualquier claim positivo.

Artefactos:
- `rigid-identity-framework/docs/RIVAL_EXECUTION_LEDGER.md`
- `docs/reports/RIVAL_BASELINE_EXECUTION_REPORT.md`
- `docs/reports/NEGATIVE_CONTROL_EXPANSION_REPORT.md`

Criterio de cierre:
- QICN puede perder frente a un rival.
- Si un rival gana, el sistema degrada el claim automaticamente.

### Fase G - Measurement Dictionary y Protocolos Externos

Objetivo: convertir invariantes y predicciones en variables medibles por terceros.

Tareas:
1. Para cada invariante QICN:
   - variable observada,
   - instrumento,
   - escala,
   - error,
   - calibracion,
   - exclusion criteria,
   - control negativo.
2. Redactar un preregistro externo minimo:
   - hipotesis,
   - dataset,
   - sample size,
   - thresholds,
   - rival set,
   - death rules.
3. Crear decision records:
   - `external_support_candidate`,
   - `external_no_support`,
   - `external_inconclusive`,
   - `protocol_violation_quarantine`.
4. Separar datos reales de fixtures sinteticos en rutas distintas y gates distintos.

Artefactos:
- `rigid-identity-framework/docs/MEASUREMENT_DICTIONARY_EXTERNAL_v1.md`
- `rigid-identity-framework/docs/preregistrations/PRED-EXT-REAL-01.md`
- `rigid-identity-framework/docs/templates/EXTERNAL_DECISION_RECORD_v1.json`

Criterio de cierre:
- Al menos una prediccion tiene protocolo que un tercero podria ejecutar sin consultar al autor.
- El resultado nulo tiene consecuencia de downgrade definida.

### Fase H - Publicacion y Revision Independiente

Objetivo: preparar el corpus para lectura externa sin inflacion.

Tareas:
1. Separar paquete publico en:
   - formal corpus,
   - runtime diagnostics,
   - synthetic fixtures,
   - release provenance,
   - external protocol.
2. Crear README de claims:
   - que esta probado,
   - que esta condicionado,
   - que esta bloqueado,
   - que esta fuera de alcance.
3. Generar preprint o technical report con seccion de limitaciones al inicio, no al final.
4. Preparar review checklist para matematico, estadistico, epistemologo e ingeniero independiente.

Artefactos:
- `docs/reports/PUBLICATION_READINESS_AUDIT.md`
- `docs/reports/INDEPENDENT_REVIEW_PACKET.md`

Criterio de cierre:
- Un revisor externo puede reproducir gates, entender limites y encontrar gaps sin leer conversaciones internas.

## 3. Backlog Priorizado

| Prioridad | Trabajo | Motivo |
---|---|---|
| P0 | Baseline canonico + dirty worktree inventory | Evita regresiones y atribuciones falsas. |
| P0 | Release reproducibility audit extendido | Los gaps publicos de PDF/manifests son visibles y concretos. |
| P0 | Forbidden claim full-corpus gate | Previene inflacion epistemica mientras se corrige teoria. |
| P1 | Reparar `DROP` y `PASS_PDF_ONLY` | Mejora reproducibilidad publica real. |
| P1 | Monolith warning burn-down | Eleva estandar editorial y tecnico. |
| P1 | Bridge H1-H4 ledger | Hace imposible ocultar H3/H4 bajo wording. |
| P2 | Rival execution ledger + baseline rivals | Aumenta falsabilidad. |
| P2 | Measurement dictionary externo | Prepara empiria real. |
| P3 | Preprint/review packet | Solo despues de reproducibilidad y claim-surface gates. |

## 4. Definition Of Done Global

Una mejora cuenta como cerrada solo si cumple todas:

1. Tiene evidencia local reproducible.
2. Tiene archivo o reporte asociado.
3. Tiene comando de verificacion.
4. Tiene criterio de fallo.
5. No aumenta el estado epistemico de claims fuertes sin datos externos.
6. No modifica manifests congelados sin regeneracion completa y documentada.
7. No convierte fixtures sinteticos en evidencia empirica.

## 5. Primer Sprint Recomendado

Duracion sugerida: 1 a 2 sesiones de trabajo.

1. Crear baseline report actual.
2. Extender auditor de reproducibilidad para listar IDs exactos de `PASS_PDF_ONLY` y `DROP`.
3. Crear inventario LaTeX de fuentes no reproducibles.
4. Agregar full-corpus forbidden-claim audit en modo report-only.
5. Crear `BRIDGE_HYPOTHESIS_LEDGER.md` sin cambiar adjudicadores todavia.

Resultado esperado:
- No se cierran aun los problemas grandes, pero quedan convertidos en unidades de trabajo pequenas, verificables y ordenadas.
- La siguiente pasada puede reparar TeX o claims con bajo riesgo de romper canon.

## 6. Non-Claims

Este roadmap no demuestra que QICN sea empiricamente correcto. No demuestra conciencia, fenomenalidad, identidad personal, transferencia, moral status ni soporte externo. Tampoco resuelve H3, H4, rivales fuertes o replicacion. Su funcion es operacional: convertir gaps detectados en una secuencia de reparaciones verificables y epistemicamente sobrias.
