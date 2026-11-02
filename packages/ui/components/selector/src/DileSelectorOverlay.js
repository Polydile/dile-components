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

      _menuOpened: { state: true },

      /** Accessible text saying that the trigger opens a menu of options. It's the whole accessible name
       *  when there is no visible label text, and it follows the label text when there is one.
       *  Set it to translate it, or to an empty string to expose only the label text. */
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
    this._menuOpened = false;
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
        @overlay-opened="${this._onOverlayOpened}"
        @overlay-ready="${this._onOverlayReady}"
        @overlay-closed="${this._onOverlayClosed}"
      >
        <span
          slot="trigger"
          id="trigger"
          role="button"
          tabindex="0"
          aria-haspopup="true"
          aria-expanded="${this._menuOpened ? 'true' : 'false'}"
          aria-label="${this._triggerAccessibleName}"
          @keydown="${this._onTriggerKeydown}"
        >
          ${this._displayLabel
            ? html`<dile-lucide-badge icon="${this.icon}">${this._displayLabel}</dile-lucide-badge>`
            : html`<dile-lucide-icon icon="${this.icon}" rounded></dile-lucide-icon>`
          }
        </span>
        <div slot="content" role="menu" aria-labelledby="trigger" @keydown="${this._onMenuKeydown}">
          <slot @slotchange="${this._onSlotChange}"></slot>
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

  get _triggerAccessibleName() {
    if (!this._displayLabel) {
      return this.triggerAriaLabel;
    }
    return !this.triggerAriaLabel || this.triggerAriaLabel === this._displayLabel
      ? this._displayLabel
      : `${this._displayLabel}, ${this.triggerAriaLabel}`;
  }

  get _menu() {
    return this.shadowRoot.querySelector('dile-menu-overlay');
  }

  // Children that aren't options (e.g. a separator) and hidden options are skipped.
  get _focusableItems() {
    return this.getItems().filter((item) => 'selected' in item && item.getClientRects().length > 0);
  }

  _onSlotChange() {
    this.getItems().forEach((item) => {
      item.itemRole = 'menuitem';
    });
  }

  _onOverlayOpened(e) {
    if (e.target === e.currentTarget) {
      this._menuOpened = true;
    }
  }

  _onOverlayReady(e) {
    if (e.target === e.currentTarget) {
      const items = this._focusableItems;
      (items.find((item) => item.selected) ?? items[0])?.focus();
    }
  }

  _onOverlayClosed(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    this._menuOpened = false;
    // When the menu closes by clicking elsewhere, the focus is already out of here and has to stay there.
    if (this.matches(':focus-within')) {
      this.shadowRoot.getElementById('trigger').focus();
    }
  }

  _onTriggerKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!e.repeat) {
        e.currentTarget.click();
      }
    }
  }

  _onMenuKeydown(e) {
    if (e.key === 'Tab') {
      // The focus goes back to the trigger, so the browser moves it from there to the next element of the page.
      this._menu.close();
      return;
    }
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && e.repeat) {
      // Keeping the key pressed on the trigger must not activate the option that received the focus.
      e.preventDefault();
      return;
    }
    const items = this._focusableItems;
    const current = items.findIndex((item) => item.matches(':focus-within'));
    const nextIndex = {
      ArrowDown: (current + 1) % items.length,
      ArrowUp: (current - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    }[e.key];
    if (items[nextIndex]) {
      e.preventDefault();
      items[nextIndex].focus();
    }
  }
}
