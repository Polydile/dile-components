import { LitElement, html, css } from 'lit';
import { DileEmmitChange } from '../../../mixins/form/index.js';
import { DileOverlay } from '../../../mixins/overlay/index.js';
import { DileCloseDocumentClick } from '../../../mixins/close-document-click/index.js';
import { DileCloseOnEscPressed } from '../../../mixins/close-on-esc-pressed/index.js';
import { messageStyles } from '../../input/index.js';
import { normalizeHex, hexToHsv, hsvToHex } from '../../../lib/color/colorConversion.js';

export class DileColorPicker extends DileOverlay(
  DileCloseDocumentClick(
    DileCloseOnEscPressed(
      DileEmmitChange(LitElement)
    )
  )
) {

  /**
   * Listen to the generic `element-changed` event to receive value updates
   *
   * @event element-changed
   */

  static get properties() {
    return {
      /** Label to the element */
      label: { type: String },

      /** Name for this input field */
      name: { type: String },

      /** Set initial value to the input. Must be a 6-digit hex color, e.g. "#3366ff" */
      value: { type: String },

      /** Disable the input field */
      disabled: { type: Boolean },

      /** ReadOnly attribute */
      readonly: { type: Boolean },

      /** Has error on this input field */
      errored: { type: Boolean },

      /** Message Displayed */
      message: { type: String },

      /** Hide errors on input */
      hideErrorOnInput: { type: Boolean },

      /** Set the application focus to this the input component after the initialization */
      focusOnStart: { type: Boolean },

      _hue: { state: true },
      _saturation: { state: true },
      _value: { state: true },
      _hexInputValue: { state: true },
    };
  }

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.label = '';
    this.name = '';
    this.value = '#000000';
    this.disabled = false;
    this.readonly = false;
    this.errored = false;
    this.message = '';
    this.hideErrorOnInput = false;
    this.focusOnStart = false;

    const { h, s, v } = hexToHsv(this.value);
    this._hue = h;
    this._saturation = s;
    this._value = v;
    this._hexInputValue = this.value;
    this._skipValueSync = false;

    this.internals = this.attachInternals();
  }

  get opened() {
    return this._overlayClass === 'opened';
  }

  get svSquareEl() {
    return this.shadowRoot.getElementById('sv-square');
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.focusOnStart) {
      this.focus();
    }
  }

  willUpdate(changedProperties) {
    const skip = this._skipValueSync;
    this._skipValueSync = false;
    if (changedProperties.has('value') && !skip) {
      const normalized = normalizeHex(this.value);
      if (normalized) {
        const { h, s, v } = hexToHsv(normalized);
        this._hue = h;
        this._saturation = s;
        this._value = v;
        if (normalized !== this.value) {
          this.value = normalized;
        }
      } else {
        console.warn(`dile-color-picker: invalid value "${this.value}", ignoring`);
      }
      this._hexInputValue = this.value;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.emmitChange();
      this.internals.setFormValue(this.value);
    }
    if (changedProperties.has('_overlayClass')) {
      if (this._overlayClass === 'opened') {
        this.svSquareEl?.focus();
      } else if (changedProperties.get('_overlayClass') === 'opened') {
        this.trigger?.focus();
      }
    }
  }

  static get styles() {
    return [
      messageStyles,
      css`
        * {
          box-sizing: border-box;
        }
        :host {
          display: inline-block;
          margin-bottom: 10px;
        }
        label {
          display: block;
          margin-bottom: var(--dile-input-label-margin-bottom, 4px);
          font-size: var(--dile-input-label-font-size, 1em);
          color: var(--dile-input-label-color, #59e);
          font-weight: var(--dile-input-label-font-weight, normal);
        }
        #trigger {
          padding: 0;
          width: var(--dile-color-picker-swatch-size, 2em);
          height: var(--dile-color-picker-swatch-size, 2em);
          border-radius: var(--dile-color-picker-swatch-border-radius, 5px);
          border: var(--dile-color-picker-swatch-border-width, 1px) solid var(--dile-color-picker-swatch-border-color, #888);
          cursor: pointer;
        }
        #trigger:disabled {
          cursor: default;
          opacity: 0.6;
        }
        #trigger.errored {
          border-color: var(--dile-color-picker-error-border-color, #c00);
        }
        #trigger:focus-visible {
          outline: none;
          border-width: var(--dile-color-picker-swatch-focus-border-width, 3px);
          border-color: var(--dile-input-focus-border-color, #6af);
        }
        #overlay {
          display: none;
          position: absolute;
          opacity: 0;
          z-index: var(--dile-color-picker-panel-z-index, 999);
          width: var(--dile-color-picker-panel-width, 220px);
          background-color: var(--dile-color-picker-panel-background-color, #fff);
          border-radius: var(--dile-color-picker-panel-border-radius, 5px);
          box-shadow: var(--dile-color-picker-panel-box-shadow, 0 0 20px rgba(102, 102, 102, 0.5));
          padding: var(--dile-color-picker-panel-padding, 1rem);
          transition: var(--dile-color-picker-panel-transition, ease 0.2s);
          transition-property: transform, opacity;
          transform: translateY(-10px);
        }
        #overlay.opened {
          opacity: 1;
          transform: translateY(0);
        }
        #sv-square {
          position: relative;
          width: 100%;
          height: var(--dile-color-picker-sv-square-size, 160px);
          border-radius: var(--dile-color-picker-sv-square-border-radius, 4px);
          background-image: linear-gradient(to top, #000, transparent),
                             linear-gradient(to right, #fff, transparent);
          touch-action: none;
          cursor: crosshair;
        }
        #sv-square:focus-visible {
          outline: 2px solid var(--dile-input-focus-border-color, #6af);
          outline-offset: 2px;
        }
        .sv-thumb {
          position: absolute;
          width: var(--dile-color-picker-sv-thumb-size, 14px);
          height: var(--dile-color-picker-sv-thumb-size, 14px);
          border-radius: 50%;
          border: var(--dile-color-picker-sv-thumb-border-width, 2px) solid var(--dile-color-picker-sv-thumb-border-color, #fff);
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .hue-slider {
          display: block;
          width: 100%;
          margin-top: 0.75rem;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        .hue-slider:focus {
          outline: none;
        }
        .hue-slider::-webkit-slider-runnable-track {
          height: var(--dile-color-picker-hue-track-height, 12px);
          border-radius: var(--dile-color-picker-hue-track-border-radius, 6px);
          background: linear-gradient(
            to right,
            hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%),
            hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%)
          );
        }
        .hue-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: calc((var(--dile-color-picker-hue-track-height, 12px) - var(--dile-color-picker-hue-thumb-size, 18px)) / 2);
          width: var(--dile-color-picker-hue-thumb-size, 18px);
          height: var(--dile-color-picker-hue-thumb-size, 18px);
          border-radius: 50%;
          background-color: #fff;
          border: var(--dile-color-picker-hue-thumb-border-width, 2px) solid var(--dile-color-picker-hue-thumb-border-color, #888);
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
        }
        .hue-slider::-moz-range-track {
          height: var(--dile-color-picker-hue-track-height, 12px);
          border-radius: var(--dile-color-picker-hue-track-border-radius, 6px);
          background: linear-gradient(
            to right,
            hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%),
            hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%)
          );
        }
        .hue-slider::-moz-range-thumb {
          width: var(--dile-color-picker-hue-thumb-size, 18px);
          height: var(--dile-color-picker-hue-thumb-size, 18px);
          border-radius: 50%;
          background-color: #fff;
          border: var(--dile-color-picker-hue-thumb-border-width, 2px) solid var(--dile-color-picker-hue-thumb-border-color, #888);
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
        }
        .hex-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }
        .hex-swatch {
          display: block;
          flex-shrink: 0;
          width: var(--dile-color-picker-swatch-size, 2em);
          height: var(--dile-color-picker-swatch-size, 2em);
          border-radius: var(--dile-color-picker-swatch-border-radius, 5px);
          border: var(--dile-color-picker-swatch-border-width, 1px) solid var(--dile-color-picker-swatch-border-color, #888);
        }
        .hex-input {
          box-sizing: border-box;
          flex-grow: 1;
          min-width: 0;
          border-radius: var(--dile-color-picker-hex-input-border-radius, 4px);
          border: 1px solid var(--dile-color-picker-hex-input-border-color, #888);
          padding: 5px;
          font-size: var(--dile-color-picker-hex-input-font-size, 0.875rem);
          background-color: var(--dile-color-picker-hex-input-background-color, #fff);
          color: var(--dile-color-picker-hex-input-color, #303030);
        }
        .hex-input:focus {
          outline: none;
          border-color: var(--dile-input-focus-border-color, #6af);
        }
        .hex-input.errored {
          border-color: var(--dile-color-picker-error-border-color, #c00);
        }
        #trigger-overlay {
            display: flex;
        }
      `,
    ];
  }

  render() {
    return html`
      <main>
        ${this.label ? html`<label id="cp-label">${this.label}</label>` : ''}
        <div id="trigger-overlay">
            <button
            type="button"
            id="trigger"
            class="${this.errored ? 'errored' : ''}"
            style="background-color: ${this.value}"
            ?disabled="${this.disabled}"
            aria-haspopup="dialog"
            aria-expanded="${this.opened}"
            aria-label="${this.label || 'Color picker'}"
            @click="${this.toggle}"
            ></button>
        </div>
        ${this.messageTemplate}
        ${this.overlayTemplate}
      </main>
    `;
  }

  get overlayTemplate() {
    return html`
      <div
        id="overlay"
        class="${this._overlayClass}"
        role="dialog"
        aria-label="${this.label || 'Color picker'}"
        @click="${this._onOverlayClick}"
      >
        <div
          id="sv-square"
          role="slider"
          tabindex="${this.disabled ? -1 : 0}"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="${this._value}"
          aria-valuetext="Saturation ${this._saturation}%, brightness ${this._value}%"
          aria-readonly="${this.readonly}"
          style="background-color: hsl(${this._hue}, 100%, 50%)"
          @pointerdown="${this._onSvPointerDown}"
          @pointermove="${this._onSvPointerMove}"
          @pointerup="${this._onSvPointerUp}"
          @pointercancel="${this._onSvPointerUp}"
          @keydown="${this._onSvKeydown}"
        >
          <div class="sv-thumb" style="left: ${this._saturation}%; top: ${100 - this._value}%"></div>
        </div>
        <input
          type="range"
          class="hue-slider"
          min="0"
          max="360"
          step="1"
          aria-label="Hue"
          .value="${String(this._hue)}"
          ?disabled="${this.disabled}"
          @input="${this._onHueInput}"
        />
        <div class="hex-row">
          <span class="hex-swatch" style="background-color: ${this.value}"></span>
          <input
            type="text"
            class="hex-input ${this.errored ? 'errored' : ''}"
            aria-label="Hex color"
            maxlength="7"
            spellcheck="false"
            autocomplete="off"
            ?disabled="${this.disabled}"
            ?readonly="${this.readonly}"
            .value="${this._hexInputValue}"
            @input="${this._onHexInput}"
            @blur="${this._onHexBlur}"
            @keydown="${this._onHexKeydown}"
          />
        </div>
      </div>
    `;
  }

  get messageTemplate() {
    return html`
      ${this.message
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
        : ''
      }
    `;
  }

  _onOverlayClick(e) {
    e.stopPropagation();
  }

  _commitHsv() {
    const hex = hsvToHex(this._hue, this._saturation, this._value);
    this._hexInputValue = hex;
    if (this.value !== hex) {
      this._skipValueSync = true;
      this.value = hex;
    }
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }
  }

  _onSvPointerDown(e) {
    if (this.disabled || this.readonly) return;
    e.preventDefault();
    this._svDragging = true;
    e.target.setPointerCapture(e.pointerId);
    this._updateSvFromPointer(e);
  }

  _onSvPointerMove(e) {
    if (!this._svDragging) return;
    this._updateSvFromPointer(e);
  }

  _onSvPointerUp() {
    this._svDragging = false;
  }

  _updateSvFromPointer(e) {
    const rect = this.svSquareEl.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);
    this._saturation = rect.width === 0 ? 0 : Math.round((x / rect.width) * 100);
    this._value = rect.height === 0 ? 100 : Math.round(100 - (y / rect.height) * 100);
    this._commitHsv();
  }

  _onSvKeydown(e) {
    if (this.disabled || this.readonly) return;
    const step = e.shiftKey ? 10 : 1;
    const clamp = (n) => Math.max(0, Math.min(100, n));
    let handled = true;
    switch (e.key) {
      case 'ArrowRight': this._saturation = clamp(this._saturation + step); break;
      case 'ArrowLeft': this._saturation = clamp(this._saturation - step); break;
      case 'ArrowUp': this._value = clamp(this._value + step); break;
      case 'ArrowDown': this._value = clamp(this._value - step); break;
      case 'Home': this._saturation = 0; break;
      case 'End': this._saturation = 100; break;
      case 'PageUp': this._value = clamp(this._value + 10); break;
      case 'PageDown': this._value = clamp(this._value - 10); break;
      default: handled = false;
    }
    if (handled) {
      e.preventDefault();
      this._commitHsv();
    }
  }

  _onHueInput(e) {
    if (this.disabled || this.readonly) {
      e.target.value = this._hue;
      return;
    }
    this._hue = Number(e.target.value);
    this._commitHsv();
  }

  _onHexInput(e) {
    this._hexInputValue = e.target.value;
    if (this.disabled || this.readonly) return;
    const normalized = normalizeHex(this._hexInputValue);
    if (!normalized) return;
    const { h, s, v } = hexToHsv(normalized);
    this._hue = h;
    this._saturation = s;
    this._value = v;
    this._skipValueSync = true;
    this.value = normalized;
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }
  }

  _onHexBlur() {
    this._hexInputValue = this.value;
  }

  _onHexKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._onHexBlur();
    }
  }

  clearError() {
    this.errored = false;
    this.message = '';
  }

  focus() {
    this.trigger.focus();
  }
}
