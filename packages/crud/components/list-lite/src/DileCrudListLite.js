import { LitElement, html, css } from 'lit';
import { DileAxios } from '../../../lib/DileAxios.js';
import '../../list/crud-list-item.js';
import '@dile/iconlib/dile-iconlib.js';
import '@dile/ui/components/spinner/spinner-horizontal.js';

export class DileCrudListLite extends DileAxios(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      .spinner-container {
        min-height: 2.5rem;
        display: flex;
        align-items: center;
      }
      p.empty {
        margin: 0;
        color: var(--dile-on-background-color, #303030);
      }
      p.error {
        margin: 0;
        color: var(--dile-crud-list-lite-error-color, #c00);
      }
      dile-iconlib.item-icon {
        --dile-icon-color: var(--dile-crud-list-lite-icon-color, #888);
        --dile-icon-size: var(--dile-crud-list-lite-icon-size, 20px);
        margin-right: var(--dile-crud-list-lite-icon-margin-right, 0.5rem);
      }
      a.footer-link {
        display: block;
        margin-top: var(--dile-crud-list-lite-footer-link-margin-top, 0.75rem);
        color: var(--dile-crud-list-lite-footer-link-color, var(--dile-primary-color, #7BB93D));
        font-size: var(--dile-crud-list-lite-footer-link-font-size, 0.9rem);
        text-align: var(--dile-crud-list-lite-footer-link-text-align, right);
      }
      button.show-more-link {
        display: block;
        width: 100%;
        margin-top: var(--dile-crud-list-lite-show-more-link-margin-top, 0.75rem);
        padding: 0;
        border: 0;
        background: none;
        font: inherit;
        cursor: pointer;
        color: var(--dile-crud-list-lite-show-more-link-color, var(--dile-primary-color, #7BB93D));
        font-size: var(--dile-crud-list-lite-show-more-link-font-size, 0.9rem);
        text-align: var(--dile-crud-list-lite-show-more-link-text-align, right);
        text-decoration: underline;
      }
    `
  ];

  static get properties() {
    return {
      endpoint: { type: String },
      resultDataProperty: { type: String },
      getResultList: { type: Object },
      additionalQueryString: { type: Object },

      idProperty: { type: String },
      labelProperty: { type: String },
      linkProperty: { type: String },
      icon: { type: String },
      iconProperty: { type: String },
      itemTemplate: { type: Object },

      maxItems: { type: Number },
      moreLinkLabel: { type: String },
      footerLinkLabel: { type: String },
      footerLinkUrl: { type: String },

      showEditAction: { type: Boolean },
      showDeleteAction: { type: Boolean },
      showRestoreAction: { type: Boolean },
      deletedProperty: { type: String },

      emptyMessage: { type: String },
      ajaxErrorMessage: { type: String },
      disableLoadOnStart: { type: Boolean },

      loading: { type: Boolean, state: true },
      ajaxError: { type: Boolean, state: true },
      data: { type: Array, state: true },
      _visibleCount: { state: true },
    };
  }

  constructor() {
    super();
    this.resultDataProperty = 'data';
    this.idProperty = 'id';
    this.labelProperty = 'name';
    this.showEditAction = false;
    this.showDeleteAction = false;
    this.showRestoreAction = false;
    this.emptyMessage = 'No data available';
    this.ajaxErrorMessage = 'Error loading data';
    this.disableLoadOnStart = false;
    this.loading = false;
    this.ajaxError = false;
    this.data = [];
    this._started = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.disableLoadOnStart) {
      this.start();
    }
  }

  /**
   * Triggers the first load. Only needed when `disableLoadOnStart` is set;
   * calling it again after the first load is a no-op (use refresh() instead).
   */
  start() {
    if (this._started) return;
    this._started = true;
    this.loadData();
  }

  refresh() {
    if (!this._started) {
      this.start();
    } else {
      this.loadData();
    }
  }

  loadData() {
    this.loading = true;
    this.ajaxError = false;
    let params = { ...(this.additionalQueryString || {}) };
    this.axiosInstance.get(this.endpoint, { params })
      .then((response) => {
        if (response.status === 200) {
          this.data = this.getResultData(response.data);
          this._visibleCount = this.maxItems;
          this.updateComplete.then(() => this.loading = false);
        } else {
          this.registerError();
        }
      })
      .catch(() => this.registerError());
  }

  getResultData(json) {
    if (this.getResultList) {
      return this.getResultList(json) ?? [];
    }
    if (this.resultDataProperty) {
      return json[this.resultDataProperty] ?? [];
    }
    return Array.isArray(json) ? json : [];
  }

  registerError() {
    this.ajaxError = true;
    this.loading = false;
  }

  /**
   * Returns the ids (per `idProperty`) of every fetched item, regardless of `maxItems`.
   */
  getAllIds() {
    return this.data.map(item => item[this.idProperty]);
  }

  /**
   * Reveals one extra batch (of `maxItems` size) of already-fetched items.
   */
  showMore() {
    this._visibleCount = Math.min(this.data.length, (this._visibleCount ?? this.maxItems) + this.maxItems);
  }

  render() {
    if (!this._started) {
      return html``;
    }
    return this.loading
      ? html`<div class="spinner-container"><dile-spinner-horizontal active></dile-spinner-horizontal></div>`
      : this.ajaxError
        ? html`<p class="error">${this.ajaxErrorMessage}</p>`
        : this.data.length === 0
          ? html`<p class="empty">${this.emptyMessage}</p>`
          : this.listTemplate;
  }

  get listTemplate() {
    const items = this.maxItems ? this.data.slice(0, this._visibleCount ?? this.maxItems) : this.data;
    const showMoreLinkVisible = this.moreLinkLabel && this.maxItems && items.length < this.data.length;
    return html`
      <div class="elements-container">
        ${items.map(item => html`
          <dile-crud-list-item
            .item=${item}
            itemId="${item[this.idProperty]}"
            hideCheckboxSelection
            ?disableEdit=${!this.showEditAction}
            ?disableDelete=${!this.showDeleteAction}
            ?disableRestore=${!this.showRestoreAction}
            ?isDeleted=${this.deletedProperty && item[this.deletedProperty]}
          >
            ${this.itemTemplate ? this.itemTemplate(item) : this.defaultItemTemplate(item)}
          </dile-crud-list-item>
        `)}
      </div>
      ${showMoreLinkVisible ? html`<button type="button" class="show-more-link" @click=${this.showMore}>${this.moreLinkLabel}</button>` : ''}
      ${this.footerLinkUrl ? html`<a class="footer-link" href="${this.footerLinkUrl}">${this.footerLinkLabel}</a>` : ''}
    `;
  }

  defaultItemTemplate(item) {
    const icon = (this.iconProperty && item[this.iconProperty]) || this.icon;
    const label = item[this.labelProperty];
    return html`
      ${icon ? html`<dile-iconlib class="item-icon" icon="${icon}" aria-hidden="true"></dile-iconlib>` : ''}
      ${this.linkProperty
        ? html`<a href="${item[this.linkProperty]}">${label}</a>`
        : html`<span>${label}</span>`
      }
    `;
  }
}
