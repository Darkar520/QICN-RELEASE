# AIC Parameter Derivation Protocol v25

Governance boundary: this protocol does not certify external support, consciousness, phenomenality, identity transfer, bridge-burden closure, or human mathematical review.

## Purpose

The v24 audit correctly notes that using `k_QICN = 6` as a naked number is not a valid AIC parameter count. v25 requires that every counted degree of freedom be declared as a free parameter with a preregistration binding.

## Rule P1: no naked parameter counts

Manifests must not use `qicn_parameter_count` or `rival_parameter_count`. They must use:

```json
"model_parameters": {
  "qicn_free_parameters": [
    {"parameter_id": "...", "free": true, "preregistration_binding": "..."}
  ],
  "rival_free_parameters": [
    {"parameter_id": "...", "free": true, "preregistration_binding": "..."}
  ]
}
```

The runner derives `k` as the length of each declared free-parameter array.

## Rule P2: frozen/non-free quantities do not count as fitted parameters

Quantities fixed by a preregistered protocol, instrument calibration, or external physical specification must be marked frozen outside the AIC free-parameter list. If a value is adjusted after outcome inspection, the run is invalid.

## Rule P3: complexity accounting is local to the statistical model

The AIC parameter count is not a count of philosophical invariants. It is the number of free statistical degrees used by the finite prediction map in that specific adjudication manifest.

## Rule P4: rival parity

Every rival model must receive the same accounting treatment. If QICN uses a frozen feature map plus six fitted weights, a rival using a frozen feature map plus two fitted weights counts as two.

## Rule P5: claim boundary

A lower AIC under this protocol supports only finite predictive adequacy relative to declared rivals and noise assumptions. It does not prove inverse-limit identity, ontological mass, consciousness, or bridge closure.
