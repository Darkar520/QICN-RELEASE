# Ruta 6 — ejecución y evidencia

Base: `05f8e55e5060251bbf20962b414c0dfd5078f164`. Rama local:
`codex/ruta6-lean`. No se autoriza push automático. Fuentes activas en la copia
ordenada del Escritorio; evidencia voluminosa y copias aisladas en
`E:/QICN-PRESERVACION/2026-11-14-ruta6/`.

## 6.1 — línea base y arquitectura

Leídos AGENTS, las cinco autoridades de docs, INSTRUCCIONES, ROADMAP (Ruta 6 y
aclaraciones), configuración Lake/Mathlib, los 32 Lean, verify-lean.py,
inventory-traceability.js, informe de reorganización, ignores, CI, Dockerfile y
README de ambos tiers. Se preservaron 851 archivos versionados y sus SHA-256.
El prerregistro de esta carpeta se congeló antes de intervenir; su hash está en
la evidencia de E:. No se copiaron junctions ni dependencias al respaldo.

**Línea base real:** Lean 4.31.0, commit del compilador
`68218e876d2a38b1985b8590fff244a83c321783`; kernel serial, 32 fuentes
(31 módulos + agregado), 250 declaraciones públicas auditadas; dependencias
de axiomas exactamente `Classical.choice`, `Quot.sound`, `propext`.
Los nueve pins Git pasaron. Tiempo de la ejecución serial: 1046.5 segundos.
`BASELINE.json` conserva versiones, hashes de fuentes/objetos y pins.
El recibo cacheado anterior de 30 módulos/215 declaraciones quedó preservado
como histórico desactualizado, no reutilizado como evidencia actual.

La evaluación nativa `lake build` permaneció sin progreso observable y se
interrumpió de forma controlada después de 712 segundos. No es una prueba
fallida ni una compilación nativa aprobada: **nativo Windows no verificado**.
Los recibos antiguos de WSL corresponden a otros checkpoints; no se ejecutó
WSL de nuevo en esta fase. El modo serial verificó directamente con Lean el
proyecto actual y sus axiomas, sin generación C ni grafo de tareas nativo.

Incidente de entorno: una consulta inicial de versión fuera del paquete intentó
activar el toolchain global 4.35.0. Se interrumpió; su parcial nuevo se archivó
reversiblemente en E:, sin tocar otros parciales ni instalar ese compilador.
Todas las verificaciones de esta fase fijaron la ruta de Lean 4.31.0.

Ubicación elegida: `rigid-identity-framework/lean/`; comparación y motivos en
`DECISION_UBICACION.md`. Conserva la separación raíz/gobierno frente a fuentes
matemáticas interiores y añade un enlace visible desde el README raíz.

**Matriz inicial:** 419 IDs únicos, tipos 141 theorem / 214 proposition /
24 lemma / 40 corollary, con la distribución por paper requerida. Estado
inicial: 1 EXACT_MATCH, 53 FINITE_OR_PARTIAL_KERNEL, 349 PENDING_MATHLIB,
16 EMPIRICAL_OR_PROTOCOL_BOUNDED. Son anotaciones de fidelidad por enunciado,
no el cociente 250/419. Los componentes Hilbert existentes ya eran generales;
no se presentan como pruebas finitas ni como un avance nuevo de esta ruta.
Las dependencias Mathlib candidatas orientan el trabajo, sin certificar que
cada traducción o demostración pendiente sea viable.

## 6.2 — exposición, sin cambio matemático

36 archivos originales trasladados byte por byte, incluidos los 32 Lean.
`RELOCATION_MANIFEST.json` contiene origen, destino y SHA-256 de cada archivo.
La junction original se verificó y se archivó reversiblemente en el mismo
volumen C:; se creó un nuevo enlace al mismo destino en E:. No se recorrió,
copió ni eliminó recursivamente el almacenamiento de dependencias.
La revisión automática rechazó la operación inicial de eliminación del enlace;
el traslado reversible permitió conservarlo y completar la reubicación.

Única ubicación activa: lean/. La ruta anterior conserva sólo README de
transición; no hay Lean o lakefile duplicado. `reproduce_p5.py` permanece
intacto: extrae su checkpoint antiguo y allí su ruta histórica sigue siendo
correcta. Cambiados únicamente resolución de ubicación en el verificador,
clasificación/raíces/exclusiones del inventario, documentación y protecciones
de caches para Git/Docker. No se añadió una supuesta comprobación Lean al CI.

El nuevo verificador de cobertura comprueba 419 IDs, tipos, propietarios,
huellas de registro/enunciados, símbolos, dependencias y correspondencia MD/JSON.
No sustituye la auditoría de kernel ni certifica equivalencia semántica por sí
solo. La reproducción posterior al traslado aprobó de nuevo 32 fuentes/250 declaraciones
y los mismos tres axiomas. La comparación directa de ambas auditorías confirma
los mismos hashes de todas las fuentes. Raíz 3/3, release 6/6, matemáticas 32/32,
FCR (906 entradas), macros (383), nonclaims (0), prosa, cobertura e inventario
aprobados. El inventario clasifica los 37 archivos del paquete como KEEP.
Seis controles negativos de cobertura rechazados y 153 archivos protegidos
sin cambios. Detalle de comandos y recibos en VERIFICACION_6_2.json.

## Límites científicos y conservación

No se cambian manuscritos, PDF, registry, áreas release/corpus/artifacts ni
canonical_core_legacy. La propagación a prosa/monolito no corresponde: no se
alteran definiciones, hipótesis o resultados del manuscrito; se incorpora
evidencia formal acompañante con correspondencia explícita o brecha abierta.

Se conservan literalmente `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY`,
`BLOCKED_MULTIPLE_GATES`, `BLOCKED_FOUNDATION_FIRST_GATES` y
`external_support_certified=false`. H5 es una hipótesis adicional; compacidad
no implica no-colapso. La calibración, datos independientes, rivales irrestrictos,
clase BPF completa y revisión matemática humana mantienen su estado abierto.
