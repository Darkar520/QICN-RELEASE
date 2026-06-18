import QICNLean.QICNAttractorCompact

/-!
# Non-canonical non-collapse skeleton

This file mechanizes only the logical implication from an explicit anti-constant
fixed-point hypothesis to parameterwise non-collapse.
-/

namespace QICNLean

/--
Esto mecaniza SOLO el paso lógico H5 ⇒ no-colapso.
NO justifica H5; H5 es una hipótesis asumida, no derivada.
-/
theorem noncollapse_from_H5
    {U H : Type*} (T : U -> H -> H) (fixedPoint : U -> H) (N : Set H)
    (hfixed : ∀ u, T u (fixedPoint u) = fixedPoint u)
    (hH5 : ∀ u c, c ∈ N -> T u c ≠ c)
    (u : U) :
    fixedPoint u ∉ N := by
  intro hmem
  exact hH5 u (fixedPoint u) hmem (hfixed u)

end QICNLean
