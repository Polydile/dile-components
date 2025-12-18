import { LitElement, html, css } from 'lit';

export class DileAccordion extends LitElement {

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--dile-accordion-gap, .5rem);
      }
    `
  ];

  constructor(){
    super();
    this.current = null;
  };

  connectedCallback(){
    super.connectedCallback();
    this.addEventListener('accordion-item-opened', (e) => {
      const openedItem = e.detail.item;
      this.closeOtherItems(openedItem);
    })
  }

  closeOtherItems(openedItem) {
    const items = this.getElementsByTagName('dile-accordion-item');

    for (const item of items) {
      if (item !== openedItem) {
        item.opened = false;
      }
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

}
