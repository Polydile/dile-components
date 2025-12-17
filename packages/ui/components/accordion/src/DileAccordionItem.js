import { LitElement, html, css } from 'lit';
import { arrowDropDownIcon } from '@dile/icons/index.js';
import { DileSlideDown } from '@dile/ui/mixins/slide-down';

export class DileAccordionItem extends DileSlideDown(LitElement) {

  static styles = [
    css`
      :host {
        /** Display */
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: start;

        /** Container */
        width: var(--dile-accordion-item-width, 100%);
        border-radius: var(--dile-accordion-item-border-radius, none);

        /** Others */
        color: var(--dile-accordion-item-color, red);
        background-color: var(--dile-accordion-item-background-color, transparent);

        overflow: hidden;
      }

      button{
        /** Container */
        width: var(--dile-accordion-item-width, 100%);
        height: 100%;
        padding: var(--dile-accordion-item-button-padding, .7rem);
        border: var(--dile-accordion-item-button-border, none);
        border-radius: var(--dile-accordion-item-border-radius, var(--dile-accordion-item-button-border-radius, .5rem));
        box-shadow: var(--dile-accordion-item-button-box-shadow, 2px 2px 10px gray);
        margin-bottom: 0;
        transition: margin-bottom .2s .3s ease-in-out;

        /** Others */
        font-size: var(--dile-accordion-item-button-font-size, 1.1rem);
        background: var(--dile-accordion-item-button-background-color, black);
        color: var(--dile-accordion-item-button-color, var(--dile-accordion-item-color, white));
        cursor: pointer;

      }

      button.opened{
        margin-bottom: var(--dile-accordion-item-inner-separation, .5rem);
        transition: margin-bottom .2s ease-in-out;
      }

      .buttonContent{
        /** Display */
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
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
        /** Container */
        width: var(--dile-accordion-item-width, 100%);
        height: 0;
        overflow: hidden;

        /** Others */
        border: var(--dile-accordion-item-content-border, none);
        border-radius: var(--dile-accordion-item-border-radius, var(--dile-accordion-item-content-border-radius, .5rem));
        box-shadow: var(--dile-accordion-item-content-box-shadow, 2px 2px 10px gray);
        background: var(--dile-accordion-item-content-background-color, black);
        color: var(--dile-accordion-content-color, var(--dile-accordion-item-color, white));
        transition: height .3s ease-in-out;
      }

      .content{
        font-size: 1rem;
        padding: var(--dile-accordion-item-content-padding, .7rem);
      }

      #content {
        transition: height 0.3s ease-in;
        overflow: hidden;
      }

    `
  ];

  static properties = {
    title: { type: String, reflect: true },
    opened: { type: Boolean, reflect: true },
  };

  constructor(){
    super();
    this.opened = false;
    this.title = '';
    this.expandableContent = null;

    if(this.hasAttribute('dile-cloak')) this.removeAttribute('dile-cloak');
  };

  firstUpdated(){
    this.expandableContent = this.shadowRoot.getElementById('content');

  }

  updated(changed){
    if(changed.has('opened')){
      this.opened ? this.open() : this.close();
    }
  };

  render() {
    return html`
      <button @click=${this.toggleOpened} class="${this.opened ? 'opened' : ''}">
        <div class="buttonContent">
          <span>${this.title}</span>
          <span class="icon ${this.opened ? 'opened' : ''}">${arrowDropDownIcon}</span>
        </div>
      </button>

      <div class="contentContainer" id="content">
        <div  class="content">
          <slot name="accordion-item-content"></slot>
        </div>
      </div>
    `;
  }

  toggleOpened(){
    this.opened = !this.opened;

    if (this.opened) {
      this.dispatchEvent(
        new CustomEvent('accordion-item-opened', {
          detail: {
            item: this
          },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  open() {
    this.slideShow(this.expandableContent);
  }

  close() {
    this.slideHide(this.expandableContent);
  }

}
