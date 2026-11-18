# Rigid Identity Framework

> Repositorio del corpus teórico QICN y su infraestructura de validación.

## Status

```text
external_support_certified = false
FULL_COP_MEMBERSHIP: NOT_YET
```

## Layout

```text
rigid-identity-framework/
├── basecore/                              # Capa matemática base (source of truth)
│   ├── BASECORE.tex / .pdf
│   ├── core/sections/01_*..11_*           # Secciones modulares
│   ├── core/canonical_core_references.bib
│   └── core_meta/                         # Auditorías y verificaciones internas
├── canonical_core_legacy/                 # Canonical Core anterior (histórico)
├── paper1/                                # Papers formales (main.tex + main.pdf)
├── paper2/
├── paper3/
├── paper4/
├── paper5_operational_consciousness/
├── paper6_predictions_falsation/
├── paper7_operational_life_subjecthood/   # Paper 7–9: downstream, NO source-of-truth
├── paper8_first_person_subjectivity/
├── paper9_phenomenal_bridge_organization/
├── paper10_external_adjudication/
├── paper_bridge_operational_subjecthood/
├── monolithic/                            # Volumen monolítico ensamblado
│   ├── QICN_MONOLITHIC.tex / .pdf
│   ├── build/sections/                    # Chapters generados por el ensamblador
│   ├── preamble/                          # Preámbulo LaTeX congelado
│   └── compile.ps1
├── lean/                                  # Paquete autónomo Lean4 + Mathlib, toolchain fijado
├── registry/                              # Formal Corpus Registry (JSON/JSONL)
│   ├── schema.json                        # Contrato de esquema
│   ├── theorems.jsonl                     # Registro de teoremas
│   ├── macros.jsonl                       # Registro de macros
│   └── prediction-schema.json / prediction-canon-map.json
├── scripts/                               # Tooling Node.js (CommonJS, sin deps)
│   ├── *.js                               # Gates, audits, extractor, builds
│   ├── lib/                               # Módulos compartidos
│   └── legacy/                            # Gates supersedidos preservados
├── docs/                                  # Documentación no-LaTeX
│   ├── ai-platform-outputs/               # Análisis IA, recibos históricos, simulaciones
│   │   ├── analysis/                      # Decisiones, red-teams, propuestas
│   │   ├── formal/lean/                   # Nota de transición histórica, sin fuentes activas
│   │   ├── reports/                       # Reportes machine-generated
│   │   └── sims/                          # Simulaciones (JS/Python)
│   ├── fixtures/, measurement_specs/, preregistrations/
│   ├── protocols/, reports/, templates/, theory/
│   └── CLAIM_STATUS_POLICY.md, GLOSSARY.md, etc.
├── release/                               # Bibliografía compartida (references.bib)
├── artifacts/                             # Outputs de ejecución de predicciones
├── INSTRUCCIONES.md                       # Gobernanza operativa (español)
├── ROADMAP.md                             # Roadmap activo (español)
├── VERSION.md                             # Versiones + mapping legacy
├── package.json                           # Surface de npm run (sin dependencias)
└── LICENSE
```

## Compilación y validación

Todos los comandos desde la raíz del subproyecto:

```powershell
npm run verify           # Gate estricto actual (v31)
npm run verify:all-legacy  # Cadena legacy completa (v25..v31)
npm run extract:registry   # Extracción del registro formal
npm run build:monolithic   # Ensamblado del volumen monolítico
npm run compile:monolithic # Ensamblado + compilación PDF
```

Para compilar un paper individual, compilar su `main.tex` in situ con
pdflatex+biber+pdflatex (los papers usan `../../release/references.bib` por ruta
relativa al tier raíz del repo git).

## Lean4

El paquete autónomo está en [lean/](lean/README.md), con toolchain Lean 4.31.0,
Mathlib fijado y una sola ubicación de fuentes. La guía distingue la compilación
nativa y la verificación serial del kernel usada en Windows. Los recibos por
checkpoint conservan su ruta histórica.

Desde este directorio:

```powershell
python scripts/verify-lean.py --kernel-only --packages-dir E:/QICN-LEAN/v4.31.0-desktop/packages
python scripts/verify-lean-coverage.py
```

La matriz conserva 419 enunciados iniciales, 436 tras Etapa 2 y 442 activos tras la fase científica; contar declaraciones auxiliares
Lean no mide por sí solo la cobertura de esos enunciados. Véanse las hipótesis,
brechas y límites en la guía del paquete y en la matriz enlazada allí.
Etapa 3A: 40 fuentes con agregado y 348 declaraciones públicas; cobertura
14 exactos, 56 parciales, 350 pendientes y 16 de protocolo. La comprobación
fresca y los límites de Etapa 3B se registran en
[su ejecución](docs/ai-platform-outputs/repair-plans/ETAPA3_MECANIZACION_QICNLEAN_2026-11-15/EJECUCION.md).

## Tier raíz (repositorio git)

El `.git` y los gates canónicos `.cjs` están en el directorio padre
(`QICN-FRAMEWORK/`), no aquí. Los papers referencian
`../../release/references.bib` (en ese tier). No mover sin re-pathing.

## Gobernanza

Leer `INSTRUCCIONES.md` antes de cualquier cambio. Reglas clave: no inflación de
claims, no destructivo, trazabilidad en
`docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`, AI-output bajo
`docs/ai-platform-outputs/`.


## Shared mathematical types

| Object | Domain and owner |
|---|---|
| State x_t and trajectory h | Controlled state domain X; physical time t |
| Cut S_n, p_n | Projective diagram; depth n (legacy bound t in tower formulas only) |
| Inverse-limit object I_inv | BaseCore projective part and Paper I |
| Projection set C_proj | Closed convex subset of a Hilbert space; BaseCore projection part |
| Support A | Declared invariant subset, with controls specified |
| Observable map C_obs | States or histories to the declared readout domain |
| Experiment model | Plant, controls, observations, laws and provenance |
| Energy component C_alpha | Histories mutually reachable by finite-cost admissible chains |
| Certificate Cert_op(S,tau;P) | Evidence relative to protocol P and finite windows; not global membership by itself |

Domains, codomains, units and quantifiers must be stated before transporting a result. Coincident notation does not identify objects. Historical macros and labels are retained; aliases never transfer convexity, causal assumptions or temporal guarantees.


## Mandatory theorem-to-prose propagation

Every mathematical change must identify its definition/theorem owner, altered hypotheses and conclusions, and affected mentions in abstracts, introductions, tables, predictions, conclusions, appendices and cross-paper contracts. Update sources, preserved-ID registries and compiled volumes together; justify every unaffected surface. Record A01–A37/B01–B15 dispositions in the existing roadmap and ledger, not a parallel claim registry.

Technical names describe demonstrated objects. Historical aliases remain traceable; interpretation is placed at the end of each paper with formal anchors, additional hypotheses, differential tests and evidence obligations. A finite certificate, an open conjecture and a proved global result remain distinct. Automated prose checks assist review and do not certify mathematical coherence.

La fase científica añade seis resultados manuscritos pendientes de mecanización: registro 927, macros 383 y cobertura actual 14 exactos / 56 parciales / 356 pendientes / 16 de protocolo. Las fuentes Lean de esta rama siguen siendo las 40 de Etapa 3A, con 348 declaraciones públicas. El checkpoint experimental Etapa 3B se conserva en otra rama. CN-3 sigue false en el runtime; su extensión al puente es un protocolo prospectivo. external_support_certified=false.
