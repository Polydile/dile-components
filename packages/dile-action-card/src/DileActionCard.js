import { LitElement, html, css } from 'lit';
import '@dile/dile-button-icon/dile-button-icon.js';

export class DileActionCard extends LitElement {
  static styles = [
    css`
            :host {
                display: block;
                margin-bottom: 1rem;
            }
            section {
                background-color:var(--dile-action-card-background-color,#f5f5f573);
                border:var(--dile-action-card-border,2px solid #ccc);
                border-radius:var(--dile-action-card-border-radius,0);
                padding: 1rem;
            }
            #header {
                display: flex;
                flex-wrap: wrap;
                justify-content: var(--dile-action-card-header-justify-content, flex-start);
                align-content: var(--dile-action-card-header-align-content, flex-start);
                flex-direction: var(--dile-action-card-header-flex-direction, column-reverse);
            }
            #buttons {
                margin-bottom:1rem;
                display: flex;
                flex-wrap: wrap;
                justify-content: var(--dile-action-card-buttons-justify-content, flex-start);
            }
            ::slotted(span) {
                font-size: small;
            }
            ::slotted(dile-button-icon) {
                --dile-button-border-color: #666;
                --dile-button-hover-border-color: #ff910f;
                --dile-button-background-color: #491449;
                --dile-button-hover-background-color: #f3c6f3;
                --dile-button-text-color:  #fff; 
                --dile-button-hover-text-color:  #000; 
                --dile-button-font-weight: bold;
                --dile-button-ring-color: #cc5099;
                --dile-button-ring-offset-width: 2px;
                --dile-button-border-radius: 8px;
                --dile-button-text-transform: uppercase;
                --dile-icon-color:#fff;
            }

            ::slotted(div) {
                border: 1px solid #ddd;
                background-color: #abaaaa73;
                padding: 1rem;
            }

            dile-button-icon {
                --dile-button-border-radius: 2rem;
                --dile-icon-color:#fff; 
                margin-left: 0.25rem;
            }
        `
  ];

  static get properties() {
    return {
      title: { type: String },
      options: { type: Array },
      icons: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = '';
    this.options = [];
    this.icons = [];
    this.selectedOption = '';
  }

  render() {
    return html`
        <section>
        <div id="header">
            ${this.headerTemplate}
        </div>
        <div id="buttons">
            ${this.buttonsTemplate}
        </div>
            ${this.subCardsButtonTemplate}
        </section>
        `;
  }

  get headerTemplate() {
    return html`
        ${this.hasSlot('subtitle')
        ? html`
        <h3>${this.title}</h3>  
        <slot name='subtitle'></slot>
        `
        : html`
          <h3>${this.title}</h3>
          `
      }
      `;
  }

  get buttonsTemplate() {
    return html`
        ${this.options.map((option, index) => {
      if (!this.icons[index]) {
        this.icons[index] = '';
      }
      return html`
            <dile-button-icon
                .icon=${this.icons[index]}
                @click=${() => this.setOption(option)}
            >${option}
            </dile-button-icon>
            `})
      }`
  }

  get subCardsButtonTemplate() {
    return html`
        ${this.hasSlot('subCardsButton')
        ? html`
            <slot name='subCardsButton'></slot>
            <slot name='subCards'></slot>
            `
        : ''
      }
      `;
  }
  hasSlot(name) {
    return this.querySelector(`[slot="${name}"]`) !== null;
  }

  setOption(option) {
    this.selectedOption = option;
    this.dispatchEvent(new CustomEvent('dile-action-card-option-selected', {
      bubbles: true,
      composed: true,
      detail: {
        selectedOption: this.selectedOption,
      }
    }));
  }
}