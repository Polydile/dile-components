import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import '@dile/ui/input/input.js';

export class DemoChangeNameAction extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
    <p>Please inform a new name for the element:</p>
    <dile-input name="name"></dile-input>
    `;
  }
}
customElements.define('demo-change-name-action', DemoChangeNameAction);
