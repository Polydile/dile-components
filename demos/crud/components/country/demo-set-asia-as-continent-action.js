import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';

export class DemoSetAsiaAsContinentAction extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      country: { type: Object }
    };
  }

  render() {
    return html`
    <p>Do you really want to set Asia as continent of ${this.country?.name}?</p>
    `;
  }
}
customElements.define('demo-set-asia-as-continent-action', DemoSetAsiaAsContinentAction);
