# Etapa 3A — mecanización y fidelidad, 2026-11-15

Base publicada: `5aa5da2b64fc30265f88b8aeaa4c5b443c221df9` en main,
origin y gitlab; salidas literales en PUBLICACION_FASE_I.json. Rama de esta
fase: `codex/etapa3-lean`. Sólo commit local; no push ni avance de main.

## Alcance y conservación

Lecturas: AGENTS, cinco documentos canónicos en orden, INSTRUCCIONES,
ROADMAP, README Lean, verify-lean.py, matriz 436, fuentes y pruebas exactas
de los objetivos A/B/C. Prerregistro congelado antes de las nuevas fuentes.
BASELINE reutiliza por hash las trece puertas de Fase I y el recibo fresco
Lean de Etapa 2, sin presentar esa reutilización como nueva ejecución.

CONSERVACION inventaría las entradas originales. Fase II conserva todos los
TeX/PDF, 921 entradas del registro, 383 macros, paquetes/configuraciones Lean,
las 34 fuentes Lean previas y áreas congeladas. Sólo el agregado añade cinco
imports. Se preservan los diez matches exactos anteriores y los 436 IDs.

Cinco módulos nuevos, 77 resultados públicos adicionales; total 40 fuentes
incluido agregado, 348 teoremas/lemas públicos. La matriz cambia doce filas:
cuatro nuevos matches completos y componentes delimitados en las restantes.
COVERAGE_DIFF contiene los símbolos, hipótesis, razones y obligaciones por ID.

## Demostraciones y controles

- A: empaquetado Hilbert de las cuatro conclusiones H1–H4, familia cero y
  violación explícita de H5; proyección radial identificada con la métrica
  y especializada al plano euclídeo. Iteración geométrica y restricción no
  lineal de frontera son componentes, no el espectro completo.
- B: dos torres Nat reales, canales conmutativos y continuidad producto;
  coeficiente C0 como ínfimo de todas las razones, cotas SUP y lectura posterior
  sólo en pares comparados. Canal constante prueba que Lipschitz superior no
  es coercividad. Cola de supremo y suma acotada se mantienen distintas.
- C/V: categoría tipada en marco de puertos fijo, recorridos de palabras,
  todos los predictores privados sobre productos sobreyectivos; máximo real
  e ínfimo sobre familias no vacías sin suponer mínimo alcanzado. Control
  hold exacto y swap separador; no se excluyen decodificadores conjuntos.
- C/IX: funciones arbitrarias de subconjuntos propios del cubo completo,
  contraste 4xi4, óptimo construido y media de error absoluto; réplica
  irrestricta de igual coste da margen cero. Sin equivalencia automática
  con la semántica completa de planta/ruido/coste del manuscrito.
- C/X: leyes conjuntas finitas, pérdidas de tres decisiones, coberturas y
  fugas limpias/acopladas separadas. Abstención gratuita y fuga selectiva
  son controles negativos, no pruebas empíricas.

## Ejecución y límites

Desarrollo serial con objetos previos verificados por hash únicamente para
iteración. Errores de elaboración y sus correcciones quedan en logs externos;
no se admiten huecos ni axiomas nuevos. Un intento encontró error Windows al
sobrescribir un objeto de desarrollo en E:; se pasó a salida única por intento.
No fue un resultado matemático. La baja RAM ralentizó imports; tras la acción
del usuario se observaron unos 5 GB libres. Ninguna aplicación se cerró por
herramienta y no se instaló WSL.

La puerta final requiere catorce pasos secuenciales en una copia nueva en E:,
con hash idéntico de entradas. Lean crea objetos nuevos para todo el paquete,
con un solo proceso y nueve revisiones de dependencias comprobadas. Se audita
cada declaración pública con #print axioms; sólo se permiten propext,
Classical.choice, Quot.sound. VERIFICACION_FINAL.json y LEAN_REPRODUCTION.json
son la evidencia final, no esta previsión. Las autopruebas que reescriben
fixtures se quedan en la copia aislada. El PDF/log de 435 páginas se reutiliza
por hash de Fase I: no hay cambios TeX ni nueva compilación anunciada aquí.

Etapa 3B: derivadas Fréchet/espectros del testigo y calibración logarítmica;
realización positiva no constante; métrica SUP completa y equivalencia
producto/Polish; semántica de IX para pasado aleatorio, ruido bruto, costes y
planta; probabilidad general, aleatorización y sharpness de X. No se degrada
una obligación a definición para subir cobertura.

Los avisos de estilo de cabecera de Mathlib se registran si aparecen; su formato
legal Apache no se adopta inventando autoría/licencia del proyecto. No se
silencian opciones de verificación. Cualquier otro aviso nuevo se revisa.

El estado científico permanece interno. Se conservan los veredictos crudos
completos en RELEASE_GATES.json y `external_support_certified=false`.
