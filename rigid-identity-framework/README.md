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
│   ├── ai-platform-outputs/               # Análisis IA, Lean4, simulaciones
│   │   ├── analysis/                      # Decisiones, red-teams, propuestas
│   │   ├── formal/lean/                   # Proyecto Lean4 + mathlib (QICNLean/)
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

El proyecto de formalización vive en
`docs/ai-platform-outputs/formal/lean/` (mathlib v4.31.0, 2361 jobs).

```powershell
cd docs/ai-platform-outputs/formal/lean
$env:ELAN_HOME="$env:USERPROFILE\.elan"
& "$env:USERPROFILE\.elan\bin\lake.exe" build
```

## Tier raíz (repositorio git)

El `.git` y los gates canónicos `.cjs` están en el directorio padre
(`QICN-FRAMEWORK/`), no aquí. Los papers referencian
`../../release/references.bib` (en ese tier). No mover sin re-pathing.

## Gobernanza

Leer `INSTRUCCIONES.md` antes de cualquier cambio. Reglas clave: no inflación de
claims, no destructivo, trazabilidad en
`docs/ai-platform-outputs/IMPLEMENTATION_TRACE_LEDGER.md`, AI-output bajo
`docs/ai-platform-outputs/`.
