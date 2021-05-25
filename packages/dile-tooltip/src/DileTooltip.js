import { html, css, LitElement } from 'lit-element';

export class DileTooltip extends LitElement {

  static get styles() {
    return css`/* Tooltip container */
.tooltip {
    position: relative;
    display: inline-block;
  }
  
  .tooltip .tooltiptext {
    visibility: hidden;
    width: var(--dile-tooltip-width, 120px);
    background-color: var(--dile-tooltip-background-color, #e74c3c);
    color: #fff;
    text-align: center;
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
    transition: opacity var(--dile-tooltip-time-transition, 1s);
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }`;
  }

  static get properties() {
    return {
      
      /** text for the component */
      
      text: { type: String },
      
      /** text will be displayed when the mouse hover text */
      
      tooltiptext: { type: String },
      
      /** Position where the tooltip where be displayed */
      
      position: { type: String },

      /** Adds an arrow design to the tooltip */
      
      arrow: { type: Boolean, reflect: true },
      
      /** Adds a fade in animation */
      
      fadeIn: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.text = 'This is and example';
    this.tooltiptext = 'Tooltip text';
    this.position = 'top'
    this.arrow = false;
    this.fadeIn = false;
  }

  get classPosition() {
    let className = 'tooltip-top';
    if (this.position == 'left') className = 'tooltip-left';
    if (this.position == 'right') className = 'tooltip-right';
    if (this.position == 'bottom') className = 'tooltip-bottom';
    return className;
  }

  get arrowPosition() {
    return this.arrow ? `arrow-${this.position}` : '';
  }

  get animation() {
    console.log(this.fadeIn ? 'animation' : '')
    return this.fadeIn ? 'animation' : '';
  }

  render() {
    return html`<div class="tooltip">${this.text}
  <span class="tooltiptext ${this.classPosition} ${this.arrowPosition} ${this.animation}">${this.tooltiptext}</span>
</div>
    `;
  }

}