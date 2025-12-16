import { LitElement, html, css } from 'lit';
import { arrowDropDownIcon } from '@dile/icons/index.js';

export class DileAccordionItem extends LitElement {
  static styles = [
    css`
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: start;
        row-gap: var(--dile-accordion-item-gap, .5rem);
        width: var(--dile-accordion-item-width, 100%);
        color: var(--dile-accordion-item-color, red);
      }

      button{
        font-size: var(--dile-accordion-item-button-font-size, 1.1rem);
        width: 100%;
        height: 100%;
        padding: var(--dile-accordion-item-button-padding, .7rem);
        background: var(--dile-accordion-item-button-background-color, black);
        color: var(--dile-accordion-accordion-item-button-color, var(--dile-accordion-item-color, white));
        border: var(--dile-accordion-accordion-item-button-border, none);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      span.icon svg{
        fill: white;
        scale: 1.8;
      }

      span.icon{
        transition: transform .3s ease-in-out;
      }

      span.icon.opened{
        transform-origin: center;
        transform: rotate(180deg);
      }

      .contentContainer{
        width: 100%;
        height: auto;
        transition: height .3s ease-in-out;
        overflow: hidden;
        background: var(--dile-accordion-item-content-background-color, black);
        color: var(--dile-accordion-accordion-content-color, var(--dile-accordion-item-color, white));
      }

      .content{
        font-size: 1rem;
        padding: var(--dile-accordion-item-content-padding, .7rem);
      }

    `
  ];

  static properties = {
    title: { type: String, reflect: true },
    opened: { type: Boolean, reflect: true },
    _height: { type: Number, state: true},
  };

  constructor(){
    super();
    this.opened = false;
    this._height = 0;
    this.title = '';
    this._calculatedHeight = 0;
  }

  firstUpdated(){
    this.calculateHeight();
    this._height = this.opened ? this._calculatedHeight : 0;
  }

  calculateHeight() {
    const content = this.shadowRoot.getElementById('content');
    this._calculatedHeight = content.clientHeight;
  }

  render() {
    return html`
      <button @click=${this.toggleOpened}>
        <span>${this.title}</span>
        <span class="icon ${this.opened ? 'opened' : ''}">${arrowDropDownIcon}</span>
      </button>

      <div class="contentContainer" style="height: ${this._height}px" >
        <div id="content" class="content">
          <slot name="accordion-item-content" class="slot"></slot>

        </div>
      </div>
    `;
  }

  toggleOpened(){
    this.opened = !this.opened;
    this._height = this.opened ? this._calculatedHeight : 0;
  }
}
