import { html, css, LitElement } from 'lit';

export class DileTooltip extends LitElement {

  static get styles() {
    return css`/* Tooltip container */
      :host {
        display: inline-block;
      }
      .tooltip {
        position: relative;
        display: flex;
        align-items: center;
      }
  
      .tooltiptext {
        visibility: hidden;
        width: var(--dile-tooltip-width, 120px);
        background-color: var(--dile-tooltip-background-color, #e74c3c);
        color: var(--dile-tooltip-color, #fff);
        font-size: var(--dile-tooltip-font-size, 16px);
        text-align: var(--dile-tooltip-text-align, center);
        border-radius: var(--dile-tooltip-border-radius, 6px);;
        padding: var(--dile-tooltip-padding, 5px);
      }

      .tooltip-top {
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        margin-left: -60px;
      }

      .arrow-top::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: var(--dile-tooltip-background-color, #e74c3c) transparent transparent transparent;
      }

      .tooltip-left {
        position: absolute;
        z-index: 1;
        top: -5px;
        right: 105%;
      }

      .arrow-left::after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 100%; /* To the right of the tooltip */
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent var(--dile-tooltip-background-color, #e74c3c);
      }

      .tooltip-right {
        position: absolute;
        z-index: 1;
        top: -5px;
        left: 105%;
      }

      .arrow-right::after {
        content: " ";
        position: absolute;
        top: 50%;
        right: 100%; /* To the left of the tooltip */
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent var(--dile-tooltip-background-color, #e74c3c) transparent transparent;
      }

      .arrow-right::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent var(--dile-tooltip-background-color, #e74c3c) transparent transparent;
      }

      .tooltip-bottom {
        position: absolute;
        z-index: 1;
        top: 150%;
        left: 50%;
        margin-left: -60px;
      }

      .arrow-bottom::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent var(--dile-tooltip-background-color, #e74c3c) transparent;
      }
      
      .animation{
        opacity: 0;
        transition: opacity var(--dile-tooltip-time-transition, 0.5s) ease-in;
      }

      .show {
        visibility: visible !important;
        opacity: 1;
      }

    `;
  }

  static get properties() {
    return {
      /** text will be displayed when the mouse hover text */
      tooltip: { type: String },
      
      /** Position where the tooltip where be displayed */
      position: { type: String },

      /** Adds an arrow design to the tooltip */
      arrow: { type: Boolean },
      
      /** Adds a fade in animation */
      fadeIn: { type: Boolean },

      /** Private property to control mouseovers and mouseouts */
      _isMouseover: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.tooltip = 'Tooltip text';
    this.position = 'top'
    this.arrow = false;
    this.fadeIn = false;
    this._isMouseover = false;
  }

  classPosition(position) {
    let className = 'tooltip-top';
    if (position == 'left') { return 'tooltip-left' };
    if (position == 'right') { return 'tooltip-right' };
    if (position == 'bottom') { return 'tooltip-bottom' };
    return className;
  }

  arrowPosition(arrow, position) {
    return arrow ? `arrow-${position}` : '';
  }

  animation(fadeIn) {
    return fadeIn ? 'animation' : '';
  }

  showOrNot(isMouseover) {
    return isMouseover ? 'show' : '';
  }

  render() {
    return html`
      <div 
        class="tooltip"
        @mouseover="${this.doMouseover}"
        @mouseout="${this.doMouseout}"
      >
        <slot></slot>
        <span 
          class="tooltiptext ${this.classPosition(this.position)} ${this.arrowPosition(this.arrow, this.position)} ${this.animation(this.fadeIn)} ${this.showOrNot(this._isMouseover)}"
        >${this.tooltip}</span>
      </div>
    `;
  }

  doMouseover() {
    this._isMouseover = true;
  }

  doMouseout() {
    this._isMouseover = false;
  }
}