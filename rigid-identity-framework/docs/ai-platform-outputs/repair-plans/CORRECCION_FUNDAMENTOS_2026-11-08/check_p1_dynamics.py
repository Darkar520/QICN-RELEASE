"""Exact finite controls for P1; universal proofs are in BaseCore section 11."""
from fractions import Fraction as F
from itertools import product


def step(bits):
    return (0, *(1 - bit for bit in bits[:-1])) if bits else ()


def ternary(bits):
    return sum((F(2 * bit, 3**j) for j, bit in enumerate(bits, 1)), F(0))


def bit_distance(x, y):
    first = next((j for j, (a, b) in enumerate(zip(x, y), 1) if a != b), None)
    return F(1, 3**first) if first else F(0)


def rotate(angle, shift):
    return (angle + shift) % 1


def circle_distance(x, y):
    delta = (x - y) % 1
    return min(delta, 1 - delta)


def main():
    checks = 0


    def check(condition):
        nonlocal checks
        assert condition
        checks += 1


    for t in range(8):
        sequences = list(product((0, 1), repeat=t))
        fixed = tuple(j % 2 for j in range(t))
        check([bits for bits in sequences if step(bits) == bits] == [fixed])
        for bits in sequences:
            check(step(bits)[:-1] == step(bits[:-1]))
            reached = bits
            for _ in range(t):
                reached = step(reached)
            check(reached == fixed)
            for other in sequences:
                check(bit_distance(step(bits), step(other)) <= bit_distance(bits, other) / 3)
            check(F(0) <= F(1, 4) - ternary(fixed) <= F(1, 3**t))
        if t >= 2:
            check(bit_distance(step(sequences[0]), step((1, *sequences[0][1:]))) == F(1, 9))
            check(step(fixed) != (0, *fixed[:-1]))
        cell_length = F(4, 9**(t + 1))
        check(cell_length / (1 - F(1, 9)) == F(1, 2 * 9**t))
        check((8 * 9**(t + 1)) * cell_length == 32)

    for k, shift, u, t, branch in product(
        range(4), (F(0), F(1, 7), F(2, 5)), (F(0), F(3, 4)), range(6), (0, 1)
    ):
        # Compare the actual successor-to-current bond, including wraparound.
        phase = rotate(u, branch * shift if t > k else 0)
        successor_phase = rotate(u, branch * shift if t + 1 > k else 0)
        bonded = rotate(successor_phase, -branch * shift if t == k else 0)
        check(phase == bonded)
        if branch:
            transported = rotate(u, shift if t > k else 0)
            check(transported == phase)
            if shift and t == k:
                check(rotate(u, -shift) != phase)  # omitting transport breaks the bond
            check(F(1, 3**(k + 1)) * circle_distance(u, rotate(u, shift))
                  == F(1, 3**(k + 1)) * shift)

    first, second = F(4, 9), F(4, 81)
    check(first * second / (first + second) == F(2, 45))
    check(F(4, 81) / (1 - F(1, 9)) == F(1, 18))  # depth-zero sharp tail squared
    check(F(2, 9) / (1 - F(1, 9)) == F(1, 4))  # alternating equilibrium vs null
    check(bit_distance((0,), (1,)) > 0)  # frozen-bit negative control
    print(f"{checks} exact finite controls passed")


if __name__ == "__main__":
    main()
