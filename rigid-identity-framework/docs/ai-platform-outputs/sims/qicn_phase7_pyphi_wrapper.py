#!/usr/bin/env python
"""PyPhi wrapper for QICN Phase 7 genuine rival profiling.

This file intentionally refuses to compute a homemade Phi proxy. If PyPhi is not
installed, the only valid output is EXTERNAL_DEPENDENCY_PENDING. If PyPhi is
installed, Phi is computed state-by-state on tiny Boolean systems.
"""

from __future__ import annotations

import argparse
import collections
import collections.abc
import importlib.util
import json
import os
import statistics
import sys
from pathlib import Path


MODEL_ID = "phase7-pyphi-real-state-sweep-wrapper-v3"
DEFAULT_MAX_N = 3
PHI_DEGENERATE = "PHI_DEGENERATE_PERMUTATION_DYNAMICS"
PHI_NONDEGENERATE = "PHI_NONDEGENERATE_OR_INCONCLUSIVE"


def install_py312_compatibility_shim() -> None:
    """Patch ABC aliases used by PyPhi 1.2.0 on modern Python."""
    for name in ("Iterable", "Sequence", "Mapping", "MutableMapping", "Set", "MutableSet"):
        if not hasattr(collections, name):
            setattr(collections, name, getattr(collections.abc, name))


def pyphi_available() -> bool:
    return importlib.util.find_spec("pyphi") is not None


def expected_interface() -> dict:
    return {
        "input": "JSON emitted by qicn_phase7_neutral_systems_bank_v2.js --emit-json",
        "required_system_fields": ["id", "n", "transition_table"],
        "transition_table_row": {"state": "binary string length n", "next": "binary string length n"},
        "output_fields": [
            "system_id",
            "n",
            "phi_distribution",
            "state_results",
            "phi_constant",
            "state_map_is_permutation",
            "has_self_loops",
            "phi_degeneracy",
            "status",
        ],
        "intractable_policy": f"n > max_n defaults to INTRACTABLE; default max_n={DEFAULT_MAX_N}",
        "no_proxy_policy": "No phi-like substitute is computed when PyPhi is absent.",
    }


def load_bank(path: str | None) -> dict:
    try:
        if path:
            text = Path(path).read_text(encoding="utf-8")
        else:
            text = sys.stdin.buffer.read().decode("utf-8")
        if text.startswith("\ufeff"):
            raise ValueError("input JSON must be UTF-8 without BOM")
        return json.loads(text)
    except UnicodeDecodeError as exc:
        raise SystemExit(f"UTF-8 decode error while reading input JSON: {exc}") from exc
    except json.JSONDecodeError as exc:
        raise SystemExit(f"JSON parse error while reading input bank: {exc}") from exc
    except OSError as exc:
        raise SystemExit(f"I/O error while reading input bank: {exc}") from exc


def transition_probability_matrix(system: dict) -> list:
    rows = sorted(system["transition_table"], key=lambda row: little_endian_index(row["state"]))
    return [[int(bit) for bit in row["next"]] for row in rows]


def connectivity_matrix(system: dict) -> list[list[int]]:
    n = system["n"]
    cm = [[0 for _ in range(n)] for _ in range(n)]
    for src, dst in system.get("edges", []):
        cm[int(src)][int(dst)] = 1
    return cm


def little_endian_index(state: str) -> int:
    return sum(int(bit) * (2 ** i) for i, bit in enumerate(state))


def import_configured_pyphi():
    os.environ["PYPHI_WELCOME_OFF"] = "yes"
    install_py312_compatibility_shim()
    import pyphi  # type: ignore

    pyphi.config.PARALLEL_CONCEPT_EVALUATION = False
    pyphi.config.PARALLEL_CUT_EVALUATION = False
    pyphi.config.PARALLEL_COMPLEX_EVALUATION = False
    pyphi.config.NUMBER_OF_CORES = 1
    pyphi.config.PROGRESS_BARS = False
    pyphi.config.CACHE_SIAS = False
    pyphi.config.CACHE_REPERTOIRES = True
    pyphi.config.CACHE_POTENTIAL_PURVIEWS = True
    pyphi.config.VALIDATE_SUBSYSTEM_STATES = False
    cache_dir = Path(".venv-phase7") / "pyphi_cache"
    pyphi.config.FS_CACHE_DIRECTORY = str(cache_dir)
    return pyphi


def state_tuple(state: str) -> tuple[int, ...]:
    return tuple(int(bit) for bit in state)


def percentile(values: list[float], p: float) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    if len(ordered) == 1:
        return ordered[0]
    rank = (len(ordered) - 1) * p
    lower = int(rank)
    upper = min(lower + 1, len(ordered) - 1)
    weight = rank - lower
    return ordered[lower] * (1 - weight) + ordered[upper] * weight


def summarize(values: list[float]) -> dict:
    if not values:
        return {
            "count": 0,
            "min": None,
            "median": None,
            "max": None,
            "mean": None,
        }
    return {
        "count": len(values),
        "min": round(min(values), 8),
        "median": round(statistics.median(values), 8),
        "max": round(max(values), 8),
        "mean": round(statistics.mean(values), 8),
        "p25": round(percentile(values, 0.25), 8),
        "p75": round(percentile(values, 0.75), 8),
    }


def expected_states(n: int) -> list[str]:
    return [format(index, f"0{n}b") for index in range(2 ** n)]


def transition_map(system: dict) -> dict[str, str]:
    return {str(row["state"]): str(row["next"]) for row in system["transition_table"]}


def state_map_is_permutation(system: dict) -> bool:
    n = int(system["n"])
    expected = expected_states(n)
    mapping = transition_map(system)
    if sorted(mapping.keys()) != expected:
        return False
    return sorted(mapping.values()) == expected


def node_self_depends(system: dict, node: int) -> bool:
    n = int(system["n"])
    mapping = transition_map(system)
    for state in expected_states(n):
        flipped = list(state)
        flipped[node] = "1" if state[node] == "0" else "0"
        other = "".join(flipped)
        if other not in mapping or state not in mapping:
            return False
        if mapping[state][node] != mapping[other][node]:
            return True
    return False


def has_self_loops(system: dict) -> bool:
    return any(node_self_depends(system, node) for node in range(int(system["n"])))


def annotate_phi_degeneracy(system: dict, phi_distribution: dict) -> dict:
    min_phi = phi_distribution.get("min")
    max_phi = phi_distribution.get("max")
    phi_constant = (
        min_phi is not None
        and max_phi is not None
        and abs(float(max_phi) - float(min_phi)) <= 1e-12
    )
    permutation = state_map_is_permutation(system)
    self_loops = has_self_loops(system)
    degeneracy = PHI_DEGENERATE if phi_constant and permutation and not self_loops else PHI_NONDEGENERATE
    return {
        "phi_constant": phi_constant,
        "state_map_is_permutation": permutation,
        "has_self_loops": self_loops,
        "phi_degeneracy": degeneracy,
    }


def compute_phi_for_system(system: dict, pyphi, max_n: int) -> dict:
    if system["n"] > max_n:
        return {
            "system_id": system["id"],
            "family": system.get("family"),
            "n": system["n"],
            "status": "INTRACTABLE",
            "reason": f"n={system['n']} exceeds observed/declared max_n={max_n} for exact PyPhi state sweep in this phase.",
        }

    tpm = transition_probability_matrix(system)
    try:
        network = pyphi.Network(tpm, cm=connectivity_matrix(system))
        state_results = []
        for row in sorted(system["transition_table"], key=lambda item: int(item["state"], 2)):
            state = state_tuple(row["state"])
            subsystem = pyphi.Subsystem(network, state)
            sia = pyphi.compute.sia(subsystem)
            state_results.append({
                "state": row["state"],
                "phi": round(float(sia.phi), 8),
                "status": "PYPHI_COMPUTED",
            })
        phis = [result["phi"] for result in state_results]
        phi_distribution = summarize(phis)
        return {
            "system_id": system["id"],
            "family": system.get("family"),
            "n": system["n"],
            "state_count": len(state_results),
            "phi_distribution": phi_distribution,
            "state_results": state_results,
            **annotate_phi_degeneracy(system, phi_distribution),
            "status": "PYPHI_STATE_SWEEP_COMPUTED",
        }
    except Exception as exc:  # pragma: no cover - depends on external PyPhi API/runtime.
        return {
            "system_id": system["id"],
            "family": system.get("family"),
            "n": system["n"],
            "status": "INTRACTABLE_OR_INTERFACE_ERROR",
            "error": f"{type(exc).__name__}: {exc}",
        }


def run(bank: dict, max_n: int = DEFAULT_MAX_N) -> dict:
    if not pyphi_available():
        return {
            "artifact": "qicn_phase7_pyphi_wrapper",
            "status": "EXTERNAL_DEPENDENCY_PENDING",
            "model_id": MODEL_ID,
            "pyphi_available": False,
            "expected_interface": expected_interface(),
            "no_phi_proxy_computed": True,
        }

    pyphi = import_configured_pyphi()
    systems = bank.get("systems", [])
    results = [compute_phi_for_system(system, pyphi, max_n) for system in systems]
    return {
        "artifact": "qicn_phase7_pyphi_wrapper",
        "status": "PYPHI_AVAILABLE_REAL_STATE_SWEEP_ATTEMPTED",
        "model_id": MODEL_ID,
        "pyphi_available": True,
        "pyphi_version": getattr(pyphi, "__version__", "unknown"),
        "max_n": max_n,
        "results": results,
    }


def self_test() -> dict:
    if not pyphi_available():
        return {
            "artifact": "qicn_phase7_pyphi_wrapper_self_test",
            "status": "PASS_WITH_EXTERNAL_DEPENDENCY_PENDING",
            "model_id": MODEL_ID,
            "pyphi_available": False,
            "expected_interface": expected_interface(),
            "no_phi_proxy_computed": True,
        }

    pyphi = import_configured_pyphi()
    def transition_table(n: int, next_fn) -> list[dict[str, str]]:
        rows = []
        for state in expected_states(n):
            rows.append({"state": state, "next": next_fn(state)})
        return rows

    product = {
        "id": "selftest_product_decoupled_n3",
        "family": "product_decoupled_copy",
        "n": 3,
        "edges": [[0, 0], [1, 1], [2, 2]],
        "transition_table": transition_table(3, lambda state: state),
    }
    cycle_ring = {
        "id": "selftest_cycle_ring_copy_n3",
        "family": "cycle_ring_copy",
        "n": 3,
        "edges": [[0, 1], [1, 2], [2, 0]],
        "transition_table": transition_table(3, lambda state: "".join(state[(i - 1 + 3) % 3] for i in range(3))),
    }

    def bank_v2_all_to_all_majority_next(state: str) -> str:
        bits = [int(bit) for bit in state]
        next_bits = []
        for dst in range(3):
            with_self = bits + [bits[dst]]
            next_bits.append("1" if sum(with_self) >= ((len(with_self) + 1) // 2) else "0")
        return "".join(next_bits)

    all_to_all_majority = {
        "id": "selftest_all_to_all_majority_n3",
        "family": "all_to_all_majority",
        "n": 3,
        "edges": [[src, dst] for src in range(3) for dst in range(3)],
        "transition_table": transition_table(3, bank_v2_all_to_all_majority_next),
    }
    product_result = compute_phi_for_system(product, pyphi, max_n=3)
    cycle_result = compute_phi_for_system(cycle_ring, pyphi, max_n=3)
    majority_result = compute_phi_for_system(all_to_all_majority, pyphi, max_n=3)
    official_positive = {
        "status": "NOT_COMPUTED",
        "source": "pyphi.examples.basic_subsystem",
        "phi": None,
    }
    try:
        official_subsystem = pyphi.examples.basic_subsystem()
        official_phi = pyphi.compute.sia(official_subsystem).phi
        official_positive = {
            "status": "PYPHI_OFFICIAL_EXAMPLE_COMPUTED",
            "source": "pyphi.examples.basic_subsystem",
            "state": list(official_subsystem.state),
            "phi": round(float(official_phi), 8),
        }
    except Exception as exc:  # pragma: no cover - external package sanity path.
        official_positive = {
            "status": "PYPHI_OFFICIAL_EXAMPLE_ERROR",
            "source": "pyphi.examples.basic_subsystem",
            "error": f"{type(exc).__name__}: {exc}",
            "phi": None,
        }
    failures = []
    product_max = (product_result.get("phi_distribution") or {}).get("max")
    cycle_distribution = cycle_result.get("phi_distribution") or {}
    official_phi = official_positive.get("phi")
    if product_result["status"] != "PYPHI_STATE_SWEEP_COMPUTED":
        failures.append("product self-test did not compute")
    if cycle_result["status"] != "PYPHI_STATE_SWEEP_COMPUTED":
        failures.append("cycle-ring self-test did not compute")
    if majority_result["status"] != "PYPHI_STATE_SWEEP_COMPUTED":
        failures.append("all-to-all-majority self-test did not compute")
    if product_max is not None and product_max > 1e-6:
        failures.append(f"product self-test max phi expected near zero, got {product_max}")
    if product_result.get("phi_degeneracy") != PHI_NONDEGENERATE:
        failures.append(f"product self-test expected {PHI_NONDEGENERATE}, got {product_result.get('phi_degeneracy')}")
    if cycle_result.get("phi_degeneracy") != PHI_DEGENERATE:
        failures.append(f"cycle-ring self-test expected {PHI_DEGENERATE}, got {cycle_result.get('phi_degeneracy')}")
    if cycle_distribution.get("min") != cycle_distribution.get("max"):
        failures.append(f"cycle-ring self-test expected constant phi, got {cycle_distribution}")
    if majority_result.get("phi_degeneracy") != PHI_NONDEGENERATE:
        failures.append(f"all-to-all-majority self-test expected {PHI_NONDEGENERATE}, got {majority_result.get('phi_degeneracy')}")
    if official_phi is None or official_phi <= 0:
        failures.append(f"official PyPhi positive example expected positive phi, got {official_phi}")
    return {
        "artifact": "qicn_phase7_pyphi_wrapper_self_test",
        "status": "PASS" if not failures else "FAIL",
        "model_id": MODEL_ID,
        "pyphi_available": True,
        "pyphi_version": getattr(pyphi, "__version__", "unknown"),
        "expected_interface": expected_interface(),
        "no_phi_proxy_computed": True,
        "sanity": {
            "product_decoupled": product_result,
            "cycle_ring_copy": cycle_result,
            "all_to_all_majority": majority_result,
            "official_positive_example": official_positive,
        },
        "failures": failures,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--input")
    parser.add_argument("--max-n", type=int, default=DEFAULT_MAX_N)
    args = parser.parse_args()
    if args.self_test:
        result = self_test()
        print(json.dumps(result, indent=2, sort_keys=True))
        return 0 if result["status"].startswith("PASS") else 1
    result = run(load_bank(args.input), max_n=args.max_n)
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
