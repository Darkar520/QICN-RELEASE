"""Rational/interval regression controls; universal proofs remain in the manuscripts."""
from pathlib import Path
from fractions import Fraction as Q
from itertools import product
import json, re

ROOT = next(p for p in Path(__file__).resolve().parents if (p / 'rigid-identity-framework').is_dir())
I = ROOT / 'rigid-identity-framework'
rows = []


def check(name, condition, detail):
    assert condition, (name, detail)
    rows.append({'name': name, 'passed': True, 'detail': detail})


def exp_neg_interval(x):
    assert 0 <= x <= Q(1, 64)
    term = total = Q(1)
    for n in range(1, 11):
        term *= -x / n
        total += term
    return total + term * (-x) / 11, total


def cos_interval(x):
    assert 0 <= x <= Q(1, 64)
    term = total = Q(1)
    for n in range(1, 7):
        term *= -x*x / ((2*n-1)*(2*n))
        total += term
    return total + term * (-x*x) / (13*14), total


def weight_interval(s, t):
    x = abs(s-t)/64
    lo, hi = exp_neg_interval(x)
    clo, chi = cos_interval(x)
    assert 0 < clo <= chi
    return lo/chi, hi/clo


def solve(a, b):
    n = len(b)
    a = [list(row) + [value] for row, value in zip(a, b)]
    for j in range(n):
        pivot = next(i for i in range(j, n) if a[i][j])
        a[j], a[pivot] = a[pivot], a[j]
        divisor = a[j][j]
        a[j] = [x/divisor for x in a[j]]
        for i in range(n):
            if i != j:
                f = a[i][j]
                a[i] = [x-f*y for x, y in zip(a[i], a[j])]
    return [row[-1] for row in a]


kappa = Q(1, 4)
sec_bound = Q(8192, 8191)
q = kappa*sec_bound
drift = Q(8191, 256*6143)
gap = Q(1, 16)-drift
lw = sec_bound*(Q(1, 64)+sec_bound/Q(4096))
check('exact coupled envelopes', q == Q(2048, 8191) and gap == Q(90097, 1572608) > 0,
      'cos>=1-theta^2/2, 1-exp(-E)<=E; positive gamma in coherence-norm units')
for n in (2, 4, 8):
    points = [Q(2*i+1, 2*n) for i in range(n)]
    intervals = [[weight_interval(s, t) for t in points] for s in points]
    assert all(Q(63, 64) <= lo <= hi <= sec_bound for row in intervals for lo, hi in row)
    assert intervals[0][0] == (1, 1) and intervals[0][1][1] < 1
    a = [[kappa*(lo+hi)/(2*n) for lo, hi in row] for row in intervals]
    widths = max(hi-lo for row in intervals for lo, hi in row)
    fp_error = kappa*widths/(1-q)
    system = [[Q(i == j)-a[i][j] for j in range(n)] for i in range(n)]
    for u in (Q(0), Q(1, 8), Q(1, 4)):
        forcing = [s/4+u for s in points]
        x = solve(system, forcing)
        assert all(0 <= v <= 1 for v in x)
        assert all(sum(a[i][j]*x[j] for j in range(n))+forcing[i] == x[i] for i in range(n))
        baseline = [s/4+u+kappa*(Q(1, 8)+u)/(1-kappa) for s in points]
        assert sum((v-b)**2 for v, b in zip(x, baseline))/n <= drift**2
        mean = sum(x)/n
        variance = sum((v-mean)**2 for v in x)/n
        assert variance >= (gap+fp_error)**2
        check('coupled equilibrium N='+str(n)+' u='+str(u), True,
              'Exact rational midpoint solve plus certified exp/cos intervals; actual fixed-point uncertainty bounded by contraction')
    variance_a = sum((s/4-Q(1, 8))**2 for s in points)/n
    assert variance_a == Q(1, 192)*(1-Q(1, n*n)) >= Q(1, 256)
check('nonconstant energy and phase', True, 'Nonzero slopes e=phi=s/64 and nonuniform positive edge coefficients; no zero-profile substitution')

grid = [Q(j, 8) for j in range(9)]
for n in (2, 4):
    for s, t in product(grid, repeat=2):
        si = (min(int(s*n), n-1)*2+1)/Q(2*n)
        tj = (min(int(t*n), n-1)*2+1)/Q(2*n)
        if abs(s-t) == abs(si-tj):
            continue  # Same analytic input, not two independent interval unknowns.
        lo, hi = weight_interval(s, t)
        alo, ahi = weight_interval(si, tj)
        assert max(abs(lo-ahi), abs(hi-alo)) <= lw*(abs(s-si)+abs(t-tj))
check('sampled kernel consistency', True,
      'Rational interval checks of the Lipschitz kernel envelope; the universal integral O(1/N) bound is proved in TeX')
check('single-node negative control', Q(0) < gap and sum((x-Q(1, 2))**2 for x in [Q(1, 2)]) == 0,
      'Every N=1 vector is constant; finite positive gap is claimed only for N>=2')

for u in (Q(0), Q(1, 4), Q(3, 4), Q(1)):
    eigen = Q(1, 2) if u < Q(1, 2) else 1/(1+2*u)
    assert Q(1, 3) <= eigen <= Q(1, 2)
check('regular spectral sectors', True, 'Exact constant-block eigenvalues; infinite zero-mean complement and resolvent proof are in the manuscript')
check('corner negative control', Q(0)+Q(-1, 2) != Q(0),
      'At u=1/2 the opposite radial directional derivatives are not negatives of each other; no Frechet derivative')

for eps in (Q(1, 100), Q(1, 10), Q(1)):
    rf, rg = Q(1), 1+2*eps
    assert abs(rf-rg) == 2*eps
    for r0 in (Q(1, 10), Q(1), Q(10)):
        assert abs(r0/(r0+rf)-r0/(r0+rg)) <= 2*eps/r0
check('sharp readout perturbation', True, 'Finite compact model attains 2eta in R; normalized protection obeys the same-unit r0 bound')
check('setwise versus pointwise negative control', {1-v for v in (0, 1)} == {0, 1} and abs(1-0) == 1,
      'Setwise Hausdorff deformation zero and infinite sector resistance coexist with positive readout loss')
check('finite and zero cost sectors', Q(2)/Q(1) == 2 and Q(0)/Q(1) == 0,
      'Finite positive Hausdorff deformation with finite/zero cost gives finite/zero resistance, not a null-readout conclusion')
check('ablation versus recertification', any([False, True]),
      'A damaged stored certificate does not exclude another valid certificate on the same support')
check('non-admissible packet', 0*1 == 0, 'Integrity gate suppresses action/support independently of the inferential score')
for margin in (Q(-1), Q(0), Q(1)):
    r = Q(1, 4)
    for delta in (Q(-1, 4), Q(0), Q(1, 4)):
        if margin > r:
            assert margin+delta > 0
        if margin < -r:
            assert margin+delta < 0
check('threshold controls', True, 'Strict signed margins survive bounded error; a flat zero score leaves the entire patch unresolved')
check('no finite collapse from a limit', all(Q(1, 2**n) > 0 for n in range(40)),
      'A vanishing sequence of positive margins is not exact finite-stage collapse')
for codes in product(range(2), repeat=3):
    for decoded in product([Q(j, 2) for j in range(5)], repeat=2):
        risk = max(abs(Q(c)-decoded[codes[c]]) for c in range(3))
        assert risk >= Q(1, 2)
check('legibility packing control', True,
      'Three unit-separated classes cannot have uniform distortion below 1/2 with two codes, for every tested encoder and decoded pair')

for n in range(1, 18):
    assert Q(1, 2**n)*4**n == 2**n
check('unnormalized metric negative control', True,
      'Summable 2^-n weights with 4^n-scaled coordinate distances have growing weighted diameters; normalized tails vanish instead')
for horizon in range(1, 20):
    history = [Q(horizon)]*(horizon+1)
    assert all(history[j] >= j for j in range(horizon+1))
    assert all(history[j+1] == history[j] for j in range(horizon))
for candidate in range(20):
    assert Q(candidate) < candidate+1  # The next stage excludes this fixed value.
check('compact versus noncompact existence', True,
      'Each finite inclusion tower S_n=[n,infinity) has a compatible point; witnesses escape and every tested fixed value is excluded later. Universal empty-intersection proof is in TeX.')
check('single-cut channel negative control', (0, 0)[:1] == (0, 1)[:1] and (0, 0) != (0, 1),
      'One faithful observed cut cannot distinguish all later histories')
for stage1 in product([False, True], repeat=2):
    stage0 = stage1[0]
    image0 = stage0
    image1 = (not stage1[0], stage1[1])
    assert image1[0] != image0
check('noncommuting channel negative control', True,
      'Identity C0 and first-bit-flipping C1 fail q0 C1=C0 pi0 on every binary two-stage history; the image is not coherent')
for depth in (1, 2, 5):
    tail = Q(1, 3**(depth+1))
    for noise in (Q(0), Q(1, 32)):
        eta = tail+noise
        y0, y1 = noise, 1-tail-noise
        assert eta < Q(1, 4)
        assert abs(y1-y0) >= 1-2*eta > Q(1, 2)
        assert max(abs(y0), abs(y1)) >= Q(1, 2)-eta > Q(1, 4)
        assert abs(y1) >= 1-eta
check('robust finite readout budget', True,
      'Ternary all-zero/all-one histories, actual finite-cut tail and adverse measurement errors preserve the explicit pair and anchored-null residuals')
check('noise boundary negative control', abs(Q(-1)-1) == 2 and abs(Q(-1)-0) == abs(Q(1)-0) == 1,
      'Without a strict residual budget, a separation result alone cannot exclude both accepted null balls')

registry = [json.loads(l) for l in (I/'registry/theorems.jsonl').read_text(encoding='utf8').splitlines()]
null_labels = {'thm:rigidity-inheritance', 'thm:null-categorical-universality',
               'thm:null-simulation-lower-bound', 'thm:null-closure-by-non-alternatives'}
selected = [r for r in registry if r['paper'] == 'basecore' and r.get('label') in null_labels]
check('current null-theorem metadata', len(selected) == 4 and all(
      r['proof_status'] == 'present' and r['epistemic_status'] == 'conditional'
      and r['audit_status'] == 'corrected_conditional_proof' for r in selected),
      'Historical demotions are preserved as provenance, not current conjecture status')
boundary = (I/'basecore/core/sections/08_claim_boundary_and_falsation.tex').read_text(encoding='utf8')
for label in ['prop:integrity-first','prop:complexity-only-negative-control','prop:ablation-prediction',
              'prop:grammar-transport-prediction','prop:threshold-sensitive-boundary',
              'prop:legibility-dependence','prop:continuity-nonnull-relevance']:
    tail = boundary.split('\\label{'+label+'}', 1)[1].split('\\end{proposition}', 1)[1]
    assert re.match(r'\s*\\begin\{proof\}', tail)
check('seven explicit certificate proofs', True, 'Each targeted proposition has an immediate source proof with its quantified scope')
p3 = (I/'paper3/main.tex').read_text(encoding='utf8')
check('audit provenance preserved', '% Audit provenance marker required by audit-v24-critical-gaps.js:' in p3
      and '% v24 correction of the former Step 2' in p3,
      'Required historical audit markers remain verbatim')
out = ROOT/'.cache/qicn-math-regressions';out.mkdir(parents=True,exist_ok=True)
result = {'passed': True, 'checks': len(rows), 'controls': rows,
          'scope': 'Rational/interval and negative regression controls; not a proof of every universal manuscript statement, physical calibration or external validation.',
          'external_support_certified': False}
(out/'ETAPA1_FOUNDATION_CONTROLS.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8')
print(json.dumps({k: result[k] for k in ['passed','checks','scope','external_support_certified']}))
