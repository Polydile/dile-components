import { css, html } from 'lit';
import { formStyles } from '../styles/form-styles.js';
import '@dile/ui/components/modal/modal.js';
import '@dile/ui/components/button/button.js';
import '@dile/ui/components/button/button-icon.js';

export const DileModalCrudOperationsMixin = (superclass) => class extends superclass {

  static styles = [
    formStyles,
    css`
        section {
          padding: var(--dile-modal-crud-extra-padding, 3px);
        }
    `
  ];

  static get properties() {
    return {
      openModalLabel: { type: String },
      openModalIcon: { type: Object },
      closeOnSuccess: { type: Boolean },
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
        <section>
          ${this.ajaxFormTemplate}
        </section>
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
    if(this.closeOnSuccess) {
      this.modalElement.close();
    }
  }

}