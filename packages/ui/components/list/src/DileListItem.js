import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@dile/iconlib/dile-iconlib.js';

export class DileListItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
        --_padding-y: var(--dile-list-item-padding-y, 0.75rem);
        --_padding-x: var(--dile-list-item-padding-x, 1rem);
        --_gap: var(--dile-list-item-gap, 0.75rem);
        --_align: center;
        --_divider-border: var(--dile-list-item-divider-width, 1px) var(--dile-list-item-divider-style, solid) var(--dile-list-item-divider-color, #e5e7eb);
      }

      * {
        box-sizing: border-box;
      }

      :host([density="compact"]) {
        --_padding-y: var(--dile-list-item-padding-y, 0.375rem);
        --_padding-x: var(--dile-list-item-padding-x, 0.75rem);
        --_gap: var(--dile-list-item-gap, 0.5rem);
      }

      :host([density="comfortable"]) {
        --_padding-y: var(--dile-list-item-padding-y, 0.75rem);
        --_padding-x: var(--dile-list-item-padding-x, 1rem);
        --_gap: var(--dile-list-item-gap, 0.75rem);
      }

      :host([density="spacious"]) {
        --_padding-y: var(--dile-list-item-padding-y, 1.25rem);
        --_padding-x: var(--dile-list-item-padding-x, 1.25rem);
        --_gap: var(--dile-list-item-gap, 1rem);
      }

      :host([align="start"]) {
        --_align: flex-start;
      }

      :host([align="center"]) {
        --_align: center;
      }

      :host([align="end"]) {
        --_align: flex-end;
      }

      :host([divider=""]),
      :host([divider="full"]),
      :host([divider]:not([divider="inset"]):not([divider="none"])) {
        border-bottom: var(--_divider-border);
      }

      .item {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        text-decoration: none;
        color: var(--dile-list-item-color, var(--dile-list-item-text-color, inherit));
        background-color: var(--dile-list-item-bg, var(--dile-list-item-background-color, transparent));
        border-radius: var(--item-radius, var(--dile-list-item-radius, var(--dile-list-item-border-radius, 4px)));
        padding-top: var(--_padding-y);
        padding-bottom: var(--_padding-y);
        padding-left: var(--_padding-x);
        padding-right: var(--_padding-x);
        gap: var(--_gap);
        align-items: stretch;
        transition-property: background-color, color, border-color, box-shadow;
        transition-duration: var(--dile-list-item-transition-duration, 0.15s);
        transition-timing-function: ease;
        outline: none;
      }

      .item:focus-visible {
        outline: var(--dile-list-item-focus-ring-width, 2px) solid var(--dile-list-item-focus-ring-color, #0284c7);
        outline-offset: var(--dile-list-item-focus-ring-offset, -2px);
      }

      :host([clickable]:not([disabled])) .item,
      :host([href]:not([href=""]):not([disabled])) .item {
        cursor: pointer;
        user-select: none;
      }

      :host([clickable]:not([disabled])) .item:hover,
      :host([href]:not([href=""]):not([disabled])) .item:hover {
        background-color: var(--dile-list-item-bg-hover, var(--dile-list-item-hover-background-color, var(--dile-surface-hover-color, #f5f5f5)));
      }

      :host([clickable]:not([disabled])) .item:active,
      :host([href]:not([href=""]):not([disabled])) .item:active {
        background-color: var(--dile-list-item-bg-active, var(--dile-list-item-active-background-color, var(--dile-surface-active-color, #ebebeb)));
      }

      :host([selected]) .item {
        background-color: var(--dile-list-item-bg-selected, var(--dile-list-item-selected-background-color, #e0f2fe));
        color: var(--dile-list-item-selected-text-color, var(--dile-primary-dark-color, #0369a1));
      }

      :host([disabled]) {
        opacity: var(--dile-list-item-disabled-opacity, 0.5);
        cursor: not-allowed;
        pointer-events: none;
      }

      .prefix {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        align-self: var(--dile-list-item-prefix-align, var(--_align));
      }

      .prefix[hidden],
      .suffix[hidden] {
        display: none !important;
      }

      .prefix dile-iconlib,
      .suffix dile-iconlib {
        --dile-icon-size: var(--dile-list-item-icon-size, 1.25rem);
        --dile-icon-color: var(--dile-list-item-icon-color, currentColor);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      :host([selected]) .prefix dile-iconlib,
      :host([selected]) .suffix dile-iconlib {
        --dile-icon-color: var(--dile-list-item-selected-icon-color, var(--dile-list-item-selected-text-color, currentColor));
      }

      .content {
        display: flex;
        flex: 1 1 auto;
        min-width: 0;
        align-items: stretch;
        gap: var(--_gap);
      }

      :host([divider="inset"]) .content {
        border-bottom: var(--_divider-border);
      }

      .body {
        flex: 1 1 auto;
        min-width: 0;
        align-self: center;
        text-align: var(--dile-list-item-body-text-align, var(--dile-list-item-text-align, left));
      }

      :host([body-align="left"]) .body {
        text-align: left;
      }

      :host([body-align="center"]) .body {
        text-align: center;
      }

      :host([body-align="right"]) .body {
        text-align: right;
      }

      .body ::slotted(p),
      .body ::slotted(h1),
      .body ::slotted(h2),
      .body ::slotted(h3),
      .body ::slotted(h4),
      .body ::slotted(h5),
      .body ::slotted(h6) {
        margin-top: 0;
        margin-bottom: 0;
      }

      :host([lines="1"]) .body {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      :host([lines="2"]) .body {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      :host([lines]:not([lines="1"]):not([lines="2"]):not([lines="auto"]):not([lines=""])) .body {
        display: -webkit-box;
        -webkit-line-clamp: var(--_lines, 1);
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .suffix {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        align-self: var(--dile-list-item-suffix-align, var(--_align));
      }
    `;
  }

  static get properties() {
    return {
      /** Icon identifier in "family.name" format for prefix */
      iconPrefix: { type: String, attribute: 'icon-prefix' },
      /** Icon identifier in "family.name" format for suffix */
      iconSuffix: { type: String, attribute: 'icon-suffix' },
      /** Layout density: "compact", "comfortable", or "spacious" */
      density: { type: String, reflect: true },
      /** Line clamping: "1", "2", "auto", or number */
      lines: { type: String, reflect: true },
      /** Vertical alignment of prefix and suffix: "center", "start", or "end" */
      align: { type: String, reflect: true },
      /** Text alignment of the body content: "left", "center", or "right" */
      bodyAlign: { type: String, attribute: 'body-align', reflect: true },
      /** Bottom separator: boolean, "full", or "inset" */
      divider: { type: String, reflect: true },
      /** Whether item is interactive */
      clickable: { type: Boolean, reflect: true },
      /** Navigation URL */
      href: { type: String, reflect: true },
      /** Link target */
      target: { type: String, reflect: true },
      /** Disabled state */
      disabled: { type: Boolean, reflect: true },
      /** Selected state */
      selected: { type: Boolean, reflect: true },
      /** Expanded state */
      expanded: { type: Boolean, reflect: true },
      /** Value associated with the item */
      value: { type: String, reflect: true },
      /** Tabindex for roving tabindex control */
      itemTabindex: { type: Number, attribute: 'item-tabindex' },
      /** Internal slot states */
      _hasPrefixSlot: { state: true },
      _hasSuffixSlot: { state: true },
    };
  }

  constructor() {
    super();
    this.iconPrefix = '';
    this.iconSuffix = '';
    this.density = 'comfortable';
    this.lines = 'auto';
    this.align = 'center';
    this.bodyAlign = 'left';
    this.divider = '';
    this.clickable = false;
    this.href = '';
    this.disabled = false;
    this.selected = false;
    this.value = '';
    this.itemTabindex = 0;
    this._hasPrefixSlot = false;
    this._hasSuffixSlot = false;
  }

  // Alias for Spanish spelling convenience
  get iconSufix() {
    return this.iconSuffix;
  }

  set iconSufix(val) {
    this.iconSuffix = val;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    this._checkLightDomSlots();
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._checkLightDomSlots();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('lines')) {
      if (this.lines && this.lines !== 'auto' && this.lines !== '1' && this.lines !== '2') {
        this.style.setProperty('--_lines', String(this.lines));
      } else {
        this.style.removeProperty('--_lines');
      }
    }
  }

  _checkLightDomSlots() {
    this._hasPrefixSlot = Boolean(this.querySelector('[slot="prefix"], [slot="leading"]'));
    this._hasSuffixSlot = Boolean(this.querySelector('[slot="suffix"], [slot="trailing"]'));
  }

  _handleSlotChange() {
    this._checkLightDomSlots();
  }

  focus(options) {
    const target = this.shadowRoot?.querySelector('.item');
    if (target) {
      target.focus(options);
    } else {
      super.focus?.(options);
    }
  }

  render() {
    const hasPrefix = Boolean(this._hasPrefixSlot || this.iconPrefix);
    const hasSuffix = Boolean(this._hasSuffixSlot || this.iconSuffix);
    const currentRole = this.getAttribute('role');
    const isOptionOrMenuItem = currentRole === 'option' || currentRole === 'menuitem';
    const computedTabindex = this.disabled ? -1 : (this.itemTabindex !== undefined ? this.itemTabindex : 0);

    const contentTemplate = html`
      <div class="prefix" part="prefix" ?hidden="${!hasPrefix}">
        <slot name="prefix" @slotchange="${this._handleSlotChange}"><slot name="leading" @slotchange="${this._handleSlotChange}">${this.iconPrefix ? html`<dile-iconlib icon="${this.iconPrefix}" aria-hidden="true"></dile-iconlib>` : ''}</slot></slot>
      </div>
      <div class="content" part="content">
        <div class="body" part="body">
          <slot></slot>
        </div>
        <div class="suffix" part="suffix" ?hidden="${!hasSuffix}">
          <slot name="suffix" @slotchange="${this._handleSlotChange}"><slot name="trailing" @slotchange="${this._handleSlotChange}">${this.iconSuffix ? html`<dile-iconlib icon="${this.iconSuffix}" aria-hidden="true"></dile-iconlib>` : ''}</slot></slot>
        </div>
      </div>
    `;

    if (this.href) {
      return html`
        <a
          class="item"
          part="item"
          href="${this.href}"
          target="${ifDefined(this.target || undefined)}"
          rel="${ifDefined(this.target === '_blank' ? 'noopener noreferrer' : undefined)}"
          tabindex="${computedTabindex}"
          aria-disabled="${ifDefined(this.disabled ? 'true' : undefined)}"
          aria-selected="${ifDefined(this.selected ? 'true' : undefined)}"
          aria-expanded="${ifDefined(this.expanded !== undefined ? (this.expanded ? 'true' : 'false') : undefined)}"
          @click="${this._handleItemClick}"
          @keydown="${this._handleKeyDown}"
        >${contentTemplate}</a>
      `;
    }

    if (this.clickable) {
      return html`
        <div
          class="item"
          part="item"
          role="${ifDefined(isOptionOrMenuItem ? undefined : 'button')}"
          tabindex="${computedTabindex}"
          aria-disabled="${ifDefined(this.disabled ? 'true' : undefined)}"
          aria-selected="${ifDefined(this.selected ? 'true' : undefined)}"
          aria-expanded="${ifDefined(this.expanded !== undefined ? (this.expanded ? 'true' : 'false') : undefined)}"
          @click="${this._handleItemClick}"
          @keydown="${this._handleKeyDown}"
          @keyup="${this._handleKeyUp}"
        >${contentTemplate}</div>
      `;
    }

    return html`
      <div
        class="item"
        part="item"
        aria-disabled="${ifDefined(this.disabled ? 'true' : undefined)}"
        aria-selected="${ifDefined(this.selected ? 'true' : undefined)}"
        aria-expanded="${ifDefined(this.expanded !== undefined ? (this.expanded ? 'true' : 'false') : undefined)}"
      >${contentTemplate}</div>
    `;
  }

  _handleItemClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const path = e.composedPath();
    const suffixContainer = this.shadowRoot.querySelector('.suffix');
    const isFromSuffix = suffixContainer && path.includes(suffixContainer);

    const isInteractiveTarget = path.some(el => {
      if (el === this || el === this.shadowRoot || el === e.currentTarget) return false;
      const tag = el.tagName ? el.tagName.toLowerCase() : '';
      const role = el.getAttribute?.('role');
      return ['button', 'input', 'select', 'textarea', 'a'].includes(tag) || role === 'button' || role === 'link' || role === 'checkbox' || role === 'switch';
    });

    if (isInteractiveTarget && isFromSuffix) {
      return;
    }

    this.dispatchEvent(new CustomEvent('dile-list-item-click', {
      bubbles: true,
      composed: true,
      detail: {
        item: this,
        value: this.value,
        href: this.href,
        selected: this.selected,
      }
    }));
  }

  _handleKeyDown(e) {
    if (this.disabled) return;
    if (e.key === 'Enter') {
      if (!this.href) {
        e.preventDefault();
        this._handleItemClick(e);
      }
    } else if (e.key === ' ' && this.href) {
      e.preventDefault();
      this.shadowRoot.querySelector('a')?.click();
    }
  }

  _handleKeyUp(e) {
    if (this.disabled) return;
    if (e.key === ' ' && !this.href && this.clickable) {
      e.preventDefault();
      this._handleItemClick(e);
    }
  }
}
