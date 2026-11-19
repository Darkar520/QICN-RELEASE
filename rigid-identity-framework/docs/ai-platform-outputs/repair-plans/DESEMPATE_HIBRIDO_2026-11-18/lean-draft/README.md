# Lean 4.31.0 Modules for `codex/desempate-hibrido` (Verified & Promoted)

Los dos módulos de esta carpeta fueron depurados, verificados con el kernel de **Lean 4.31.0** (`0` `sorry`/`admit`/`axiom`, `0` warnings, axiomas dentro de `{propext, Classical.choice, Quot.sound}`) y promovidos al paquete activo `rigid-identity-framework/lean/QICNLean/`:

- `QICNHybridBoundary.lean` (`16` teoremas/lemas públicos + `5` definiciones):
  - frontera de capacidad y consultas de paridad tardía (`unit_query`, `collision_forces_response_error`, `deadline_capacity_lower`, `lateSign_abs`, `centred_forecast_attains`),
  - quinto contraste acoplado de cinco raíces sobre `Bool^5` (`proper5_contrast_zero`, `physical5_contrast`, `fifth_contrast_error_bound`, `fifth_contrast_mean_bound`, `five_root_decomposition`, `background5_proper`, `fifth_gap_attained`, `manuscript_fifth_constant`),
  - estabilidad del margen con signo bajo error de lectura y costo común (`signed_margin_stability`),
  - supervivencia de separador certificado e inyectividad en cocientes fieles (`certified_separator_survives`, `faithful_quotient_injective`).
- `QICNIrreducibleObservation.lean` (`3` teoremas públicos):
  - independencia lineal de la órbita cíclica bajo polinomio irreducible (`cyclic_independent`),
  - inyectividad de la observación orbital para cualquier funcional lineal no nulo cuando `deg(minpoly K A) = finrank K V` (`irreducible_observation_injective`),
  - cota inferior `σ / 2 ≤ ε` contra cualquier codificación sobreyectiva en producto `V → L × R` con predictor local (`irreducible_product_bound`).

Esta copia en `lean-draft/` se conserva idéntica byte a byte a las fuentes promovidas en `rigid-identity-framework/lean/QICNLean/` para trazabilidad del dossier; los recibos de reanudación y reproducción completa viven en `../RESUMPTION/`.
