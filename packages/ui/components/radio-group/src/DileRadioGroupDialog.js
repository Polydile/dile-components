import { html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DileRadioGroup } from './DileRadioGroup.js';
import '../../card/card.js';
import '../radio.js';

const NAVIGATION_KEYS = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];

export class DileRadioGroupDialog extends DileRadioGroup {
  static styles = [
    ...DileRadioGroup.styles,
    css`
      :host {
        --dile-radio-group-dialog-title-color: var(--dile-on-background-color, #303030);
        --dile-radio-group-dialog-title-font-size: 1.25rem;
        --dile-radio-group-dialog-title-font-weight: 600;
        --dile-radio-group-dialog-description-color: var(--dile-on-background-color, #303030);
        --dile-radio-group-dialog-description-font-size: 0.95rem;
        --dile-radio-group-dialog-description-margin-bottom: 1.5rem;
        --dile-radio-group-dialog-item-margin-bottom: 1rem;
        --dile-radio-group-dialog-item-gap: 0.25rem 0.75rem;
        --dile-radio-group-dialog-item-label-color: var(--dile-on-background-color, #303030);
        --dile-radio-group-dialog-item-label-font-size: 1rem;
        --dile-radio-group-dialog-item-label-font-weight: 500;
        --dile-radio-group-dialog-item-description-color: var(--dile-gray-dark-color, #555555);
        --dile-radio-group-dialog-item-description-font-size: 0.875rem;
        --dile-radio-group-dialog-item-description-margin-top: 0.5rem;
      }

      dile-card {
        width: 100%;
      }

      .dialog-title {
        color: var(--dile-radio-group-dialog-title-color);
        font-size: var(--dile-radio-group-dialog-title-font-size);
        font-weight: var(--dile-radio-group-dialog-title-font-weight);
        margin: 0;
        margin-bottom: 0.5rem;
      }

      .dialog-description {
        color: var(--dile-radio-group-dialog-description-color);
        font-size: var(--dile-radio-group-dialog-description-font-size);
        margin: 0;
        margin-bottom: var(--dile-radio-group-dialog-description-margin-bottom);
      }

      .radio-items {
        display: flex;
        flex-direction: column;
        gap: var(--dile-radio-group-dialog-item-margin-bottom);
      }

      .radio-item-wrapper {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
        gap: var(--dile-radio-group-dialog-item-gap, 0.5rem 0.75rem);
        cursor: pointer;
      }

      .radio-item-wrapper:focus-visible {
        outline: var(--dile-radio-group-dialog-item-focus-outline, 2px solid #4A90E2);
        outline-offset: 2px;
      }

      .radio-item-wrapper dile-radio {
        grid-row: 1 / 3;
        grid-column: 1;
        display: flex;
        align-items: flex-start;
        padding-top: 0.15rem;
      }

      .item-label {
        grid-row: 1;
        grid-column: 2;
        color: var(--dile-radio-group-dialog-item-label-color);
        font-size: var(--dile-radio-group-dialog-item-label-font-size);
        font-weight: var(--dile-radio-group-dialog-item-label-font-weight);
        margin: 0;
        cursor: pointer;
        user-select: none;
        align-self: start;
      }

      .item-description {
        grid-row: 2;
        grid-column: 2;
        color: var(--dile-radio-group-dialog-item-description-color);
        font-size: var(--dile-radio-group-dialog-item-description-font-size);
        margin: 0;
      }

      .radio-item-wrapper:not(:has(.item-description)) dile-radio {
        grid-row: 1;
      }

      dile-radio {
        --dile-radio-label-font-size: 0;
        --dile-radio-space-between-label-and-icon: 0;
      }

      :host([disabled]) .radio-item-wrapper {
        opacity: 0.6;
        cursor: not-allowed;
      }

      dile-input-message {
        margin-bottom: -5px;
      }
    `
  ];

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      description: { type: String },
      dialogItems: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.dialogItems = [];
  }

  render() {
    return html`
      <dile-card>
        ${this.title
          ? html`<h2 class="dialog-title" id="${this._id}-title">${this.title}</h2>`
          : ''
        }
        ${this.description
          ? html`<p class="dialog-description" id="${this._id}-description">${this.description}</p>`
          : ''
        }
        <div
          class="radio-items"
          role="radiogroup"
          aria-labelledby="${ifDefined(this.title ? `${this._id}-title` : undefined)}"
          aria-describedby="${ifDefined(this.getGroupDescribedBy())}"
          aria-invalid="${this.errored ? 'true' : 'false'}"
          aria-disabled="${this.disabled ? 'true' : 'false'}"
          @keydown=${this.handleItemsKeydown}
        >
          ${this.dialogItems.map((item, index) => {
            const labelId = `${this._id}-item-${index}-label`;
            const descriptionId = `${this._id}-item-${index}-description`;
            const selected = this.value === item.value;
            return html`
              <div
                class="radio-item-wrapper"
                role="radio"
                aria-checked="${selected}"
                aria-disabled="${this.disabled}"
                aria-labelledby="${labelId}"
                aria-describedby="${ifDefined(item.description ? descriptionId : undefined)}"
                tabindex="${this.disabled ? -1 : (this.getTabbableIndex() === index ? 0 : -1)}"
                @click="${() => this.selectItem(index)}"
              >
                <dile-radio
                  value="${item.value}"
                  ?selected=${selected}
                  ?disabled=${this.disabled}
                  decorative
                ></dile-radio>
                <span class="item-label" id="${labelId}">${item.label}</span>
                ${item.description
                  ? html`<p class="item-description" id="${descriptionId}">${item.description}</p>`
                  : ''
                }
              </div>
            `;
          })}
        </div>
        ${this.message
          ? html`<dile-input-message id="${this._id}-message" message="${this.message}" ?errored=${this.errored}></dile-input-message>`
          : ''
        }
      </dile-card>
    `;
  }

  getGroupDescribedBy() {
    const ids = [];
    if (this.description) ids.push(`${this._id}-description`);
    if (this.message) ids.push(`${this._id}-message`);
    return ids.length ? ids.join(' ') : undefined;
  }

  getTabbableIndex() {
    const selectedIndex = this.dialogItems.findIndex(item => item.value === this.value);
    return selectedIndex !== -1 ? selectedIndex : 0;
  }

  handleItemsKeydown(e) {
    if (this.disabled) return;
    const wrapper = e.target.closest('.radio-item-wrapper');
    if (!wrapper) return;
    const wrappers = Array.from(this.shadowRoot.querySelectorAll('.radio-item-wrapper'));
    const currentIndex = wrappers.indexOf(wrapper);

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.selectItem(currentIndex);
      return;
    }

    if (!NAVIGATION_KEYS.includes(e.key)) return;
    e.preventDefault();
    const nextIndex = this.getFocusableIndex(wrappers, e.key, currentIndex);
    if (nextIndex === -1) return;
    wrappers[nextIndex].focus();
    this.selectItem(nextIndex);
  }

  selectItem(index) {
    if (!this.disabled && this.dialogItems[index]) {
      const item = this.dialogItems[index];
      this.value = item.value;
      if (this.hideErrorOnInput && this.errored) {
        this.message = '';
        this.errored = false;
      }
      this.emmitChange();
      this.dispatchChangeEvent();
      this.internals.setFormValue(this.value);
    }
  }

  dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('dile-radio-group-changed', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        value: this.value
      }
    }));
  }
}
