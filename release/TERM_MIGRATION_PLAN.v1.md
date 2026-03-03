# TERM_MIGRATION_PLAN.v1

## Alcance
Plan editorial (sin edición de papers en esta fase) para migrar lenguaje antropomórfico a terminología operacional auditable.

## Evidencia base
- elease/editorial_audit_v1/anthropomorphic_terms_report.json
- elease/editorial_audit_v1/q_t_candidate_evidence.json
- elease/editorial_audit_v1/primary_supporting_map.json

## Regla principal de reemplazo
- Reemplazar claims técnicos con sentir/siente/feels por eadout interno operacional.
- Si el texto intenta introducir símbolo o métrica de readout no evidenciada en release: marcar NO CONSTA.

## Tabla de reemplazo conceptual
| Frase problemática | Reemplazo técnico permitido | Condición |
|---|---|---|
| sistema siente | sistema presenta readout interno operacional | Solo como claim descriptivo no-métrico |
| experiencia real | readout interno operacional trazable | Si hay artifact verificable; si no, NO CONSTA |
| qualia humana | NO PERMITIDO | Reemplazar por referencia a Limitations del HUB |
| tensión metacognitiva q_t | readout interno operacional (q_t: FUTURO/PR-Q1) | q_t no se formaliza en este release |

## Checklist de migración por lote
1. Primary docs primero (según primary_supporting_map.json).
2. Reemplazar términos no permitidos por término canónico.
3. Sustituir disclaimers extensos por referencia corta al HUB.
4. Verificar que no se añadan métricas no respaldadas por artifacts del release.
5. Repetir en supporting docs.

## Prioridad por documentos primary (acciones)
- 44806ece96bbdae2_main_1c305418 (docId: 44806ece96bbdae2, status: PDF_ONLY, source_path: rigid-identity-framework/paper4/main.tex)
- 6968859f53621468_6968859f53621468_main_f973c787 (docId: 6968859f53621468, status: CANON, source_path: rigid-identity-framework/paper1/main.tex)
- 9e4b83e44e669730_9e4b83e44e669730_main_d5f7405e (docId: 9e4b83e44e669730, status: CANON, source_path: rigid-identity-framework/paper2/main.tex)
- canonical_core (docId: 3b77e7b20616cf25, status: PDF_ONLY, source_path: rigid-identity-framework/CANONICAL_CORE.tex)
- dc23c9c9345aae47_dc23c9c9345aae47_main_ddd19561 (docId: dc23c9c9345aae47, status: CANON, source_path: rigid-identity-framework/paper3/main.tex)
