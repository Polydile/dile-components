import { html, css } from 'lit';
import { DileSelectOverlay } from './DileSelectOverlay.js';

/**
 * # dile-color-select
 *
 * Select of a color from a closed list. It looks like the other dile-components selects and,
 * like dile-select-overlay (which it extends), shows its options in an overlay: each option
 * displays a swatch of the color and its name. Its `value` is the chosen color (any CSS color
 * string: hex, rgb()...), or `''` when there is no color.
 *
 * Keyboard, ARIA combobox + listbox pattern, form association and the `element-changed` event
 * are inherited from dile-select-overlay. Instead of a slotted `<select>`, the options come from
 * the `colors` property.
 *
 * ## Properties
 * - `colors`: `[{ value: '#fde68a', name: 'Yellow' }, ...]`.
 * - `emptyLabel`: when set, adds a first "no color" option with this name and value `''`.
 * - `value`: the chosen color. It must match one of the `colors` values exactly.
 * - Plus dile-select-overlay's `label`, `name`, `placeholder`, `disabled`, `errored`, `message`,
 *   `hideErrorOnInput`, `quietOnStart`, `accessibleLabel`...
 *
 * ## CSS custom properties
 * - `--dile-color-select-swatch-size` (1rem): swatch side.
 * - `--dile-color-select-swatch-border-radius` (50%): swatch radius (50% circle, 0 square).
 * - `--dile-color-select-swatch-border-color` (rgba(0, 0, 0, 0.25)): swatch border.
 * - Plus dile-select-overlay's ones (`--dile-input-*`, `--dile-select-overlay-*`...).
 */
export class DileColorSelect extends DileSelectOverlay {
  static get styles() {
    return [
      super.styles,
      css`
        .swatch {
          flex: none;
          width: var(--dile-color-select-swatch-size, 1rem);
          height: var(--dile-color-select-swatch-size, 1rem);
          border-radius: var(--dile-color-select-swatch-border-radius, 50%);
          border: 1px solid var(--dile-color-select-swatch-border-color, rgba(0, 0, 0, 0.25));
        }
        .swatch.empty {
          background: linear-gradient(
            to top right,
            transparent calc(50% - 1px),
            var(--dile-color-select-swatch-border-color, rgba(0, 0, 0, 0.25)),
            transparent calc(50% + 1px)
          );
        }
        .option {
          gap: 0.5rem;
        }
        @media (forced-colors: active) {
          .swatch {
            forced-color-adjust: none;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      colors: { type: Array },
      emptyLabel: { type: String },
    };
  }

  constructor() {
    super();
    this.value = '';
    this.colors = [];
    this.emptyLabel = '';
  }

  get usesSelectElement() {
    return false;
  }

  /** The "no color" option (when `emptyLabel` is set) followed by `colors`. */
  get options() {
    const colors = (this.colors ?? []).map((color) => ({ value: color.value, text: color.name }));
    return this.emptyLabel ? [{ value: '', text: this.emptyLabel }, ...colors] : colors;
  }

  triggerContentTemplate(selected) {
    if (!selected) {
      return super.triggerContentTemplate(selected);
    }
    return html`${this.swatchTemplate(selected.value)}<span class="trigger-label">${selected.text}</span>`;
  }

  optionContentTemplate(opt, index) {
    if (typeof this.optionRenderer === 'function') {
      return super.optionContentTemplate(opt, index);
    }
    return html`${this.swatchTemplate(opt.value)}<span>${opt.text}</span>`;
  }

  swatchTemplate(color) {
    return color
      ? html`<span class="swatch" part="swatch" style="background-color: ${color}" aria-hidden="true"></span>`
      : html`<span class="swatch empty" part="swatch" aria-hidden="true"></span>`;
  }
}
