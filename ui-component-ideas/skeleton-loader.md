# Skeleton loader

## Idea

Un componente para representar la estructura aproximada del contenido mientras los datos todavía se están cargando.

## Problema que resuelve

El catálogo tiene indicadores de progreso y spinners para señalar una carga, pero estos no anticipan el espacio ni la forma del contenido que aparecerá. Los skeletons pueden reducir los cambios bruscos de diseño y ayudar a entender qué partes de la interfaz siguen pendientes.

## Comportamiento propuesto

- Permitir configurar formas habituales, como texto, avatar, imagen, tarjeta o fila.
- Permitir combinar varios bloques para componer esqueletos de listas y tarjetas.
- Mantener dimensiones previsibles para evitar saltos de contenido al terminar la carga.
- Ofrecer una animación de brillo opcional y una variante estática.
- Permitir que la aplicación controle cuándo se muestra y cuándo se sustituye por contenido real.

## Casos de uso

- Filas de una lista o tabla que espera datos.
- Tarjetas de contenido o perfiles.
- Paneles que cargan de forma independiente.

## Límites de alcance

El componente solo representa una carga visual: no obtiene datos, no decide si una solicitud terminó y no sustituye al spinner cuando se necesita mostrar progreso cuantificable o una operación bloqueante.

## Accesibilidad

El contenido provisional no debe anunciarse como contenido real. La aplicación debe poder marcar la región como ocupada y proporcionar un mensaje accesible de carga cuando sea necesario. La animación debe respetar la preferencia del sistema por movimiento reducido y no ser la única señal de estado.

## Alcance inicial sugerido

Bloques configurables por tamaño y forma, animación opcional, modo estático y soporte para composición mediante contenido hijo. Evitar imponer una estructura rígida de plantillas.
