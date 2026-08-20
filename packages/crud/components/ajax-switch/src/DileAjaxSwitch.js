import { LitElement, html, css } from 'lit';
import '@dile/ui/components/switch/switch.js';
import '@dile/ui/components/spinner/spinner-icon.js';
import '../../ajax/ajax.js';
import { RequestApiAdapter } from '../../../lib/RequestApiAdapter.js';

export class DileAjaxSwitch extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .switch-container {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      dile-spinner-icon {
        flex-shrink: 0;
      }
    `
  ];

  static get properties() {
    return {
      value: { type: Boolean },
      endpoint: { type: String },
      checkedLabel: { type: String },
      uncheckedLabel: { type: String },
      loading: { type: Boolean, reflect: true },
      method: { type: String },
      requestApiAdapter: { type: Object },
    };
  }

  constructor() {
    super();
    this.requestApiAdapter = new RequestApiAdapter();
    this.method = 'patch';
    this.loading = false;
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
      <div class="switch-container">
        <dile-switch
          ?disabled=${this.loading} 
          ?checked=${this.value}
          useReactiveLabels
          checkedLabel="${this.checkedLabel}"
          uncheckedLabel="${this.uncheckedLabel}"
          @dile-switch-changed=${this.save}
        ></dile-switch>
        <dile-spinner-icon ?active=${this.loading}></dile-spinner-icon>
      </div>
    `;
  }

  save(e) {
    if(!this.loading) {
      this.loading = true;
      this.value = e.detail.checked;
      let data = {
        value: this.value
      }
      let elajax = this.shadowRoot.getElementById('elajax');
      elajax.data = this.requestApiAdapter.adaptBooleanValue(data);
      elajax.generateRequest();
    }
  }

  doErrorAjax(e) {
    this.loading = false;
    this.value = !this.value;
    this.dispatchEvent(new CustomEvent('dile-ajax-switch-error', {
      detail: e.detail,
      composed: true,
      bubbles: true,
    }));
  }

  doSuccessAjax(e) {
    this.loading = false;
    this.dispatchEvent(new CustomEvent('dile-ajax-switch-success', {
      detail: e.detail,
      composed: true,
      bubbles: true,
    }));
  }
}

