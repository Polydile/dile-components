---
layout: layout.html
title: Icon Catalog
tags: icons
---

# Icon Catalog

This is the full icon catalog — all icons from Lucide, Material, FontAwesome, Phosphor and Tabler combined, searchable and paginated — using the [`dile-crud`](/crud/crud-component/) component, with its insert/edit/delete features turned off through configuration.

Click any icon to see how to use it in your own project.

```html:preview
<script type="module">
  import { CrudConfigBuilder } from '@dile/crud/lib/CrudConfigBuilder';
  import '@dile/crud/components/crud/crud.js';

  {% include "icon-catalog/icon-catalog-shared.md" %}

  const iconsConfig = new CrudConfigBuilder('https://api-icons.dile-components.com/api/icons', {
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
          { value: 'phosphor', label: 'Phosphor' },
          { value: 'tabler', label: 'Tabler' },
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
<demo-icon-usage-modal></demo-icon-usage-modal>
```
