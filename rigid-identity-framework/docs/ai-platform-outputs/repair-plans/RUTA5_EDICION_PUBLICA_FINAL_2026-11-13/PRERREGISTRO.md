# Prerregistro — Ruta 5: Edición Pública Final (Corpus Completo y Monolítico)

- **Fecha:** 2026-11-13
- **Baseline:** `2d4fbcc0bf436a181cd9371d1ec3408c4f9999c5` (cierre de Ruta 4)
- **Responsable de ejecución:** Antigravity (bajo dirección del investigador único Johnny Andrey Pérez Ramírez)

## 1. Objetivo operacional

Transformar los **12 documentos individuales** (`BaseCore`, `Paper 1..10` y `Paper Bridge`) y el **volumen monolítico** (`QICN_MONOLITHIC.pdf`) en una **edición pública terminada**, manteniendo intacto todo el contenido matemático, sus limitaciones abiertas y el aislamiento estricto respecto al runtime (`QICN-SYSTEM`).

En concreto:
1. Mantener explícitas y abiertas las limitaciones pendientes (operador nodal con coordenadas $(e_i,\phi_i)$ congeladas en BaseCore Parte IX `thm:bridge`; las cuatro cuotas materiales $K_i,\omega_i(y),\varepsilon_i,\Delta^*$ sin calcular en Paper III `nonthm:estimator-gap`; no cierre frente a emuladores irrestrictos; clase BPF completa abierta; ausencia de validación externa; `external_support_certified=false`).
2. Eliminar de la prosa y apéndices de **todos los 12 documentos y del monolítico** los directorios del repositorio o máquina local (`docs/...`, `artifacts/...`, `research/scripts/...`, nombres literales `.json`/`.mjs`/`.cjs`/`.md`), identificadores de historial/ciclos internos (`Stage3-RF/0..7`, `BPF-0..6`, `AUDIT_MASTER`, `Residual B hardening pass`, `hardening`, `scaffold`, `Earlier drafts`, `Previous versions`, `release gate`, `v4.5`, `v3`, `Section status.*`, `GitHub clean clone`, `fresh venv`, `npm ci`, `LaTeX source tree`), y muletillas defensivas repetitivas atribuibles a redacción de borrador o asistente de IA.
3. Corregir metadatos PDF faltantes en `paper10_external_adjudication/main.tex` (`\author{Johnny Andrey Pérez Ramírez}` y `\hypersetup{pdftitle=..., pdfauthor=...}`).
4. Añadir al cierre de **todos los 12 documentos individuales** (y **una sola vez** al cierre del volumen monolítico mediante `build-monolithic-volume.js` para evitar repetición 12x) una sección explícita y breve titulada `Authorial Note and Methodological Provenance` que explique que toda la concepción, dirección teórica, arquitectura matemática y revisión fue desarrollada por un único investigador (Johnny Andrey Pérez Ramírez) durante más de un año con el apoyo técnico de distintas herramientas de inteligencia artificial, preservando la frontera entre teoremas formales, kernels mecanizados y validación empírica futura.
5. Recompilar los **12 PDFs individuales** y el **PDF monolítico**, resincronizar `registry/theorems.jsonl` sin pérdida de IDs ni macros, ejecutar toda la cadena de verificación, pasar **auditoría externa independiente** (`INSTRUCCIONES.md §1.3`), actualizar `ROADMAP.md` (registrando **Ruta 6** para la publicación limpia en primer nivel del paquete Lean y el programa largo Opción B hacia los 419 enunciados demostrables) e `IMPLEMENTATION_TRACE_LEDGER.md`, hacer commit limpio y ejecutar `git push origin main`.

## 2. Alcance incluido y excluido

- **Incluido:** fuentes LaTeX de `basecore/`, `paper1..10`, `paper_bridge_operational_subjecthood`, `scripts/build-monolithic-volume.js`, `monolithic/`, `registry/theorems.jsonl` (solo ubicaciones y 4 enunciados con rutas/borrador heredados), y documentación de fase/traza bajo `docs/ai-platform-outputs/`, `ROADMAP.md`.
- **Excluido (intocable):**
  - `release/`, `corpus/`, `artifacts/`, `canonical_core_legacy/` (inmutables).
  - Los `32` módulos `.lean` de `docs/ai-platform-outputs/formal/lean/` (su publicación en paquete limpio de primer nivel y extensión Opción B queda expresamente reservada para **Ruta 6** tras este `push` a `main`).
  - El repositorio separado `QICN-SYSTEM`.
  - Teoremas, hipótesis, demostraciones, constantes numéricas, macros y `\label` existentes.
  - Scripts auditores bajo `scripts/audit-*` (salvo compatibilidad verificada sin relajar controles; en `paper3` se preserva `supremum notation.*superseded` para `audit-v25-superior-gaps.js` y el comentario `% v24 correction...`).

## 3. Controles y criterios de parada

- Toda alteración accidental de `\label`, teoremas, demostraciones, constantes matemáticas, `906` IDs o `383` macros es condición de parada y corrección inmediata.
- Regresiones prohibidas: `Overfull \hbox/\vbox`, referencias indefinidas (`??`), etiquetas duplicadas, fallo en `verify-prose-sync.py`, `validate-corpus.js`, `validate-macros.js`, `lint:nonclaims`, `check-monolith.cjs` (`12/12`), `verify-math-regressions.py` (`32/32`), `verify:release` (`6/6`), o verificadores de raíz (`3/3`).
- Si cualquier verificación falla, detener publicación y corregir antes de `push`.
- Ninguna afirmación se promueve por encima de los veredictos crudos (`INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`, `BLOCKED_MULTIPLE_GATES`, `BLOCKED_FOUNDATION_FIRST_GATES`, `external_support_certified=false`).
