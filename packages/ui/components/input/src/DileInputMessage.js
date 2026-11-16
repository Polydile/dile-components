import { LitElement, html, css } from 'lit';
import { DileFieldMessage } from '../../../mixins/form/index.js';
import { messageStyles } from './message-styles.js';

export class DileInputMessage extends DileFieldMessage(LitElement) {

  static get properties() {
    return {
      /** Name used by DileForm to locate this element and show errors on it */
      name: { type: String, reflect: true },
    };
  }

  static get styles() {
    return [
      messageStyles,
      css`
        :host {
          display: block;
        }
      `
    ];
  }

  render() {
    return html`
      ${this.messageTemplate}
    `
  }

}
