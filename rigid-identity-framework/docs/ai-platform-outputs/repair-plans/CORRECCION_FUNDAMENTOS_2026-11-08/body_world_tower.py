"""Rational skew product over the unchanged writable tower.

The two extra ports implement a finite-dimensional control model. Their names
do not assert phenomenal valence, world experience, or biological embodiment.
"""
from fractions import Fraction as F
from typing import NamedTuple

from prefix_tower import CONTEXTS, State, readout, step


ALPHA = BETA = H = F(1, 4)
EVAL_GAIN = F(1, 8)
VALUE_SCALE = BETA * EVAL_GAIN * H
WORLD_SCALE = BETA * H
LOOP_SCALE = BETA**3 * H
ZERO = (F(0), F(0))
IDENTITY = ((F(1), F(0)), (F(0), F(1)))
SWAP = ((F(0), F(1)), (F(1), F(0)))
ROTATION = ((F(0), F(-1)), (F(1), F(0)))
EVALUATIVE = ((F(1, 2), F(-1, 2)), (F(1, 2), F(1, 2)))
COMMON = ((F(1, 2), F(1, 2)), (F(1, 2), F(1, 2)))
FIRST = ((F(1), F(0)), (F(0), F(0)))
SECOND = ((F(0), F(0)), (F(0), F(1)))
NULL = ((F(0), F(0)), (F(0), F(0)))


def add(a, b):
    return tuple(x+y for x, y in zip(a, b))


def subtract(a, b):
    return tuple(x-y for x, y in zip(a, b))


def scale(value, vector):
    return tuple(value*x for x in vector)


def apply(matrix, vector):
    return tuple(sum((a*x for a, x in zip(row, vector)), F(0)) for row in matrix)


def multiply(left, right):
    return tuple(tuple(sum((x*y for x, y in zip(row, column)), F(0))
                       for column in zip(*right)) for row in left)


def transpose(matrix):
    return tuple(zip(*matrix))


def norm(vector):
    return max(map(abs, vector), default=F(0))


def operator_norm(matrix):
    return max(sum(map(abs, row)) for row in matrix)


def role_frame(profile):
    return SWAP if profile == CONTEXTS[1] else IDENTITY


class ExtendedState(NamedTuple):
    core: State
    body: tuple = ZERO
    world: tuple = ZERO


class Mechanism(NamedTuple):
    world_projection: tuple = IDENTITY
    evaluation_map: tuple = EVALUATIVE
    motor_gain: F = F(1)


def fibre_update(body, world, frame, mechanism=Mechanism(), *, evaluate=False,
                 body_input=ZERO, world_input=ZERO):
    """The motor gain changes its edge only; it is not another input label.

    Frame is a signed permutation, Q is the full or compressed world map, and
    the evaluation map has infinity operator norm at most one.
    """
    q, evaluation, motor = mechanism
    if any(len(vector) != 2 for vector in (body, world, body_input, world_input)):
        raise ValueError("Each typed port has two coordinates")
    if any(len(matrix) != 2 or any(len(row) != 2 for row in matrix)
           for matrix in (q, evaluation, frame)):
        raise ValueError("Each port operator must be 2x2")
    if q not in (IDENTITY, COMMON) and multiply(q, q) != q:
        raise ValueError("The world map must be an idempotent contraction")
    if operator_norm(q) > 1 or operator_norm(evaluation) > 1 or abs(motor) > 1:
        raise ValueError("Mechanism exceeds the frozen gain envelope")
    if multiply(frame, transpose(frame)) != IDENTITY or operator_norm(frame) != 1:
        raise ValueError("The indexed frame must be a signed permutation")
    if norm(body_input) > H or norm(world_input) > H:
        raise ValueError("Primitive input exceeds the common port budget")
    sensor = apply(frame, apply(q, world))
    force = scale(EVAL_GAIN, apply(evaluation, subtract(sensor, body)))
    next_body = add(add(scale(ALPHA, body), scale(BETA, sensor)), body_input)
    if evaluate:
        next_body = add(next_body, force)
    next_world = add(add(scale(ALPHA, apply(q, world)),
                         scale(BETA*motor, apply(q, apply(transpose(frame), body)))),
                     apply(q, world_input))
    return next_body, next_world


def advance(state, native=None, mechanism=Mechanism(), *, evaluate=False,
            body_input=ZERO, world_input=ZERO):
    body, world = fibre_update(state.body, state.world, role_frame(state.core.profile),
                               mechanism, evaluate=evaluate,
                               body_input=body_input, world_input=world_input)
    return ExtendedState(step(state.core, **(native or {})), body, world)


def native_readout(state):
    return readout(state.core)


def port_readout(state):
    return state.body, state.world


def fibre_matrix(frame, mechanism=Mechanism(), *, evaluate=False):
    """Recover the exact homogeneous 4x4 operator from its basis images."""
    columns = []
    for i in range(4):
        vector = tuple(F(i == j) for j in range(4))
        body, world = fibre_update(vector[:2], vector[2:], frame, mechanism,
                                   evaluate=evaluate)
        columns.append(body+world)
    return transpose(tuple(columns))
