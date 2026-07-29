import { LitElement, html, css } from 'lit';
import '../tooltip.js';
import '../../icon/icon.js';
import { infoIcon } from '@dile/icons/index.js';

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
        background-color: var(--dile-primary-color, #7BB93D);
        color: var(--dile-on-primary-color, #fff);
        --dile-icon-color: var(--dile-chip-tooltip-icon-color, #fff);
        --dile-icon-size: var(--dile-chip-tooltip-icon-size, 22px);
        transition: background-color 0.3s ease-in-out;
      }
      .chip:hover {
        background-color: var(--dile-chip-tooltip-hover-background-color, var(--dile-primary-dark-color, #14644f));
      }
      .label {
          display: inline-block;
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
        icon: { type: Object },
        arrow: { type: Boolean },
        fadeIn: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.position = "bottom";
    this.icon = infoIcon;
    this.arrow = false;
    this.fadeIn = true;
  }

  render() {
    return html`
    <div class="box">
      <dile-tooltip 
          tooltip="${this.message}"
          position="${this.position}"
          ?arrow=${this.arrow}
          ?fadeIn=${this.fadeIn}
      >
        <span class="chip" role="button">
          ${this.label
            ? html`<span class="label">${this.label}</span>`
            : ''
          }
          <dile-icon .icon=${this.icon} class="info"></dile-icon>
        </span>
      </dile-tooltip>
    </div>
    `;
  }
}