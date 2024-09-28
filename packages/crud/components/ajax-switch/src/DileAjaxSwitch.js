import { LitElement, html, css } from 'lit';
import '@dile/ui/components/switch/switch';
import '../../ajax/ajax';
import { RequestApiAdapter } from '../../../lib/RequestApiAdapter';

export class DileAjaxSwitch extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      value: { type: Boolean },
      endpoint: { type: String },
      checkedLabel: { type: String },
      uncheckedLabel: { type: String },
      loading: { type: Boolean },
      method: { type: String },
      requestApiAdapter: { type: Object },
    };
  }

  constructor() {
    super();
    this.requestApiAdapter = new RequestApiAdapter();
    this.method = 'patch';
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
      <dile-switch
        ?disabled=${this.loading} 
        ?checked=${this.value}
        useReactiveLabels
        checkedLabel="${this.checkedLabel}"
        uncheckedLabel="${this.uncheckedLabel}"
        @dile-switch-changed=${this.save}
      ></dile-switch>
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

  doErrorAjax() {
    this.loading = false;
    this.value = !this.value;
  }

  doSuccessAjax() {
    this.loading = false;
  }
}

