# QICN — Decisión de modelado: régimen parcial de H5 convexo (`s ∩ N`)

Status: `AUTHOR_MODELING_DECISION` · `DECISION_ADOPTED_NON_CANONICAL`
Date: 2026-06-23
Layer: `NON_CANONICAL`
`external_support_certified = false` · `FULL_COP_MEMBERSHIP: NOT_YET`
Decidido por: autor del corpus (decisión de modelado, **no** validación externa).
Andamiaje y análisis: Kiro (auditor interno).

> Esto es una **decisión de modelado del autor** sobre el alcance de su propia
> teoría. NO es validación externa, NO es revisión por pares, NO certifica que la
> matemática sea correcta ni que la decisión sea la que el campo acepta. La
> corrección y la aceptabilidad de esta decisión siguen requiriendo un revisor
> matemático externo (G1.3). No se ha editado ningún `.tex` canónico.

---

## 1. La pregunta

H5 (`hyp:H5`, BaseCore §01): para todo `u` y toda constante `c ∈ N`,
`T_u(c) ≠ c`, donde `T_u x = aleph(Kx + Γu)` y `aleph = convexProjection s` sobre
el conjunto admisible convexo cerrado `s`. El red-team Lean
(`QICNH5UnilateralBridge.lean`) dejó la línea reducida a una sola pregunta de
modelado:

> **¿El conjunto admisible `s` puede cortar *parcialmente* el subespacio de
> constantes `N`** (algunas constantes admisibles, otras no:
> `∅ ⊊ s∩N ⊊ N`)?

## 2. Análisis matemático (honesto, sin forzar el cierre)

Tres hechos mecanizados o elementales determinan la respuesta:

1. **Para `s` convexo general, el corte parcial ES posible.** Un subespacio afín
   o un convexo genérico puede intersecar `N` en un subconjunto propio no vacío.
   No hay nada en H1–H4 que fuerce a `s` a respetar la estructura lineal de `N`.
2. **Para `s` acotado, el corte parcial es genérico.** Un convexo acotado no
   puede contener toda la recta `{t·c₀ : t∈ℝ}` de ninguna constante no nula. Por
   tanto, si `s` es acotado (el caso operacional típico: soporte de norma
   acotada) y `s∩N ≠ ∅`, entonces `s` **necesariamente** corta `N` parcialmente.
3. **La dicotomía `(D)` (`(∃y∈N∩s)→N⊆s`) no es genérica.** Combinando (1)–(2),
   `(D)` solo se satisface por dos vías: régimen (a) `s∩N=∅` (premisa vacía,
   `regime_a_implies_dichotomy`), o `N⊆s` con `s` no acotado
   (`bilateral_implies_dichotomy`). Postular `(D)` como "siempre válida en
   BaseCore" sería una afirmación geométrica fuerte y poco natural, **no** un
   hecho del marco. Se descarta como hipótesis canónica (sería gerrymandering).

Conclusión del análisis: la respuesta honesta a la pregunta es **"sí, en general
`s` puede cortar parcialmente `N`"**. El cierre de H5 no puede venir de negar ese
hecho; debe venir de una **restricción de admisibilidad declarada**.

## 3. Opciones de modelado

| Opción | Condición de admisibilidad | No-colapso convexo | Costo |
|---|---|---|---|
| (a) | `s ∩ N = ∅` (ninguna constante es admisible) | **CERRADO incondicional** (machine-checked) | excluye constantes del soporte |
| (D) | dicotomía de subespacio | cerrado **condicional** bajo `(D)` | `(D)` no genérica; reduce a (a) si `s` acotado |
| abierto | ninguna | régimen parcial `EXTERNAL_REQUIRED` | H5 general queda abierto |

## 4. Decisión adoptada por el autor

**Se adopta el régimen (a): `s ∩ N = ∅` como condición de admisibilidad canónica
del modelo convexo de BaseCore.** Lectura: *ningún estado admisible es una
constante pura*.

Justificación conceptual (no por conveniencia de cierre):
- Es la **intención operacional** de la teoría: un estado realizable porta
  información dependiente del parámetro `u`; la constante pura es el estado
  degenerado sin información, que el soporte admisible no necesita contener.
- Es **no circular**: la condición `∀x∈s, x∉N` menciona solo `s` y `N`, nunca el
  punto fijo ni la dinámica.
- Es **más simple y más fuerte que `(D)`**: la cierra sin el supuesto geométrico
  adicional de no acotación que `(D)` necesitaría para no degenerar en (a).

## 5. Consecuencia formal (ya mecanizada)

Bajo (a), el no-colapso convexo es un **teorema cerrado incondicionalmente**, sin
hipótesis dinámicas extra:

```
QICNLean.convex_noncollapse_from_constants_inadmissible
  (hExcl : ∀ x ∈ s, x ∉ N) (hfixed : convexProjection s … (K c + Γ u) = c)
  ⊢ c ∉ N
axioms: [propext, Classical.choice, Quot.sound]   -- sin sorry
```

No se requiere `(D)`, ni `hAdm`, ni `(Q)`. El puente unilateral y la trilogía de
cociente quedan como **análisis de frontera** (qué pasaría si `s` sí tocara `N`),
no como dependencia del cierre.

## 6. Costo honesto y alcance (anti-inflación)

- (a) es **fuerte**: excluye que *cualquier* constante sea admisible. NO se
  afirma que H5 sea innecesaria ni que el no-colapso valga para `s` arbitrario.
- **H5 convexo *general*** (soporte convexo que contiene constantes, i.e. el
  régimen parcial y el bilateral) queda **explícitamente fuera del alcance
  canónico por decisión de modelado declarada** — no resuelto, no escondido. Si
  en el futuro se quisiera un modelo cuyo soporte admisible contenga constantes,
  ese caso es `EXTERNAL_REQUIRED` (input matemático sobre regularidad/tangencia
  de `∂s` a lo largo de `N`).
- Nada aquí promueve a `NEW_CLAIM` ni a `C_op`. `external_support_certified`
  sigue `false`; `FULL_COP_MEMBERSHIP: NOT_YET`.

## 7. Estatus de aplicación

`DECISION_ADOPTED_NON_CANONICAL`. La decisión está **tomada y registrada** en esta
capa, pero **no aplicada al `.tex` canónico**. Aplicarla (añadir `s∩N=∅` como
cláusula de admisibilidad explícita en `01_foundation_from_core.tex` junto a H5)
es un cambio canónico que requiere el protocolo de gobernanza (fase delimitada +
auditoría externa + aprobación humana), igual que
`QICN_DEFIINT_TIGHTENING_PROPOSAL.md` (`DRAFTED_NOT_APPLIED`). Hasta entonces, H5
permanece como hipótesis canónica y esta decisión vive en la capa de análisis.
