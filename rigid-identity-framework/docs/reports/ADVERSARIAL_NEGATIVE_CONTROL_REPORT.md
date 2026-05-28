# Adversarial Negative Control Report

Date: 2026-05-27T22:59:40.499Z

Status: adversarial_negative_controls_pass
Support blocked: false

## Boundary

Internal synthetic adversarial negative-control search only. Passing does not imply empirical validation, bridge admissibility, consciousness, phenomenality, or external support. Failure would block PRED-EXT-01 support pending freeze update or theory revision.

## Layer separation

- Ontology: finite-state synthetic negative-control families only.
- Mathematical model: distributional and trace-shuffle controls over declared alphabet.
- Implementation: candidate search maximizes support-like score within each negative family.
- Language/documentation: a pass is internal harness hygiene, not validation.
- Interpretation: a failure blocks internal support pending revision; a pass does not upgrade external claims.
- Internal evidence: see per-family best candidates below.
- External evidence: none.

## Best candidates by seed/family

| Seed | Family | Best candidate | Support rule | rho | Margin |
|---|---|---|---:|---:|---:|
| cleanroom_seed_001 | complexity-only | complexity-only-2 | false | 1.000000 | -1.000000 |
| cleanroom_seed_001 | memory-only | memory-only-3 | false | 1.846154 | -0.153846 |
| cleanroom_seed_001 | narrative-only | narrative-only-0 | false | 0.650000 | -1.350000 |
| cleanroom_seed_001 | entropy-matched | entropy-matched-2 | false | 1.772727 | -0.227273 |
| cleanroom_seed_001 | targeted-frequency-matched | targeted-frequency-matched-0 | false | 1.254545 | -0.745455 |
| cleanroom_seed_001 | role-shuffled | role-shuffled-0 | false | 0.075000 | -1.925000 |
| cleanroom_seed_001 | perturbation-shuffled | perturbation-shuffled-1 | false | 1.333333 | -0.666667 |
| cleanroom_seed_001 | transition-preserving-shuffled | transition-preserving-shuffled-0 | false | 1.000000 | -1.000000 |
| cleanroom_holdout_002 | complexity-only | complexity-only-1 | false | 1.020833 | -0.979167 |
| cleanroom_holdout_002 | memory-only | memory-only-1 | false | 1.214286 | -0.785714 |
| cleanroom_holdout_002 | narrative-only | narrative-only-0 | false | 0.933333 | -1.066667 |
| cleanroom_holdout_002 | entropy-matched | entropy-matched-0 | false | 1.238095 | -0.761905 |
| cleanroom_holdout_002 | targeted-frequency-matched | targeted-frequency-matched-2 | false | 1.083333 | -0.916667 |
| cleanroom_holdout_002 | role-shuffled | role-shuffled-0 | false | 0.152941 | -1.847059 |
| cleanroom_holdout_002 | perturbation-shuffled | perturbation-shuffled-0 | false | 1.254902 | -0.745098 |
| cleanroom_holdout_002 | transition-preserving-shuffled | transition-preserving-shuffled-0 | false | 1.000000 | -1.000000 |

## Decision record

```json
{
  "schema_version": "1.0.0",
  "prediction_id": "PRED-EXT-01",
  "execution_class": "internal_synthetic_adversarial_negative_control_search",
  "status": "adversarial_negative_controls_pass",
  "support_blocked": false,
  "freeze_id": "pred-ext-01-cleanroom-synthetic-freeze-v3",
  "seeds": [
    "cleanroom_seed_001",
    "cleanroom_holdout_002"
  ],
  "seed_results": {
    "cleanroom_seed_001": {
      "seed": "cleanroom_seed_001",
      "families_tested": 8,
      "family_results": {
        "complexity-only": {
          "family": "complexity-only",
          "candidate_count": 4,
          "best_candidate": {
            "family": "complexity-only",
            "candidate_id": "complexity-only-2",
            "scenario_salt": "adversarial-complexity-only-2",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1,
            "margin_to_threshold": -1,
            "metrics": {
              "tv_targeted": 0.16049382716049382,
              "tv_sham": 0.1111111111111111,
              "tv_off_target": 0.16049382716049382,
              "control_max": 0.16049382716049382,
              "rho_selective": 1,
              "rival_tv_loss": 0.14332010852212437,
              "complexity_penalty": 0.0008333333333333334,
              "penalized_rival_loss": 0.1441534418554577,
              "rival_parameter_count": 16,
              "rival_training_entropy_bits": 1.831646681802639,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
              "strongest_rival_memory_depth": 1,
              "rival_suite_min_penalized_loss": 0.1441534418554577,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "c90f99e50f6702e4cd75fff4b3602914fa9af0a99b209b2cf55cc5a990318b0d"
          },
          "candidates": [
            {
              "family": "complexity-only",
              "candidate_id": "complexity-only-2",
              "scenario_salt": "adversarial-complexity-only-2",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1,
              "margin_to_threshold": -1,
              "metrics": {
                "tv_targeted": 0.16049382716049382,
                "tv_sham": 0.1111111111111111,
                "tv_off_target": 0.16049382716049382,
                "control_max": 0.16049382716049382,
                "rho_selective": 1,
                "rival_tv_loss": 0.14332010852212437,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.1441534418554577,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.831646681802639,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.1441534418554577,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "c90f99e50f6702e4cd75fff4b3602914fa9af0a99b209b2cf55cc5a990318b0d"
            },
            {
              "family": "complexity-only",
              "candidate_id": "complexity-only-3",
              "scenario_salt": "adversarial-complexity-only-3",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.9243697478991598,
              "margin_to_threshold": -1.07563025210084,
              "metrics": {
                "tv_targeted": 0.4526748971193416,
                "tv_sham": 0.4238683127572016,
                "tv_off_target": 0.4897119341563786,
                "control_max": 0.4897119341563786,
                "rho_selective": 0.9243697478991598,
                "rival_tv_loss": 0.39079956597026805,
                "complexity_penalty": 0.011041666666666667,
                "penalized_rival_loss": 0.4018412326369347,
                "rival_parameter_count": 212,
                "rival_training_entropy_bits": 1.8023104929737988,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.4018412326369347,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "7667cbc143ae84204456d0777abce1a167eb50c3f7fbbc7def5a277b5f02c901"
            },
            {
              "family": "complexity-only",
              "candidate_id": "complexity-only-1",
              "scenario_salt": "adversarial-complexity-only-1",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.896551724137931,
              "margin_to_threshold": -1.103448275862069,
              "metrics": {
                "tv_targeted": 0.2139917695473251,
                "tv_sham": 0.1934156378600823,
                "tv_off_target": 0.23868312757201646,
                "control_max": 0.23868312757201646,
                "rho_selective": 0.896551724137931,
                "rival_tv_loss": 0.14396494477546964,
                "complexity_penalty": 0.009791666666666667,
                "penalized_rival_loss": 0.15375661144213632,
                "rival_parameter_count": 188,
                "rival_training_entropy_bits": 1.7280718122218068,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.15375661144213632,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "03f3c57a45affb32185a74a7ab8f14e13e29e3a3de7a6822868c3b48f70660eb"
            },
            {
              "family": "complexity-only",
              "candidate_id": "complexity-only-0",
              "scenario_salt": "adversarial-complexity-only-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.8867924528301887,
              "margin_to_threshold": -1.1132075471698113,
              "metrics": {
                "tv_targeted": 0.1934156378600823,
                "tv_sham": 0.21810699588477367,
                "tv_off_target": 0.18930041152263377,
                "control_max": 0.21810699588477367,
                "rho_selective": 0.8867924528301887,
                "rival_tv_loss": 0.1039139584405032,
                "complexity_penalty": 0.011875,
                "penalized_rival_loss": 0.1157889584405032,
                "rival_parameter_count": 228,
                "rival_training_entropy_bits": 1.875795449534479,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.1157889584405032,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "cc23fdf99e8bf3d9047470849b9f898491d1cf5cb21611b96b99ce7b5009ea90"
            }
          ]
        },
        "memory-only": {
          "family": "memory-only",
          "candidate_count": 4,
          "best_candidate": {
            "family": "memory-only",
            "candidate_id": "memory-only-3",
            "scenario_salt": "adversarial-memory-only-3",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1.8461538461538465,
            "margin_to_threshold": -0.15384615384615352,
            "metrics": {
              "tv_targeted": 0.09876543209876544,
              "tv_sham": 0.037037037037037,
              "tv_off_target": 0.05349794238683127,
              "control_max": 0.05349794238683127,
              "rho_selective": 1.8461538461538465,
              "rival_tv_loss": 0.12857142857142842,
              "complexity_penalty": 0.0008333333333333334,
              "penalized_rival_loss": 0.12940476190476174,
              "rival_parameter_count": 16,
              "rival_training_entropy_bits": 1.7007943394070946,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
              "strongest_rival_memory_depth": 1,
              "rival_suite_min_penalized_loss": 0.12940476190476174,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "c320edf25fd351a19afd7546f75549530c97971c20e4105b70fea29a7272fc8f"
          },
          "candidates": [
            {
              "family": "memory-only",
              "candidate_id": "memory-only-3",
              "scenario_salt": "adversarial-memory-only-3",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.8461538461538465,
              "margin_to_threshold": -0.15384615384615352,
              "metrics": {
                "tv_targeted": 0.09876543209876544,
                "tv_sham": 0.037037037037037,
                "tv_off_target": 0.05349794238683127,
                "control_max": 0.05349794238683127,
                "rho_selective": 1.8461538461538465,
                "rival_tv_loss": 0.12857142857142842,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.12940476190476174,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.7007943394070946,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.12940476190476174,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "c320edf25fd351a19afd7546f75549530c97971c20e4105b70fea29a7272fc8f"
            },
            {
              "family": "memory-only",
              "candidate_id": "memory-only-2",
              "scenario_salt": "adversarial-memory-only-2",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.499999999999999,
              "margin_to_threshold": -0.5000000000000011,
              "metrics": {
                "tv_targeted": 0.07407407407407406,
                "tv_sham": 0.04938271604938274,
                "tv_off_target": 0.04938271604938271,
                "control_max": 0.04938271604938274,
                "rho_selective": 1.499999999999999,
                "rival_tv_loss": 0.07634910724215424,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.07718244057548758,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.9060356372472929,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.07718244057548758,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "5422a67d663050710c14e4c624f54e9c3c07577a424df3ccfac9190e3418827a"
            },
            {
              "family": "memory-only",
              "candidate_id": "memory-only-0",
              "scenario_salt": "adversarial-memory-only-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.9090909090909092,
              "margin_to_threshold": -1.0909090909090908,
              "metrics": {
                "tv_targeted": 0.04115226337448559,
                "tv_sham": 0.045267489711934145,
                "tv_off_target": 0.04526748971193413,
                "control_max": 0.045267489711934145,
                "rho_selective": 0.9090909090909092,
                "rival_tv_loss": 0.028943173483248,
                "complexity_penalty": 0.0033333333333333335,
                "penalized_rival_loss": 0.032276506816581334,
                "rival_parameter_count": 64,
                "rival_training_entropy_bits": 1.9937102840270842,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth2",
                "strongest_rival_memory_depth": 2,
                "rival_suite_min_penalized_loss": 0.032276506816581334,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "3371f82ed2908b62be954053384a25283646814d383090320e1242873351922e"
            },
            {
              "family": "memory-only",
              "candidate_id": "memory-only-1",
              "scenario_salt": "adversarial-memory-only-1",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.3000000000000005,
              "margin_to_threshold": -1.6999999999999995,
              "metrics": {
                "tv_targeted": 0.012345679012345692,
                "tv_sham": 0.041152263374485576,
                "tv_off_target": 0.032921810699588494,
                "control_max": 0.041152263374485576,
                "rho_selective": 0.3000000000000005,
                "rival_tv_loss": 0.015689395663325487,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.01652272899665882,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.9767273645730639,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.01652272899665882,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "eeaf78995935eb9950361c3cdf948bb05a9ff47f6be2ffc4d6c150fe7489384d"
            }
          ]
        },
        "narrative-only": {
          "family": "narrative-only",
          "candidate_count": 1,
          "best_candidate": {
            "family": "narrative-only",
            "candidate_id": "narrative-only-0",
            "scenario_salt": "adversarial-narrative-only-0",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 0.6500000000000004,
            "margin_to_threshold": -1.3499999999999996,
            "metrics": {
              "tv_targeted": 0.053497942386831296,
              "tv_sham": 0.08230452674897118,
              "tv_off_target": 0.05761316872427985,
              "control_max": 0.08230452674897118,
              "rho_selective": 0.6500000000000004,
              "rival_tv_loss": 0.051651452897162546,
              "complexity_penalty": 0.0008333333333333334,
              "penalized_rival_loss": 0.05248478623049588,
              "rival_parameter_count": 16,
              "rival_training_entropy_bits": 1.8598716669676643,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
              "strongest_rival_memory_depth": 1,
              "rival_suite_min_penalized_loss": 0.05248478623049588,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "f40707d4da84cf6d59d62a701b0eab723bea16ae6defb72754b48a9a63521aae"
          },
          "candidates": [
            {
              "family": "narrative-only",
              "candidate_id": "narrative-only-0",
              "scenario_salt": "adversarial-narrative-only-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.6500000000000004,
              "margin_to_threshold": -1.3499999999999996,
              "metrics": {
                "tv_targeted": 0.053497942386831296,
                "tv_sham": 0.08230452674897118,
                "tv_off_target": 0.05761316872427985,
                "control_max": 0.08230452674897118,
                "rho_selective": 0.6500000000000004,
                "rival_tv_loss": 0.051651452897162546,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.05248478623049588,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.8598716669676643,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.05248478623049588,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "f40707d4da84cf6d59d62a701b0eab723bea16ae6defb72754b48a9a63521aae"
            }
          ]
        },
        "entropy-matched": {
          "family": "entropy-matched",
          "candidate_count": 4,
          "best_candidate": {
            "family": "entropy-matched",
            "candidate_id": "entropy-matched-2",
            "scenario_salt": "adversarial-entropy-matched-2",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1.772727272727273,
            "margin_to_threshold": -0.22727272727272707,
            "metrics": {
              "tv_targeted": 0.16049382716049387,
              "tv_sham": 0.09053497942386833,
              "tv_off_target": 0.08641975308641976,
              "control_max": 0.09053497942386833,
              "rho_selective": 1.772727272727273,
              "rival_tv_loss": 0.09545957388084093,
              "complexity_penalty": 0.011666666666666667,
              "penalized_rival_loss": 0.1071262405475076,
              "rival_parameter_count": 224,
              "rival_training_entropy_bits": 1.8969414636258648,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
              "strongest_rival_memory_depth": 3,
              "rival_suite_min_penalized_loss": 0.1071262405475076,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "c3c01fd2cd8dd569bd73e96b7e5a1ad34280021c5348ec53ff2ccb5d22511094"
          },
          "candidates": [
            {
              "family": "entropy-matched",
              "candidate_id": "entropy-matched-2",
              "scenario_salt": "adversarial-entropy-matched-2",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.772727272727273,
              "margin_to_threshold": -0.22727272727272707,
              "metrics": {
                "tv_targeted": 0.16049382716049387,
                "tv_sham": 0.09053497942386833,
                "tv_off_target": 0.08641975308641976,
                "control_max": 0.09053497942386833,
                "rho_selective": 1.772727272727273,
                "rival_tv_loss": 0.09545957388084093,
                "complexity_penalty": 0.011666666666666667,
                "penalized_rival_loss": 0.1071262405475076,
                "rival_parameter_count": 224,
                "rival_training_entropy_bits": 1.8969414636258648,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.1071262405475076,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "c3c01fd2cd8dd569bd73e96b7e5a1ad34280021c5348ec53ff2ccb5d22511094"
            },
            {
              "family": "entropy-matched",
              "candidate_id": "entropy-matched-0",
              "scenario_salt": "adversarial-entropy-matched-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.1555555555555554,
              "margin_to_threshold": -0.8444444444444446,
              "metrics": {
                "tv_targeted": 0.21399176954732507,
                "tv_sham": 0.18518518518518517,
                "tv_off_target": 0.16049382716049376,
                "control_max": 0.18518518518518517,
                "rho_selective": 1.1555555555555554,
                "rival_tv_loss": 0.1206771639633135,
                "complexity_penalty": 0.011458333333333334,
                "penalized_rival_loss": 0.13213549729664684,
                "rival_parameter_count": 220,
                "rival_training_entropy_bits": 1.8760324760523175,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.13213549729664684,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "1099a01d692cc0fe80775e6f75e8cdc21d85fffac81c53b3423f5dfbbbf8adf7"
            },
            {
              "family": "entropy-matched",
              "candidate_id": "entropy-matched-3",
              "scenario_salt": "adversarial-entropy-matched-3",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.9065420560747662,
              "margin_to_threshold": -1.0934579439252339,
              "metrics": {
                "tv_targeted": 0.39917695473251025,
                "tv_sham": 0.42386831275720166,
                "tv_off_target": 0.4403292181069959,
                "control_max": 0.4403292181069959,
                "rho_selective": 0.9065420560747662,
                "rival_tv_loss": 0.3352031004888296,
                "complexity_penalty": 0.011666666666666667,
                "penalized_rival_loss": 0.3468697671554963,
                "rival_parameter_count": 224,
                "rival_training_entropy_bits": 1.8708911355738547,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.3468697671554963,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "6e277f4d9ee7227568fed57638222b0a273b2dd256627ba67080b3089a114085"
            },
            {
              "family": "entropy-matched",
              "candidate_id": "entropy-matched-1",
              "scenario_salt": "adversarial-entropy-matched-1",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.8999999999999998,
              "margin_to_threshold": -1.1,
              "metrics": {
                "tv_targeted": 0.14814814814814814,
                "tv_sham": 0.16460905349794241,
                "tv_off_target": 0.14814814814814817,
                "control_max": 0.16460905349794241,
                "rho_selective": 0.8999999999999998,
                "rival_tv_loss": 0.10601727685932544,
                "complexity_penalty": 0.011041666666666667,
                "penalized_rival_loss": 0.11705894352599211,
                "rival_parameter_count": 212,
                "rival_training_entropy_bits": 1.835270790464924,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.11705894352599211,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "80d378ec1c5b19b39fcfbad7283117c94220ffcd0e8611ad743fca116e5fd7bc"
            }
          ]
        },
        "targeted-frequency-matched": {
          "family": "targeted-frequency-matched",
          "candidate_count": 4,
          "best_candidate": {
            "family": "targeted-frequency-matched",
            "candidate_id": "targeted-frequency-matched-0",
            "scenario_salt": "adversarial-targeted-frequency-matched-0",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1.2545454545454546,
            "margin_to_threshold": -0.7454545454545454,
            "metrics": {
              "tv_targeted": 0.28395061728395066,
              "tv_sham": 0.2263374485596708,
              "tv_off_target": 0.20987654320987656,
              "control_max": 0.2263374485596708,
              "rho_selective": 1.2545454545454546,
              "rival_tv_loss": 0.16722864725578962,
              "complexity_penalty": 0.011041666666666667,
              "penalized_rival_loss": 0.1782703139224563,
              "rival_parameter_count": 212,
              "rival_training_entropy_bits": 1.8334639233366632,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
              "strongest_rival_memory_depth": 3,
              "rival_suite_min_penalized_loss": 0.1782703139224563,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "ca3ed2fffcfdb0c82a926b08643053919244cdfd6d440f6d3c8190e0d80185e2"
          },
          "candidates": [
            {
              "family": "targeted-frequency-matched",
              "candidate_id": "targeted-frequency-matched-0",
              "scenario_salt": "adversarial-targeted-frequency-matched-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.2545454545454546,
              "margin_to_threshold": -0.7454545454545454,
              "metrics": {
                "tv_targeted": 0.28395061728395066,
                "tv_sham": 0.2263374485596708,
                "tv_off_target": 0.20987654320987656,
                "control_max": 0.2263374485596708,
                "rho_selective": 1.2545454545454546,
                "rival_tv_loss": 0.16722864725578962,
                "complexity_penalty": 0.011041666666666667,
                "penalized_rival_loss": 0.1782703139224563,
                "rival_parameter_count": 212,
                "rival_training_entropy_bits": 1.8334639233366632,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.1782703139224563,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "ca3ed2fffcfdb0c82a926b08643053919244cdfd6d440f6d3c8190e0d80185e2"
            },
            {
              "family": "targeted-frequency-matched",
              "candidate_id": "targeted-frequency-matched-1",
              "scenario_salt": "adversarial-targeted-frequency-matched-1",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.2187500000000004,
              "margin_to_threshold": -0.7812499999999996,
              "metrics": {
                "tv_targeted": 0.16049382716049382,
                "tv_sham": 0.13168724279835387,
                "tv_off_target": 0.12757201646090532,
                "control_max": 0.13168724279835387,
                "rho_selective": 1.2187500000000004,
                "rival_tv_loss": 0.11675324209399017,
                "complexity_penalty": 0.011250000000000001,
                "penalized_rival_loss": 0.12800324209399017,
                "rival_parameter_count": 216,
                "rival_training_entropy_bits": 1.8670196411946705,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.12800324209399017,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "364f6bd06fcbea531d63124ecb6cfd167769d18671ebb117e9e9ac14b4a18972"
            },
            {
              "family": "targeted-frequency-matched",
              "candidate_id": "targeted-frequency-matched-2",
              "scenario_salt": "adversarial-targeted-frequency-matched-2",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.021276595744681,
              "margin_to_threshold": -0.978723404255319,
              "metrics": {
                "tv_targeted": 0.19753086419753085,
                "tv_sham": 0.19341563786008228,
                "tv_off_target": 0.1728395061728395,
                "control_max": 0.19341563786008228,
                "rho_selective": 1.021276595744681,
                "rival_tv_loss": 0.12293216902444831,
                "complexity_penalty": 0.0033333333333333335,
                "penalized_rival_loss": 0.12626550235778164,
                "rival_parameter_count": 64,
                "rival_training_entropy_bits": 1.7649132131937901,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth2",
                "strongest_rival_memory_depth": 2,
                "rival_suite_min_penalized_loss": 0.12626550235778164,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "34c98387306aa3ae29d9fe4d83311f270a9e930f65245cef1f20fb4a85cea5a6"
            },
            {
              "family": "targeted-frequency-matched",
              "candidate_id": "targeted-frequency-matched-3",
              "scenario_salt": "adversarial-targeted-frequency-matched-3",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.9739130434782611,
              "margin_to_threshold": -1.026086956521739,
              "metrics": {
                "tv_targeted": 0.46090534979423875,
                "tv_sham": 0.4732510288065843,
                "tv_off_target": 0.4567901234567901,
                "control_max": 0.4732510288065843,
                "rho_selective": 0.9739130434782611,
                "rival_tv_loss": 0.3620669724405546,
                "complexity_penalty": 0.011250000000000001,
                "penalized_rival_loss": 0.37331697244055456,
                "rival_parameter_count": 216,
                "rival_training_entropy_bits": 1.8154655550846215,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.37331697244055456,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "3e9dccb472592fe887ddbfd9593b3080829667005b00c14d659613f8daf30c85"
            }
          ]
        },
        "role-shuffled": {
          "family": "role-shuffled",
          "candidate_count": 1,
          "best_candidate": {
            "family": "role-shuffled",
            "candidate_id": "role-shuffled-0",
            "scenario_salt": "adversarial-role-shuffled-0",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 0.07500000000000002,
            "margin_to_threshold": -1.925,
            "metrics": {
              "tv_targeted": 0.03703703703703705,
              "tv_sham": 0.4938271604938272,
              "tv_off_target": 0.44855967078189296,
              "control_max": 0.4938271604938272,
              "rho_selective": 0.07500000000000002,
              "rival_tv_loss": 0.02978062260207099,
              "complexity_penalty": 0.0008333333333333334,
              "penalized_rival_loss": 0.03061395593540432,
              "rival_parameter_count": 16,
              "rival_training_entropy_bits": 1.805541104293273,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
              "strongest_rival_memory_depth": 1,
              "rival_suite_min_penalized_loss": 0.03061395593540432,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "124d8adb79f7145cf811517faf0fa91a0170e4097f910aeba740f4a7d02bd67e"
          },
          "candidates": [
            {
              "family": "role-shuffled",
              "candidate_id": "role-shuffled-0",
              "scenario_salt": "adversarial-role-shuffled-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.07500000000000002,
              "margin_to_threshold": -1.925,
              "metrics": {
                "tv_targeted": 0.03703703703703705,
                "tv_sham": 0.4938271604938272,
                "tv_off_target": 0.44855967078189296,
                "control_max": 0.4938271604938272,
                "rho_selective": 0.07500000000000002,
                "rival_tv_loss": 0.02978062260207099,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.03061395593540432,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.805541104293273,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.03061395593540432,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "124d8adb79f7145cf811517faf0fa91a0170e4097f910aeba740f4a7d02bd67e"
            }
          ]
        },
        "perturbation-shuffled": {
          "family": "perturbation-shuffled",
          "candidate_count": 4,
          "best_candidate": {
            "family": "perturbation-shuffled",
            "candidate_id": "perturbation-shuffled-1",
            "scenario_salt": "adversarial-perturbation-shuffled-1",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1.333333333333333,
            "margin_to_threshold": -0.666666666666667,
            "metrics": {
              "tv_targeted": 0.2304526748971193,
              "tv_sham": 0.1728395061728395,
              "tv_off_target": 0.037037037037037035,
              "control_max": 0.1728395061728395,
              "rho_selective": 1.333333333333333,
              "rival_tv_loss": 0.10993858692936781,
              "complexity_penalty": 0.011875,
              "penalized_rival_loss": 0.1218135869293678,
              "rival_parameter_count": 228,
              "rival_training_entropy_bits": 1.8150597741871108,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
              "strongest_rival_memory_depth": 3,
              "rival_suite_min_penalized_loss": 0.1218135869293678,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "208daa84c1e5702cf3d2ce5af3858155e5d2ada4c45878d067972973de1eb136"
          },
          "candidates": [
            {
              "family": "perturbation-shuffled",
              "candidate_id": "perturbation-shuffled-1",
              "scenario_salt": "adversarial-perturbation-shuffled-1",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.333333333333333,
              "margin_to_threshold": -0.666666666666667,
              "metrics": {
                "tv_targeted": 0.2304526748971193,
                "tv_sham": 0.1728395061728395,
                "tv_off_target": 0.037037037037037035,
                "control_max": 0.1728395061728395,
                "rho_selective": 1.333333333333333,
                "rival_tv_loss": 0.10993858692936781,
                "complexity_penalty": 0.011875,
                "penalized_rival_loss": 0.1218135869293678,
                "rival_parameter_count": 228,
                "rival_training_entropy_bits": 1.8150597741871108,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.1218135869293678,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "208daa84c1e5702cf3d2ce5af3858155e5d2ada4c45878d067972973de1eb136"
            },
            {
              "family": "perturbation-shuffled",
              "candidate_id": "perturbation-shuffled-2",
              "scenario_salt": "adversarial-perturbation-shuffled-2",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.25,
              "margin_to_threshold": -0.75,
              "metrics": {
                "tv_targeted": 0.16460905349794236,
                "tv_sham": 0.1316872427983539,
                "tv_off_target": 0.045267489711934165,
                "control_max": 0.1316872427983539,
                "rho_selective": 1.25,
                "rival_tv_loss": 0.14506365031221613,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.14589698364554946,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.841683600443385,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.14589698364554946,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "85996be52a53e724a916e7616ee706a8591c982d4e1559871dcb92875200d1d2"
            },
            {
              "family": "perturbation-shuffled",
              "candidate_id": "perturbation-shuffled-3",
              "scenario_salt": "adversarial-perturbation-shuffled-3",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.1047619047619046,
              "margin_to_threshold": -0.8952380952380954,
              "metrics": {
                "tv_targeted": 0.47736625514403286,
                "tv_sham": 0.43209876543209874,
                "tv_off_target": 0.07407407407407407,
                "control_max": 0.43209876543209874,
                "rho_selective": 1.1047619047619046,
                "rival_tv_loss": 0.4445801392962485,
                "complexity_penalty": 0.009166666666666667,
                "penalized_rival_loss": 0.45374680596291517,
                "rival_parameter_count": 176,
                "rival_training_entropy_bits": 1.7745760772027916,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.45374680596291517,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "380d88fa78be0d495a61d40def623ab984031cdc3d01da607aafea57a98eb2a4"
            },
            {
              "family": "perturbation-shuffled",
              "candidate_id": "perturbation-shuffled-0",
              "scenario_salt": "adversarial-perturbation-shuffled-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.72,
              "margin_to_threshold": -1.28,
              "metrics": {
                "tv_targeted": 0.14814814814814817,
                "tv_sham": 0.20576131687242802,
                "tv_off_target": 0.10288065843621401,
                "control_max": 0.20576131687242802,
                "rho_selective": 0.72,
                "rival_tv_loss": 0.08843336363492363,
                "complexity_penalty": 0.011666666666666667,
                "penalized_rival_loss": 0.1001000303015903,
                "rival_parameter_count": 224,
                "rival_training_entropy_bits": 1.8865868509460315,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.1001000303015903,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "80f57409de446269d06e3946c4e6f58cc50513cd27d46806e2a97ce03ab0997f"
            }
          ]
        },
        "transition-preserving-shuffled": {
          "family": "transition-preserving-shuffled",
          "candidate_count": 1,
          "best_candidate": {
            "family": "transition-preserving-shuffled",
            "candidate_id": "transition-preserving-shuffled-0",
            "scenario_salt": "pred-ext-01-v3.1-salt-0001",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1,
            "margin_to_threshold": -1,
            "metrics": {
              "tv_targeted": 0.004115226337448555,
              "tv_sham": 0.004115226337448555,
              "tv_off_target": 0.004115226337448555,
              "control_max": 0.004115226337448555,
              "rho_selective": 1,
              "rival_tv_loss": 0.007360766456586357,
              "complexity_penalty": 0.0008333333333333334,
              "penalized_rival_loss": 0.00819409978991969,
              "rival_parameter_count": 16,
              "rival_training_entropy_bits": 1.942268370092337,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
              "strongest_rival_memory_depth": 1,
              "rival_suite_min_penalized_loss": 0.00819409978991969,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "c52da3945102eb1dc677ea631aafa3e7c19ae5685fb943cc6951aef7f23070fd"
          },
          "candidates": [
            {
              "family": "transition-preserving-shuffled",
              "candidate_id": "transition-preserving-shuffled-0",
              "scenario_salt": "pred-ext-01-v3.1-salt-0001",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1,
              "margin_to_threshold": -1,
              "metrics": {
                "tv_targeted": 0.004115226337448555,
                "tv_sham": 0.004115226337448555,
                "tv_off_target": 0.004115226337448555,
                "control_max": 0.004115226337448555,
                "rho_selective": 1,
                "rival_tv_loss": 0.007360766456586357,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.00819409978991969,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.942268370092337,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.00819409978991969,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "c52da3945102eb1dc677ea631aafa3e7c19ae5685fb943cc6951aef7f23070fd"
            }
          ]
        }
      },
      "negative_control_failures": [],
      "status": "adversarial_negative_controls_pass"
    },
    "cleanroom_holdout_002": {
      "seed": "cleanroom_holdout_002",
      "families_tested": 8,
      "family_results": {
        "complexity-only": {
          "family": "complexity-only",
          "candidate_count": 4,
          "best_candidate": {
            "family": "complexity-only",
            "candidate_id": "complexity-only-1",
            "scenario_salt": "adversarial-complexity-only-1",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1.0208333333333333,
            "margin_to_threshold": -0.9791666666666667,
            "metrics": {
              "tv_targeted": 0.2016460905349794,
              "tv_sham": 0.19753086419753085,
              "tv_off_target": 0.15226337448559668,
              "control_max": 0.19753086419753085,
              "rho_selective": 1.0208333333333333,
              "rival_tv_loss": 0.1431595430250666,
              "complexity_penalty": 0.012083333333333335,
              "penalized_rival_loss": 0.15524287635839992,
              "rival_parameter_count": 232,
              "rival_training_entropy_bits": 1.8627019453500382,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
              "strongest_rival_memory_depth": 3,
              "rival_suite_min_penalized_loss": 0.15524287635839992,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "f580506b7f19d9a84dc1a931191b0a356407b88404104376484f3eb5bb2bebb3"
          },
          "candidates": [
            {
              "family": "complexity-only",
              "candidate_id": "complexity-only-1",
              "scenario_salt": "adversarial-complexity-only-1",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.0208333333333333,
              "margin_to_threshold": -0.9791666666666667,
              "metrics": {
                "tv_targeted": 0.2016460905349794,
                "tv_sham": 0.19753086419753085,
                "tv_off_target": 0.15226337448559668,
                "control_max": 0.19753086419753085,
                "rho_selective": 1.0208333333333333,
                "rival_tv_loss": 0.1431595430250666,
                "complexity_penalty": 0.012083333333333335,
                "penalized_rival_loss": 0.15524287635839992,
                "rival_parameter_count": 232,
                "rival_training_entropy_bits": 1.8627019453500382,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.15524287635839992,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "f580506b7f19d9a84dc1a931191b0a356407b88404104376484f3eb5bb2bebb3"
            },
            {
              "family": "complexity-only",
              "candidate_id": "complexity-only-2",
              "scenario_salt": "adversarial-complexity-only-2",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.9189189189189187,
              "margin_to_threshold": -1.0810810810810811,
              "metrics": {
                "tv_targeted": 0.139917695473251,
                "tv_sham": 0.1522633744855967,
                "tv_off_target": 0.14814814814814817,
                "control_max": 0.1522633744855967,
                "rho_selective": 0.9189189189189187,
                "rival_tv_loss": 0.12080566110633399,
                "complexity_penalty": 0.0033333333333333335,
                "penalized_rival_loss": 0.12413899443966732,
                "rival_parameter_count": 64,
                "rival_training_entropy_bits": 1.815467534056372,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth2",
                "strongest_rival_memory_depth": 2,
                "rival_suite_min_penalized_loss": 0.12413899443966732,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "391124f7e12a37c749ec0352d64e2ef2dc9b36bee745c160f00339f6a9ea1b89"
            },
            {
              "family": "complexity-only",
              "candidate_id": "complexity-only-3",
              "scenario_salt": "adversarial-complexity-only-3",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.7454545454545456,
              "margin_to_threshold": -1.2545454545454544,
              "metrics": {
                "tv_targeted": 0.3374485596707819,
                "tv_sham": 0.4526748971193415,
                "tv_off_target": 0.38271604938271603,
                "control_max": 0.4526748971193415,
                "rho_selective": 0.7454545454545456,
                "rival_tv_loss": 0.23624911335099089,
                "complexity_penalty": 0.012291666666666666,
                "penalized_rival_loss": 0.24854078001765756,
                "rival_parameter_count": 236,
                "rival_training_entropy_bits": 1.8762297658182137,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.24854078001765756,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "a39fa78eb90bf7e218bfa32f231ca6a45f3dbe6c17b5ee7876a66197b182cf8f"
            },
            {
              "family": "complexity-only",
              "candidate_id": "complexity-only-0",
              "scenario_salt": "adversarial-complexity-only-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.6818181818181818,
              "margin_to_threshold": -1.3181818181818183,
              "metrics": {
                "tv_targeted": 0.18518518518518515,
                "tv_sham": 0.2674897119341564,
                "tv_off_target": 0.2716049382716049,
                "control_max": 0.2716049382716049,
                "rho_selective": 0.6818181818181818,
                "rival_tv_loss": 0.08075695135144338,
                "complexity_penalty": 0.011250000000000001,
                "penalized_rival_loss": 0.09200695135144338,
                "rival_parameter_count": 216,
                "rival_training_entropy_bits": 1.8423102084759206,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.09200695135144338,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "5f08ee6932ab8d4cdddfb3519d28cefd90a6db7551056418e941064fb6578a94"
            }
          ]
        },
        "memory-only": {
          "family": "memory-only",
          "candidate_count": 4,
          "best_candidate": {
            "family": "memory-only",
            "candidate_id": "memory-only-1",
            "scenario_salt": "adversarial-memory-only-1",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1.2142857142857144,
            "margin_to_threshold": -0.7857142857142856,
            "metrics": {
              "tv_targeted": 0.06995884773662553,
              "tv_sham": 0.05761316872427984,
              "tv_off_target": 0.04526748971193416,
              "control_max": 0.05761316872427984,
              "rho_selective": 1.2142857142857144,
              "rival_tv_loss": 0.06665297007878145,
              "complexity_penalty": 0.0033333333333333335,
              "penalized_rival_loss": 0.06998630341211477,
              "rival_parameter_count": 64,
              "rival_training_entropy_bits": 1.9684870180025227,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth2",
              "strongest_rival_memory_depth": 2,
              "rival_suite_min_penalized_loss": 0.06998630341211477,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "4fe6def4b31b9368e9be4d4480e25e3e48e6068e342e299222de6ebf6307bb08"
          },
          "candidates": [
            {
              "family": "memory-only",
              "candidate_id": "memory-only-1",
              "scenario_salt": "adversarial-memory-only-1",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.2142857142857144,
              "margin_to_threshold": -0.7857142857142856,
              "metrics": {
                "tv_targeted": 0.06995884773662553,
                "tv_sham": 0.05761316872427984,
                "tv_off_target": 0.04526748971193416,
                "control_max": 0.05761316872427984,
                "rho_selective": 1.2142857142857144,
                "rival_tv_loss": 0.06665297007878145,
                "complexity_penalty": 0.0033333333333333335,
                "penalized_rival_loss": 0.06998630341211477,
                "rival_parameter_count": 64,
                "rival_training_entropy_bits": 1.9684870180025227,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth2",
                "strongest_rival_memory_depth": 2,
                "rival_suite_min_penalized_loss": 0.06998630341211477,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "4fe6def4b31b9368e9be4d4480e25e3e48e6068e342e299222de6ebf6307bb08"
            },
            {
              "family": "memory-only",
              "candidate_id": "memory-only-3",
              "scenario_salt": "adversarial-memory-only-3",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.1428571428571426,
              "margin_to_threshold": -0.8571428571428574,
              "metrics": {
                "tv_targeted": 0.09876543209876543,
                "tv_sham": 0.08641975308641978,
                "tv_off_target": 0.07818930041152262,
                "control_max": 0.08641975308641978,
                "rho_selective": 1.1428571428571426,
                "rival_tv_loss": 0.10151238056268648,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.10234571389601982,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.837405837593074,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.10234571389601982,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "4475285c20d036e5333e30598246cac8dd05ecdbb131462457c32c1bd222226d"
            },
            {
              "family": "memory-only",
              "candidate_id": "memory-only-2",
              "scenario_salt": "adversarial-memory-only-2",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.043478260869565,
              "margin_to_threshold": -0.956521739130435,
              "metrics": {
                "tv_targeted": 0.09876543209876543,
                "tv_sham": 0.09465020576131689,
                "tv_off_target": 0.05349794238683127,
                "control_max": 0.09465020576131689,
                "rho_selective": 1.043478260869565,
                "rival_tv_loss": 0.10143021390736404,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.10226354724069738,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.896151583047545,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.10226354724069738,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "f30e884c130362f0054e1c6ea78087e0f8b7c4c59a085cd7c06bbd8cca76ec6a"
            },
            {
              "family": "memory-only",
              "candidate_id": "memory-only-0",
              "scenario_salt": "adversarial-memory-only-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.4545454545454546,
              "margin_to_threshold": -1.5454545454545454,
              "metrics": {
                "tv_targeted": 0.041152263374485604,
                "tv_sham": 0.08641975308641979,
                "tv_off_target": 0.09053497942386832,
                "control_max": 0.09053497942386832,
                "rho_selective": 0.4545454545454546,
                "rival_tv_loss": 0.02021727880622784,
                "complexity_penalty": 0.013125000000000001,
                "penalized_rival_loss": 0.03334227880622784,
                "rival_parameter_count": 252,
                "rival_training_entropy_bits": 1.9901227586322805,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.03334227880622784,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "d8273472704bd2f8a6425e514d8d2e0200093c17e6855bc1688ece6fbb18ee3a"
            }
          ]
        },
        "narrative-only": {
          "family": "narrative-only",
          "candidate_count": 1,
          "best_candidate": {
            "family": "narrative-only",
            "candidate_id": "narrative-only-0",
            "scenario_salt": "adversarial-narrative-only-0",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 0.9333333333333329,
            "margin_to_threshold": -1.066666666666667,
            "metrics": {
              "tv_targeted": 0.05761316872427981,
              "tv_sham": 0.02880658436213991,
              "tv_off_target": 0.06172839506172839,
              "control_max": 0.06172839506172839,
              "rho_selective": 0.9333333333333329,
              "rival_tv_loss": 0.06717813467664013,
              "complexity_penalty": 0.0008333333333333334,
              "penalized_rival_loss": 0.06801146800997347,
              "rival_parameter_count": 16,
              "rival_training_entropy_bits": 1.8201467629741694,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
              "strongest_rival_memory_depth": 1,
              "rival_suite_min_penalized_loss": 0.06801146800997347,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "0068827c2684fdaf4bc78a083878c379202ef5f59bef056a503483ecc1152a0c"
          },
          "candidates": [
            {
              "family": "narrative-only",
              "candidate_id": "narrative-only-0",
              "scenario_salt": "adversarial-narrative-only-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.9333333333333329,
              "margin_to_threshold": -1.066666666666667,
              "metrics": {
                "tv_targeted": 0.05761316872427981,
                "tv_sham": 0.02880658436213991,
                "tv_off_target": 0.06172839506172839,
                "control_max": 0.06172839506172839,
                "rho_selective": 0.9333333333333329,
                "rival_tv_loss": 0.06717813467664013,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.06801146800997347,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.8201467629741694,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.06801146800997347,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "0068827c2684fdaf4bc78a083878c379202ef5f59bef056a503483ecc1152a0c"
            }
          ]
        },
        "entropy-matched": {
          "family": "entropy-matched",
          "candidate_count": 4,
          "best_candidate": {
            "family": "entropy-matched",
            "candidate_id": "entropy-matched-0",
            "scenario_salt": "adversarial-entropy-matched-0",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1.2380952380952377,
            "margin_to_threshold": -0.7619047619047623,
            "metrics": {
              "tv_targeted": 0.2139917695473251,
              "tv_sham": 0.17283950617283955,
              "tv_off_target": 0.1440329218106996,
              "control_max": 0.17283950617283955,
              "rho_selective": 1.2380952380952377,
              "rival_tv_loss": 0.12028971173752916,
              "complexity_penalty": 0.012083333333333335,
              "penalized_rival_loss": 0.1323730450708625,
              "rival_parameter_count": 232,
              "rival_training_entropy_bits": 1.9059622478078067,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
              "strongest_rival_memory_depth": 3,
              "rival_suite_min_penalized_loss": 0.1323730450708625,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "f352485aa441a1257e3fb6436d3525ddad3fce657abd9058fbaec06b03abda96"
          },
          "candidates": [
            {
              "family": "entropy-matched",
              "candidate_id": "entropy-matched-0",
              "scenario_salt": "adversarial-entropy-matched-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.2380952380952377,
              "margin_to_threshold": -0.7619047619047623,
              "metrics": {
                "tv_targeted": 0.2139917695473251,
                "tv_sham": 0.17283950617283955,
                "tv_off_target": 0.1440329218106996,
                "control_max": 0.17283950617283955,
                "rho_selective": 1.2380952380952377,
                "rival_tv_loss": 0.12028971173752916,
                "complexity_penalty": 0.012083333333333335,
                "penalized_rival_loss": 0.1323730450708625,
                "rival_parameter_count": 232,
                "rival_training_entropy_bits": 1.9059622478078067,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.1323730450708625,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "f352485aa441a1257e3fb6436d3525ddad3fce657abd9058fbaec06b03abda96"
            },
            {
              "family": "entropy-matched",
              "candidate_id": "entropy-matched-2",
              "scenario_salt": "adversarial-entropy-matched-2",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.1489361702127663,
              "margin_to_threshold": -0.8510638297872337,
              "metrics": {
                "tv_targeted": 0.2222222222222222,
                "tv_sham": 0.19341563786008226,
                "tv_off_target": 0.1810699588477366,
                "control_max": 0.19341563786008226,
                "rho_selective": 1.1489361702127663,
                "rival_tv_loss": 0.2120826271368063,
                "complexity_penalty": 0.0033333333333333335,
                "penalized_rival_loss": 0.21541596047013964,
                "rival_parameter_count": 64,
                "rival_training_entropy_bits": 1.8560968392183879,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth2",
                "strongest_rival_memory_depth": 2,
                "rival_suite_min_penalized_loss": 0.21541596047013964,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "7080bc565b99e47755005c0572fb95877daa267224226dcb053de994cbb3d07a"
            },
            {
              "family": "entropy-matched",
              "candidate_id": "entropy-matched-3",
              "scenario_salt": "adversarial-entropy-matched-3",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.990566037735849,
              "margin_to_threshold": -1.009433962264151,
              "metrics": {
                "tv_targeted": 0.43209876543209874,
                "tv_sham": 0.43621399176954734,
                "tv_off_target": 0.4238683127572016,
                "control_max": 0.43621399176954734,
                "rho_selective": 0.990566037735849,
                "rival_tv_loss": 0.4010220274864368,
                "complexity_penalty": 0.0033333333333333335,
                "penalized_rival_loss": 0.40435536081977014,
                "rival_parameter_count": 64,
                "rival_training_entropy_bits": 1.854121728141783,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth2",
                "strongest_rival_memory_depth": 2,
                "rival_suite_min_penalized_loss": 0.40435536081977014,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "038361fca3a9fc44037620658c962c1d9c6c1937374c7198ebd13ecc9f201305"
            },
            {
              "family": "entropy-matched",
              "candidate_id": "entropy-matched-1",
              "scenario_salt": "adversarial-entropy-matched-1",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.8571428571428571,
              "margin_to_threshold": -1.1428571428571428,
              "metrics": {
                "tv_targeted": 0.19753086419753085,
                "tv_sham": 0.23045267489711935,
                "tv_off_target": 0.2263374485596708,
                "control_max": 0.23045267489711935,
                "rho_selective": 0.8571428571428571,
                "rival_tv_loss": 0.12000385224819311,
                "complexity_penalty": 0.012291666666666666,
                "penalized_rival_loss": 0.13229551891485977,
                "rival_parameter_count": 236,
                "rival_training_entropy_bits": 1.8488886616829716,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.13229551891485977,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "ed454cf0b44fd996585dce8d075b5797eefc04a52c511c419a0a360a434cff98"
            }
          ]
        },
        "targeted-frequency-matched": {
          "family": "targeted-frequency-matched",
          "candidate_count": 4,
          "best_candidate": {
            "family": "targeted-frequency-matched",
            "candidate_id": "targeted-frequency-matched-2",
            "scenario_salt": "adversarial-targeted-frequency-matched-2",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1.083333333333333,
            "margin_to_threshold": -0.916666666666667,
            "metrics": {
              "tv_targeted": 0.16049382716049382,
              "tv_sham": 0.14814814814814817,
              "tv_off_target": 0.1440329218106996,
              "control_max": 0.14814814814814817,
              "rho_selective": 1.083333333333333,
              "rival_tv_loss": 0.12406706795961643,
              "complexity_penalty": 0.011250000000000001,
              "penalized_rival_loss": 0.13531706795961643,
              "rival_parameter_count": 216,
              "rival_training_entropy_bits": 1.8177572108945501,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
              "strongest_rival_memory_depth": 3,
              "rival_suite_min_penalized_loss": 0.13531706795961643,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "fefa4818daf6038eb619e0a8023582d6aa8eb7c8286702bd442835941830fea5"
          },
          "candidates": [
            {
              "family": "targeted-frequency-matched",
              "candidate_id": "targeted-frequency-matched-2",
              "scenario_salt": "adversarial-targeted-frequency-matched-2",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.083333333333333,
              "margin_to_threshold": -0.916666666666667,
              "metrics": {
                "tv_targeted": 0.16049382716049382,
                "tv_sham": 0.14814814814814817,
                "tv_off_target": 0.1440329218106996,
                "control_max": 0.14814814814814817,
                "rho_selective": 1.083333333333333,
                "rival_tv_loss": 0.12406706795961643,
                "complexity_penalty": 0.011250000000000001,
                "penalized_rival_loss": 0.13531706795961643,
                "rival_parameter_count": 216,
                "rival_training_entropy_bits": 1.8177572108945501,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.13531706795961643,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "fefa4818daf6038eb619e0a8023582d6aa8eb7c8286702bd442835941830fea5"
            },
            {
              "family": "targeted-frequency-matched",
              "candidate_id": "targeted-frequency-matched-3",
              "scenario_salt": "adversarial-targeted-frequency-matched-3",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.9727272727272728,
              "margin_to_threshold": -1.0272727272727273,
              "metrics": {
                "tv_targeted": 0.4403292181069959,
                "tv_sham": 0.45267489711934156,
                "tv_off_target": 0.41975308641975306,
                "control_max": 0.45267489711934156,
                "rho_selective": 0.9727272727272728,
                "rival_tv_loss": 0.38614207202665873,
                "complexity_penalty": 0.010625,
                "penalized_rival_loss": 0.39676707202665873,
                "rival_parameter_count": 204,
                "rival_training_entropy_bits": 1.8276115774064605,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.39676707202665873,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "6ab5073bd1a8f20b1d02d7daa1d30cb8bc2938ae60ac75fb59f45efa5afd0548"
            },
            {
              "family": "targeted-frequency-matched",
              "candidate_id": "targeted-frequency-matched-1",
              "scenario_salt": "adversarial-targeted-frequency-matched-1",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.75,
              "margin_to_threshold": -1.25,
              "metrics": {
                "tv_targeted": 0.16049382716049385,
                "tv_sham": 0.16872427983539096,
                "tv_off_target": 0.21399176954732513,
                "control_max": 0.21399176954732513,
                "rho_selective": 0.75,
                "rival_tv_loss": 0.09436185503653831,
                "complexity_penalty": 0.011041666666666667,
                "penalized_rival_loss": 0.10540352170320498,
                "rival_parameter_count": 212,
                "rival_training_entropy_bits": 1.8248525769693789,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.10540352170320498,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "7f6af24f8e9c0c97b4288895c2ce2ab9bbbd3b993b81bb8231ed958556b2a347"
            },
            {
              "family": "targeted-frequency-matched",
              "candidate_id": "targeted-frequency-matched-0",
              "scenario_salt": "adversarial-targeted-frequency-matched-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.7307692307692305,
              "margin_to_threshold": -1.2692307692307696,
              "metrics": {
                "tv_targeted": 0.15637860082304522,
                "tv_sham": 0.21399176954732513,
                "tv_off_target": 0.16872427983539093,
                "control_max": 0.21399176954732513,
                "rho_selective": 0.7307692307692305,
                "rival_tv_loss": 0.08212685017318708,
                "complexity_penalty": 0.011250000000000001,
                "penalized_rival_loss": 0.09337685017318707,
                "rival_parameter_count": 216,
                "rival_training_entropy_bits": 1.8592238829327643,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.09337685017318707,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "46a057eb9a26bb1d0f2780c057975447965e5afd1933d7da31bb1adaa0f03891"
            }
          ]
        },
        "role-shuffled": {
          "family": "role-shuffled",
          "candidate_count": 1,
          "best_candidate": {
            "family": "role-shuffled",
            "candidate_id": "role-shuffled-0",
            "scenario_salt": "adversarial-role-shuffled-0",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 0.1529411764705882,
            "margin_to_threshold": -1.8470588235294119,
            "metrics": {
              "tv_targeted": 0.05349794238683127,
              "tv_sham": 0.3456790123456791,
              "tv_off_target": 0.34979423868312765,
              "control_max": 0.34979423868312765,
              "rho_selective": 0.1529411764705882,
              "rival_tv_loss": 0.05569023908490526,
              "complexity_penalty": 0.0008333333333333334,
              "penalized_rival_loss": 0.05652357241823859,
              "rival_parameter_count": 16,
              "rival_training_entropy_bits": 1.9048501724574503,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
              "strongest_rival_memory_depth": 1,
              "rival_suite_min_penalized_loss": 0.05652357241823859,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "99911f66ea64a547b7a99b30854c04da43db0558b129846f3d65876f73ac2606"
          },
          "candidates": [
            {
              "family": "role-shuffled",
              "candidate_id": "role-shuffled-0",
              "scenario_salt": "adversarial-role-shuffled-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.1529411764705882,
              "margin_to_threshold": -1.8470588235294119,
              "metrics": {
                "tv_targeted": 0.05349794238683127,
                "tv_sham": 0.3456790123456791,
                "tv_off_target": 0.34979423868312765,
                "control_max": 0.34979423868312765,
                "rho_selective": 0.1529411764705882,
                "rival_tv_loss": 0.05569023908490526,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.05652357241823859,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.9048501724574503,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.05652357241823859,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "99911f66ea64a547b7a99b30854c04da43db0558b129846f3d65876f73ac2606"
            }
          ]
        },
        "perturbation-shuffled": {
          "family": "perturbation-shuffled",
          "candidate_count": 4,
          "best_candidate": {
            "family": "perturbation-shuffled",
            "candidate_id": "perturbation-shuffled-0",
            "scenario_salt": "adversarial-perturbation-shuffled-0",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1.2549019607843137,
            "margin_to_threshold": -0.7450980392156863,
            "metrics": {
              "tv_targeted": 0.26337448559670784,
              "tv_sham": 0.20987654320987656,
              "tv_off_target": 0.0411522633744856,
              "control_max": 0.20987654320987656,
              "rho_selective": 1.2549019607843137,
              "rival_tv_loss": 0.18678699128773377,
              "complexity_penalty": 0.010625,
              "penalized_rival_loss": 0.19741199128773376,
              "rival_parameter_count": 204,
              "rival_training_entropy_bits": 1.8481047188988557,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
              "strongest_rival_memory_depth": 3,
              "rival_suite_min_penalized_loss": 0.19741199128773376,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "24d4a300686cbf236198a31154c03ed02f83775f9896e120d0b8fe15dbef4420"
          },
          "candidates": [
            {
              "family": "perturbation-shuffled",
              "candidate_id": "perturbation-shuffled-0",
              "scenario_salt": "adversarial-perturbation-shuffled-0",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.2549019607843137,
              "margin_to_threshold": -0.7450980392156863,
              "metrics": {
                "tv_targeted": 0.26337448559670784,
                "tv_sham": 0.20987654320987656,
                "tv_off_target": 0.0411522633744856,
                "control_max": 0.20987654320987656,
                "rho_selective": 1.2549019607843137,
                "rival_tv_loss": 0.18678699128773377,
                "complexity_penalty": 0.010625,
                "penalized_rival_loss": 0.19741199128773376,
                "rival_parameter_count": 204,
                "rival_training_entropy_bits": 1.8481047188988557,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.19741199128773376,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "24d4a300686cbf236198a31154c03ed02f83775f9896e120d0b8fe15dbef4420"
            },
            {
              "family": "perturbation-shuffled",
              "candidate_id": "perturbation-shuffled-3",
              "scenario_salt": "adversarial-perturbation-shuffled-3",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1.1443298969072166,
              "margin_to_threshold": -0.8556701030927834,
              "metrics": {
                "tv_targeted": 0.4567901234567901,
                "tv_sham": 0.39917695473251025,
                "tv_off_target": 0.08641975308641975,
                "control_max": 0.39917695473251025,
                "rho_selective": 1.1443298969072166,
                "rival_tv_loss": 0.33696580064847365,
                "complexity_penalty": 0.011458333333333334,
                "penalized_rival_loss": 0.348424133981807,
                "rival_parameter_count": 220,
                "rival_training_entropy_bits": 1.7681569219209636,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.348424133981807,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "4a2e95ed1badc2784bf9485756114f9419acf1a6e1e8cf6c3d898185ba24dc00"
            },
            {
              "family": "perturbation-shuffled",
              "candidate_id": "perturbation-shuffled-2",
              "scenario_salt": "adversarial-perturbation-shuffled-2",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.8214285714285713,
              "margin_to_threshold": -1.1785714285714288,
              "metrics": {
                "tv_targeted": 0.18930041152263372,
                "tv_sham": 0.23045267489711935,
                "tv_off_target": 0.04115226337448557,
                "control_max": 0.23045267489711935,
                "rho_selective": 0.8214285714285713,
                "rival_tv_loss": 0.1230051070777383,
                "complexity_penalty": 0.010833333333333334,
                "penalized_rival_loss": 0.13383844041107162,
                "rival_parameter_count": 208,
                "rival_training_entropy_bits": 1.8060339543910398,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.13383844041107162,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "a7c1cabff119e54deb153b0688cbc5ce49c4db50ff43a8902df742a8de6decd0"
            },
            {
              "family": "perturbation-shuffled",
              "candidate_id": "perturbation-shuffled-1",
              "scenario_salt": "adversarial-perturbation-shuffled-1",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 0.7209302325581395,
              "margin_to_threshold": -1.2790697674418605,
              "metrics": {
                "tv_targeted": 0.12757201646090532,
                "tv_sham": 0.17695473251028804,
                "tv_off_target": 0.06995884773662553,
                "control_max": 0.17695473251028804,
                "rho_selective": 0.7209302325581395,
                "rival_tv_loss": 0.055950693128409654,
                "complexity_penalty": 0.011041666666666667,
                "penalized_rival_loss": 0.06699235979507633,
                "rival_parameter_count": 212,
                "rival_training_entropy_bits": 1.8555332514899967,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth3",
                "strongest_rival_memory_depth": 3,
                "rival_suite_min_penalized_loss": 0.06699235979507633,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "6946e9cf66c935b7367e813a7138b6f15fc3b1b6e43fc30959cad56a1f303c11"
            }
          ]
        },
        "transition-preserving-shuffled": {
          "family": "transition-preserving-shuffled",
          "candidate_count": 1,
          "best_candidate": {
            "family": "transition-preserving-shuffled",
            "candidate_id": "transition-preserving-shuffled-0",
            "scenario_salt": "pred-ext-01-v3.1-salt-0001",
            "support_rule_satisfied": false,
            "verdict": "support_rule_not_satisfied",
            "danger_score": 1,
            "margin_to_threshold": -1,
            "metrics": {
              "tv_targeted": 0.004115226337448583,
              "tv_sham": 0,
              "tv_off_target": 0.004115226337448583,
              "control_max": 0.004115226337448583,
              "rho_selective": 1,
              "rival_tv_loss": 0.015970988174300926,
              "complexity_penalty": 0.0008333333333333334,
              "penalized_rival_loss": 0.016804321507634258,
              "rival_parameter_count": 16,
              "rival_training_entropy_bits": 1.8528494904780404,
              "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
              "strongest_rival_memory_depth": 1,
              "rival_suite_min_penalized_loss": 0.016804321507634258,
              "rival_suite_depths_tested": [
                1,
                2,
                3,
                4,
                5
              ]
            },
            "trace_panel_sha256": "97fb490d1f003578f2a56702251fd0b52370eade9f8a07e1aca75ca5337b0ea8"
          },
          "candidates": [
            {
              "family": "transition-preserving-shuffled",
              "candidate_id": "transition-preserving-shuffled-0",
              "scenario_salt": "pred-ext-01-v3.1-salt-0001",
              "support_rule_satisfied": false,
              "verdict": "support_rule_not_satisfied",
              "danger_score": 1,
              "margin_to_threshold": -1,
              "metrics": {
                "tv_targeted": 0.004115226337448583,
                "tv_sham": 0,
                "tv_off_target": 0.004115226337448583,
                "control_max": 0.004115226337448583,
                "rho_selective": 1,
                "rival_tv_loss": 0.015970988174300926,
                "complexity_penalty": 0.0008333333333333334,
                "penalized_rival_loss": 0.016804321507634258,
                "rival_parameter_count": 16,
                "rival_training_entropy_bits": 1.8528494904780404,
                "strongest_rival_id": "RIVAL-TRACE-MEMORY-01-depth1",
                "strongest_rival_memory_depth": 1,
                "rival_suite_min_penalized_loss": 0.016804321507634258,
                "rival_suite_depths_tested": [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              },
              "trace_panel_sha256": "97fb490d1f003578f2a56702251fd0b52370eade9f8a07e1aca75ca5337b0ea8"
            }
          ]
        }
      },
      "negative_control_failures": [],
      "status": "adversarial_negative_controls_pass"
    }
  },
  "failures": [],
  "boundary": "Internal synthetic adversarial negative-control search only. Passing does not imply empirical validation, bridge admissibility, consciousness, phenomenality, or external support. Failure would block PRED-EXT-01 support pending freeze update or theory revision."
}
```
