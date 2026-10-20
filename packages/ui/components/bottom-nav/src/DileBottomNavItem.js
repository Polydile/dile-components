import { html, css, LitElement } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { DileSelectableItem } from "../../../mixins/selectable/index.js";
import { DileCloseOnEscPressed } from "../../../mixins/close-on-esc-pressed/index.js";
import { DileOverlay } from "../../../mixins/overlay/index.js";
import '@dile/iconlib/dile-iconlib.js';
// Glyph of the default close icon.
import '@dile/iconlib/lucide-icons/x.js';

// Number of opened sheets. The page scroll is locked while any sheet is opened.
let openedSheets = 0;
// Inline styles of the document before locking the page scroll.
let scrollLockBackup = null;

function updateScrollLock() {
  const root = document.documentElement;
  if (openedSheets > 0 && !scrollLockBackup) {
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    scrollLockBackup = {
      overflow: root.style.overflow,
      paddingRight: root.style.paddingRight,
    };
    root.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      // Avoids the layout shift caused by the scrollbar disappearing, in the page and in the fixed bar.
      const paddingRight = parseFloat(getComputedStyle(root).paddingRight) || 0;
      root.style.paddingRight = `${paddingRight + scrollbarWidth}px`;
      root.style.setProperty('--dile-bottom-nav-scrollbar-width', `${scrollbarWidth}px`);
    }
  } else if (openedSheets === 0 && scrollLockBackup) {
    root.style.overflow = scrollLockBackup.overflow;
    root.style.paddingRight = scrollLockBackup.paddingRight;
    root.style.removeProperty('--dile-bottom-nav-scrollbar-width');
    scrollLockBackup = null;
  }
}

// DileOverlay is only used for its updatePosition() method, which places the floating sheet
// next to the trigger and keeps it inside the viewport. open(), close() and toggle() are overridden.
export class DileBottomNavItem extends DileOverlay(DileCloseOnEscPressed(DileSelectableItem(LitElement))) {
  static get properties() {
    return {
      /**
       * Icon to display, in the dile-iconlib `"family.name"` format (e.g. "lucide.house").
       */
      icon: { type: String },
      /**
       * Text displayed under the icon.
       */
      label: { type: String },
      /**
       * Value used to select the item when the bar has attrForSelected="name".
       */
      name: { type: String, reflect: true },
      /**
       * If set, the item is rendered as a native link.
       */
      href: { type: String },
      /**
       * Target of the native link.
       */
      target: { type: String },
      /**
       * Opened status of the bottom sheet. Only applies when the item has slotted content.
       */
      opened: { type: Boolean, reflect: true },
      /**
       * If true, an item with a bottom sheet also becomes selected when it is clicked.
       */
      selectable: { type: Boolean },
      /**
       * If true, the bottom sheet closes when any link or button inside it is clicked.
       */
      closeOnClick: { type: Boolean, attribute: 'close-on-click' },
      /**
       * Icon displayed in the item while its bottom sheet is opened, in the dile-iconlib `"family.name"` format.
       */
      closeIcon: { type: String, attribute: 'close-icon' },
      _hasSheet: { state: true },
      _offset: { state: true },
      _floating: { state: true },
    };
  }

  constructor() {
    super();
    this.label = '';
    this.opened = false;
    this.selectable = false;
    this.closeOnClick = false;
    this._hasSheet = false;
    this._offset = 0;
    this._floating = false;
    this.icon = '';
    this.closeIcon = 'lucide.x';
    // Floating sheet position, used when the bar is static (DileOverlay properties).
    this.verticalAlign = 'top';
    this.horizontalAlign = 'center';
    this.moveTop = -8;
    this._positionRafId = null;
    this.viewportChangeHandler = this._onViewportChange.bind(this);
    this.documentClickHandler = this._onDocumentClick.bind(this);
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: block;
        --dile-icon-size: var(--dile-bottom-nav-icon-size, 24px);
        --dile-icon-color: var(--dile-bottom-nav-item-color, var(--dile-on-background-color, #666));
      }
      :host([selected]) {
        --dile-icon-color: var(--dile-bottom-nav-item-selected-color, var(--dile-primary-color, #039be5));
      }
      .trigger {
        all: unset;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--dile-bottom-nav-item-gap, 2px);
        width: 100%;
        height: 100%;
        padding: var(--dile-bottom-nav-item-padding, 4px 2px);
        cursor: pointer;
        color: var(--dile-bottom-nav-item-color, var(--dile-on-background-color, #666));
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        transition: color 0.2s ease;
      }
      :host([selected]) .trigger {
        color: var(--dile-bottom-nav-item-selected-color, var(--dile-primary-color, #039be5));
      }
      .trigger:focus-visible {
        outline: 2px solid var(--dile-bottom-nav-item-selected-color, var(--dile-primary-color, #039be5));
        outline-offset: -2px;
        border-radius: 4px;
      }
      .icon {
        display: flex;
      }
      .label {
        max-width: 100%;
        font-size: var(--dile-bottom-nav-label-font-size, 0.75rem);
        font-weight: var(--dile-bottom-nav-label-font-weight, normal);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :host([selected]) .label {
        font-weight: var(--dile-bottom-nav-label-selected-font-weight, bold);
      }

      .close-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--dile-bottom-nav-close-icon-size, 44px);
        height: var(--dile-bottom-nav-close-icon-size, 44px);
        border-radius: 50%;
        background-color: var(--dile-bottom-nav-close-icon-background-color, var(--dile-bottom-nav-item-selected-color, var(--dile-primary-color, #039be5)));
        --dile-icon-color: var(--dile-bottom-nav-close-icon-color, var(--dile-bottom-nav-background-color, var(--dile-background-color, #fff)));
        animation: dile-bottom-nav-close-in 0.3s ease;
      }
      @keyframes dile-bottom-nav-close-in {
        from {
          transform: rotate(-90deg) scale(0.5);
          opacity: 0;
        }
      }
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        background-color: var(--dile-bottom-nav-overlay-background-color, rgba(0, 0, 0, 0.5));
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0s linear 0.3s;
      }
      .sheet {
        position: fixed;
        left: var(--dile-bottom-nav-sheet-gap, 8px);
        right: calc(var(--dile-bottom-nav-sheet-gap, 8px) + var(--dile-bottom-nav-scrollbar-width, 0px));
        z-index: 2;
        max-width: var(--dile-bottom-nav-sheet-max-width, none);
        max-height: var(--dile-bottom-nav-sheet-max-height, 75vh);
        margin: 0 auto;
        overflow-y: auto;
        overscroll-behavior: contain;
        background-color: var(--dile-bottom-nav-sheet-background-color, var(--dile-background-color, #fff));
        color: var(--dile-bottom-nav-sheet-text-color, var(--dile-on-background-color, #303030));
        border-radius: var(--dile-bottom-nav-sheet-border-radius, 12px);
        box-shadow: var(--dile-bottom-nav-sheet-box-shadow, 0 -4px 16px rgba(0, 0, 0, 0.2));
        padding: var(--dile-bottom-nav-sheet-padding, 1rem);
        opacity: 0;
        transform: translateY(24px);
        visibility: hidden;
        transition: transform 0.3s ease, opacity 0.3s ease, visibility 0s linear 0.3s;
        outline: none;
      }
      .sheet.floating {
        right: auto;
        width: var(--dile-bottom-nav-sheet-width, 280px);
        max-width: calc(100vw - 25px);
        margin: 0;
      }
      :host([opened]) .overlay {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s ease, visibility 0s;
      }
      :host([opened]) .sheet {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
        transition: transform 0.3s ease, opacity 0.3s ease, visibility 0s;
      }
      .nosheet, .overlay.floating {
        display: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .trigger, .overlay, .sheet,
        :host([opened]) .overlay, :host([opened]) .sheet {
          transition: none;
        }
        .close-icon {
          animation: none;
        }
      }
    `;
  }

  // DileOverlay looks for #overlay and #trigger elements, not used in this component.
  firstUpdated() {}

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeOpenedListeners();
    this._releaseScrollLock();
  }

  updated(changedProperties) {
    if (changedProperties.has('opened')) {
      const wasOpened = changedProperties.get('opened');
      if (this.opened) {
        this._onOpened();
      } else if (wasOpened) {
        this._releaseScrollLock();
        this._removeOpenedListeners();
      }
    }
  }

  _onOpened() {
    if (this._floating) {
      this._positionFloating();
      document.addEventListener('click', this.documentClickHandler);
      window.addEventListener('scroll', this.viewportChangeHandler, { passive: true, capture: true });
    } else {
      const sheet = this.shadowRoot.querySelector('.sheet');
      sheet.style.top = '';
      sheet.style.left = '';
      if (!this._lockingScroll) {
        this._lockingScroll = true;
        openedSheets++;
        updateScrollLock();
      }
      this._computeOffset();
    }
    window.addEventListener('resize', this.viewportChangeHandler, { passive: true });
  }

  _removeOpenedListeners() {
    document.removeEventListener('click', this.documentClickHandler);
    window.removeEventListener('scroll', this.viewportChangeHandler, { capture: true });
    window.removeEventListener('resize', this.viewportChangeHandler);
    if (this._positionRafId) {
      cancelAnimationFrame(this._positionRafId);
      this._positionRafId = null;
    }
  }

  _onViewportChange() {
    if (this._positionRafId) return;
    this._positionRafId = requestAnimationFrame(() => {
      this._positionRafId = null;
      if (!this.opened) return;
      if (this._floating) {
        this._positionFloating();
      } else {
        this._computeOffset();
      }
    });
  }

  // Places the floating sheet over the trigger, centered and inside the viewport.
  _positionFloating() {
    this.overlay = this.shadowRoot.querySelector('.sheet');
    this.trigger = this.shadowRoot.querySelector('.trigger');
    this.updatePosition();
  }

  _onDocumentClick(e) {
    if (!e.composedPath().includes(this)) {
      this.close();
    }
  }

  // Distance from the top of the bar to the bottom of the viewport, so the sheet and the overlay do not cover the bar.
  _computeOffset() {
    const bar = this.closest('dile-bottom-nav') || this;
    const offset = window.innerHeight - bar.getBoundingClientRect().top;
    this._offset = Math.min(Math.max(offset, 0), window.innerHeight);
  }

  _releaseScrollLock() {
    if (this._lockingScroll) {
      this._lockingScroll = false;
      openedSheets--;
      updateScrollLock();
    }
  }

  render() {
    return html`
      ${this.href && !this._hasSheet ? this.linkTemplate : this.buttonTemplate}
      <div
        class="overlay ${this._hasSheet ? '' : 'nosheet'} ${this._floating ? 'floating' : ''}"
        style="bottom: ${this._offset}px"
        @click="${this.close}"
      ></div>
      <div
        class="sheet ${this._hasSheet ? '' : 'nosheet'} ${this._floating ? 'floating' : ''}"
        style=${styleMap({ bottom: this._floating ? 'auto' : `calc(${this._offset}px + var(--dile-bottom-nav-sheet-gap, 8px))` })}
        role="dialog"
        aria-modal="${!this._floating}"
        aria-label="${this.label}"
        aria-hidden="${!this.opened}"
        tabindex="-1"
        ?inert="${!this.opened}"
      >
        <slot @slotchange="${this._onSlotChange}" @click="${this._onSheetClick}"></slot>
      </div>
    `;
  }

  get contentTemplate() {
    if (this.opened && this._hasSheet) {
      return html`
        <span class="close-icon" aria-hidden="true"><dile-iconlib icon=${this.closeIcon}></dile-iconlib></span>
        <span class="visually-hidden">${this.label}</span>
      `;
    }
    return html`
      <span class="icon" aria-hidden="true">
        <slot name="icon">${this.icon ? html`<dile-iconlib icon=${this.icon}></dile-iconlib>` : ''}</slot>
      </span>
      <span class="label">${this.label}</span>
    `;
  }

  get linkTemplate() {
    return html`
      <a
        class="trigger"
        href="${this.href}"
        target="${ifDefined(this.target)}"
        aria-current="${ifDefined(this.selected ? 'page' : undefined)}"
        @click="${this._onTriggerClick}"
      >${this.contentTemplate}</a>
    `;
  }

  get buttonTemplate() {
    return html`
      <button
        class="trigger"
        type="button"
        aria-current="${ifDefined(this.selected && !this._hasSheet ? 'page' : undefined)}"
        aria-haspopup="${ifDefined(this._hasSheet ? 'dialog' : undefined)}"
        aria-expanded="${ifDefined(this._hasSheet ? String(this.opened) : undefined)}"
        @click="${this._onTriggerClick}"
      >${this.contentTemplate}</button>
    `;
  }

  _onSlotChange(e) {
    this._hasSheet = e.target.assignedNodes({ flatten: true }).some(node =>
      node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
    );
    if (!this._hasSheet && this.opened) {
      this.close();
    }
  }

  _onTriggerClick() {
    if (this._hasSheet) {
      if (this.selectable) {
        this.select();
      }
      this.toggle();
    } else {
      this.select();
    }
    this.dispatchEvent(new CustomEvent('dile-bottom-nav-item-click', {
      bubbles: true,
      composed: true,
      detail: { name: this.name, item: this },
    }));
  }

  _onSheetClick(e) {
    const path = e.composedPath();
    const limit = path.indexOf(e.currentTarget);
    const nodes = limit >= 0 ? path.slice(0, limit) : path;
    const closer = nodes.find(node =>
      node instanceof Element &&
      (node.hasAttribute('data-close') || (this.closeOnClick && (node.tagName === 'A' || node.tagName === 'BUTTON')))
    );
    if (closer) {
      this.close();
    }
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  async open() {
    if (this.opened || !this._hasSheet) {
      return;
    }
    // When the bar is static the sheet is a floating card over the item, without overlay.
    this._floating = !!this.closest('dile-bottom-nav')?.static;
    this.opened = true;
    this.dispatchEvent(new CustomEvent('dile-bottom-nav-sheet-opened', {
      bubbles: true,
      composed: true,
      detail: { name: this.name, item: this },
    }));
    await this.updateComplete;
    this.shadowRoot.querySelector('.sheet').focus({ preventScroll: true });
  }

  async close() {
    if (!this.opened) {
      return;
    }
    const hadFocus = this.matches(':focus-within');
    this.opened = false;
    this.dispatchEvent(new CustomEvent('dile-bottom-nav-sheet-closed', {
      bubbles: true,
      composed: true,
      detail: { name: this.name, item: this },
    }));
    await this.updateComplete;
    if (hadFocus) {
      this.shadowRoot.querySelector('.trigger').focus({ preventScroll: true });
    }
  }
}
