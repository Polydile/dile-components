import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form'
import '@dile/ui/components/input/input.js';
import '@dile/ui/components/drop-file/drop-file';

export class UploadFileForm extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <dile-input name="nombre" label="Name" hideErrorOnInput></dile-input>
      <dile-drop-file name="file" label="imagen"></dile-drop-file>
    `;
  }
}
customElements.define('upload-file-form', UploadFileForm);
