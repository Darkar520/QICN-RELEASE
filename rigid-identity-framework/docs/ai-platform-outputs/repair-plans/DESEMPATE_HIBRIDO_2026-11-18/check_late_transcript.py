from fractions import Fraction as F
from itertools import product
from pathlib import Path
import contextlib
import io
import json
import runpy

# Use the existing plant's actual paired body/world updates.
with contextlib.redirect_stdout(io.StringIO()):
    prior = runpy.run_path(str(Path(__file__).resolve().parents[1] /
        'FASE_CIENTIFICA_ATOMICO_PUENTE_2026-11-17/check_atomic_coupled.py'))
plant = prior['plant']
G = prior['G']
fixed = (1, 1, -1, -1)
baseline = plant(fixed + (1,), cut=True)

def sign(x, q):
    return 1 - 2 * ((x & q).bit_count() % 2)

def response(x, q, *, cut=False):
    return (plant(fixed + (sign(x, q),), cut=cut) - baseline) / 4

def loss(rows, forecast):
    errors = [abs(y - forecast(x, q)) for x, q, y in rows]
    return max(errors), sum(errors) / len(errors)

frontier = []
for m in range(1, 7):
    n = 1 << m
    rows = [(x, q, response(x, q)) for x in range(n) for q in range(n)]
    assert all(y == G * sign(x, q) for x, q, y in rows)
    for b in range(m + 1):
        mask = (1 << b) - 1

        def predict(x, q):
            # The decoder sees only the transcript and later q.
            return G * sign(x & mask, q) if not q & ~mask else F(0)

        uniform, mean = loss(rows, predict)
        assert uniform == (G if b < m else 0)
        assert mean == G * (1 - F(1 << b, n))
        frontier.append({'m': m, 'B': b, 'R_uniform': str(uniform),
                         'R_mean': str(mean)})

# All maps from 2-bit records into a 1-bit transcript. Minimize absolute
# error in each cell/query by using a conditional median.
best_mean = G
for transcript in product(range(2), repeat=4):
    best_error = 0
    for k in range(2):
        for q in range(4):
            cell = [sign(x, q) for x in range(4) if transcript[x] == k]
            best_error += G * (len(cell) - abs(sum(cell)))
    mean = best_error / 16
    assert (1 - mean/G)**2 <= F(1, 2)
    best_mean = min(best_mean, mean)
assert best_mean == 3*G/8  # unbalanced cells of sizes 1 and 3

# Late round trip with one unknown bit. Bits 0..m-2 were sent early.
for m in range(1, 7):
    last = 1 << (m-1)
    for x, q in product(range(1 << m), repeat=2):
        reply = bool(x & last) and bool(q & last)
        assert sign(x & (last-1), q) * (1 - 2*reply) == sign(x,q)

for x, q in product(range(4), repeat=2):
    assert response(x, q, cut=True) == 0
    assert response(0, q) == G  # erased H under the intact response law
    donor = x ^ 1  # preregistered paired toggle of bit zero
    assert response(donor, q) == response(x,q)*sign(1,q)
# Identical total graph and evaluation law for every arm.
replica = response
rows = [(x, q, response(x,q)) for x,q in product(range(4),repeat=2)]
assert loss(rows, replica) == (0,0)
# A wrong-sign reference is the negative control for the signed decision.
def inverted(x,q):
    return -response(x,q)
assert loss(rows, inverted) == (2*G,2*G)

# The sharp readout perturbation: target and competitor move in opposite
# directions in loss while the paired raw readings each move by eps.
eps = G / 1024
target = G
noisy_target = (G - eps) - eps
clean_R = abs(target - 0) - abs(target - target)
noisy_R = abs(noisy_target - 0) - abs(noisy_target - target)
assert clean_R == G
assert clean_R - noisy_R == 4*eps

# Leak/abstention controls are exact synthetic populations of blocks.
labels = ('h','m') * 8
always_h = ('h',) * 16
always_tie = ('tie',) * 16
leakage = list(always_h)
wrong = [i for i,l in enumerate(labels) if l=='m']
for i in wrong[:2]:
    leakage[i] = labels[i]

def risk(actions):
    return (sum(F(1,2) if a=='tie' else int(a!=l) for a,l in zip(actions,labels))/16,
            F(sum(a!='tie' for a in actions),16))
assert risk(always_tie)==(F(1,2),0)
assert risk(always_h)==(F(1,2),1)
assert risk(leakage)==(F(3,8),1)  # selective leak p=1/8
print(json.dumps({'passed':True,'observed_domain':'synthetic mathematical plant',
    'frontier':frontier,'m2_b1_best_mean':str(best_mean),
    'replica_R':'0','inverted_reference_R':str(-2*G),
    'sharp_noisy_R':str(noisy_R),'paired_reading_eps':str(eps),
    'known_selective_leak_risk':'3/8','always_tie_coverage':'0',
    'cn3_erased_history':False,'runtime_campaign_executed':False,
    'external_support_certified':False},indent=2))
