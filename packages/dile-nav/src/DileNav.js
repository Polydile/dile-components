import { html, css, LitElement } from "lit-element";

export class DileNav extends LitElement {
  static get styles() {
    return css`
        :host {
          display: grid;
          grid-template-columns: auto 1fr auto;
          color: var(--dile-nav-color, #fff);
          background-color: var(--dile-nav-background-color, #666);
          align-items: var(--dile-nav-align-items, center);
          column-gap: var(--dile-nav-column-gap, 1rem);
          padding: var(--dile-nav-padding-y, 0.8rem) var(--dile-nav-padding-x, 0.6rem);
        }
        
        :host([menu="right"]) {
          grid-template-columns: 1fr auto auto;
        }

        :host([menu="right"]) .menu {
          grid-row-start: 1;
          grid-row-end: 2;
          grid-column-start: 3;
          grid-column-end: 4;
        }

        :host([menu="right"]) .title {
          grid-row-start: 1;
          grid-row-end: 2;
          grid-column-start: 1;
          grid-column-end: 2;
        }

        :host([menu="right"]) .actions {
          grid-row-start: 1;
          grid-row-end: 2;
          grid-column-start: 2;
          grid-column-end: 3;
        }

        .title {
          overflow: hidden;
        }
      `
  }
  static get properties() {
    return {
      menu: {
        type: String,
        reflect: true
      },
    };
  }

  constructor() {
    super();
    this.menu = "left"
  }

  render() {
    return html`
      <div class="menu"><slot name="menu"></slot></div>
      <div class="title"><slot name="title"></slot></div>
      <div class="actions"><slot name="actions"></slot></div>
    `;
  }

}
