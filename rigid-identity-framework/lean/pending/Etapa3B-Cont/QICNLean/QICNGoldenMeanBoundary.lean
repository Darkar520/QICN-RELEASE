import QICNLean.QICNGoldenMeanDomain
import Mathlib.Topology.Algebra.InfiniteSum.NatInt

/-! The source's actual periodic 010010... stream realizes the corner u=1/2. -/
namespace QICNLean.GoldenMeanBoundary

open QICNLean.GoldenMeanDomain
noncomputable section

def halfStream (n : ℕ) : Bool := decide (n % 3 = 1)

theorem half_stream_admissible : admissible halfStream := by
  intro n hn
  simp [halfStream] at hn ⊢
  omega

theorem half_stream_periodic (n : ℕ) : halfStream (n + 3) = halfStream n := by
  simp [halfStream, Nat.add_mod]

theorem half_stream_summable :
    ∀ (r : ℝ), 0 < r → r < 1 → r + r ^ 2 = 1 →
      Summable (fun k : ℕ => if halfStream k then r ^ (k + 1) else 0) := by
  intro r hr0 hr1 hquad
  apply summable_of_sum_range_le
  · intro k; split_ifs <;> positivity
  · intro n
    rw [← prefix_eq_sum]
    exact prefix_le_one r hr0.le hr1.le hquad
      n halfStream half_stream_admissible

theorem half_encoding (r : ℝ) (hr0 : 0 < r) (hr1 : r < 1)
    (hquad : r + r ^ 2 = 1) : encoding r halfStream = 1 / 2 := by
  have hs := (half_stream_summable r hr0 hr1 hquad).sum_add_tsum_nat_add 3
  have hfirst : (∑ k ∈ Finset.range 3,
      if halfStream k then r ^ (k + 1) else 0) = r ^ 2 := by
    norm_num [Finset.sum_range_succ, halfStream]
  have htail :
      (fun k : ℕ => if halfStream (k + 3) then r ^ (k + 3 + 1) else 0) =
      (fun k : ℕ => r ^ 3 * (if halfStream k then r ^ (k + 1) else 0)) := by
    funext k
    rw [half_stream_periodic]
    have he : k + 3 + 1 = (k + 1) + 3 := by omega
    rw [he, pow_add]
    split_ifs <;> ring
  rw [hfirst, htail, tsum_mul_left] at hs
  change r ^ 2 + r ^ 3 * encoding r halfStream = encoding r halfStream at hs
  have hq := hquad
  have hm := congrArg (fun z : ℝ => r * z) hq
  have hc : 1 - r ^ 3 = 2 * r ^ 2 := by nlinarith
  have he : (1 - r ^ 3) * encoding r halfStream = r ^ 2 := by nlinarith
  rw [hc] at he
  have hh : r ^ 2 * (2 * encoding r halfStream - 1) = 0 := by nlinarith
  have hz := (mul_eq_zero.mp hh).resolve_left (pow_ne_zero 2 hr0.ne')
  linarith

end
end QICNLean.GoldenMeanBoundary
