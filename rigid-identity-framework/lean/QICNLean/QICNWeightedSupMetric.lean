import QICNLean.QICNWeightedChannels
import Mathlib.Topology.EMetricSpace.Basic
import Mathlib.Topology.MetricSpace.Basic

/-!
The actual all-stage weighted SUP extended metric and its finite-distance
components. No SUM metric is used or substituted. Product-topology agreement
requires its own tail proof and is not built into this topology by assumption.
-/
namespace QICNLean.WeightedSupMetric

open Set
open scoped ENNReal
universe u
noncomputable section

structure Weights where
  value : ℕ → NNReal
  positive : ∀ n, 0 < value n

structure Carrier (w : Weights) (S : ℕ → Type u) where
  coord : (n : ℕ) → S n

variable {w : Weights} {S : ℕ → Type u} [∀ n, EMetricSpace (S n)]

def rho (x y : Carrier w S) : ℝ≥0∞ :=
  ⨆ n, (w.value n : ℝ≥0∞) * edist (x.coord n) (y.coord n)

theorem coordinate_le_rho (x y : Carrier w S) (n : ℕ) :
    (w.value n : ℝ≥0∞) * edist (x.coord n) (y.coord n) ≤ rho x y :=
  le_iSup (fun k => (w.value k : ℝ≥0∞) * edist (x.coord k) (y.coord k)) n

instance carrierEMetricSpace : EMetricSpace (Carrier w S) where
  edist := rho
  edist_self x := by simp [rho]
  edist_comm x y := by simp only [rho, edist_comm]
  edist_triangle x y z := by
    apply iSup_le
    intro n
    calc
      _ ≤ (w.value n : ℝ≥0∞) * (edist (x.coord n) (y.coord n) +
          edist (y.coord n) (z.coord n)) :=
        mul_le_mul_right (edist_triangle _ _ _) _
      _ = _ := mul_add _ _ _
      _ ≤ _ := add_le_add (coordinate_le_rho x y n) (coordinate_le_rho y z n)
  eq_of_edist_eq_zero := by
    intro x y h
    have hc (n : ℕ) : x.coord n = y.coord n := by
      have hz : (w.value n : ℝ≥0∞) * edist (x.coord n) (y.coord n) = 0 :=
        le_antisymm ((coordinate_le_rho x y n).trans_eq h) (by positivity)
      have hw : (w.value n : ℝ≥0∞) ≠ 0 := by exact_mod_cast (w.positive n).ne'
      exact edist_eq_zero.mp ((mul_eq_zero.mp hz).resolve_left hw)
    cases x with
    | mk x => cases y with
      | mk y => exact congrArg Carrier.mk (funext hc)

theorem edist_eq_rho (x y : Carrier w S) : edist x y = rho x y := rfl

abbrev Sector (b : Carrier w S) := {x : Carrier w S // edist x b < ∞}

theorem sector_closed (b : Carrier w S) : IsClosed {x : Carrier w S | edist x b < ∞} :=
  Metric.isClosed_eball_top

theorem sector_pair_finite (b : Carrier w S) (x y : Sector b) :
    edist (x : Carrier w S) (y : Carrier w S) ≠ ∞ := by
  have hy : edist b (y : Carrier w S) < ∞ := by rw [edist_comm]; exact y.property
  exact ((edist_triangle (x : Carrier w S) b (y : Carrier w S)).trans_lt
    (ENNReal.add_lt_top.mpr ⟨x.property, hy⟩)).ne

instance sectorMetricSpace (b : Carrier w S) : MetricSpace (Sector b) :=
  EMetricSpace.toMetricSpace (fun x y => sector_pair_finite b x y)

theorem finite_distance_equivalence :
    Equivalence (fun x y : Carrier w S => edist x y < ∞) := by
  constructor
  · intro x; simp
  · intro x y h; rwa [edist_comm]
  · intro x y z hxy hyz
    exact (edist_triangle x y z).trans_lt (ENNReal.add_lt_top.mpr ⟨hxy, hyz⟩)

theorem sector_dist_eq_sup {T : ℕ → Type u} [∀ n, MetricSpace (T n)]
    (b : Carrier w T) (x y : Sector b) :
    dist x y = ⨆ n, (w.value n : ℝ) * dist (x.val.coord n) (y.val.coord n) := by
  rw [dist_edist]
  change (rho x.val y.val).toReal = _
  unfold rho
  rw [ENNReal.toReal_iSup]
  · congr 1
    funext n
    simp [ENNReal.toReal_mul, edist_dist]
  · intro n
    have hbound := coordinate_le_rho x.val y.val n
    intro htop
    rw [htop] at hbound
    exact sector_pair_finite b x y (top_unique hbound)

end
end QICNLean.WeightedSupMetric
