import { css, html } from 'lit';
import { DileCrudInsert } from './DileCrudInsert.js';
import '@dile/ui/components/modal/modal.js';
import '@dile/ui/components/button/button.js';
import '@dile/ui/components/button/button-icon.js';
import { formStyles } from '../../../styles/form-styles.js';

export class DileModalCrudInsert extends DileCrudInsert {
  static styles = [
    formStyles,
    css`
        
    `
  ];

  static get properties() {
    return {
      openModalLabel: { type: String },
      openModalIcon: { type: Object },
      closeOnSucess: { type: Boolean },
    };
  }

  get modalElement() {
    return this.shadowRoot.getElementById('modalElement')
  }

  constructor() {
    super();
    this.openModalLabel = "Open"
  }

  render() {
    return html`
      <dile-modal
        id="modalElement"
        blocking
        showCloseIcon
        @save-success=${this.doSuccessActions}
      >
        ${this.titleTemplate}
        ${this.ajaxFormTemplate}
      </dile-modal>
      ${this.openModalTrigger}
    `;
  }

  get openModalTrigger() {
    return html`
      ${this.openModalIcon
        ? html`<dile-button-icon @click=${this.openModal} .icon=${this.openModalIcon}>${this.openModalLabel}</dile-button-icon>`
        : html`<dile-button @click=${this.openModal}>${this.openModalLabel}</dile-button>`
      }
    `
  }

  openModal() {
    this.modalElement.open();
  }

  doSuccessActions() {
    if(this.closeOnSucess) {
      this.modalElement.close();
    }
  }
}