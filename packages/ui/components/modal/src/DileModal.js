import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import '../../icon/icon.js';
import { closeIcon } from '@dile/icons/index.js'
import { DileCloseOnEscPressed } from '../../../mixins/close-on-esc-pressed/index.js'

// Opened modals, in opening order. The last one is the topmost modal.
const openedModals = [];
// Escape keydown events already handled by a modal.
const handledEscEvents = new WeakSet();
// Inline styles of the document before locking the page scroll.
let scrollLockBackup = null;

// Locks the page scroll while any modal is opened.
function updateScrollLock() {
  const root = document.documentElement;
  if (openedModals.length && !scrollLockBackup) {
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    scrollLockBackup = {
      overflow: root.style.overflow,
      paddingRight: root.style.paddingRight,
    };
    root.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      // Avoids the layout shift caused by the scrollbar disappearing.
      const paddingRight = parseFloat(getComputedStyle(root).paddingRight) || 0;
      root.style.paddingRight = `${paddingRight + scrollbarWidth}px`;
    }
  } else if (!openedModals.length && scrollLockBackup) {
    root.style.overflow = scrollLockBackup.overflow;
    root.style.paddingRight = scrollLockBackup.paddingRight;
    scrollLockBackup = null;
  }
}

export class DileModal extends DileCloseOnEscPressed(LitElement) {
  static get properties() {
    return {
      _toChange: { state: true },
      /**
       * If true the modal box is in opened status.
       */
      opened: { type: Boolean, reflect: true, noAccessor: true },
      /**
       * If true the modal box displays a close icon
       */
      showCloseIcon: { type: Boolean },
      /**
       * If true the modal box blocks the screen. That is, when you click in the background layer, the modal box does not close.
       */
      blocking: { type: Boolean },
      /**
       * Accessible name of the modal box, announced by screen readers when it opens.
       */
      label: { type: String },
      /**
       * Accessible label of the close icon button.
       */
      closeLabel: { type: String },
    };
  }

  constructor() {
    super();
    this._toChange = false;
    this._opened = false;
    this.showCloseIcon = false;
    this.blocking = false;
    this.closeLabel = 'Close';
  }

  static get styles() {
    return [
      css`
        * {
          box-sizing: border-box;
        }
        :host {
          display: block;
          --dile-close-icon-template-color: var(
            --dile-modal-close-icon-color,
            #888
          );
        }
        .closeicon {
          --dile-icon-color: var( --dile-modal-close-icon-color, #888);
          --dile-icon-size: var(--dile-modal-close-icon-size, 24px);
        }
        section {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          height: 100dvh;
          width: 100vw;
          display: none;
          transition: opacity var(--dile-modal-animation-duration, 0.3s) ease-in;
          align-items: center;
          justify-content: center;
          z-index: var(--dile-modal-z-index, 100);
          background-color: var(
            --dile-modal-background-color,
            rgba(30, 30, 30, 0.8)
          );
        }
        .content {
          display: block;
          position: relative;
          z-index: var(--dile-modal-content-z-index, 101);
          width: var(--dile-modal-width, 280px);
          min-width: var(--dile-modal-min-width, 250px);
          max-width: var(--dile-modal-max-width, 100vw);
          height: auto;
          min-height: var(--dile-modal-min-height, auto);
          color: var(--dile-modal-content-text-color, #303030);
          background-color: var(--dile-modal-content-background-color, #fff);
          box-shadow: var(--dile-modal-content-shadow-displacement, 6px)
            var(--dile-modal-content-shadow-displacement, 6px)
            var(--dile-modal-content-shadow-blur, 16px)
            var(--dile-modal-content-shadow-color, #000);
          border-radius: var(--dile-modal-border-radius, 15px);
          padding: var(--dile-modal-content-padding, 1em) 0
            var(--dile-modal-content-padding, 1em)
            var(--dile-modal-content-padding, 1em);
        }
        article {
          overflow: auto;
          padding-right: var(--dile-modal-content-padding, 1em);
          height: var(--dile-modal-height, auto);
          max-height: var(--dile-modal-max-height, 90vh);
        }
        .transparent {
          opacity: 0;
          pointer-events: none;
        }
        .opaque {
          opacity: 1;
          display: flex !important;
        }
        .opened {
          display: flex !important;
        }
        .content:focus {
          outline: none;
        }
        .closebutton {
          position: absolute;
          display: inline-flex;
          top: var(--dile-modal-close-icon-top, 5px);
          right: var(--dile-modal-close-icon-right, 18px);
          z-index: 1002;
          padding: 0;
          margin: 0;
          border: none;
          background: none;
          color: inherit;
          cursor: var(--dile-modal-close-icon-cursor, pointer);
        }
        .contentIconSeparation {
          padding-top: var(--dile-modal-extra-top-separation-when-icon, 10px);
        }
      `,
    ];
  }

  render() {
    return html`
      <section
        class="${this.getModalClass(this.opened, this._toChange)}"
        @click="${this._backgroundModalClick}"
        @transitionend="${this.animationEnd}"
        id="backgroundmodal"
      >
        <div
          class="content"
          role="dialog"
          aria-modal="true"
          aria-label="${ifDefined(this.label)}"
          tabindex="-1"
        >
          ${this.showCloseIcon
            ? html`<button type="button" class="closebutton" aria-label="${this.closeLabel}" @click="${this.close}">
                <dile-icon .icon="${closeIcon}" class="closeicon"></dile-icon>
              </button>`
            : ""}
          <article class="${this.showCloseIcon ? "contentIconSeparation" : ""}">
            <slot></slot>
          </article>
        </div>
      </section>
    `;
  }

  getModalClass(opened, _toChange) {
    if (!opened && !_toChange) {
      return "transparent";
    }
    if (opened && _toChange) {
      return "transparent opened";
    }
    if (opened && !_toChange) {
      return "opaque";
    }
    if (!opened && _toChange) {
      return "transparent opened";
    }
    return '';
  }

  get opened() {
    return this._opened;
  }

  // The opened property can be changed by open() / close(), or directly
  // by the property or the attribute. All ways run the same transitions.
  set opened(value) {
    const oldValue = this._opened;
    value = Boolean(value);
    if (value === oldValue) {
      return;
    }
    this._opened = value;
    this.requestUpdate('opened', oldValue);
    if (value) {
      this._startOpening();
    } else {
      this._startClosing();
    }
  }

  open() {
    this.opened = true;
  }

  _backgroundModalClick(e) {
    if (!this.blocking && e.target && e.target.getAttribute("id") === "backgroundmodal") {
      this.close();
      this.dispatchEvent(
        new CustomEvent("dile-modal-background-closed", {
          bubbles: true,
          composed: true,
          detail: this,
        })
      );
    }
  }

  close() {
    this.opened = false;
  }

  _startOpening() {
    this._clearCloseTimeout();
    this._removeFromOpenedModals();
    if (this.isConnected) {
      this._addToOpenedModals();
    }
    this._toChange = true;
    this._cancelOpenFrame();
    // Waits for the layer to be painted with opacity 0, so the fade-in transition runs.
    this.updateComplete.then(() => {
      this._openFrame = requestAnimationFrame(() => {
        this._openFrame = requestAnimationFrame(() => {
          this._openFrame = null;
          if (this.opened) {
            this._toChange = false;
          }
        });
      });
    });
    this._previousFocus = this._getDeepActiveElement();
    this.updateComplete.then(() => this._focusContent());
    this.dispatchEvent(
      new CustomEvent("dile-modal-opened", {
        bubbles: true,
        composed: true,
        detail: this,
      })
    );
  }

  _cancelOpenFrame() {
    if (this._openFrame) {
      cancelAnimationFrame(this._openFrame);
      this._openFrame = null;
    }
  }

  // Moves the focus inside the modal, unless the content already took it.
  _focusContent() {
    if (!this.opened || this.matches(':focus-within')) {
      return;
    }
    this.shadowRoot.querySelector('.content')?.focus({ preventScroll: true });
  }

  // Returns the focus to the element that had it before opening the modal.
  _restoreFocus() {
    const previousFocus = this._previousFocus;
    this._previousFocus = null;
    const active = this._getDeepActiveElement();
    const focusLost = !active || active === document.body;
    if (!previousFocus?.isConnected || !(focusLost || this.matches(':focus-within'))) {
      return;
    }
    previousFocus.focus({ preventScroll: true });
  }

  _getDeepActiveElement() {
    let active = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active;
  }

  _startClosing() {
    this._cancelOpenFrame();
    this._removeFromOpenedModals();
    this._toChange = true;
    this._restoreFocus();
    this._scheduleCloseEnd();
    this.dispatchEvent(
      new CustomEvent("dile-modal-closed", {
        bubbles: true,
        composed: true,
        detail: this,
      })
    );
  }

  _removeFromOpenedModals() {
    const index = openedModals.indexOf(this);
    if (index !== -1) {
      openedModals.splice(index, 1);
      updateScrollLock();
    }
  }

  _addToOpenedModals() {
    if (!openedModals.includes(this)) {
      openedModals.push(this);
      updateScrollLock();
    }
  }

  // Only the topmost modal reacts to the Esc key.
  escClose(e) {
    if (e.key !== "Escape" || !this.opened || handledEscEvents.has(e)) {
      return;
    }
    if (openedModals[openedModals.length - 1] !== this) {
      return;
    }
    handledEscEvents.add(e);
    this.close();
  }

  animationEnd(e) {
    if (e && (e.target !== e.currentTarget || e.propertyName !== 'opacity')) {
      return;
    }
    this._clearCloseTimeout();
    this._toChange = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.opened) {
      this._addToOpenedModals();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearCloseTimeout();
    this._cancelOpenFrame();
    this._removeFromOpenedModals();
  }

  // transitionend is not fired when the transition duration is 0 (or the
  // transition is interrupted), so the background layer is also released by a timer.
  _scheduleCloseEnd() {
    this._clearCloseTimeout();
    const duration = this._getAnimationDuration();
    if (duration <= 0) {
      this.animationEnd();
      return;
    }
    this._closeTimeout = setTimeout(() => this.animationEnd(), duration + 50);
  }

  _clearCloseTimeout() {
    if (this._closeTimeout) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = null;
    }
  }

  _getAnimationDuration() {
    const section = this.shadowRoot?.querySelector('section');
    if (!section) {
      return 0;
    }
    const durations = getComputedStyle(section).transitionDuration.split(',');
    return Math.max(...durations.map((value) => {
      const time = parseFloat(value) || 0;
      return value.trim().endsWith('ms') ? time : time * 1000;
    }));
  }
}
