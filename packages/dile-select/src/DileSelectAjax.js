import { LitElement, html, css } from 'lit';
import '@dile/dile-input-search/dile-input-search.js';
import '@dile/dile-spinner/dile-spinner-horizontal.js';
import { DileEmmitChangeMixin } from '@dile/dile-form-mixin'; 
import '../dile-select.js';

export class DileSelectAjax  extends DileEmmitChangeMixin(LitElement) {

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: block;
        position: relative;
        margin-bottom: 10px;
      }
      label {
        display: block;
        margin-bottom: var(--dile-input-label-margin-bottom, 4px);
        font-size: var(--dile-input-label-font-size, 1em);
        color: var(--dile-input-label-color, #59e);
        font-weight: var(--dile-input-label-font-weight, normal);
      }
      .anchor {
        margin-top: 0.5rem;
        position: relative;
      }
      section {
        min-height: 2.5rem;
        width: var(--dile-input-width, 100%);
        border-radius: var(--dile-input-border-radius, 5px);
        padding: var(--dile-input-padding,  7px 5px);
        display: none;
        position: absolute;
        background-color: #fff;
        border: 1px solid #ccc;
        border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
        flex-direction: column;
        justify-content: center;
      }
      p {
        margin: 0;
      }
      .opened {
        display: flex;
      }
      dile-select {
        margin-bottom: 0;
        --dile-input-width: 100%;
      }
    `;
  }

  static get properties() {
    return {
      /* Allows to set a text for the default option, that is a empty option and do not selects nothing in the interface. */
      selectDefaultPlaceholder: { type: String },
      endpoint: { type: String },
      label: { type: String },
      value: { type: String },
      name: { type: String },
      disabled: { type: Boolean },
      errored: { type: Boolean },
      data: { type: Array },
      placeholder: { type: String },
      emptyMessage: { type: String },
      selectedText: { type: String },
      ajaxErrorMessage: { type: String },
      ajaxError: { type: Boolean },
      queryStringVariable: { type: String },
      /** Use resultDataProperty to declare witch property in the JSON object returned by the endpoint has the data to assign to the select options. Left it blank if the result JSON has directly the array with the data */
      resultDataProperty: { type: String },
      displayProperty: { type: String },
      idProperty: { type: String },
      delay: { type: Number },
      opened: { 
        type: Boolean,
        state: true,
      },
      keyword: { 
        type: String,
        state: true,
       },
      loading: {
        type: Boolean,
        state: true,
      },
      isSelected: {
        type: Object,
        state: true,
      },
      /* When static is true there is no posibility to search, then all the options are displayed on the select on initialization */
      static: {
        type: Boolean,
      } 
    };
  }

  updated(changedProperties) {
    if(changedProperties.has("value")) {
      this.emmitChange();
    }
  }

  constructor() {
    super();
    this.placeholder = "Search to choose...";
    this.selectDefaultPlaceholder = "Select an option...";
    this.emptyMessage = "No results found";
    this.ajaxErrorMessage = "Error loading data";
    this.data = [];
    this.keyword = '';
    this.loading = false;
    this.errored = false;
    this.ajaxError = false;
    this.isSelected = false;
    this.static = false;
    this.blurHandler = this.close.bind(this);
    this.queryStringVariable = 'q';
    this.delay = 300;
    this.idProperty = 'id';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('blur', this.blurHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('blur', this.blurHandler);
  }

  firstUpdated() {
    if(this.value) {
      this.isSelected = true;
      this.searchValueInitial();
    }
    if(this.static) {
      this.loadData();
    }
  }

  searchValueInitial() {
    fetch(`${this.endpoint}/${this.value}`)
      .then(response => response.json())
      .then(json => this.registerText(json))
      .catch(error => this.registerError(error));
  }
  
  registerText(json) {
    this.selectedText = json[this.displayProperty]; 
    this.loading = false;
  }


  get search() {
    return this.shadowRoot.getElementById('search');
  }

  get select() {
    return this.shadowRoot.getElementById('elselect');
  }

  render() {
    return html`
      <div>
        ${this.label
          ? html`<label for="textField">${this.label}</label>`
          : ""}
        ${this.isSelected
          ? this.selectedTemplate
          : this.static ? this.loadingOrLoadedTemplate : this.searchTemplate
        }
      </div>
    `;
  }

  get selectedTemplate() {
    return html`
      <dile-input-search 
        id="result"
        ?errored=${this.errored} 
        ?disabled=${this.disabled}
        value="${this.selectedText}"
        readOnly
        @dile-input-search-cleared=${this.onClearSelected}
      ></dile-input-search>
    `;
  }

  get searchTemplate() {
    return html`
      <dile-input-search 
        id="search"
        placeholder="${this.placeholder}" 
        label="${this.label}" 
        ?errored=${this.errored} 
        ?disabled=${this.disabled}
        @focus=${this.onFocus}
        @dile-input-search=${this.onTextInput}
        delay="${this.delay}"
      ></dile-input-search>
      <div class="anchor">
        <section class="${this.opened && this.keyword.length > 0 ? 'opened' : ''}">
          ${this.loadingOrLoadedTemplate}
        </section>
      </div>
    `;
  }

  get loadingOrLoadedTemplate() {
    return html`
      ${this.loading
        ? this.loadingTemplate
        : this.loadedTemplate
      }
    `;
  }

  get loadingTemplate() {
    return html`<dile-spinner-horizontal active></dile-spinner-horizontal>`;
  }

  get loadedTemplate() {
    return html`
      ${this.ajaxError
        ? html`<p>${this.ajaxErrorMessage}</p>`
        : html`
          ${this.data.length == 0
            ? this.emptyTemplate
            : this.dataTemplate
          }
        `
      }
    `;
  }

  get emptyTemplate() {
    return html`
      <p>
        ${this.emptyMessage}
      </p>
    `;
  }

  get dataTemplate() {
    return html`
        <dile-select 
          id="elselect" 
          @element-changed=${this.doSelected}
          name="generated-select-field"
        >
          <select slot="select">
            <option value="">${this.selectDefaultPlaceholder}</option>
            ${this.data.map(item => html`
              <option value="${item[this.idProperty]}">${item[this.displayProperty]}</option>
            `)}
          </select>
        </dile-select> 
    `;
  }

  onFocus() {
    this.opened = true;
  }

  onTextInput(e) {
    this.keyword = e.detail.keyword;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.ajaxError = false;
    fetch(`${this.endpoint}?${this.queryStringVariable}=${this.keyword}`)
      .then(response => response.json())
      .then(json => this.registerData(json))
      .catch(error => this.registerError(error));
  }

  registerError(err) {
    this.ajaxError = true;
    this.loading = false;
  }
  
  registerData(json) {
    if(this.resultDataProperty === undefined || this.resultDataProperty === '') {
      this.data = json;
    } else {
      this.data = json[this.resultDataProperty];
    }
    this.updateComplete.then( () => this.loading = false )
  }

  doSelected(e) {
    let value = e.detail.value;
    if(e.detail.name === 'generated-select-field' && value !== '') {
      this.selectedText = this.select.getOptionByValue(value).innerText;
      this.value = value;
      this.isSelected = true;
    }
    e.stopPropagation();
  }

  onClearSelected() {
    this.value = undefined;
    this.isSelected = false;
    if(! this.static) {
      this.keyword = '';
      this.selectedText = '';
      this.data = [];
      this.updateComplete.then(() => {
        this.search.focus();
      });
    }
  }

  close() {
    this.opened = false;
  }

  clear() {
    this.isSelected = false;
    this.value = undefined;
    this.selectedText = '';
  }

  set(value) {
    this.value = value;
    if(value) {
      this.isSelected = true;
      this.searchValueInitial();
    }
  }
}