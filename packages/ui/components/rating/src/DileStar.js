import { LitElement, html, css } from 'lit';
import '../../icon/icon.js';
import { starIcon, starBorderIcon, starHalfIcon } from '@dile/icons/index.js';

export class DileStar extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        --dile-icon-color: var(--dile-star-color, #FFA41C);
        --dile-icon-size: var(--dile-star-size, 32px);
      }
    `
  ];

  static get properties() {
    return {
      value: { type: Number },
      halfBreak: { type: Number },
      completeBreak: { type: Number },
      index: { type: Number },
    };
  }

  constructor() {
    super();
    this.value = 0.4;
    this.halfBreak = 0.25;
    this.completeBreak = 0.6;
  }

  render() {
    return html`
      <dile-icon 
        .icon="${this.computeIcon(this.value, this.halfBreak, this.completeBreak)}"
        @click=${this.doClick}
        @mouseenter=${this.doMouseEnter}
      ></dile-icon>
    `;
  }

  doClick() {
    this.dispatchEvent(new CustomEvent('dile-star-selected', { 
      detail: { index: this.index }
    }));
  }

  doMouseEnter() {
    this.dispatchEvent(new CustomEvent('dile-star-enter', {
      detail: { index: this.index }
    }));
  }

  computeIcon(value, halfBreak, completeBreak) {
    if(value < halfBreak) {
      return starBorderIcon;
    } else if(value < completeBreak) {
      return starHalfIcon;
    }
    return starIcon;
  }
}
