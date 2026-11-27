import { LitElement, html, css, nothing } from 'lit';

export class DileFormGroup extends LitElement {
  static styles = [
    css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: block;
        margin: var(--dile-form-group-margin, 0 0 1.5rem);
      }
      :host([hidden]) {
        display: none;
      }

      .group {
        padding: var(--dile-form-group-padding, 1rem 0 0);
        border-top: var(--dile-form-group-border-top, 1px solid var(--dile-form-group-line-color, var(--dile-secondary-dark-color, #888)));
      }
      :host([variant="box"]) .group {
        padding: var(--dile-form-group-padding, 1rem);
        border: var(--dile-form-group-border, 1px solid var(--dile-form-group-line-color, #ccc));
        border-radius: var(--dile-form-group-border-radius, 0.5rem);
        background-color: var(--dile-form-group-background-color, transparent);
      }
      :host([variant="plain"]) .group {
        padding: var(--dile-form-group-padding, 0);
        border: none;
      }

      header {
        margin-bottom: var(--dile-form-group-header-margin-bottom, 0.75rem);
      }
      .label {
        margin: 0;
        color: var(--dile-form-group-label-color, var(--dile-secondary-dark-color, #888));
        font-size: var(--dile-form-group-label-font-size, 1.1rem);
        font-weight: var(--dile-form-group-label-font-weight, 300);
      }
      .description {
        margin: 0.25rem 0 0;
        color: var(--dile-form-group-description-color, var(--dile-on-background-color, #303030));
        font-size: var(--dile-form-group-description-font-size, 0.875rem);
        opacity: 0.8;
      }

      .grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: var(--dile-form-group-gap, 0 1rem);
        align-items: start;
      }
      :host([columns="2"]) .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      :host([columns="3"]) .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .grid ::slotted([data-span="2"]) {
        grid-column: span 2;
      }
      .grid ::slotted([data-span="full"]) {
        grid-column: 1 / -1;
      }

      .split {
        display: grid;
        grid-template-columns: var(--dile-form-group-split-columns, 1fr 1fr);
        gap: var(--dile-form-group-gap, 0 1rem);
        align-items: start;
      }
      .split-column {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .split:not(.has-content) {
        display: none;
      }

      :host([collapsed]) .grid,
      :host([collapsed]) .split {
        grid-template-columns: minmax(0, 1fr);
      }
      :host([collapsed]) .grid ::slotted([data-span]) {
        grid-column: auto;
      }
    `
  ];

  static get properties() {
    return {
      label: { type: String },
      description: { type: String },
      labelLevel: { type: Number, attribute: 'label-level' },
      columns: { type: Number, reflect: true },
      breakpoint: { type: Number },
      variant: { type: String, reflect: true },
      collapsed: { type: Boolean, reflect: true },
      _hasSplitContent: { state: true },
      _hasLabelSlot: { state: true },
    };
  }

  constructor() {
    super();
    this.columns = 1;
    this.breakpoint = 600;
    this.variant = 'line';
    this.collapsed = false;
    this._hasSplitContent = false;
    this._hasLabelSlot = false;
    this._width = null;
    this._resizeObserver = new ResizeObserver((entries) => {
      this._width = entries[0].contentRect.width;
      this._updateCollapsed();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver.disconnect();
  }

  updated(changedProperties) {
    if (changedProperties.has('breakpoint')) {
      this._updateCollapsed();
    }
  }

  _updateCollapsed() {
    if (this._width === null) return;
    this.collapsed = this.breakpoint > 0 && this._width < this.breakpoint;
  }

  render() {
    const hasHeader = this.label || this.description || this._hasLabelSlot;
    return html`
      <div
        class="group"
        role="group"
        aria-labelledby=${this.label || this._hasLabelSlot ? 'label' : nothing}
        aria-describedby=${this.description ? 'description' : nothing}
      >
        <header ?hidden=${!hasHeader}>
          ${this.labelTemplate}
          ${this.description ? html`<p id="description" class="description">${this.description}</p>` : ''}
        </header>
        <div class="split ${this._hasSplitContent ? 'has-content' : ''}">
          <div class="split-column"><slot name="left" @slotchange=${this._onSplitSlotChange}></slot></div>
          <div class="split-column"><slot name="right" @slotchange=${this._onSplitSlotChange}></slot></div>
        </div>
        <div class="grid">
          <slot></slot>
        </div>
      </div>
    `;
  }

  get labelTemplate() {
    const useHeadingRole = this.labelLevel && !this._hasLabelSlot;
    return html`
      <div
        id="label"
        class="label"
        role=${useHeadingRole ? 'heading' : nothing}
        aria-level=${useHeadingRole ? this.labelLevel : nothing}
      >
        <slot name="label" @slotchange=${this._onLabelSlotChange}>${this.label}</slot>
      </div>
    `;
  }

  _onSplitSlotChange() {
    const slots = this.shadowRoot.querySelectorAll('slot[name="left"], slot[name="right"]');
    this._hasSplitContent = [...slots].some((slot) => slot.assignedNodes().length > 0);
  }

  _onLabelSlotChange(e) {
    this._hasLabelSlot = e.target.assignedNodes().length > 0;
  }
}
