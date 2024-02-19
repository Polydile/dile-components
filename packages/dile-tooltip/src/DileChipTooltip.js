import { LitElement, html, css } from 'lit';
import '../dile-tooltip.js';
import '@dile/dile-icon/dile-icon.js';
import { infoIcon } from '@dile/icons';

export class DileChipTooltip  extends LitElement {

  static get styles() {
    return css`
      :host {
        display: inline-block;
        --dile-tooltip-width: var(--dile-chip-tooltip-width, 165px);
        --dile-tooltip-time-transition: 0.3s;
      }
      .box {
        display: flex;
        align-items: center;
      }
      .chip {
        font-size: var(--dile-chip-tooltip-font-size, 0.9rem);
        font-weight: bold;
        display: flex;
        padding: var(--dile-chip-tooltip-padding, 0.2rem 0.7rem);
        border-radius: 1rem;
        background-color: var(--dile-chip-tooltip-background-color, #7BB93D);
        color: var(--dile-chip-tooltip-text-color, #fff);
        --dile-icon-color: var(--dile-chip-tooltip-icon-color, #fff);
        --dile-icon-size: 22px;
        transition: background-color 0.3s ease-in-out;
      }
      .chip:hover {
        background-color: var(--dile-chip-tooltip-hover-background-color, #303030);
      }
      .label {
          display: inline-block;
          position: relative;
          top: 1px;
          margin-right: 0.3rem;
      }
      @media(min-width: 350px) {
          :host {
            --dile-tooltip-width: var(--dile-chip-tooltip-width, 190px);
          }
      }
      @media(min-width: 490px) {
          :host {
            --dile-tooltip-width: var(--dile-chip-tooltip-width, 240px);
          }
      }
    `;
  }

  static get properties() {
    return {
        label: { type: String },
        message: { type: String },
        position: { type: String },
    };
  }

  constructor() {
    super();
    this.position = "bottom";
  }

  render() {
    return html`
    <div class="box">
      <dile-tooltip 
          tooltip="${this.message}"
          position="${this.position}"
          fadeIn
          
      >
        <span class="chip">
          ${this.label
            ? html`<span class="label">${this.label}</span>`
            : ''
          }
          <dile-icon .icon=${infoIcon} class="info"></dile-icon>
        </span>
      </dile-tooltip>
    </div>
    `;
  }
}