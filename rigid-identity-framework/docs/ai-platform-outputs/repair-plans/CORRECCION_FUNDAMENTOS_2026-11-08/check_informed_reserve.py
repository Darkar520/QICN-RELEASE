"""Exact controls for the held-out phase-return task and its information bound."""
from fractions import Fraction as F
from itertools import product
from typing import NamedTuple

from prefix_tower import ALTERNATING, PROFILES, SITES, State, circle, prefix, readout, reference_bit, step


SIGNS = (-1, 1)
ABSTAIN = 0
ACTIONS = (*SIGNS, ABSTAIN)
ABSTENTION_COST = F(3, 4)
PORT = F(1, 128)
CALIBRATION_PORT = F(1, 512)
FAILURE_THRESHOLD = F(1, 256)
ETA = F(1, 4 * 3**10)
WRITES = (None,) + tuple((site, 1 - reference_bit(site)) for site in SITES)


class Commands(NamedTuple):
    preparation: str
    assignment: int
    write: tuple | None


class PublicRecord(NamedTuple):
    current: tuple
    commands: Commands
    history: tuple


def signed_phase_sign(phase):
    """Return the sign of the centered phase, with a fixed positive tie-break."""
    centered = (phase + F(1, 2)) % 1 - F(1, 2)
    return -1 if centered < 0 else 1


def prepare(profile, assignment, write, sign, *, visible=False):
    initial_memory = F(sign, 4) if visible else F(0)
    initial = State(profile, F(0), ALTERNATING, initial_memory)
    if visible:
        before_assignment = step(initial)
    else:
        before_assignment = initial._replace(memory=F(sign, 8))
    after_assignment = step(before_assignment, q=assignment, write=write)
    commands = Commands("neutral-cue" if visible else "concealed-impulse", assignment, write)
    public = PublicRecord(readout(after_assignment), commands,
                          (readout(initial), readout(before_assignment)))
    return public, after_assignment


def terminal_distance(state, port, amplitude=PORT, noise=F(0)):
    return circle(step(state, u=port * amplitude).phase + noise)


def action_loss(state, action):
    if action == ABSTAIN:
        return ABSTENTION_COST
    return F(terminal_distance(state, action) > FAILURE_THRESHOLD)


def calibrate():
    """Fit four binary decisions on the separate small-amplitude block."""
    table = {}
    for assignment, sign in product(SIGNS, repeat=2):
        initial = State(PROFILES[0], F(0), ALTERNATING, F(sign, 16))
        cue_state = step(initial)
        cue = signed_phase_sign(readout(cue_state)[0])
        ready = step(cue_state, q=assignment)
        distances = {port: terminal_distance(ready, port, CALIBRATION_PORT) for port in SIGNS}
        winner = min(distances, key=distances.__getitem__)
        assert distances[winner] == 0 and distances[-winner] == 2 * CALIBRATION_PORT
        table[assignment, cue] = winner
    assert len(table) == 4 and set(table.values()) == set(SIGNS)
    return table


def profile_policy(current, commands, query, calibration):
    # The last profile offset is public in the relative phase channel.
    offset = (current[2] - current[0]) % 1
    bin_index = offset * 8
    assert bin_index.denominator == 1
    return -1 if bin_index.numerator % 2 else 1


def history_policy(current, commands, query, calibration):
    cue = signed_phase_sign(query(-1)[0])
    return calibration[commands.assignment, cue]


def hybrid_policy(current, commands, query, calibration):
    cue = signed_phase_sign(query(-1)[0])
    return cue * calibration[commands.assignment, 1]


def paper_vi_policy(current, commands, query, calibration):
    # Both nonneutral pulses flip memory in the frozen Paper VI competitor.
    return signed_phase_sign(query(-1)[0])


def candidate_policy(current, commands, query, calibration):
    cue = signed_phase_sign(query(-1)[0])
    predicted_feedback = -cue * calibration[commands.assignment, 1] * PORT
    return min(SIGNS, key=lambda port: circle(port * PORT + predicted_feedback))


POLICIES = {
    "profile": profile_policy,
    "history": history_policy,
    "hybrid": hybrid_policy,
    "Paper VI interaction": paper_vi_policy,
    "candidate": candidate_policy,
}


def predict(policy, public, calibration):
    queried = False

    def query(index):
        nonlocal queried
        assert not queried, "each policy may consult one prior observation"
        queried = True
        return public.history[index]

    action = policy(public.current, public.commands, query, calibration)
    assert action in ACTIONS
    return action


def policy_scores(rows, calibration):
    results = {}
    for name, policy in POLICIES.items():
        actions = [predict(policy, public, calibration) for public, state in rows]
        loss = sum(action_loss(state, action) for (_, state), action in zip(rows, actions))
        coverage = F(sum(action != ABSTAIN for action in actions), len(rows))
        results[name] = (loss / len(rows), coverage)
    return results


def risk_of_constant_choice(states, action):
    return sum(action_loss(state, action) for state in states) / len(states)


def check_matched_reserve(calibration):
    hidden_rows, visible_rows = [], []
    for profile, assignment, write in product(PROFILES, SIGNS, WRITES):
        hidden = [prepare(profile, assignment, write, sign) for sign in SIGNS]
        visible = [prepare(profile, assignment, write, sign, visible=True) for sign in SIGNS]
        assert hidden[0][0] == hidden[1][0]
        assert visible[0][0].current == visible[1][0].current == hidden[0][0].current
        assert visible[0][0].history[-1] != visible[1][0].history[-1]
        prefix_channels = {prefix(public.current[-1], max(SITES)) for public, _ in hidden}
        assert len(prefix_channels) == 1

        for sign, (_, state), (visible_public, visible_state) in zip(SIGNS, hidden, visible):
            assert state == visible_state
            winner = -assignment * sign
            assert terminal_distance(state, winner) == 0
            assert terminal_distance(state, -winner) == F(1, 64)
            assert terminal_distance(state, winner) + ETA < FAILURE_THRESHOLD
            assert terminal_distance(state, -winner) - ETA > FAILURE_THRESHOLD
            for noise in (-ETA, F(0), ETA):
                assert terminal_distance(state, winner, noise=noise) < FAILURE_THRESHOLD
                assert terminal_distance(state, -winner, noise=noise) > FAILURE_THRESHOLD

            _, exchanged = prepare(profile, -assignment, write, sign)
            assert exchanged.memory == -state.memory
            assert terminal_distance(exchanged, -winner) == 0

            vi_state = step(step(State(profile, F(0), ALTERNATING, F(sign, 4))),
                            q=assignment, write=write, rival=True)
            vi_action = predict(paper_vi_policy, visible_public, calibration)
            assert terminal_distance(vi_state, vi_action) == 0
            assert action_loss(state, vi_action) == int(assignment == 1)

        _, ablated = prepare(profile, assignment, write, 0)
        for port in SIGNS:
            assert terminal_distance(ablated, port) == PORT
            assert terminal_distance(ablated, port) - ETA > FAILURE_THRESHOLD

        states = [state for _, state in hidden]
        losses = {action: risk_of_constant_choice(states, action) for action in ACTIONS}
        assert losses == {-1: F(1, 2), 1: F(1, 2), ABSTAIN: ABSTENTION_COST}
        # Exact grid controls for the affine bound for arbitrary randomized policies.
        for negative_mass, positive_mass in product(range(5), repeat=2):
            abstain_mass = 4 - negative_mass - positive_mass
            if abstain_mass >= 0:
                expected = sum(F(mass, 4) * losses[action]
                               for action, mass in zip(ACTIONS, (negative_mass, positive_mass, abstain_mass)))
                assert expected == F(1, 2) + F(abstain_mass, 16)

        hidden_rows.extend(hidden)
        visible_rows.extend(visible)

    hidden_scores = policy_scores(hidden_rows, calibration)
    visible_scores = policy_scores(visible_rows, calibration)
    assert len(hidden_rows) == len(visible_rows) == 168
    assert all(result == (F(1, 2), F(1)) for result in hidden_scores.values())
    assert visible_scores == {
        "profile": (F(1, 2), F(1)),
        "history": (F(0), F(1)),
        "hybrid": (F(0), F(1)),
        "Paper VI interaction": (F(1, 2), F(1)),
        "candidate": (F(0), F(1)),
    }
    print("Reserve: 84 balanced strata, 168 hidden and 168 visible preparations")
    print("Hidden: forced risk 1/2, coverage 1, abstention 3/4, signed margin 0")
    print("Visible: history/hybrid/candidate risk 0, Paper VI interaction risk 1/2, signed margin 0")


def check_signal_channel(channel, expected_tv):
    """Enumerate all deterministic policies on a finite signal, including abstention."""
    assert set(channel) == set(SIGNS)
    assert all(sum(masses.values()) == 1 for masses in channel.values())
    signals = tuple(sorted(set().union(*(set(masses) for masses in channel.values()))))
    tv = sum(abs(channel[1].get(signal, 0) - channel[-1].get(signal, 0)) for signal in signals) / 2
    assert tv == expected_tv

    def risk(actions):
        return sum(F(1, 2) * channel[winner].get(signal, 0)
                   * (ABSTENTION_COST if action == ABSTAIN else int(action != winner))
                   for winner in SIGNS for signal, action in zip(signals, actions))

    optimum = min(risk(actions) for actions in product(ACTIONS, repeat=len(signals)))
    decoder = tuple(max(SIGNS, key=lambda winner: channel[winner].get(signal, 0)) for signal in signals)
    assert optimum == risk(decoder) == (1 - tv) / 2
    return optimum


def check_private_and_shared_signals(calibration):
    hidden_baseline = F(1, 2)
    private_risk = check_signal_channel({-1: {-1: F(1)}, 1: {1: F(1)}}, F(1))
    erased_risk = check_signal_channel({winner: {winner: F(1, 2), 0: F(1, 2)} for winner in SIGNS}, F(1, 2))
    common_risk = check_signal_channel({winner: {0: F(1)} for winner in SIGNS}, F(0))
    assert hidden_baseline - private_risk == F(1, 2)
    assert hidden_baseline - erased_risk == F(1, 4)
    assert hidden_baseline - common_risk == F(0)
    for profile, assignment, write, sign in product(PROFILES, SIGNS, WRITES, SIGNS):
        public, state = prepare(profile, assignment, write, sign)
        sign_of_memory = -1 if state.memory < 0 else 1
        private_action = -sign_of_memory
        # Encode the shared bit as the corresponding phase cue in the one allowed slot.
        cue = readout(State(profile, F(sign, 32) % 1, ALTERNATING, F(0)))
        shared = public._replace(history=(*public.history[:-1], cue))
        shared_action = predict(hybrid_policy, shared, calibration)
        assert private_action == shared_action and action_loss(state, shared_action) == 0
    print("Information bound: private sign gap 1/2, half-erased sign gap 1/4, common feature gap 0")
    print("Shared informative sign: candidate and hybrid both attain 0 loss")



def check_asymmetric_worst_sign():
    """Distinguish balanced Bayes loss from literal worst-sign minimax loss."""
    common, solo = 0, -1
    channel = {-1: {common: F(1, 2), solo: F(1, 2)}, 1: {common: F(1)}}
    assert check_signal_channel(channel, F(1, 2)) == F(1, 4)

    def conditional_loss(winner, rule):
        return sum(probability * (ABSTENTION_COST if rule[signal] == ABSTAIN else int(rule[signal] != winner))
                   for signal, probability in channel[winner].items())

    # This adversarial prior lower-bounds the worst-sign loss for every mixture.
    prior = F(1, 3)
    dual = min(prior * conditional_loss(1, rule) + (1 - prior) * conditional_loss(-1, rule)
               for actions in product(ACTIONS, repeat=2)
               for rule in (dict(zip((common, solo), actions)),))
    assert dual == F(1, 3)

    # Mix two rules to predict + at the common point with probability 2/3.
    positive_common = {common: 1, solo: -1}
    negative_common = {common: -1, solo: -1}
    worst_sign_losses = tuple(F(2, 3) * conditional_loss(winner, positive_common)
                              + F(1, 3) * conditional_loss(winner, negative_common) for winner in SIGNS)
    assert worst_sign_losses == (dual, dual)
    print("Asymmetric signal: balanced Bayes loss 1/4, worst-sign minimax loss 1/3")


if __name__ == "__main__":
    calibration = calibrate()
    check_matched_reserve(calibration)
    check_private_and_shared_signals(calibration)
    check_asymmetric_worst_sign()
