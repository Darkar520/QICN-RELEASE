# Auditoría previa y diseño matemático de Etapa 2

Base f985470; 881 archivos preservados. Baseline once controles aprobado,
33 suites y release 6/6, 224.89 s. Ocho PDF descendentes y monolito inspeccionados.
Tres resultados generados del arranque y dos cachés preservados en E: antes
de recuperar el árbol limpio. Ninguna ejecución QICN seguía viva.

## Deudas contrastadas con las fuentes
- PIII 623–632 ya tiene una deducción válida del teorema del par con ancla y
  constante inferior certificada. Cambiar sólo el overlay/FCR, no su prueba.
- PV: la proposición 899 ya es condicional sobre un error uniforme positivo.
  El teorema de atomicidad necesita una categoría con productos y reflexión
  por puertos tipadas. Usar separadores de respuesta previos a la factorización;
  demostrar un margen sigma/2 y realizarlo con swap de dos bits. Control hold
  exacto producto y control de comunicación cruzada, con mismos comandos/costes.
- PVIII 449/462/470 siguen siendo criterios, no pruebas. Reemplazar por tres
  teoremas condicionales conservando labels/IDs: margen de pérdidas continuo y
  persistencia uniforme; sumas de caminos causales bajo isomorfismos primitivos;
  reconstrucción con mapas de intervención y pérdidas que descienden a las
  cinco primarias. El perfil es un indicador: sólo es continuo fuera de fronteras.
  La compresión universal falla si dos registros con iguales primarias tienen
  diferentes respuestas; cota de reconstrucción de media distancia.
- PIX: el texto ya prueba seis cargas locales en una planta, pero también una
  igualdad exacta con un rival cross-informed. Eso no realiza el gate completo.
  Los slots B1–B10 mezclan datos, hipótesis y políticas; no son diez bits libres.
  Se requiere construir modelos semánticos y estudiar dependencias del registro,
  sin promover el certificado local ni borrar el control de empate. La realización
  completa y su identificación se auditarán separadamente antes de decidir estado.
- PX: las dos cotas de fuga y el coste de abstención ya tienen pruebas distintas;
  revisar y transportar supuestos, sin recalibrarlas ni reutilizar potencia sintética.

## Orden de implementación
1. PV y PVIII: pruebas y negativos con contratos explícitos; cero cambios a Lean.
2. PIX: independencia semántica, restricciones de interfaz/loss y realizabilidad
   conjunta, preservando obstrucciones de los rivales ampliados y herencia global.
3. IV/VI/VII/X/Puente: auditoría de contratos y propagación de Etapa 1.
4. FCR quirúrgico, 383 macros invariantes, cobertura por tipos reales, salud/grafo.
5. Suite 34, PDF unitarios, monolito y estructura de Ruta5B, luego 14 puertas
   secuenciales y commit local. No push. external_support_certified=false.

Prerregistro congelado antes de pruebas nuevas. Pruebas manuscritas y controles
racionales no equivalen a mecanización ni evidencia externa. Los estados y
obligaciones se actualizarán con evidencia, no como requisito cosmético del gate.
