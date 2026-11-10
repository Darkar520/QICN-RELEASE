# P5 · Reproducción para revisión independiente

El punto de entrada es el commit público [2919fe8](https://github.com/Darkar520/QICN-RELEASE/commit/2919fe897d2d0d05e0f32ee0d7178676e42eef46). El ejecutor toma únicamente los archivos versionados de ese commit con `git archive` sin conversión de finales de línea y ejecuta las herramientas en una carpeta nueva. Conserva los logs y resultados regenerados para inspección. La copia de trabajo donde se lanza el protocolo queda disponible para revisar el código y comparar los cambios.

## Una sola ejecución

1. Disponer de Git, Python 3.11 o posterior, Node y npm. Tener disponibles en `PATH` `pdflatex`, `biber`, `pdfinfo` y `pdftotext`. La distribución TeX debe incluir los paquetes y fuentes que usan los manuscritos, incluido BibLaTeX.
2. Instalar o seleccionar Lean 4.31.0. Con Elan se puede instalar con `elan toolchain install leanprover/lean4:v4.31.0`. El ejecutor comprueba la versión y la revisión de Lean. Si se usa un binario independiente, pasar `--lean RUTA_AL_BINARIO`.
3. Desde la raíz de una clonación actual del repositorio, ejecutar el siguiente comando. Elegir una ruta nueva fuera de la clonación y con espacio para la instantánea y la compilación. El comando sirve en PowerShell y en shells de Unix.

```text
python -B rigid-identity-framework/docs/ai-platform-outputs/repair-plans/CORRECCION_FUNDAMENTOS_2026-11-08/reproduce_p5.py --output ../qicn-p5-review
```

## Comprobaciones y criterio de aceptación

| Tramo | Comando o comprobación | Resultado exigido |
|---|---|---|
| Lean 4.31.0 | `lean -DwarningAsError=true -o ... QICNLean/QICNFiniteP4.lean`, seguido de importación y `#print axioms` | Siete lemas auditados y dependencias dentro de `propext`, `Classical.choice`, `Quot.sound`. |
| Integridad raíz | `node scripts/verify-canonical-integrity.cjs`, `node scripts/verify-claim-registry.cjs`, `node scripts/verify-canonical-release.cjs` | Tres salidas correctas. |
| Publicación | `npm run verify:release`, con `QICN_GOVERNANCE_BLINDED=true` | 6/6 y veredictos crudos conservados. |
| Matemáticas y registro | `npm run verify:math` y `npm run verify:corpus-registry` | 17/17, incluido `check_unified_tower.py`, y 829 IDs únicos. |
| Monolito | `npm run compile:monolithic`, comparación con las fuentes, `pdfinfo` y `pdftotext` | 372 páginas en el entorno de referencia, 12/12 secciones, títulos de ambas pruebas de la torre y de la obstrucción del Paper Puente, sin citas o referencias indefinidas ni etiquetas duplicadas. |

Ante cualquier fallo, el ejecutor se detiene y conserva el log. Una ejecución completa escribe `summary.json`, las salidas crudas en `logs/`, el PDF reconstruido en `workspace/rigid-identity-framework/monolithic/` y su texto en `monolith.txt`. La huella del PDF publicado identifica el artefacto de referencia. La huella del PDF reconstruido identifica el de la ejecución. Las marcas temporales o diferencias de herramientas pueden dar huellas distintas. La paginación se verifica con las herramientas de referencia y, si difiere en otra instalación, se deben conservar el log y las versiones para investigarlo.

La auditoría de Lean se aplica al módulo finito `QICNLean.QICNFiniteP4`. La revisión del agregado y las pruebas analíticas generales quedan como obligaciones separadas. El ciclo de correcciones cubre el alcance trazado desde BaseCore hasta Paper X. La revisión matemática por un tercero, la contrastación empírica y la realización conjunta de todos los certificados siguen abiertas.

## Ejecución de referencia · 2026-11-10

El protocolo terminó con código 0 desde una extracción limpia de `2919fe8`. Se usaron Python 3.11.9, Node 24.6.0, npm 11.5.1, Lean 4.31.0 (revisión `68218e876d2a38b1985b8590fff244a83c321783`), MiKTeX 24.1 con pdfTeX 4.18 y Biber 2.21. El ejecutor verificado tiene SHA-256 `0f22d3ef0906e841c8b5998cb07cf842d2f26ec8565f5ee62335d3265ce87668`.

Pasaron Lean 7/7, los tres verificadores de raíz, publicación 6/6, matemáticas 17/17 y el registro de 829 entradas. Se reconstruyeron 372 páginas y las 12 secciones coincidieron con las fuentes. La extracción de texto UTF-8 del PDF reconstruido coincidió byte por byte con la del PDF publicado, con SHA-256 `09e87d85db3af3cec3f5ae95d328835a80bc9894224b6e6d46558e6425488277`. El PDF publicado tiene SHA-256 `87306e7f94abc7acee5483af49695862b3a4ab6876e63b25cd3cae431537a953` y el reconstruido `4b1eb5bbee0fd221808854f1c7b80f4eca9e1739f58ef45c59c38b1d312cbef4`.

| Adjudicación | Veredicto crudo | external_support_certified |
|---|---|---|
| Bloque v25/v26 | `INTERNAL_DIAGNOSTIC_PASS_SYNTHETIC_ONLY` | `false` |
| v27, v28 y v30 | `BLOCKED_MULTIPLE_GATES` | `false` |
| v31 | `BLOCKED_FOUNDATION_FIRST_GATES` | `false` |

El primer intento detectó que la configuración de Git para CRLF alteraba el manifiesto al exportarlo. La ejecución de referencia fija la exportación sin esa conversión y verifica el manifiesto con su huella oficial. Esto permite reproducir el ciclo sin editar los archivos congelados. La reproducción documentada corresponde al control interno de P5. La aprobación por un revisor externo requiere una ejecución y una revisión propias.
