import { LitElement, html, css } from 'lit';
import './DileAccordionItem.js';

export class DileAccordion extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        color: white;
      }
    `
  ];

  render() {
    return html`
      <!-- <dile-accordion-item title="Enter here your accordion item title"></dile-accordion-item> -->
      ${this.accordionItem}
    `;
  }

  get accordionItem() {
    return html`
      <button>
        ${this.title}
      </button>
    `
  }
}
