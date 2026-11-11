"""Exact controls for binary transport and local bridge burdens."""

from fractions import Fraction as F
from functools import reduce
from itertools import product
from operator import xor

from prefix_tower import ALTERNATING, CONTEXTS, State, TAP, circle, readout, reference_bit, step, write_prefix


BITS = (0, 1)
ETA = F(1, 4 * 3**10)
PHASE_NOISE = TAP / 16
TRIANGLE = ((0, 1), (1, 2), (2, 0))


def signed_phase(phase):
    return (phase + F(1, 2)) % 1 - F(1, 2)


def witness_label(phase):
    centered = signed_phase(phase)
    assert centered != 0
    return int(centered < 0)


def coherent_assignments(edge_bits):
    return {
        labels
        for labels in product(BITS, repeat=3)
        if all(labels[destination] == labels[source] ^ bit
               for (source, destination), bit in zip(TRIANGLE, edge_bits))
    }


def shift_phase_readout(state, shift):
    phases = tuple((phase + shift) % 1 for phase in readout(state)[:3])
    return phases + (state.code,)


def check_binary_transport():
    for edge_bits, expected_count in (((0, 1, 1), 2), ((0, 0, 1), 0)):
        assignments = coherent_assignments(edge_bits)
        assert len(assignments) == expected_count
        for gauge in product(BITS, repeat=3):
            relabeled_bits = tuple(bit ^ gauge[source] ^ gauge[destination]
                                   for (source, destination), bit in zip(TRIANGLE, edge_bits))
            assert reduce(xor, relabeled_bits) == reduce(xor, edge_bits)
            assert coherent_assignments(relabeled_bits) == {
                tuple(label ^ flip for label, flip in zip(labels, gauge))
                for labels in assignments
            }

        initial = tuple(State(CONTEXTS[1], F(0), ALTERNATING, F((-1)**label, 8))
                        for label in BITS)
        states, labels = initial, BITS
        for index, bit in enumerate(edge_bits):
            expected_magnitude = F(1, 128 * 4**index)
            states = tuple(step(step(state, q=(-1)**bit)) for state in states)
            expected_labels = tuple(label ^ bit for label in labels)
            assert all(abs(signed_phase(state.phase)) == expected_magnitude for state in states)
            assert expected_magnitude > ETA
            assert set(zip(labels, expected_labels)) == {(label, label ^ bit) for label in BITS}
            for error in (-ETA, F(0), ETA):
                assert tuple(witness_label(state.phase + error) for state in states) == expected_labels
            labels = expected_labels

        assert labels == tuple(label ^ reduce(xor, edge_bits) for label in BITS)
        final_shifts = tuple(-signed_phase(state.phase) for state in states)
        assert tuple(map(abs, final_shifts)) == (F(1, 2048), F(1, 2048))
        assert shift_phase_readout(states[0], final_shifts[0]) == shift_phase_readout(states[1], final_shifts[1])
    print("Transport: 16 gauge checks, two continuously carried edge experiments, final midpoint collision")


def role_response(profile_role, probe_role, lesion):
    state = State(CONTEXTS[profile_role], F(0), ALTERNATING, F(0))
    state = step(state, write=(3, reference_bit(3) ^ int(lesion)))
    transported = step(state)
    return signed_phase(step(transported, probe=(4, probe_role)).phase)


def mixed_difference(matrix):
    return matrix[0] - matrix[1] - matrix[2] + matrix[3]


def check_differentiation():
    pairs = tuple((role_response(profile, probe, False), role_response(profile, probe, True))
                  for profile, probe in product(BITS, repeat=2))
    contrasts = tuple(reference - lesion for reference, lesion in pairs)
    assert contrasts == (TAP, F(0), F(0), TAP)
    assert mixed_difference(contrasts) == 2 * TAP
    assert max(abs(value - TAP / 2) for value in contrasts) == TAP / 2
    assert mixed_difference(tuple(reference - reference for reference, _ in pairs)) == 0

    for errors in product((-PHASE_NOISE, PHASE_NOISE), repeat=8):
        observed = tuple(contrast + errors[2*i] - errors[2*i+1]
                         for i, contrast in enumerate(contrasts))
        defect = mixed_difference(observed)
        assert defect / 4 >= 3 * TAP / 8
        additive_fit = tuple(value - direction * defect / 4
                             for value, direction in zip(observed, (1, -1, -1, 1)))
        assert mixed_difference(additive_fit) == 0
        assert max(abs(actual - fit) for actual, fit in zip(observed, additive_fit)) == defect / 4
    print("D: exact additive error delta/2, noisy lower bound 3delta/8 on all 256 noise corners")


def alternative_response(state, query, error=F(0)):
    phase = signed_phase(step(state, probe=(4 + query, 0)).phase + error)
    return int(phase > TAP / 2)


def check_ambiguity():
    words = tuple(product(BITS, repeat=2))
    for word in words:
        code = ALTERNATING
        for site, activity in zip((3, 4), word):
            code = write_prefix(code, site, reference_bit(site) ^ (1 - activity))
        prepared = State(CONTEXTS[0], F(0), code, F(0))
        intact = step(prepared)
        erased = step(prepared, write=(4, 1 - reference_bit(4)))
        for query, error in product(BITS, (-PHASE_NOISE, F(0), PHASE_NOISE)):
            assert alternative_response(intact, query, error) == word[query]
            assert alternative_response(erased, query, error) == (0, word[1])[query]

    def errors(encoder, decoder):
        return sum(decoder[2 * encoder[index] + query] != word[query]
                   for index, word in enumerate(words) for query in BITS)

    bit_maps = tuple(product(BITS, repeat=4))
    optimum = min(errors(encoder, decoder) for encoder in bit_maps for decoder in bit_maps)
    retain_first = tuple(word[0] for word in words)
    reconstruct_with_fixed_second = (0, 0, 1, 0)
    assert F(optimum, 8) == F(1, 4)
    assert errors(retain_first, reconstruct_with_fixed_second) == optimum
    print("A: 256 encoder-decoder pairs, exact error 1/4, selective overwrite and two-bit controls")


def check_temporal_order():
    prepared = State(CONTEXTS[1], F(0), ALTERNATING + F(2, 3), F(0))
    left = step(step(prepared, q=1))
    right = step(step(prepared), q=1)
    assert (left.memory, right.memory) == (F(1, 24), F(0))
    assert left.phase != right.phase
    left, right = step(left, q=1), step(right, q=1)
    for h in range(12):
        assert readout(left) == readout(right)
        terminal_left, terminal_right = step(left), step(right)
        gap = F(1, 384 * 2**h)
        assert terminal_right.phase == 0
        assert terminal_left.phase == gap
        assert circle(terminal_left.phase - terminal_right.phase) == gap
        assert (gap > 2 * ETA) == (h <= 8)
        if h <= 8:
            for error in (-ETA, F(0), ETA):
                assert signed_phase(terminal_left.phase + error) > gap / 2
                assert signed_phase(terminal_right.phase + error) < gap / 2
        else:
            assert shift_phase_readout(terminal_left, -gap / 2) == shift_phase_readout(terminal_right, gap / 2)
        midpoint_loss = (circle(terminal_left.phase - gap / 2)
                         + circle(terminal_right.phase - gap / 2)) / 2
        assert midpoint_loss == gap / 2
        assert readout(step(left._replace(memory=F(0)))) == readout(step(right._replace(memory=F(0))))
        left, right = step(left, q=1), step(right, q=1)
    print("T: exact order gap through 12 horizons, disjoint through h=8, overlap from h=9")


def check_trace_example():
    prepared = State(CONTEXTS[0], F(0), ALTERNATING, F(1, 8))
    completions = ((prepared, 0), (prepared, 1))
    for _ in range(4):
        assert readout(completions[0][0]) == readout(completions[1][0])
        completions = tuple((step(state, q=1 if circle(readout(state)[0]) > F(1, 32) else 0), bit)
                            for state, bit in completions)
    states = tuple(step(state, u=F(bit, 8)) for state, bit in completions)
    assert circle(states[1].phase - states[0].phase) == F(1, 8)
    print("Native traces: same adaptive transcript, separated by the added typed intervention")


def check_approximate_automodels():
    """Check rational sharpness and the native tower witnesses."""
    from fractions import Fraction
    from itertools import product
    from prefix_tower import ALTERNATING, CONTEXTS, SITES, State, distance, prefix, step

    zero = Fraction(0)
    for lipschitz in (zero, Fraction(1, 5), Fraction(1, 2), Fraction(9, 10)):
        plus, minus = Fraction(1), Fraction(-1)
        defect_plus = abs(lipschitz * plus - plus)
        defect_minus = abs(lipschitz * minus - minus)
        assert defect_plus == defect_minus == 1 - lipschitz
        assert abs(plus) == defect_plus / (1 - lipschitz)
        assert abs(plus - minus) == (defect_plus + defect_minus) / (1 - lipschitz)

    point = State(CONTEXTS[0], zero, ALTERNATING, zero)
    neutral = step(point)
    quarter = step(point, u=Fraction(1, 4))
    antipodal = step(point, u=Fraction(1, 2))
    assert distance(neutral, quarter) == Fraction(1, 4)
    assert distance(point, antipodal) == Fraction(1, 2)
    writes = (None,) + tuple(product(SITES, (0, 1)))
    commands = [(q, None) for q in (-1, 0, 1)]
    commands.extend((0, probe) for probe in product(SITES, (0, 1)))
    worst = max(distance(point, step(point, u, q, write=write, probe=probe))
                for u, (q, probe), write in product((zero, Fraction(1, 4), Fraction(1, 2)), commands, writes))
    assert worst == Fraction(1, 2)  # Uniform upper bound in the proof covers all phases.

    def truncate(state, depth):
        bits = prefix(state.code, depth)
        reference = prefix(ALTERNATING, depth)
        replacement = ALTERNATING + sum(Fraction(2 * (bit - fixed), 3**j)
                                        for j, (bit, fixed) in enumerate(zip(bits, reference), 1))
        return state._replace(code=replacement)

    for depth, code, memory, q in product(range(1, 9), (zero, ALTERNATING, Fraction(1)),
                                           (Fraction(-1, 8), Fraction(1, 8)), (-1, 0, 1)):
        state = State(CONTEXTS[0], Fraction(1, 8), code, memory)
        truncated = truncate(state, depth)
        assert distance(state, truncated) <= Fraction(1, 3**depth)
        left = truncate(step(state, q=q), depth)
        right = step(truncated, q=q)
        mismatch = prefix(code, depth)[-1] != prefix(ALTERNATING, depth)[-1]
        assert distance(left, right) == Fraction(2 * int(mismatch), 3**(depth + 1))
    print("Puente: rational saturation, phase floors and exact depth-1-to-8 fibre defects")


if __name__ == "__main__":
    check_approximate_automodels()
    check_binary_transport()
    check_differentiation()
    check_ambiguity()
    check_temporal_order()
    check_trace_example()
