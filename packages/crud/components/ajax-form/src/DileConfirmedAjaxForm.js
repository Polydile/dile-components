/**
 *
 * # DileConfirmedAjaxForm
 *
 * Ajax form component that requires confirmation before submission
 *
 */

import { LitElement, html } from 'lit';
import '@dile/ui/components/confirm/confirm.js';
import { DileAjaxForm } from './DileAjaxForm.js';

export class DileConfirmedAjaxForm extends DileAjaxForm {

  static get properties() {
    return {
      ...super.properties,
      confirmText: { type: String },
      acceptLabel: { type: String },
      cancelLabel: { type: String },
    };
  }

  constructor() {
    super();
    this.confirmText = null;
    this.acceptLabel = null;
    this.cancelLabel = null;
  }

  render() {
    return html`
      ${super.render()}
      <dile-confirm
        id="confirmDialog"
        @dile-confirm-accepted="${this.onConfirmAccepted}"
        @dile-confirm-cancelled="${this.onConfirmCancelled}"
        .acceptLabel="${this.computeAcceptLabel()}"
        .cancelLabel="${this.computeCancelLabel()}"
        blocking
      >
        <p>${this.computeConfirmText()}</p>
      </dile-confirm>
    `;
  }

  firstUpdated() {
    super.firstUpdated();
    this.confirmDialog = this.shadowRoot.getElementById('confirmDialog');
  }

  doAction() {
    this.feedback.clear();
    this.confirmDialog.open();
  }

  onConfirmAccepted() {
    // Call the parent's doAction method directly, bypassing our override
    const formData = this.form.getData();
    this.ajaxsave.data = formData;
    this.ajaxsave.generateRequest();
  }

  onConfirmCancelled() {
    // Silently cancel, just close the dialog
    // No action needed
  }

  computeConfirmText() {
    if (this.confirmText) {
      return this.confirmText;
    }
    return this.translations?.confirm_submit_text || 'Are you sure you want to submit this form?';
  }

  computeAcceptLabel() {
    if (this.acceptLabel) {
      return this.acceptLabel;
    }
    return this.translations?.accept_label || 'Accept';
  }

  computeCancelLabel() {
    if (this.cancelLabel) {
      return this.cancelLabel;
    }
    return this.translations?.cancel_label || 'Cancel';
  }
}
