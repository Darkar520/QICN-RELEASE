> **SUPERSEDED (2026-06-23).** Este an�lisis fue producido durante la
> exploraci�n de H5 convexo y la lectura D*/Iint. Las decisiones definitivas se
> adoptaron en:
> - QICN_H5_PARTIAL_REGIME_MODELING_DECISION.md (H5: r�gimen (a) snN=�)
> - QICN_IINT_CANONICAL_CLASS_SPLIT_READOUT.md (Iint: D* adoptado)
>
> Este archivo se conserva como registro hist�rico del red-team adversarial.
> No es el estado actual del framework.

---
# QICN H5 — Unilateral / Dichotomy Bridge Red-Team

**Sello obligatorio.**
`INTERNAL_ADVERSARIAL / NOT_EXTERNAL_VALIDATION`
`external_support_certified = false`
`FULL_COP_MEMBERSHIP: NOT_YET`
Capa: `NON_CANONICAL`. Nada se eleva a `NEW_CLAIM` ni a `C_op`. Esto es
**conformidad interna**, no validación externa, no peer review, no evidencia
human-curated. No prueba BaseCore H5, no-colapso, `Iint` ni `C_op`.

Artefacto Lean asociado:
`docs/ai-platform-outputs/formal/lean/QICNLean/QICNH5UnilateralBridge.lean`.
Construido encima del estado previo commiteado (`QICNH5QuotientDynamics.lean`,
`QICNH5QuotientDisplacement.lean`), sin re-derivar.

---

## 1. El obstáculo, reformulado con precisión

El puente verificado `noncollapse_of_quotient_displacement` establece
`(Q) + hAdm ⇒ no-colapso`, donde:

- `(Q)` es el desplazamiento de cociente del candidato de colapso:
  `q(T_u(c*(u))) ≠ 0`;
- `hAdm` es la admisibilidad **bilateral** `∀ c ∈ N, ∀ n ∈ N, c + n ∈ s`.

La dirección *forward* de `collapse_iff_cStar_fixed` reduce un punto fijo convexo
`x* ∈ N` al candidato lineal `c*(u)` vía la reducción variacional
`convex_constant_fixedpoint_reduces`. Esa reducción prueba ortogonalidad del
residuo a **todo** `N`, testeando ambas direcciones `x* ± n` contra `s`; por
tanto exige `x* + N ⊆ s`, es decir (como `x* ∈ N`) la inclusión completa
`N ⊆ s`. Esto es exactamente la consecuencia de `hAdm`
(`bilateral_admissibility_forces_N_subset`).

El régimen estático fuerte (a) `s ∩ N = ∅` **prohíbe** `N ⊆ s`
(`regimes_incompatible : hAdm ∧ (s∩N=∅) ⇒ False`). El obstáculo es real: el
puente dinámico y el cierre del régimen (a) viven en regímenes **disjuntos**. La
brecha NO se cierra debilitando el régimen; hay que debilitar **el puente**.

### 1.1 Por qué las candidatas "unilaterales" puras no reducen

- **Admisibilidad unilateral / cono.** Si solo se conoce `x* + c ∈ s` para `c` en
  un cono `C ⊊ N`, la desigualdad variacional da `⟨residuo, c⟩ ≤ 0` para `c ∈ C`,
  pero NO la ortogonalidad `⟨residuo, n⟩ = 0` para todo `n ∈ N` (se necesita
  ambos signos). Sin ortogonalidad no hay reducción a `c*(u)`. Un cono propio no
  puede dar igualdad en un subespacio.
- **Tangencia local en `c*(u)`.** "El coseto de `N` por `c*(u)` está en `s`" es,
  como `c*(u) ∈ N`, otra vez `N ⊆ s`. No hay ganancia.

Conclusión interna: cualquier hipótesis que **habilite la reducción** fuerza
`N ⊆ s` localmente. La reducción a `c*` es bilateral-en-`N` por naturaleza.

---

## 2. La hipótesis no circular más débil compatible con ambos regímenes

No se debilita el régimen; se debilita la **hipótesis del puente** a la

> **Dicotomía de subespacio (D):** `(∃ y ∈ N ∩ s) → N ⊆ s`.

Lectura geométrica: *`s` no trunca parcialmente el subespacio de constantes `N`*;
o `N` evita por completo a `s`, o `N` está por completo dentro de `s`.

Propiedades mecanizadas:

| Criterio de éxito honesto | Teorema Lean | Estado |
|---|---|---|
| (D) no circular (solo `s, N`; sin punto fijo, sin `c*`, sin `K,Γ`, sin `(Q)`) | `def SubspaceDichotomy` | ✓ por construcción |
| (D) estrictamente más débil que `hAdm` | `bilateral_implies_dichotomy` | ✓ |
| (D) compatible con régimen (a) (no implica `s∩N=∅`) | `regime_a_implies_dichotomy` | ✓ (vacuidad) |
| (D) no implica `N⊆s`; `(D) ∧ (s∩N=∅)` satisfacible con `N≠⊥` | `dichotomy_regimeA_satisfiable` | ✓ (testigo ℝ²) |
| (D) + (Q) ⇒ no-colapso | `noncollapse_of_subspace_dichotomy` | ✓ |
| (D) excluye el régimen parcial (límite honesto) | `partial_regime_violates_dichotomy` | ✓ |

### 2.1 Mecanismo del puente bajo (D)

`noncollapse_of_subspace_dichotomy`: un testigo de colapso `x* ∈ N` está
**automáticamente** en `s` (es salida de la proyección, `convexProjection_mem`),
luego `N ∩ s ≠ ∅`, luego (D) **eleva** a `N ⊆ s`, recuperando `hAdm` y disparando
el puente previo `noncollapse_of_quotient_displacement`. No se asume `N ⊆ s` a
priori: se deriva del propio testigo de colapso. No hay circularidad: (D) no
menciona el punto fijo.

### 2.2 Certificado de compatibilidad (anti-`regimes_incompatible`)

`dichotomy_regimeA_satisfiable` exhibe en `ℝ²` un subespacio de constantes
**genuino y no trivial** `N = ker⟨e₂,·⟩ ≠ ⊥` (con `e₁ ∈ N`) y un conjunto
admisible no vacío `s = {w | ⟨e₂,w⟩ = 1}` tales que coexisten:
(i) régimen (a) `∀ x ∈ s, x ∉ N`, y (ii) la dicotomía (D). Esto es el opuesto
explícito de `regimes_incompatible`: la incompatibilidad era una característica de
`hAdm`, no de (D). Se usa `N ≠ ⊥` deliberadamente para descartar la objeción de
"aislamiento trivial".

---

## 3. Anti-gerrymandering: ¿es (D) un truco?

- (D) **no** menciona el punto fijo, `c*(u)`, la dinámica, `K`, `Γ` ni `(Q)`. Es
  una propiedad puramente geométrica de la pareja `(N, s)`. No mete la conclusión
  por hipótesis.
- (D) es interpretable: "`N` no es cortado parcialmente por `s`". Es automática,
  por ejemplo, si `s` es un subespacio, o si `s` es invariante por traslación a lo
  largo de `N`, o si `N ∩ s` es "todo o nada".
- Honestidad obligatoria: (D) **no** introduce un mecanismo de no-colapso nuevo
  para el régimen **parcial** (donde `N ∩ s` es subconjunto propio no vacío de
  `N`). (D) **excluye** ese régimen por decreto (`partial_regime_violates_dichotomy`).
  Es una **unificación** de los dos regímenes ya conocidos (estático (a) +
  dinámico bilateral) bajo una sola hipótesis no circular; **no** es una conquista
  de territorio nuevo.

---

## 4. Brecha residual: régimen parcial → `EXTERNAL_REQUIRED`

El caso genuinamente abierto es el **régimen parcial**: `c*(u) ∈ s ∩ N` con
`N ⊄ s`. Allí:

- la reducción a `c*(u)` no está disponible (la desigualdad variacional solo da
  un cono, no ortogonalidad en `N`);
- `(Q)`, condición sobre `c*(u)`, no controla otras constantes admisibles
  `z ∈ N ∩ s`, `z ≠ c*(u)`;
- (D) asume el régimen parcial fuera por decreto, no lo resuelve.

Cerrar el régimen parcial requiere una **decisión de modelado** (¿se permite que
`s` corte parcialmente `N`? — afecta la semántica de "constantes admisibles" en
BaseCore) **o** un input matemático externo (p.ej. una hipótesis de
regularidad/tangencia sobre `∂s` a lo largo de `N` que sea físicamente
justificable). No se cierra con más fuerza bruta interna.

**Veredicto de la brecha parcial: `EXTERNAL_REQUIRED`.**

---

## 5. Veredicto honesto

- **Track 1 (headline): `CLOSED_INTERNAL`** para el objetivo enunciado. Existe una
  hipótesis no circular, estrictamente más débil que `hAdm` bilateral y
  **compatible con el régimen (a)**, bajo la cual `(Q) ⇒ no-colapso`. Todos los
  criterios de éxito honesto exigidos están mecanizados:
  1. compatible con ambos regímenes (`dichotomy_regimeA_satisfiable`,
     `regime_a_implies_dichotomy`, `bilateral_implies_dichotomy`);
  2. no circular (`def SubspaceDichotomy` solo con `s, N`);
  3. implicación a no-colapso mecanizada (`noncollapse_of_subspace_dichotomy`).
- **Caveat estructural inseparable del veredicto:** (D) **unifica** los dos
  regímenes conocidos; **no** resuelve el régimen parcial. La brecha de régimen
  parcial de H5 convexo permanece **`EXTERNAL_REQUIRED`** (decisión de modelado o
  matemático externo), y está mecanizada como exclusión explícita
  (`partial_regime_violates_dichotomy`).

Esto NO es avance externo. Es un afilado interno honesto: la "brecha de régimen"
del puente queda reducida de "disjunta e irreconciliable bajo `hAdm`" a "unificada
bajo (D), con el subcaso parcial aislado y etiquetado `EXTERNAL_REQUIRED`".

### Secundario (Track 3 sharpening, `IsClosed N` ⇒ norma genuina)

**No perseguido.** Etiquetado por el rol como pulido de bajo valor; se omitió para
minimizar superficie de fallo del build. Sin efecto sobre el veredicto.

---

## 6. Evidencia de verificación

- `lake build`: **EXIT=0**, **2361 jobs**, `Built QICNLean.QICNH5UnilateralBridge`.
  Advertencias únicas: linter de estilo de cabecera de mathlib (cosmético,
  idéntico a los demás artefactos red-team del directorio). Sin errores, sin
  `sorry`/`admit`.
- `#print axioms` (scratch ASCII sin BOM, ejecutado y borrado) para los cinco
  teoremas:
  `noncollapse_of_subspace_dichotomy`, `regime_a_implies_dichotomy`,
  `bilateral_implies_dichotomy`, `partial_regime_violates_dichotomy`,
  `dichotomy_regimeA_satisfiable`:
  **`[propext, Classical.choice, Quot.sound]`** en todos (conjunto permitido).

---

## 7. Recomendación

**PARAR** la línea de fuerza bruta interna sobre el régimen parcial. La frontera
está mecanizada y diagnosticada. El siguiente paso correcto es una **decisión de
modelado humana/externa** sobre si BaseCore admite que `s` corte parcialmente el
subespacio de constantes `N`:

- si la respuesta de modelado es "no" (s no trunca parcialmente N), entonces (D)
  es la hipótesis canónica y el puente está cerrado en su dominio;
- si la respuesta es "sí" (régimen parcial admisible), se requiere un input
  matemático externo (tangencia/regularidad de `∂s` a lo largo de `N`) antes de
  cualquier intento adicional.

No promover ninguno de estos teoremas a `NEW_CLAIM` ni a `C_op` sin adjudicación
externa independiente.
