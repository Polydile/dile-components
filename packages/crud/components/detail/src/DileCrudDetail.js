import { LitElement, html, css } from 'lit';
import { formStyles } from '../../../styles/form-styles';
import { DileLoading, loadingStyles } from '../../../lib/DileLoading.js';
import '../../ajax/ajax.js';
import { ResponseApiAdapter } from '../../../lib/ResponseApiAdapter.js';

export class DileCrudDetail extends DileLoading(LitElement) {
  static styles = [
    formStyles,
    loadingStyles,
    css`
        :host {
            display: block;
            margin-bottom: 0;
        }
        .detail-data {
            background-color: #f5f5f5;
            padding: 1rem;
            border-top-left-radius: 0.6rem;
            border-top-right-radius: 0.6rem;

        }
        .detail-data p {
            margin: 0.05rem 0;
        }
        main {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            --dile-icon-color: #bbb;
            --dile-icon-size: 32px;
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
        h1 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            margin-top: 0;
        }
        aside {
            padding: 1rem 0;
            min-width: 32px;
        }
        
        @media(min-width : 520px) {
            main {
                --dile-icon-size: 48px;
            }
        }
        @media(min-width : 800px) {
            main {
                --dile-icon-size: 64px;
            }
            h1 {
                font-size: 1.8rem;
            }
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
    // console.log('success get', e.detail);
    this.loading = false;
    this.responseAdapter.setResponse(e.detail);
    this.element = this.responseAdapter.getElement();
    this.dispatchEvent(new CustomEvent('crud-item-detail-loaded', {
      bubbles: true,
      composed: true,
      detail: e.detail,
    }));
  }

  doErrorGet(e) {
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