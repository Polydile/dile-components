import { LitElement, html, css } from 'lit';
import '@dile/ui/components/select/select.js';
import '../../ajax/ajax.js';
import { RequestApiAdapter } from '../../../lib/RequestApiAdapter.js';

export class DileSelectAjaxChange extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      value: { type: String },
      endpoint: { type: String },
      loading: { type: Boolean },
      method: { type: String },
      requestApiAdapter: { type: Object },
      dataFieldName: { type: String },
    };
  }

  constructor() {
    super();
    this.requestApiAdapter = new RequestApiAdapter();
    this.method = 'patch';
    this.dataFieldName = 'value';
    this.changeHandler = this.onSelectChange.bind(this);
  }

  render() {
    return html`
      <dile-ajax
        id="elajax"
        method="${this.method}"
        url="${this.endpoint}"
        @ajax-success="${this.doSuccessAjax}"
        @ajax-error="${this.doErrorAjax}"
      ></dile-ajax>
      <slot name="select"></slot>
    `;
  }

  get elselect() {
    return this.querySelector("select");
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.elselect) {
      throw new Error('Use dile-select-ajax-change with a select element in the slot "select"');
    } else {
      this.elselect.addEventListener("change", this.changeHandler);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.elselect) {
      this.elselect.removeEventListener("change", this.changeHandler);
    }
  }

  onSelectChange(e) {
    if (!this.loading) {
      this.loading = true;
      this.value = e.target.value;
      let data = {};
      data[this.dataFieldName] = this.value;
      let elajax = this.shadowRoot.getElementById('elajax');
      elajax.data = data;
      elajax.generateRequest();
    }
  }

  doErrorAjax() {
    this.loading = false;
  }

  doSuccessAjax() {
    this.loading = false;
  }
}
