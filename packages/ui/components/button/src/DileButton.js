import { html, css, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import '../../spinner/spinner-icon.js';
import '@dile/iconlib/dile-iconlib.js';

export class DileButton extends LitElement {

  static formAssociated = true;

  static get properties() {
    return {
      disabled: { type: Boolean },
      loading: { type: Boolean, reflect: true },
      name: { type: String, reflect: true },
      type: { type: String },
      value: { type: String },
      /**
       * Icon to display, in the dile-iconlib `"family.name"` format
       * (e.g. `"lucide.rocket"`, `"material.home"`). When empty, the button
       * behaves exactly as a plain text button (backwards compatible).
       */
      icon: { type: String },
      /** Icon placement relative to the label: `"left"` (default) or `"right"`. */
      iconPosition: { type: String, reflect: true, attribute: 'icon-position' },
      /** Prevent the label from wrapping into several lines. */
      noWrap: { type: Boolean, reflect: true, attribute: 'no-wrap' },
      /** Accessible name for the button. Required when the button only shows an icon. */
      label: { type: String },
      _hasText: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.loading = false;
    this.type = "button";
    this.icon = "";
    this.iconPosition = "left";
    this.noWrap = false;
    this.label = "";
    this._hasText = true;
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    // Seed the layout state before the first slotchange so an icon-only button
    // does not flash the text-spacing margin on first paint.
    this._hasText = this._detectText();
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        border-radius: var(--dile-button-border-radius, 2rem);
      }
      button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: var(--dile-button-padding-y, 0.5rem);
        padding-bottom: var(--dile-button-padding-y, 0.5rem);
        padding-right: var(--dile-button-padding-x, 0.8rem);
        padding-left: var(--dile-button-padding-x, 0.8rem);
        border-radius: var(--dile-button-border-radius, 2rem);
        border-width:  var(--dile-button-border-width, 3px);
        border-color:  var(--dile-button-border-color, var(--dile-primary-dark-color, #12354d));
        background-color: var(--dile-button-background-color, var(--dile-primary-color, #7BB93D));
        transition-property: background-color, color, border-color;
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
        border-style: solid;
        color: var(--dile-button-text-color, var(--dile-on-primary-color, #fff));
        font-size: var(--dile-button-font-size, 1rem);
        font-weight: var(--dile-button-font-weight, bold);
        text-transform: var(--dile-button-text-transform, none);
        letter-spacing: var(--dile-button-letter-spacing, 0);
        user-select: none;
        box-shadow: var(--dile-button-box-shadow, none);
        --dile-icon-color: var(--dile-button-icon-color, var(--dile-button-text-color, var(--dile-on-primary-color, #fff)));
      }
      button:hover {
        background-color: var(--dile-button-hover-background-color, var(--dile-button-background-color, var(--dile-primary-light-color, #f3f3ae)));
        color: var(--dile-button-hover-text-color, var(--dile-button-text-color, var(--dile-on-primary-light-color, #303030)));
        border-color:  var(--dile-button-hover-border-color, var(--dile-button-border-color, var(--dile-primary-color, #666666)));
        --dile-icon-color: var(--dile-button-icon-hover-color, var(--dile-button-hover-text-color, var(--dile-button-text-color, var(--dile-on-primary-light-color, #303030))));
      }
      button:focus-visible {
        outline: 2px solid var(--dile-button-ring-color, #12c9e9);
        outline-offset: 2px;
        box-shadow: 0 0 0 calc(0px + var(--dile-button-ring-offset-width, 3px)) var(--dile-button-ring-color, #12c9e9);
        border-color: var(--dile-button-ring-color, #12c9e9);
      }

      :host([disabled]) button {
        cursor: auto;
        background-color: var(--dile-button-disabled-background-color, var(--dile-button-background-color, #ccc));
        color: var(--dile-button-disabled-text-color, var(--dile-button-text-color, #999));
        border-color: var(--dile-button-disabled-border-color, var(--dile-button-border-color, #bbb));
      }
      :host([disabled]) button:focus {
        outline: none;
        box-shadow: none;

      }
      :host([disabled]) button:active {
        outline: none;
        border-color: #aaa;
        box-shadow: none;
      }
      :host([disabled]) {
        pointer-events: none;
      }

      :host([loading]) button {
        cursor: auto;
        background-color: var(--dile-button-disabled-background-color, var(--dile-button-background-color, #ccc));
        color: var(--dile-button-disabled-text-color, var(--dile-button-text-color, #999));
        border-color: var(--dile-button-disabled-border-color, var(--dile-button-border-color, #bbb));
      }
      :host([loading]) button:focus {
        outline: none;
        box-shadow: none;
      }
      :host([loading]) button:active {
        outline: none;
        border-color: #aaa;
        box-shadow: none;
      }
      :host([loading]) {
        pointer-events: none;
      }

      :host([no-wrap]) button {
        white-space: nowrap;
      }

      dile-spinner-icon {
        --dile-icon-size: var(--dile-button-spinner-size, calc(var(--dile-button-font-size, 1rem) * 0.8));
        --dile-icon-color: var(--dile-on-primary-color, #fff);
      }
      button.has-text dile-spinner-icon {
        margin-left: var(--dile-button-spinner-gap, 0.5rem);
      }

      .button-icon {
        display: flex;
        align-items: center;
        --dile-icon-size: var(--dile-button-icon-size, calc(var(--dile-button-font-size, 1rem) * 1.125));
      }
      /* The icon-to-text separation is only applied when the button has a label,
         so an icon-only button stays perfectly centered with no dead space. */
      button.has-text .button-icon.icon-left {
        margin-right: var(--dile-button-icon-separation, 0.3rem);
      }
      button.has-text .button-icon.icon-right {
        margin-left: var(--dile-button-icon-separation, 0.3rem);
      }
    `;
  }

  render() {
    const showIcon = !!this.icon && !this.loading;
    return html`
      <button
        class=${classMap({ 'has-text': this._hasText })}
        @click=${this._onClick}
        ?disabled=${this.disabled || this.loading}
        type=${this.type || "button"}
        aria-label=${ifDefined(this._computedAriaLabel)}
        aria-busy=${ifDefined(this.loading ? 'true' : undefined)}
      >
        ${showIcon && this.iconPosition !== 'right' ? this.iconTemplate : ''}
        <slot @slotchange=${this._onSlotChange}></slot>
        ${showIcon && this.iconPosition === 'right' ? this.iconTemplate : ''}
        ${this.loading ? html`<dile-spinner-icon active></dile-spinner-icon>` : ''}
      </button>
    `;
  }

  get iconTemplate() {
    const side = this.iconPosition === 'right' ? 'icon-right' : 'icon-left';
    return html`
      <dile-iconlib
        class="button-icon ${side}"
        icon=${this.icon}
        aria-hidden="true"
      ></dile-iconlib>
    `;
  }

  get _computedAriaLabel() {
    return this.label || undefined;
  }

  _detectText() {
    if (this.textContent && this.textContent.trim().length > 0) return true;
    return this.childElementCount > 0;
  }

  _onSlotChange(e) {
    const nodes = e.target.assignedNodes({ flatten: true });
    this._hasText = nodes.some(node =>
      node.nodeType === Node.ELEMENT_NODE ||
      (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
    );
  }

  _onClick(e) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (this.type === "submit") {
      const form = this._internals.form;
      if (form) {
        this._internals.setFormValue(this.value ?? null);
        form.requestSubmit();
        this._internals.setFormValue(null);
      }
    } else if (this.type === "reset") {
      this._internals.form?.reset();
    }
  }
}
