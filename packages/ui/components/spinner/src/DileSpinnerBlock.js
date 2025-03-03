import { LitElement, html, css } from "lit";

export class DileSpinnerBlock extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .loading {
        height: var(--dile-spinner-block-height, 120px); 
        display: flex; 
        justify-content: var(--dile-spinner-block-justify-content, center); 
        align-items: var(--dile-spinner-block-align-items, center); 
      }
    `;
  }

  render() {
    return html`
      <section class="loading">
        <dile-spinner active></dile-spinner>
      </section>
    `;
  }
}