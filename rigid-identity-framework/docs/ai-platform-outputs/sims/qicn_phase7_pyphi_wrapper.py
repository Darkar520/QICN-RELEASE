#!/usr/bin/env python
"""PyPhi wrapper for QICN Phase 7 genuine rival planning.

This file intentionally refuses to compute a homemade Phi proxy. If PyPhi is not
installed, the only valid output is EXTERNAL_DEPENDENCY_PENDING.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path


MODEL_ID = "phase7-pyphi-real-wrapper-v1"


def pyphi_available() -> bool:
    return importlib.util.find_spec("pyphi") is not None


def expected_interface() -> dict:
    return {
        "input": "JSON emitted by qicn_phase7_neutral_systems_bank.js --emit-json",
        "required_system_fields": ["id", "n", "transition_table"],
        "transition_table_row": {"state": "binary string length n", "next": "binary string length n"},
        "output_fields": ["system_id", "n", "phi", "state", "status"],
        "intractable_policy": "n > 4 or PyPhi runtime failures are reported as INTRACTABLE_OR_INTERFACE_ERROR",
        "no_proxy_policy": "No phi-like substitute is computed when PyPhi is absent.",
    }


def load_bank(path: str | None) -> dict:
    if path:
        return json.loads(Path(path).read_text(encoding="utf-8"))
    return json.load(sys.stdin)


def transition_probability_matrix(system: dict) -> list:
    rows = sorted(system["transition_table"], key=lambda row: int(row["state"], 2))
    return [[int(bit) for bit in row["next"]] for row in rows]


def compute_phi_for_system(system: dict) -> dict:
    if system["n"] > 4:
        return {
            "system_id": system["id"],
            "n": system["n"],
            "status": "INTRACTABLE",
            "reason": "Phase 7 preflight restricts exact IIT/Phi to tiny systems.",
        }

    import pyphi  # type: ignore

    tpm = transition_probability_matrix(system)
    state = tuple(0 for _ in range(system["n"]))
    try:
        network = pyphi.Network(tpm)
        subsystem = pyphi.Subsystem(network, state)
        sia = pyphi.compute.sia(subsystem)
        return {
            "system_id": system["id"],
            "n": system["n"],
            "state": "".join(str(x) for x in state),
            "phi": float(sia.phi),
            "status": "PYPHI_COMPUTED",
        }
    except Exception as exc:  # pragma: no cover - depends on external PyPhi API/runtime.
        return {
            "system_id": system["id"],
            "n": system["n"],
            "state": "".join(str(x) for x in state),
            "status": "INTRACTABLE_OR_INTERFACE_ERROR",
            "error": f"{type(exc).__name__}: {exc}",
        }


def run(bank: dict) -> dict:
    if not pyphi_available():
        return {
            "artifact": "qicn_phase7_pyphi_wrapper",
            "status": "EXTERNAL_DEPENDENCY_PENDING",
            "model_id": MODEL_ID,
            "pyphi_available": False,
            "expected_interface": expected_interface(),
            "no_phi_proxy_computed": True,
        }

    systems = [system for system in bank.get("systems", []) if system.get("n", 99) <= 4]
    return {
        "artifact": "qicn_phase7_pyphi_wrapper",
        "status": "PYPHI_AVAILABLE_ATTEMPTED_REAL_COMPUTATION",
        "model_id": MODEL_ID,
        "pyphi_available": True,
        "results": [compute_phi_for_system(system) for system in systems],
    }


def self_test() -> dict:
    return {
        "artifact": "qicn_phase7_pyphi_wrapper_self_test",
        "status": "PASS_WITH_EXTERNAL_DEPENDENCY_PENDING" if not pyphi_available() else "PASS_PYPHI_AVAILABLE",
        "model_id": MODEL_ID,
        "pyphi_available": pyphi_available(),
        "expected_interface": expected_interface(),
        "no_phi_proxy_computed": True,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--input")
    args = parser.parse_args()
    if args.self_test:
        result = self_test()
        print(json.dumps(result, indent=2, sort_keys=True))
        return 0
    result = run(load_bank(args.input))
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
