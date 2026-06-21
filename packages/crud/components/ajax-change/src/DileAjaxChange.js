import { LitElement, html, css } from 'lit';
import '../../ajax/ajax.js';
import { RequestApiAdapter } from '../../../lib/RequestApiAdapter.js';

export class DileAjaxChange extends LitElement {
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
    this.changeHandler = this.onChange.bind(this);
    this.slotElement = null;
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

  firstUpdated() {
    const slot = this.shadowRoot.querySelector('slot[name="select"]');
    if (!slot) {
      throw new Error('slot with name="select" not found');
    }
    
    this.slotElement = slot;
    slot.addEventListener('slotchange', () => {
      this.handleSlotChange();
    });
    
    // Trigger initial slot change
    this.handleSlotChange();
  }

  handleSlotChange() {
    const [element] = this.slotElement.assignedElements({ flatten: true });
    
    // Remove listener from previous element if exists
    if (this.currentElement) {
      this.currentElement.removeEventListener('change', this.changeHandler);
    }
    
    if (element) {
      this.currentElement = element;
      element.addEventListener('change', this.changeHandler);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.currentElement) {
      this.currentElement.removeEventListener('change', this.changeHandler);
    }
  }

  onChange(e) {
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

  doErrorAjax(e) {
    this.loading = false;
    this.dispatchEvent(new CustomEvent('ajax-change-error', {
      detail: e.detail,
      bubbles: true,
      composed: true,
    }));
  }

  doSuccessAjax(e) {
    this.loading = false;
    this.dispatchEvent(new CustomEvent('ajax-change-success', {
      detail: e.detail,
      bubbles: true,
      composed: true,
    }));
  }
}
