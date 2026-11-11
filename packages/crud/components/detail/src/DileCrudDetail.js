import { LitElement, html, css } from 'lit';
import { formStyles } from '../../../styles/form-styles.js';
import { crudStyles } from '../../../styles/crud-styles.js';
import { DileLoading, loadingStyles } from '../../../lib/DileLoading.js';
import '../../ajax/ajax.js';
import { ResponseApiAdapter } from '../../../lib/ResponseApiAdapter.js';

export class DileCrudDetail extends DileLoading(LitElement) {
  static styles = [
    formStyles,
    crudStyles,
    loadingStyles,
    css`
        :host {
            display: block;
            margin-bottom: 0;
        }
        /* The --dile-crud-single-detail-* variables are the defaults that a parent
           (dile-crud-single in its sidebar layout) can provide. The public
           --dile-crud-detail-data-* variables always take precedence over them. */
        .detail-data {
            background-color: var(--dile-crud-detail-data-background-color, var(--dile-crud-single-detail-background-color, #f5f5f5));
            padding: var(--dile-crud-detail-data-padding, 1rem);
            border: var(--dile-crud-detail-data-border, var(--dile-crud-single-detail-border, none));
            box-shadow: var(--dile-crud-detail-data-box-shadow, var(--dile-crud-single-detail-box-shadow, none));
            border-top-left-radius: var(--dile-crud-detail-data-border-top-left-radius, var(--dile-crud-single-detail-border-radius, 0.6rem));
            border-top-right-radius: var(--dile-crud-detail-data-border-top-right-radius, var(--dile-crud-single-detail-border-radius, 0.6rem));
            border-bottom-left-radius: var(--dile-crud-detail-data-border-bottom-left-radius, var(--dile-crud-single-detail-border-radius, 0));
            border-bottom-right-radius: var(--dile-crud-detail-data-border-bottom-right-radius, var(--dile-crud-single-detail-border-radius, 0));
        }
        .detail-data p {
            margin: 0.05rem 0;
        }
        main {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
        }
        section {
            padding: 1rem 0 0;
            flex-grow: 1;
        }
        .morecontent {
            display: grid;
            grid-template-columns: auto 1fr;
            column-gap: 0.6rem;
            row-gap: 0.25rem;
            padding: 0.25rem 0 0;
            font-size: 0.85rem;
        }
        aside {
            padding: 1rem 0;
            min-width: 32px;
        }
        
    `
  ];

  static get properties() {
    return {
      endpoint: { type: String },
      element: { type: Object },
      itemDetailTemplate: { type: Object },
      responseAdapter: { type: Object },
    };
  }

  constructor() {
    super();
    this.responseAdapter = new ResponseApiAdapter();
  }

  firstUpdated() {
    this.ajaxget = this.shadowRoot.getElementById('ajaxget');
  }

  updated(changedProperties) {
    if (changedProperties.has('endpoint')) {
      this.refresh();
    }
  }

  render() {
    return html`
      ${this.ajaxTemplate}
      ${this.loading
        ? this.loadingTemplate
        : this.itemTemplate
      }
    `;
  }

  get ajaxTemplate() {
    return html`
      <dile-ajax
        id="ajaxget"
        method="get"
        url="${this.endpoint}"
        @ajax-success="${this.doSuccessGet}"
        @ajax-error="${this.doErrorGet}"
      ></dile-ajax>
    `
  }

  get itemTemplate() {
    return html`
      <div class="detail-data">
          ${this.itemDetailTemplate(this.element)}
      </div>
    `;
  }

  itemEdit() {
    this.dispatchEvent(new CustomEvent('item-edit', {
      bubbles: true,
      composed: true,
      detail: { itemId: this.element.id },
    }));
  }

  itemDelete() {
    this.dispatchEvent(new CustomEvent('item-delete', {
      bubbles: true,
      composed: true,
      detail: { itemId: this.element.id },
    }));
  }

  doSuccessGet(e) {
    this.loading = false;
    this.responseAdapter.setResponse(e.detail);
    this.element = this.responseAdapter.getData();
    this.dispatchEvent(new CustomEvent('crud-item-detail-loaded', {
      bubbles: true,
      composed: true,
      detail: {
        element: this.element,
        previousDetail: e.detail,
      }
    }));
  }

  doErrorGet(e) {
    this.loading = false;
    this.dispatchEvent(new CustomEvent('crud-item-detail-load-error', {
      bubbles: true,
      composed: true,
      detail: e.detail,
    }));
  }

  refresh() {
    this.ajaxget.generateRequest();
  }
}