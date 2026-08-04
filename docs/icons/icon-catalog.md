---
layout: layout.html
title: Icon Catalog (API)
tags: icons
---

# Icon Catalog

Unlike the other pages in this section, which show static examples of each icon library, this page queries a **live REST API** (`GET /api/icons`) that serves the full icon catalog — all icons from Lucide, Material and FontAwesome combined, searchable and paginated — using the [`dile-crud`](/crud/crud-component/) component, with its insert/edit/delete features turned off through configuration.

Each icon in the API response already includes its resolved SVG markup, so the page renders it directly with no additional per-icon requests.

> This demo points at `http://localhost/api/icons`. It requires a local API server implementing the endpoint contract described below to actually display data.

## API contract

`GET /api/icons` accepts `per_page`, `keyword` and `filters` query params, and returns:

```json
{
  "status": 200,
  "message": "6846 items found",
  "data": {
    "countItems": 6846,
    "result": {
      "current_page": 1,
      "next_page_url": "http://localhost/api/icons?per_page=24&page=2",
      "prev_page_url": null,
      "data": [
        {
          "id": 6851,
          "slug": "fontawesome.regular-home",
          "library": "fontawesome",
          "is_brand": false,
          "name": "regular-home",
          "tag": "dile-fontawesome-icon-regular-home",
          "import": "@dile/iconlib/fontawesome-icons/regular-home.js",
          "svg": "<svg ...>...</svg>",
          "keywords": ["house", "residence"]
        }
      ]
    }
  }
}
```

## Live catalog

```html:preview
<script type="module">
  import { LitElement, html, css } from 'lit';
  import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
  import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
  import { ResponseApiAdapter } from '@dile/crud/lib/ResponseApiAdapter';
  import '@dile/crud/components/crud/crud.js';

  class DemoIconCatalogItem extends LitElement {
    static styles = css`
      :host { 
        display: flex;
        flex-direction: column;
        flex: 1;      
        width: 100%;  
        justify-content: space-between;
      }
      .icon-catalog-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 0;
      }
      .icon-preview svg {
        width: 28px;
        height: 28px;
        color: #444;
        display: block;
      }
      .meta {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }
      .name {
        font-weight: 600;
      }
      .badges {
        display: flex;
        gap: 0.15rem;
        font-size: 0.75rem;
        line-height: 0.75rem;
      }
      .badge {
        padding: 0.25rem 0.25rem;
        border-radius: 5px;
        background: #eee;
        color: #555;
      }
      .badge.brand {
        background: #ffe4b5;
        color: #7a4b00;
      }
    `;

    static get properties() {
      return { icon: { type: Object } };
    }

    render() {
      if (!this.icon) return html``;
      return html`
        <div class="icon-catalog-item">
          <span class="icon-preview">${unsafeSVG(this.icon.svg)}</span>
          <div class="meta">
            <span class="name">${this.icon.name}</span>
            <span class="badges">
              <span class="badge">${this.icon.library}</span>
              ${this.icon.is_brand ? html`<span class="badge brand">brand</span>` : ''}
            </span>
          </div>
        </div>
      `;
    }
  }
  customElements.define('demo-icon-catalog-item', DemoIconCatalogItem);

  // The API wraps the paginated result as { data: { countItems, result: { data: [...], current_page, next_page_url, prev_page_url } } }.
  // That already matches ResponseApiAdapter's default getPaginationData() (response.data), so only
  // getElementList() needs to be overridden to reach into result.data for the actual icon array.
  class IconResponseApiAdapter extends ResponseApiAdapter {
    getElementList() {
      return this.response.data.result.data;
    }
  }

  const iconsConfig = new CrudConfigBuilder('http://localhost/api/icons', {
    customization: {
      disablePagination: false,
      disableKeywordSearch: false,
      disableSort: false,
      disableFilter: false,
      hideCheckboxSelection: true,
      disableInsert: true,
      disableEdit: true,
      disableUpdate: true,
      disableDelete: true,
      disableRestore: true,
      disableHelp: true,
    },
    pageSize: {
      available: [24, 48],
      initial: 24,
    },
    responseAdapter: new IconResponseApiAdapter(),
    templates: {
      item: (icon) => html`<demo-icon-catalog-item .icon=${icon}></demo-icon-catalog-item>`,
    },
    sort: {
      options: [{ name: 'name', label: 'Name', direction: 'asc' }],
      initialSortField: 'name',
    },
    availableFilters: [
      {
        name: 'library',
        label: 'Library',
        active: false,
        value: false,
        type: 'select',
        options: [
          { value: 'lucide', label: 'Lucide' },
          { value: 'material', label: 'Material' },
          { value: 'fontawesome', label: 'FontAwesome' },
        ],
      },
      {
        name: 'is_brand',
        label: 'Only brands',
        active: false,
        value: false,
        type: 'boolean',
      },
    ],
  });

  // <dile-crud> already includes the search box and filters panel, gated by
  // config.customization — no need to wire <dile-input-search>/<dile-crud-filters> by hand.
  class DemoIconCatalogList extends LitElement {
    static styles = css`
      :host { 
        display: block;
      }
      @media(min-width: 420px) {
        :host { 
          --dile-crud-list-item-display: flex;
          --dile-crud-list-elements-container-template-columns: 1fr 1fr;
          --dile-crud-list-item-line-separator: none;

        }
      }
      @media(min-width: 700px) {
        :host { 
          --dile-crud-list-elements-container-template-columns: 1fr 1fr 1fr;
        }
      }
      @media(min-width: 950px) {
        :host { 
          --dile-crud-list-elements-container-template-columns: 1fr 1fr 1fr 1fr;
        }
      }
    `;

    static get properties() {
      return { config: { type: Object } };
    }

    constructor() {
      super();
      this.config = iconsConfig.getConfig();
    }

    render() {
      return html`<dile-crud title="Icon Catalog" .config="${this.config}"></dile-crud>`;
    }
  }
  customElements.define('demo-icon-catalog-list', DemoIconCatalogList);
</script>
<demo-icon-catalog-list></demo-icon-catalog-list>
```
