# Monolithic Volume

Edición pública Ruta 5, compilada el 13 de noviembre de 2026: **438 páginas**.
Ensambla BaseCore, Papers I–X y Puente desde sus fuentes independientes.
La guía de lectura del prefacio explica las dependencias y límites de la
verificación. La nota de autoría aparece una sola vez al cierre del volumen.

`QICN_MONOLITHIC.tex` es generado: editar las fuentes o el ensamblador,
`scripts/build-monolithic-volume.js`, y reconstruir desde el paquete teórico:

```powershell
npm run build:monolithic
npm run compile:monolithic
```

`preamble/source-contract.json` comprueba preámbulos y personalizaciones;
no debe actualizarse para ocultar deriva. Ruta 5 documenta sólo la nueva
autoría y metadatos de X. Los capítulos y bibliografía bajo `build/` son
productos derivados, no fuentes alternativas.

Esta edición pasó comparación fuente/capítulo 12/12 en LF y CRLF. Los
13 PDF del corpus activo compilaron sin errores fatales, referencias/citas
indefinidas, etiquetas duplicadas u Overfull. Los escaneos completos, páginas,
metadatos y huellas constan en el
[informe de Ruta 5](../docs/ai-platform-outputs/repair-plans/RUTA5_EDICION_PUBLICA_FINAL_2026-11-13/EJECUCION.md).
No se presentan los avisos Underfull como errores resueltos ni se atribuye
una aprobación nueva a un gate tipográfico histórico.

Las fuentes y pruebas conservan su ámbito. Lean queda intacto y su siguiente
fase está en el roadmap. Revisión matemática humana, calibración y evidencia
independiente siguen pendientes. **external_support_certified=false**.
