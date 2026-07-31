import { html, css, LitElement } from "lit";
import { DileSelectable } from "../../../mixins/selectable/index.js";
import "../../menu-overlay/menu-overlay.js";
import "@dile/iconlib/dile-lucide-badge.js";
import "@dile/iconlib/dile-lucide-icon.js";
import "@dile/iconlib/lucide-icons/ellipsis-vertical.js";

export class DileSelectorOverlay extends DileSelectable(LitElement) {

  static get properties() {
    return {
      /** Text shown next to the trigger icon. When null or empty, only the icon is shown.
       *  Fixed by default; see dynamicLabel to have it follow the selected item's text instead. */
      label: { type: String },

      /** When true, label automatically follows the selected item's text instead of staying fixed */
      dynamicLabel: { type: Boolean },

      /** Lucide icon name used in the trigger. Defaults to "ellipsis-vertical" */
      icon: { type: String },

      _displayLabel: { state: true },

      /** Accessible label for the trigger when there is no visible label text */
      triggerAriaLabel: { type: String },

      /** Forwarded to the internal dile-menu-overlay */
      horizontalAlign: { type: String },

      /** Forwarded to the internal dile-menu-overlay */
      verticalAlign: { type: String },

      /** Forwarded to the internal dile-menu-overlay */
      moveTop: { type: Number },

      /** Forwarded to the internal dile-menu-overlay */
      moveLeft: { type: Number },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      #trigger {
        display: inline-flex;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();
    this.label = null;
    this.dynamicLabel = false;
    this.icon = 'ellipsis-vertical';
    this._displayLabel = null;
    this.triggerAriaLabel = 'Options';
    this.horizontalAlign = 'under_left';
    this.verticalAlign = 'bottom';
    this.moveTop = 0;
    this.moveLeft = 0;
  }

  render() {
    return html`
      <dile-menu-overlay
        horizontalAlign="${this.horizontalAlign}"
        verticalAlign="${this.verticalAlign}"
        moveTop="${this.moveTop}"
        moveLeft="${this.moveLeft}"
        closeOnClickInside
      >
        <span
          slot="trigger"
          id="trigger"
          role="button"
          tabindex="0"
          aria-haspopup="true"
          aria-label="${this._displayLabel || this.triggerAriaLabel}"
          @keydown="${this._onTriggerKeydown}"
        >
          ${this._displayLabel
            ? html`<dile-lucide-badge icon="${this.icon}">${this._displayLabel}</dile-lucide-badge>`
            : html`<dile-lucide-icon icon="${this.icon}" rounded></dile-lucide-icon>`
          }
        </span>
        <div slot="content">
          <slot></slot>
        </div>
      </dile-menu-overlay>
    `;
  }

  willUpdate(changedProperties) {
    this._updateDisplayLabel();
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    // On the very first render the <slot> didn't exist yet when willUpdate ran,
    // so the initial selection couldn't be resolved. Recompute now that it does.
    this._updateDisplayLabel();
  }

  _updateDisplayLabel() {
    if (!this.dynamicLabel) {
      this._displayLabel = this.label;
      return;
    }
    // Computed directly from `selected`/`attrForSelected` (mirroring DileSelectable.setSelectedItem)
    // instead of reading `_items[].selected`, so the trigger label is correct on the very same
    // render pass, without waiting for an extra update cycle.
    const slot = this.shadowRoot.querySelector('slot');
    const items = slot ? slot.assignedElements({ flatten: true }) : [];
    let selectedItem;
    if (this.attrForSelected) {
      selectedItem = items.find((item) => item.getAttribute(this.attrForSelected) == this.selected);
    } else {
      const selectedIndex = parseInt(this.selected);
      selectedItem = !isNaN(selectedIndex) ? items[selectedIndex] : undefined;
    }
    this._displayLabel = selectedItem ? selectedItem.textContent.trim() : this.label;
  }

  _onTriggerKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  }
}
