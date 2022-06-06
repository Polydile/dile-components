import { LitElement, html, css } from 'lit';
import '@dile/dile-input-search/dile-input-search.js';
import '@dile/dile-spinner/dile-spinner-horizontal.js';

export class DileSelectAjax  extends LitElement {

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: block;
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
      }
    `;
  }

  static get properties() {
    return {
      endpoint: { type: String },
      label: { type: String },
      value: { type: String },
      name: { type: String },
      disabled: { type: Boolean },
      errored: { type: Boolean },
      data: { type: Array },
      placeholder: { type: String },
      emptyMessage: { type: String },
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
    };
  }

  constructor() {
    super();
    this.placeholder = "Search to choose...";
    this.emptyMessage = "No results found";
    this.data = [];
    this.keyword = '';
    this.loading = false;
  }

  get search() {
    return this.shadowRoot.getElementById('search');
  }

  render() {
    return html`
      <dile-input-search 
        id="search"
        placeholder="${this.placeholder}" 
        label="${this.label}" 
        ?errored=${this.errored} 
        ?disabled=${this.disabled}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        @dile-input-search=${this.onTextInput}
      ></dile-input-search>
      <section class="${this.opened && this.keyword.length > 0 ? 'opened' : ''}">
        ${this.loading
          ? this.loadingTemplate
          : this.dataTemplate
        }
      </section>
    `;
  }

  get loadingTemplate() {
    return html`<dile-spinner-horizontal active></dile-spinner-horizontal>`;
  }

  loadedTemplate() {
    return html`
      ${this.data.length == 0
          ? this.emptyTemplate
          : this.dataTemplate
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
        <dile-select @element-changed=${this.doSelected}>
          <select slot="select">
            ${this.data.map(item => html`
              <option value="${item.id}">${item.title}</option>
            `)}
          </select>
        </dile-select> 
    `;
  }

  onFocus() {
    this.opened = true;
    console.log('select focus');
  }

  onBlur() {
    //this.opened = false;
    console.log('select blur');
  }

  onTextInput(e) {
    console.log('textinpu');
    this.keyword = e.detail.keyword;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    fetch(this.endpoint)
      .then(response => response.json())
      .then(json => this.registerData(json));
  }
  
  registerData(json) {
    this.data = json;
    this.loading = false;
  }

  doSelected(e) {
    console.log('selected', e.detail);
  }

  applyPosition() {
    let triggerWidth = parseInt(this.search.offsetWidth);
    var rect = this.overlay.getBoundingClientRect();
    console.log(triggerwidth);
    console.log(rect);
    
  }
}