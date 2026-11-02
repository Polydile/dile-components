import { html, css, LitElement } from "lit";
import { DileSelectable } from "../../../mixins/selectable/index.js";

export class DileTabs extends DileSelectable(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
      }
    `;
  }

  constructor() {
    super();
    this.addEventListener('keydown', this._onKeydown);
    this.addEventListener('focusin', () => this._updateTabbable());
    this.addEventListener('focusout', this._onFocusOut);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'tablist');
    }
  }

  render() {
    return html`<slot @slotchange="${() => this._updateTabbable()}"></slot>`;
  }

  setSelectedItem() {
    super.setSelectedItem();
    this._updateTabbable();
  }

  // Roving tabindex: the tablist is only one stop in the page tab sequence.
  _updateTabbable(ignoreFocus = false) {
    const tabs = this.getItems();
    const focused = ignoreFocus ? undefined : tabs.find((tab) => tab.matches(':focus-within'));
    const tabbable = focused ?? tabs.find((tab) => tab.selected) ?? tabs[0];
    tabs.forEach((tab) => {
      tab.tabbable = tab === tabbable;
    });
  }

  _onFocusOut(e) {
    if (!e.relatedTarget || !this.contains(e.relatedTarget)) {
      this._updateTabbable(true);
    }
  }

  // The arrows only move the focus. Enter or Space select the focused tab, so moving
  // through the tabs doesn't dispatch changes or follow the links of the tabs with href.
  _onKeydown(e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
      return;
    }
    if (e.composedPath()[0].getAttribute?.('role') !== 'tab') {
      return;
    }
    const tabs = this.getItems();
    const current = tabs.findIndex((tab) => tab.matches(':focus-within'));
    const step = getComputedStyle(this).direction === 'rtl' ? -1 : 1;
    const nextIndex = {
      ArrowRight: (current + step + tabs.length) % tabs.length,
      ArrowLeft: (current - step + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[e.key];
    if (tabs[nextIndex]) {
      e.preventDefault();
      tabs[nextIndex].focus();
    }
  }
}
