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
        position: fixed;
        max-width: var(--dile-tooltip-width, 120px);
        width: auto;
        background-color: var(--dile-tooltip-background-color, var(--dile-primary-color, #e74c3c));
        color: var(--dile-tooltip-color, var(--dile-on-primary-color, #fff));
        font-size: var(--dile-tooltip-font-size, 16px);
        font-weight: var(--dile-tooltip-font-weight, normal);
        text-align: var(--dile-tooltip-text-align, center);
        border-radius: var(--dile-tooltip-border-radius, 6px);;
        padding: var(--dile-tooltip-padding, 5px);
        z-index: 10000;
        white-space: normal;
        overflow-wrap: break-word;
      }

      .tooltip-top,
      .tooltip-bottom,
      .tooltip-left,
      .tooltip-right {
        /* Posicionamiento manejado por JavaScript */
      }

      .arrow-top::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: var(--dile-tooltip-background-color, var(--dile-primary-color, #e74c3c)) transparent transparent transparent;
      }

      .arrow-left::after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent var(--dile-tooltip-background-color, var(--dile-primary-color, #e74c3c));
      }

      .arrow-right::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent var(--dile-tooltip-background-color, var(--dile-primary-color, #e74c3c)) transparent transparent;
      }

      .arrow-bottom::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent var(--dile-tooltip-background-color, var(--dile-primary-color, #e74c3c)) transparent;
      }
      
      .animation{
        opacity: 0;
        transition: opacity var(--dile-tooltip-time-transition, 0.5s) ease-in;
      }

      .show {
        visibility: visible !important;
        opacity: 1;
      }

      .tooltiptext:focus-visible {
        outline: var(--dile-tooltip-focus-outline-width, 2px) solid var(--dile-tooltip-focus-outline-color, #12c9e9);
        outline-offset: var(--dile-tooltip-focus-outline-offset, 2px);
      }
      
      @media (prefers-reduced-motion: reduce) {
        .animation {
          transition: none;
        }
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
      _isMouseover: { type: Boolean },

      /** Private property to track keyboard focus */
      _isFocused: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.tooltip = 'Tooltip text';
    this.position = 'top'
    this.arrow = false;
    this.fadeIn = false;
    this._isMouseover = false;
    this._isFocused = false;
    this._tooltipId = `dile-tooltip-${Math.random().toString(36).substr(2, 9)}`;
    this._rafId = null;
    // El evento scroll puede dispararse muchas veces por frame (y con
    // capture:true, por cualquier contenedor con scroll interno), así que
    // agrupamos los recálculos con rAF para hacer como mucho uno por frame.
    this._boundUpdateTooltipPosition = () => {
      if (this._rafId) return;
      this._rafId = requestAnimationFrame(() => {
        this._rafId = null;
        this.updateTooltipPosition();
      });
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeReflowListeners();
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

  showOrNot(isMouseover, isFocused) {
    return isMouseover || isFocused ? 'show' : '';
  }

  render() {
    return html`
      <div 
        class="tooltip"
        tabindex="0"
        @mouseover=${this.doMouseover}
        @mouseout=${this.doMouseout}
        @focusin=${this.doFocusin}
        @focusout=${this.doFocusout}
        @keydown=${this.doKeydown}
      >
        <slot></slot>
        <span 
          id="${this._tooltipId}"
          role="tooltip"
          ?aria-hidden=${!(this._isMouseover || this._isFocused)}
          class="tooltiptext ${this.classPosition(this.position)} ${this.arrowPosition(this.arrow, this.position)} ${this.animation(this.fadeIn)} ${this.showOrNot(this._isMouseover, this._isFocused)}"
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

  doFocusin() {
    this._isFocused = true;
  }

  doFocusout() {
    this._isFocused = false;
  }

  doKeydown(event) {
    if (event.key === 'Escape') {
      this._isFocused = false;
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('_isMouseover') || changedProperties.has('_isFocused')) {
      if (this._isMouseover || this._isFocused) {
        this.updateTooltipPosition();
        // position:fixed no sigue al trigger si la página hace scroll
        // mientras el tooltip está abierto, así que hay que recalcular a mano.
        this._addReflowListeners();
      } else {
        this._removeReflowListeners();
      }
    }
  }

  _addReflowListeners() {
    window.addEventListener('scroll', this._boundUpdateTooltipPosition, { capture: true, passive: true });
    window.addEventListener('resize', this._boundUpdateTooltipPosition);
  }

  _removeReflowListeners() {
    window.removeEventListener('scroll', this._boundUpdateTooltipPosition, { capture: true });
    window.removeEventListener('resize', this._boundUpdateTooltipPosition);
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  updateTooltipPosition() {
    // Esperar a que el DOM se actualice antes de calcular posiciones
    this.updateComplete.then(() => {
      const tooltip = this.shadowRoot.querySelector('.tooltiptext');
      const trigger = this.shadowRoot.querySelector('.tooltip');
      
      if (!tooltip || !trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const gap = 5; // Espacio entre trigger y tooltip

      let top, left;

      switch (this.position) {
        case 'top':
          top = triggerRect.top - tooltip.offsetHeight - gap;
          left = triggerRect.left + triggerRect.width / 2 - tooltip.offsetWidth / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + gap;
          left = triggerRect.left + triggerRect.width / 2 - tooltip.offsetWidth / 2;
          break;
        case 'left':
          top = triggerRect.top + triggerRect.height / 2 - tooltip.offsetHeight / 2;
          left = triggerRect.left - tooltip.offsetWidth - gap;
          break;
        case 'right':
          top = triggerRect.top + triggerRect.height / 2 - tooltip.offsetHeight / 2;
          left = triggerRect.right + gap;
          break;
        default:
          top = triggerRect.top - tooltip.offsetHeight - gap;
          left = triggerRect.left + triggerRect.width / 2 - tooltip.offsetWidth / 2;
      }

      // Con position:fixed, getBoundingClientRect() ya es relativo al viewport,
      // no hay que sumar el scroll (eso solo aplica a position:absolute).
      tooltip.style.top = top + 'px';
      tooltip.style.left = left + 'px';
    });
  }
}