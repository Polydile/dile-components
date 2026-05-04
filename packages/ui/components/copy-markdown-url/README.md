# dile-copy-markdown-url

Un componente Web que permite copiar el contenido de una URL al portapapeles. Reutiliza el componente `dile-copy-text` y usa fetch para obtener el contenido de la URL de forma simple y eficiente.

## Instalación

```bash
npm install @dile/ui
```

## Importación

```javascript
import '@dile/ui/components/copy-markdown-url/copy-markdown-url.js';
```

## Uso

```html
<dile-copy-markdown-url 
  url="https://ejemplo.com/archivo.md"
>
  Copiar markdown
</dile-copy-markdown-url>
```

## Propiedades

- **url** (String): La URL del contenido a copiar
- **copiedDuration** (Number): Duración en milisegundos del feedback de copia (por defecto: 1000)
- **feedbackText** (String): Texto del feedback visual (por defecto: 'Copied!')
- **hideIcon** (Boolean): Ocultar el icono en el feedback (por defecto: false)

## Eventos

Hereda todos los eventos de `dile-copy-text`:

- **dile-text-copied**: Se dispara cuando el contenido se ha copiado correctamente
  - `detail.text`: El contenido que se copió

Además, dispara:

- **dile-copy-markdown-url-error**: Se dispara cuando hay un error al obtener el contenido de la URL
  - `detail.message`: Descripción del error

## Estilos CSS personalizables

El componente hereda los estilos de `dile-copy-text`, así que puedes usar las mismas variables CSS:

- `--dile-copy-text-text-decoration`: Decoración del texto del enlace (por defecto: none)
- `--dile-copy-text-color`: Color del texto del enlace (por defecto: inherit)
- `--dile-copy-text-transition-duration`: Duración de la transición (por defecto: 0.3s)
- `--dile-copy-text-hover-color`: Color del texto al hacer hover (por defecto: #0066cc)
- `--dile-copy-text-hover-text-decoration`: Decoración al hacer hover (por defecto: underline)
- `--dile-copy-text-focus-outline`: Contorno al tener enfoque (por defecto: 2px solid #0066cc)

## Ejemplo completo

```html
<dile-copy-markdown-url 
  url="https://raw.githubusercontent.com/user/repo/main/README.md"
  feedbackText="¡Markdown copiado!"
  copiedDuration="2000"
>
  📋 Copiar README
</dile-copy-markdown-url>

<script type="module">
  const copyBtn = document.querySelector('dile-copy-markdown-url');
  
  copyBtn.addEventListener('dile-text-copied', (e) => {
    console.log('Contenido copiado:', e.detail.text);
  });
  
  copyBtn.addEventListener('dile-copy-markdown-url-error', (e) => {
    console.error('Error:', e.detail.message);
  });
</script>
```

## Comportamiento

1. El usuario hace click en el componente
2. Si es la primera vez, el componente hace un fetch a la URL especificada
3. Una vez obtiene el contenido, automáticamente lo copia al portapapeles
4. Se muestra un feedback visual indicando que el contenido se copió
5. En los siguientes clicks, el contenido ya está cacheado y se copia directamente
