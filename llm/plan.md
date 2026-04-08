En este archivo quiero generar la documentación de este catálogo de componentes en un formato amistoso para LLM, en el llm.txt.

Empezamos definiendo la ruta de destino en una constante.  "_site/llm.txt".

Luego definimos las carpetas donde va a buscar secciones de contenido. De momento lo hacemos con docs/components y docs/mixins

Definimos la carpeta donde estarán los markdown en crudo de cada seccion de documentación en otra constante: "_site/md".

Cada una de las secciones tendrá que copiar cada uno de los archivos md en crudo que tiene y meterlo en la carpeta correspondiente. Por ejemplo, un archivo que encuentre en el origen docs/components/x.md lo copiará en "_site/md/components/x.md".

Iremos creando en memoria una estructura de datos con cada cosa que copiemos cada carpeta y cada cada archivo copiado. esa estructura de datos sería parecia a esto:

[
  {
    title: "Components",
    files: [
      {
        title: 'dile-card',
        markdownFile: 'md/components/dile-card.md',
      },
      {
        title: 'dile-avatar',
        markdownFile: 'md/components/dile-avatar.md',
      },
    ],
  },
  {
    title: "Mixins",
    files: [
      {
        title: 'Form',
        markdownFile: 'md/components/dile-form-mixin.md',
      },
    ]
  }
]

los title de cada uno de los array de files lo sacamos del title que hay en el markdown en el frontmatter.

Por último necesitaremos generar el archivo llm.txt con el contenido de a estructura de datos generada, enlazando con cada una de las secciones de la estructura.

----

Además necesitamos poder definir una serie de páginas que irían en la introducción, después del título. Son páginas de información general que podemos colocar en un bloque "General information". Como estas páginas no están en una carpeta las debemos poder definir en un array de rutas. ["docs/how-to-use.md", "docs/theming.md", "docs/colors.md", "docs/contribute.md"]. De cada ruta de este array colocaremos también su título, extraido del frontmatter y la ruta donde está el archivo md.

---

Para cada sección vamos a agregar un sufijo por ejemplo:

{ 
    key: 'components',
    title: 'Components',
    sourceDir: path.join(__dirname, '../docs/components')
    sufix: 'component'
  },

Esto nos va a servir para transformar el listado que se genera, Ahora tenemos esto:

### dile-accordion
- Archivo: `md/components/dile-accordion.md`

Lo queremos así:

### dile-accordion

- [dile-accordion component](https://dile-components.com/md/components/dile-accordion.md)


Como puedes ver, usamos el título de la página, seguido del sufijo como texto del enlace y la url absoluta del contenido. La parte inicial de la URL "https://dile-components.com/" quiero que la pongas en una constante.

---

Ahora tenemos algunas secciones que no son simples listados y requieren una definición un poco más elaborada.

Para ello vamos a tener secciones que incluyan además "blocks". Por no ajustarse al patrón de otras secciones yo creo que las separaría, en una nueva constante BLOCK_SECTIONS.

Cada bloque se define así:

{
    key: 'crud',
    title: 'Crud Components',
    sourceDir: path.join(__dirname, '../docs/crud'),
    blocks: [
      {
        title: 'Configuration',
        suffix: 'documentation',
        documents: ['docs/cli/index.md', 'docs/crud/axios-configuration.md', 'docs/crud/response-adapter.md', 'docs/crud/request-adapter.md', 'docs/crud/resource-config.md', 'docs/crud/actions-configuration.md']
      }
    ]
}

Cada una de las p


<h2>Modules and components in this package</h2>

<div class="Clasification">
  {% for tag in crudTagsList %}        
    <dile-card 
     title="{{ tag | capitalize }}" 
    >
      <dile-selector>
        {% assign sortedComponents = collections[tag] | sort: "data.order" %}
        {% for component in sortedComponents %}
          {% include "layout-partials/nav-item.html" %}
        {% endfor %}
  
      </dile-selector>
    </dile-card>
  {% endfor %}

  {% if collections.uncategorizedCrud.size > 0 %}
    <dile-card 
     title="Other components" 
    >
      {% for component in collections.uncategorizedCrud %}
        {% include "layout-partials/nav-item.html" %}
      {% endfor %}
    </dile-card>
  {% endif %}
</div>