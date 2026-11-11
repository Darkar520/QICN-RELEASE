# Adenda de diseño prospectiva · 2026-11-11

Prerregistro original: SHA-256 `6f884a6fa4db81a70866b7c99833fbbaa9fe4958bd280c8d219acdea03d7b702`. Esta adenda se fija antes de ejecutar controles de la extensión. El cambio procede de la auditoría analítica del rival, no de resultados de simulación.

La elección L=I propuesta inicialmente es exactamente el gradiente de una función escalar de error. Aunque no factoriza por el valor del coste nativo, no derrota un rival conservativo con acceso al estado vectorial. Para añadir organización evaluativa no conservativa sin más estado, fijar

```
J = [[0,-1],[1,0]]
B = (I+J)/2 = [[1/2,-1/2],[1/2,1/2]]
```

como mapa evaluativo normal. Es la combinación equilibrada, de norma infinito uno, de una parte simétrica positiva y una antisimétrica. Para el error e=sensor-b, `e dot B e=||e||_2^2/2`: la fuerza tiene componente de corrección positiva. Para sensor fijo, la circulación de `k B(sensor-b)` en el cuadrado corporal de radio r es `-4 k r^2`, distinta de cero. No es un gradiente euclídeo de potencial escalar; esa afirmación se limita a la métrica y al campo declarados.

La respuesta reservada de V pasa a ser `gamma B v`. El error uniforme óptimo de los resúmenes escalares continuos es `gamma/2`: la colisión antipodal y `||B^{-1}||_inf=2` dan la cota; retener sólo v2 y reconstruir B(0,v2) la alcanza. El rival conservativo de gradiente C1 tiene el mismo error óptimo `gamma/2`: la circulación en la frontera es `4 gamma`, su perímetro L1 es ocho y el gradiente `gamma v/2` alcanza el error. Así, el mínimo sobre la unión de ambos rivales sigue siendo exactamente `gamma/2`. Al ruido original por lectura, el margen normalizado robusto de V es `7/16`, sustituyendo `15/16`.

La intervención V usa `L=B Q_comun`, que suprime un canal evaluativo y preserva la respuesta del modo común. Los proyectores de una sola coordenada son `B E_11` y `B E_22`. El control conservativo L=I conserva rango dos y norma uno, pero pierde el certificado de V frente al rival gradiente. El control `(I-J)/2` conserva la organización con circulación opuesta. Con compresión de mundo, la respuesta V es `gamma Q B Q = gamma Q/2`: pierde rango aunque conserva el agregado común. Con motor cortado, la consecuencia reservada de V es cero. Con perfil aplanado cambia eventualmente la orientación, pero conserva los dos márgenes de V.

Las predicciones de W/E y los seis efectos selectivos no cambian. El vector robusto normalizado queda

```
(1/4, 7/16, 13/96, 1/4, 31/32, 1/2-64/19683).
```

Su mínimo sigue siendo `13/96`; la cota conjunta de pérdida máxima `5/192` no cambia. La cota uniforme de contracción de fibra `3/4` ya prevista cubre el nuevo mapa. El modo nativo mantiene factor `1/2` en la fibra y `9/16` en el sistema extendido. Se conserva el mínimo lineal de cuatro estados.

Se añaden dos controles de capacidad adversarial: un resumen escalar/interpolador que ajusta una rejilla finita, y un potencial polinómico de Hermite con gradiente que interpola esa misma rejilla. Ambos pueden empatar en todos los puntos de una tabla finita. Por tanto las separaciones universales se apoyarán en las fórmulas y demostraciones sobre el dominio completo, no en interpretar una tabla finita como prueba de ausencia de rivales no paramétricos.

La obstrucción de híbridos se fortalece: dos evaluadores escalares `B E_11 e` y `B E_22 e` suman la fuerza del candidato con el mismo estado compartido. Además el campo admite la representación `-k B grad(U)` para `U=||b-sensor||_2^2/2`; permitir movilidad no simétrica hace que un modelo escalar de potencial reproduzca la dinámica. Esto no contradice el teorema del resumen escalar: el potencial conserva acceso a las dos coordenadas. El empate de estas familias amplias se reportará explícitamente. No se declarará cerrado B9 ni GateBridge por el certificado local.
