# Cycle 3 Replication Report

## Replication type
Pseudo-multi-environment replication on the same machine.

## What differed between runs
- judge profile (`primary` vs `replica`)
- case traversal order
- environment metadata capture

## What did not differ
- frozen manifest
- frozen traces
- threshold profiles
- reveal map

## Result
- all_case_agree: `True`
- all_pair_agree: `True`
- max_metric_drift: `0.0`

## Interpretation
This increases internal reproducibility credibility. It is not external validation or cross-lab replication.
