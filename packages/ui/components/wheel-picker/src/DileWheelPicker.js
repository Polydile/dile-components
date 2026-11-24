import { LitElement, html, css } from 'lit';
import { DileEmmitChange } from '../../../mixins/form/index.js';

const supportsScrollEnd = typeof window !== 'undefined' && 'onscrollend' in window;

export class DileWheelPicker extends DileEmmitChange(LitElement) {
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static styles = css`
    :host {
      display: inline-block;
      width: var(--dile-wheel-picker-width, auto);
      --_item-height: var(--dile-wheel-picker-item-height, 40px);
    }
    :host([hidden]) {
      display: none;
    }
    .picker {
      position: relative;
      height: calc(var(--_item-height) * var(--_visible-items));
    }
    .band {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(var(--_item-height) * (var(--_visible-items) - 1) / 2);
      height: var(--_item-height);
      background-color: var(--dile-wheel-picker-band-background-color, rgba(90, 90, 90, 0.1));
      border-radius: var(--dile-wheel-picker-band-border-radius, 8px);
      pointer-events: none;
    }
    .scroller {
      position: relative;
      height: 100%;
      overflow-y: auto;
      overscroll-behavior: contain;
      scroll-snap-type: y mandatory;
      scrollbar-width: none;
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 35%, #000 65%, transparent 100%);
      mask-image: linear-gradient(to bottom, transparent 0%, #000 35%, #000 65%, transparent 100%);
      border-radius: var(--dile-wheel-picker-band-border-radius, 8px);
    }
    .scroller::-webkit-scrollbar {
      display: none;
    }
    .scroller:focus {
      outline: none;
    }
    .picker:has(.scroller:focus-visible) .band {
      outline: 2px solid var(--dile-wheel-picker-focus-color, var(--dile-focus-border-color, #6af));
      outline-offset: -2px;
    }
    .spacer {
      height: calc(var(--_item-height) * (var(--_visible-items) - 1) / 2);
    }
    .item {
      box-sizing: border-box;
      height: var(--_item-height);
      display: flex;
      align-items: center;
      justify-content: var(--dile-wheel-picker-item-justify-content, center);
      padding: 0 1rem;
      scroll-snap-align: center;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      cursor: pointer;
      font-size: var(--dile-wheel-picker-font-size, 1.25rem);
      color: var(--dile-wheel-picker-text-color, #888);
      transition: color 0.15s ease;
    }
    .item.active {
      color: var(--dile-wheel-picker-selected-text-color, var(--dile-on-background-color, #303030));
    }
    .item[aria-disabled="true"] {
      opacity: 0.35;
      cursor: default;
    }
    :host([disabled]) .picker {
      opacity: 0.5;
      pointer-events: none;
    }
  `;

  static get properties() {
    return {
      items: { type: Array },
      value: {},
      visibleItems: { type: Number },
      label: { type: String },
      disabled: { type: Boolean, reflect: true },
      name: { type: String, reflect: true },
      _activeIndex: { state: true },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.value = undefined;
    this.visibleItems = 5;
    this.label = '';
    this.disabled = false;
    this._activeIndex = -1;
    this._normalizedItems = [];
    this._scrollTimer = null;
    this._lastItemHeight = 0;
  }

  get scroller() {
    return this.shadowRoot?.querySelector('.scroller');
  }

  get selectedItem() {
    return this._normalizedItems[this._indexOfValue()];
  }

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(() => this._handleResize());
    if (this.hasUpdated) {
      this._resizeObserver.observe(this.scroller);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    clearTimeout(this._scrollTimer);
  }

  willUpdate(changed) {
    if (changed.has('items')) {
      this._normalizedItems = (this.items || []).map((item) => this._normalizeItem(item));
    }
    if (changed.has('items') || changed.has('value')) {
      this._activeIndex = this._indexOfValue();
    }
  }

  firstUpdated() {
    this._resizeObserver.observe(this.scroller);
  }

  updated(changed) {
    if (changed.has('items') || changed.has('visibleItems')) {
      this._scrollToIndex(this._indexOfValue(), 'instant');
    } else if (changed.has('value')) {
      this._scrollToIndex(this._indexOfValue(), 'smooth');
    }
  }

  render() {
    const visible = this._oddVisibleItems();
    return html`
      <div class="picker" style="--_visible-items: ${visible}">
        <div class="band" part="band"></div>
        <div
          class="scroller"
          role="listbox"
          tabindex="${this.disabled ? '-1' : '0'}"
          aria-label="${this.label || ''}"
          aria-disabled="${this.disabled ? 'true' : 'false'}"
          aria-activedescendant="${this._activeIndex >= 0 ? `option-${this._activeIndex}` : ''}"
          @scroll="${this._onScroll}"
          @scrollend="${this._onScrollEnd}"
          @keydown="${this._onKeydown}"
        >
          <div class="spacer" aria-hidden="true"></div>
          ${this._normalizedItems.map((item, index) => html`
            <div
              id="option-${index}"
              class="item ${index === this._activeIndex ? 'active' : ''}"
              part="item${index === this._activeIndex ? ' active-item' : ''}"
              role="option"
              aria-selected="${index === this._indexOfValue() ? 'true' : 'false'}"
              aria-disabled="${item.disabled ? 'true' : 'false'}"
              @click="${() => this._onItemClick(index)}"
            >${item.label}</div>
          `)}
          <div class="spacer" aria-hidden="true"></div>
        </div>
      </div>
    `;
  }

  _normalizeItem(item) {
    if (item !== null && typeof item === 'object') {
      const value = 'value' in item ? item.value : item.label;
      return {
        ...item,
        value,
        label: item.label ?? String(value),
        disabled: Boolean(item.disabled),
      };
    }
    return { value: item, label: String(item), disabled: false };
  }

  _oddVisibleItems() {
    let visible = Math.max(1, Math.round(Number(this.visibleItems) || 5));
    return visible % 2 === 0 ? visible + 1 : visible;
  }

  _indexOfValue() {
    if (this.value === undefined || this.value === null) {
      return -1;
    }
    return this._normalizedItems.findIndex((item) => String(item.value) === String(this.value));
  }

  _itemHeight() {
    const item = this.shadowRoot?.querySelector('.item');
    return item ? item.getBoundingClientRect().height : 0;
  }

  _indexFromScroll() {
    const height = this._itemHeight();
    if (!height || !this._normalizedItems.length) {
      return -1;
    }
    const index = Math.round(this.scroller.scrollTop / height);
    return Math.min(Math.max(index, 0), this._normalizedItems.length - 1);
  }

  _scrollToIndex(index, behavior = 'smooth') {
    const scroller = this.scroller;
    const height = this._itemHeight();
    if (!scroller || index < 0 || !height) {
      return;
    }
    const top = index * height;
    if (Math.abs(scroller.scrollTop - top) < 1) {
      return;
    }
    scroller.scrollTo({ top, behavior });
  }

  _handleResize() {
    const height = this._itemHeight();
    if (height && height !== this._lastItemHeight) {
      this._lastItemHeight = height;
      this._scrollToIndex(this._indexOfValue(), 'instant');
    }
  }

  _onScroll() {
    const index = this._indexFromScroll();
    if (index >= 0) {
      this._activeIndex = index;
    }
    if (!supportsScrollEnd) {
      clearTimeout(this._scrollTimer);
      this._scrollTimer = setTimeout(() => this._onScrollEnd(), 150);
    }
  }

  _onScrollEnd() {
    clearTimeout(this._scrollTimer);
    const index = this._indexFromScroll();
    if (index < 0) {
      return;
    }
    const enabledIndex = this._nearestEnabledIndex(index);
    if (enabledIndex !== index) {
      this._scrollToIndex(enabledIndex, 'smooth');
      return;
    }
    this._selectIndex(index, false);
  }

  _onItemClick(index) {
    if (this.disabled || this._normalizedItems[index]?.disabled) {
      return;
    }
    this._selectIndex(index);
  }

  _onKeydown(e) {
    if (this.disabled || !this._normalizedItems.length) {
      return;
    }
    const current = this._indexOfValue() >= 0 ? this._indexOfValue() : Math.max(this._activeIndex, 0);
    const last = this._normalizedItems.length - 1;
    const page = this._oddVisibleItems();
    let target;
    switch (e.key) {
      case 'ArrowDown':
        target = this._nextEnabledIndex(current, 1);
        break;
      case 'ArrowUp':
        target = this._nextEnabledIndex(current, -1);
        break;
      case 'PageDown':
        target = this._nearestEnabledIndex(Math.min(current + page, last));
        break;
      case 'PageUp':
        target = this._nearestEnabledIndex(Math.max(current - page, 0));
        break;
      case 'Home':
        target = this._nextEnabledIndex(-1, 1);
        break;
      case 'End':
        target = this._nextEnabledIndex(last + 1, -1);
        break;
      default:
        return;
    }
    e.preventDefault();
    if (target >= 0) {
      this._selectIndex(target);
    }
  }

  _nextEnabledIndex(from, direction) {
    for (let i = from + direction; i >= 0 && i < this._normalizedItems.length; i += direction) {
      if (!this._normalizedItems[i].disabled) {
        return i;
      }
    }
    return this._normalizedItems[from] && !this._normalizedItems[from].disabled ? from : -1;
  }

  _nearestEnabledIndex(index) {
    const items = this._normalizedItems;
    if (items[index] && !items[index].disabled) {
      return index;
    }
    for (let offset = 1; offset < items.length; offset++) {
      if (items[index - offset] && !items[index - offset].disabled) {
        return index - offset;
      }
      if (items[index + offset] && !items[index + offset].disabled) {
        return index + offset;
      }
    }
    return -1;
  }

  _selectIndex(index, scroll = true) {
    const item = this._normalizedItems[index];
    if (!item || item.disabled) {
      return;
    }
    this._activeIndex = index;
    if (scroll) {
      this._scrollToIndex(index, 'smooth');
    }
    if (String(item.value) === String(this.value)) {
      return;
    }
    this.value = item.value;
    this.emmitChange();
    this.dispatchEvent(new CustomEvent('dile-wheel-picker-changed', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        value: item.value,
        item,
      },
    }));
  }
}
