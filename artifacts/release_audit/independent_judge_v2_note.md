# Independent Judge v2

`independent_judge_v2.py` does not import generator code paths. It consumes only frozen case artifacts, a frozen manifest, a frozen pair manifest, and frozen threshold profiles. The replica run reverses entry order and changes `PYTHONHASHSEED` to reduce accidental dependence on one execution ordering.
