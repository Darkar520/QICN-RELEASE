"""Bilinear evaluative branch of the preserved four-state port realization.

Coordinate-additive evaluators are a declared comparator class, not all possible
shared-state mechanisms. Giving a comparator the cross term restores equality.
"""
from fractions import Fraction as F
from body_world_tower import (
    ExtendedState, Mechanism, IDENTITY, COMMON, EVALUATIVE, EVAL_GAIN,
    ZERO, add, subtract, scale, apply, multiply, role_frame, advance,
)

KAPPA = F(1, 8)
CROSS_SCALE = F(1, 4096)


def advance_nonlinear(state, native=None, mechanism=Mechanism(), *,
                      evaluate=False, interaction=True, flatten=False,
                      body_input=ZERO, world_input=ZERO):
    """Use the original core/motor updates and alter only evaluation force.

    Flattening acts on the entire evaluative input, including the interaction.
    The normal linear map is fixed to B; arbitrary old L maps remain available
    through the original, unchanged model rather than this restricted branch.
    """
    if mechanism.evaluation_map != EVALUATIVE:
        raise ValueError('The bilinear branch uses the fixed normal B map')
    projection = COMMON if flatten else IDENTITY
    linear = mechanism._replace(evaluation_map=multiply(EVALUATIVE, projection))
    result = advance(state, native, linear, evaluate=evaluate,
                     body_input=body_input, world_input=world_input)
    if not evaluate or not interaction:
        return result
    sensor = apply(role_frame(state.core.profile),
                   apply(mechanism.world_projection, state.world))
    error = apply(projection, subtract(sensor, state.body))
    correction = (EVAL_GAIN*KAPPA*error[0]*error[1], F(0))
    return result._replace(body=add(result.body, correction))
