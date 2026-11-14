# Ruta 6 (Opción B) — prerregistro

Fecha local: 2026-11-14. Base pública 05f8e55e5060251bbf20962b414c0dfd5078f164.
Solicitud completa conservada en el adjunto c022c42c-b592-4f12-834f-6ca086e38cc9.
Objetivo: ejecutar las tres subfases, con commits locales y sin push automático.

## 6.1 Línea base, arquitectura y cobertura

Antes de mover: inventario por SHA-256 de los 32 Lean y configuración fijada,
pruebas nativas Lake y elaboración serial kernel-only con auditoría completa de
los 250 teoremas públicos. Registrar versión exacta 4.31.0, pines de paquetes,
axiomas y problemas específicos Windows/WSL. El resumen anterior 30/215 es
histórico y no acredita el estado actual. Descartar cualquier selección global
de otra versión del compilador; usar ejecutables fijados y almacenamiento en E:.

Comparar raíz lean/QICNLean con lean/formal dentro del paquete teórico, según
las fronteras existentes. Inventariar lectores y recetas históricas antes de
reubicar, sin modificar recibos congelados. No copiar ni borrar recursivamente
la junction .lake ni su destino E:/QICN-LEAN/v4.31.0-desktop.

Construir matriz exacta de 419 IDs con enunciado, hipótesis, dependencias,
prioridad, categoría y testigo Lean si existe. EXACT_MATCH exige equivalencia
comprobada; una instancia o núcleo parcial conserva su brecha declarada.

## 6.2 Paquete autónomo

Una sola ubicación activa, historial preservado, ignorado de dependencias y
builds, README y verificadores/lectores actualizados. Mantener alcanzabilidad
desde el agregado y reproducibilidad de recetas anteriores. Primer commit
separado tras verificar 32/250, raíz3, release6, FCR/macros, prosa y math32.

## 6.3 Núcleo analítico/infinito

Reutilizar pruebas generales ya existentes sin duplicarlas. Extender:
proyección convexa Hilbert real/compleja arbitraria; Banach parametrizado,
continuidad del selector y compacidad/no-colapso bajo hipótesis reales;
límite inverso infinito y separación/transporte prioritarios. Cada módulo nuevo
mantiene un namespace, importación en QICNLean.lean y prueba sin admisiones.
Actualizar matriz con ID y fidelidad exactos. Commits independientes del traslado.

## Invariantes y parada

Prohibido editar cualquier release/, corpus/, artifacts/, legacy, manuscrito
.tex publicado o registro theorems/macros. Conservar íntegros los 32 Lean
anteriores al trasladar. Cero sorry, admit o axioma añadido silenciosamente;
auditables sólo propext, Classical.choice, Quot.sound. Registrar toda brecha
matemática del manuscrito sin corregirlo ni debilitarlo para facilitar Lean.
Detener una aceptación si falla un gate o se rompe la fidelidad; investigar,
sin relajar criterios. Las obligaciones empíricas/exteriores permanecen abiertas.

## Evidencia y aceptación

Logs y copias recuperables: E:/QICN-PRESERVACION/2026-11-14-ruta6.
Por fase: ledger, roadmap y EJECUCION.md; cifras exactas y alcance del resultado.
Verificación final en estado comitado limpio: Lean completo y axiomas por símbolo,
raíz3, release6, FCR/macros, nonclaims, prosa, math32, matriz419 exhaustiva y
hashes congelados iguales. No recompilar manuscritos inalterados. No ejecutar
runtime ni usar resultados internos como validación científica externa.
Veredictos crudos preservados; external_support_certified=false.
