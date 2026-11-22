# Vista de árbol

## Idea

Un componente para presentar y recorrer datos jerárquicos mediante nodos expandibles y contraíbles.

## Problema que resuelve

El catálogo incluye listas y controles de navegación, pero no una presentación especializada para jerarquías con niveles anidados. Reutilizar listas planas para este fin deja a cada aplicación a cargo de la expansión, la navegación por teclado y la comunicación de la jerarquía.

## Comportamiento propuesto

- Representar nodos con etiqueta y, opcionalmente, icono, estado o contenido complementario.
- Permitir expandir y contraer ramas, con configuración inicial para nodos abiertos.
- Admitir selección de nodo, selección múltiple opcional y notificación de los cambios.
- Diferenciar nodos hoja de nodos con descendientes y permitir ramas cargadas bajo demanda.
- Permitir que la aplicación proporcione los datos o componga nodos mediante elementos hijos.
- Mantener un comportamiento predecible ante ramas vacías, nodos deshabilitados y cambios en los datos.

## Casos de uso

- Navegadores de archivos y carpetas.
- Categorías y filtros anidados.
- Exploradores de estructura, como menús de administración o taxonomías.

## Límites de alcance

No debería ser una tabla jerárquica ni un sistema completo de gestión de archivos. Operaciones como arrastrar nodos, renombrarlos o editar permisos podrían añadirse aparte si surge una necesidad concreta.

## Accesibilidad

Debe exponer la semántica de árbol y de nodo, anunciar los niveles y estados de expansión, y permitir navegar con teclado por las ramas. La selección y el foco deben distinguirse visualmente sin depender únicamente del color.

## Alcance inicial sugerido

Árbol de solo lectura con expansión, selección simple, etiquetas accesibles, navegación por teclado y evento de selección. La carga diferida puede formar parte del diseño inicial si no complica el uso básico.
