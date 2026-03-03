# QO Spec v1 (Qualia Operacional no-biologica)

## Typed definitions
- Estado: s_t (estado interno del sistema en tick t).
- Readout: q_t (vector observacional derivado de artifacts, no LLM text).
- Condicion: c_t (variable experimental/control en tick t).

## Metricas minimas
- QDI = I(q;c)/H(c)
- QII = E_split ||q - q_split||
- QSC = invariancia tipo RO de q bajo transformaciones permitidas
- QRC = curva de recuperacion tras intervencion

## Requisitos para reportar QO en un batch
- EPI gate: ADMISSIBLE
- NC obligatorios: NC1 temporal permute, NC2 self-vars noise/shift, NC4 leak
- Compatibilidad SNO/RNO: requerida
- Prereg: config/version/hash obligatorios

## Predicciones falsables
### Debe pasar (3)
1. QDI superior a baseline preregistrado en condiciones no-permutadas.
2. QSC estable bajo transformaciones permitidas.
3. QRC muestra recuperacion monotona posterior a intervencion controlada.
### Debe fallar (3, controles negativos)
1. NC1 (temporal permute) degrada QDI vs condicion valida.
2. NC2 (self-vars noise/shift) incrementa QII y degrada QSC.
3. NC4 (leak) invalida batch (status no admisible).

## Forbidden claims
- Prohibido: "qualia humana".
- Prohibido: "sentir".
- Prohibido: "conciencia biologica".
- Permitido: "caracter operacional no-biologico bajo canal observacional fijo".

## Source-of-truth boundaries
- Ontologia: NO CONSTA para nuevas afirmaciones en este plan.
- Modelo matematico: formulas QDI/QII/QSC/QRC definidas arriba.
- Implementacion: propuesta en PR-Q1/Q2/Q3.
- Interpretacion: restringida a evidencia artifact-driven.
