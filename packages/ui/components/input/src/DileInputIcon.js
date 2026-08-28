import { LitElement, html, css } from 'lit';
import { DileInput } from '../../input/index.js';
import '@dile/iconlib/dile-iconlib.js';
import '@dile/ui/components/tooltip/tooltip.js';

export class DileInputIcon extends DileInput {

  static get properties() {
    return {
      ...super.properties,
      /** Icon to display in the button, format: "family.name" (e.g., "lucide.eye") */
      icon: { type: String },
      /** Callback function that receives the component instance when icon button is clicked */
      onIconClick: { type: Function },
      /** Tooltip text to show on icon hover */
      tooltip: { type: String },
      /** Tooltip position: "top", "bottom", "left", "right" */
      tooltipPosition: { type: String },
      /** Enable fade-in animation for tooltip */
      tooltipFadeIn: { type: Boolean },
      /** Show arrow pointing to the icon on tooltip */
      tooltipArrow: { type: Boolean },
    };
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        .input-icon-btn {
          box-sizing: border-box;
          background: none;
          background-color: var(--dile-input-icon-background-color, var(--dile-input-icon-bg, transparent));
          border: none;
          cursor: pointer;
          padding: var(--dile-input-icon-padding, var(--dile-input-padding, 5px));
          margin: var(--dile-input-icon-margin, 0 5px);
          color: var(--dile-input-icon-color, var(--dile-on-background-color, #303030));
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--dile-input-icon-width, auto);
          height: var(--dile-input-icon-height, auto);
          min-width: var(--dile-input-icon-width, 32px);
          min-height: var(--dile-input-icon-height, 32px);
          border-radius: var(--dile-input-icon-border-radius, var(--dile-input-border-radius, 5px));
          transition: var(--dile-input-icon-transition, background-color 0.2s);
        }
        .input-icon-btn:hover {
          background-color: var(--dile-input-icon-hover-background-color, var(--dile-input-icon-hover-bg, rgba(0, 0, 0, 0.05)));
        }
        .input-icon-btn:active {
          background-color: var(--dile-input-icon-active-background-color, var(--dile-input-icon-active-bg, rgba(0, 0, 0, 0.1)));
        }
        .input-icon-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .input-icon-btn dile-iconlib {
          --dile-icon-color: var(--dile-input-icon-color, var(--dile-on-background-color, #303030));
          --dile-icon-size: var(--dile-input-icon-size, 20px);
        }
      `
    ];
  }

  constructor() {
    super();
    this.icon = '';
    this.onIconClick = null;
    this.tooltip = '';
    this.tooltipPosition = 'top';
    this.tooltipFadeIn = false;
    this.tooltipArrow = false;
  }

  render() {
    return html`
      <main>
        ${this.labelTemplate}
        <section class="for-input">
          ${this.inputTemplate}
          ${this.icon ? this.renderIconButton() : ''}
          ${this.labelRight ? html`<span class="labelright">${this.labelRight}</span>` : ''}
        </section>
        ${this.messageTemplate}
      </main>
    `;
  }

  get labelTemplate() {
    return this.label
      ? html`<label for="textField">${this.label}</label>`
      : '';
  }

  get inputTemplate() {
    return html`
      <input
        type="${this.availableType(this.type)}"
        id="textField"
        name="${this.name}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        autocomplete="${this.disableAutocomplete ? 'off' : 'on'}"
        .value="${this.computeValue(this.value)}"
        class="${this.errored ? 'errored' : ''}"
        @keypress="${this._lookForEnter}"
        @input="${this._input}"
        @blur="${this.doBlur}"
        @focus="${this.doFocus}"
        ?selectonfocus="${this.selectOnFocus}"
      >
    `;
  }

  get iconTemplate() {
    return this.renderIconlibIcon(this.icon);
  }

  get buttonTemplate() {
    return html`<button
      class="input-icon-btn"
      type="button"
      @click="${this._handleIconClick}"
      ?disabled="${this.disabled}"
      aria-label="Icon action button"
    >
      ${this.iconTemplate}
    </button>`;
  }

  /**
   * Renders an icon using dile-iconlib
   * Supports format "family.name" (e.g., "lucide.eye", "material.home")
   * dile-iconlib handles warnings if icon is not registered
   * @param {string} iconName - Icon in "family.name" format
   * @returns {TemplateResult}
   */
  renderIconlibIcon(iconName) {
    if (!iconName || typeof iconName !== 'string' || !iconName.includes('.')) {
      console.warn(`Invalid icon format: "${iconName}". Use "family.name" (e.g., "lucide.eye")`);
      return html``;
    }

    const [family, name] = iconName.split('.');
    if (!family || !name) {
      console.warn(`Invalid icon format: "${iconName}". Use "family.name" (e.g., "lucide.eye")`);
      return html``;
    }

    // Always render dile-iconlib, it will handle non-registered icons
    return html`<dile-iconlib icon="${iconName}"></dile-iconlib>`;
  }

  /**
   * Renders the icon button, optionally wrapped with a tooltip
   * @returns {TemplateResult}
   */
  renderIconButton() {
    const button = this.buttonTemplate;

    // If tooltip is defined, wrap button with dile-tooltip
    if (this.tooltip) {
      return html`<dile-tooltip
        tooltip="${this.tooltip}"
        position="${this.tooltipPosition}"
        ?fadeIn="${this.tooltipFadeIn}"
        ?arrow="${this.tooltipArrow}"
      >
        ${button}
      </dile-tooltip>`;
    }

    return button;
  }

  _handleIconClick() {
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('dile-input-icon-clicked', {
      bubbles: true,
      composed: true,
      detail: {
        icon: this.icon,
        value: this.value,
      }
    }));

    // Execute callback if provided
    if (typeof this.onIconClick === 'function') {
      this.onIconClick(this);
    }
  }
}
