import { LitElement, html, css } from 'lit';
import { DileEmmitChange } from '@dile/ui/mixins/form/index.js';
import { DileAxios } from '../../../lib/DileAxios.js';
import '@dile/ui/components/select/select.js';
import '@dile/ui/components/spinner/spinner-horizontal.js';
import { labelStyles } from '@dile/ui/components/input/src/label-styles.js';
import { messageStyles } from '@dile/ui/components/input/src/message-styles.js';

export class DileSelectAjaxSimple extends DileAxios(DileEmmitChange(LitElement)) {

  static get styles() {
    return [
      labelStyles,
      messageStyles,
      css`
        :host {
          display: block;
          margin-bottom: 10px;
        }
        dile-select {
          --dile-input-width: 100%;
          margin-bottom: 0;
        }
        .spinner-container {
          min-height: 2.5rem;
          display: flex;
          align-items: center;
        }
        p.empty {
          margin: 0;
          font-size: var(--dile-input-label-font-size, 1em);
          color: var(--dile-on-background-color, #303030);
        }
        p.error {
          margin: 0;
          font-size: var(--dile-input-label-font-size, 1em);
          color: var(--dile-input-message-error-color, #c00);
        }
      `
    ];
  }

  static get properties() {
    return {
      name: { type: String, reflect: true },
      label: { type: String },
      endpoint: { type: String },
      value: { type: String },
      disabled: { type: Boolean },
      errored: { type: Boolean },
      message: { type: String },
      selectDefaultPlaceholder: { type: String },
      emptyMessage: { type: String },
      ajaxErrorMessage: { type: String },
      resultDataProperty: { type: String },
      getSelectResultList: { type: Object },
      displayProperty: { type: String },
      idProperty: { type: String },
      maxResults: { type: Number },
      pageParamName: { type: String },
      additionalQueryString: { type: Object },
      loading: { type: Boolean, state: true },
      ajaxError: { type: Boolean, state: true },
      data: { type: Array, state: true },
    };
  }

  constructor() {
    super();
    this.selectDefaultPlaceholder = 'Select an option...';
    this.emptyMessage = 'No data available';
    this.ajaxErrorMessage = 'Error loading data';
    this.resultDataProperty = 'data';
    this.displayProperty = 'name';
    this.idProperty = 'id';
    this.loading = false;
    this.ajaxError = false;
    this.data = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadData();
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.selectCurrentValue();
      this.emmitChange();
    }
  }

  loadData() {
    this.loading = true;
    this.ajaxError = false;
    let params = { ...(this.additionalQueryString || {}) };
    if (this.pageParamName && this.maxResults) {
      params[this.pageParamName] = this.maxResults;
    }
    this.axiosInstance.get(this.endpoint, { params })
      .then((response) => {
        if (response.status === 200) {
          this.data = this.getResultData(response.data);
          this.updateComplete.then(() => {
            this.loading = false;
            if (this.value) {
              this.selectCurrentValue();
            }
          });
        } else {
          this.registerError();
        }
      })
      .catch(() => this.registerError());
  }

  getResultData(json) {
    if (this.getSelectResultList) {
      return this.getSelectResultList(json) ?? [];
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

  // Sets the native select value after options are rendered
  selectCurrentValue() {
    const select = this.shadowRoot.querySelector('dile-select');
    if (select) {
      select.value = this.value;
    }
  }

  onSelected(e) {
    this.value = e.detail.value;
    e.stopPropagation();
  }

  /**
   * Clears the select value and resets it to empty.
   * Used by DileForm.clearData() method.
   */
  clear() {
    this.value = '';
  }

  /**
   * Clears the error state and error message.
   * Used when need to clean error messages from the field.
   */
  clearError() {
    this.errored = false;
    this.message = '';
  }

  render() {
    return html`
      ${this.label ? html`<label>${this.label}</label>` : ''}
      ${this.loading
        ? html`<div class="spinner-container"><dile-spinner-horizontal active></dile-spinner-horizontal></div>`
        : this.ajaxError
          ? html`<p class="error">${this.ajaxErrorMessage}</p>`
          : this.data.length === 0
            ? html`<p class="empty">${this.emptyMessage}</p>`
            : html`
                <dile-select
                  name="${this.name}"
                  ?disabled=${this.disabled}
                  ?errored=${this.errored}
                  message="${this.message || ''}"
                  @element-changed=${this.onSelected}
                >
                  <select slot="select">
                    <option value="">${this.selectDefaultPlaceholder}</option>
                    ${this.data.map(item => html`
                      <option value="${item[this.idProperty]}">${item[this.displayProperty]}</option>
                    `)}
                  </select>
                </dile-select>
              `
      }
    `;
  }
}
