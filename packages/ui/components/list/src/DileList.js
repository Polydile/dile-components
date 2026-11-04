import { LitElement, html, css } from 'lit';
import '../../spinner/spinner.js';

export class DileList extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
        background-color: var(--dile-list-background-color, var(--dile-surface-color, #ffffff));
        border: var(--dile-list-border, 1px solid #e2e8f0);
        border-radius: var(--dile-list-border-radius, 8px);
        box-shadow: var(--dile-list-box-shadow, none);
        overflow: hidden;
        width: var(--dile-list-width, 100%);
        max-width: var(--dile-list-max-width, none);
        position: relative;
      }

      * {
        box-sizing: border-box;
      }

      :host([density="compact"]) {
        --dile-list-item-padding-y: 0.375rem;
        --dile-list-item-padding-x: 0.75rem;
        --dile-list-item-gap: 0.5rem;
      }

      :host([density="comfortable"]) {
        --dile-list-item-padding-y: 0.75rem;
        --dile-list-item-padding-x: 1rem;
        --dile-list-item-gap: 0.75rem;
      }

      :host([density="spacious"]) {
        --dile-list-item-padding-y: 1.25rem;
        --dile-list-item-padding-x: 1.25rem;
        --dile-list-item-gap: 1rem;
      }

      :host([borderless]) {
        border: none;
        border-radius: 0;
        box-shadow: none;
        background-color: transparent;
      }

      :host([disabled]) {
        opacity: var(--dile-list-disabled-opacity, 0.6);
        pointer-events: none;
      }

      :host([loading]) {
        cursor: wait;
      }

      .list-container {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      /* Automatically remove bottom border / divider on the last slotted list item */
      ::slotted(dile-list-item:last-of-type) {
        border-bottom: none !important;
        --dile-list-item-divider-width: 0px !important;
      }

      ::slotted([divider]:last-of-type) {
        border-bottom: none !important;
        --dile-list-item-divider-width: 0px !important;
      }

      .empty-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--dile-list-empty-padding, 2rem 1rem);
        color: var(--dile-list-empty-color, #64748b);
        font-size: var(--dile-list-empty-font-size, 0.9rem);
        text-align: center;
      }

      .empty-container[hidden] {
        display: none !important;
      }

      .loading-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--dile-list-loading-padding, 2rem 1rem);
        background-color: var(--dile-list-loading-background-color, rgba(255, 255, 255, 0.8));
        color: var(--dile-list-loading-color, #64748b);
      }

      :host([loading]) .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
      }

      .loading-overlay[hidden] {
        display: none !important;
      }
    `;
  }

  static get properties() {
    return {
      /** Selection mode: "none", "single", or "multiple" */
      selection: { type: String, reflect: true },
      /** Selected value: string for single selection, array of strings for multiple */
      value: {
        type: String,
        converter: {
          fromAttribute(attr) {
            if (!attr) return attr;
            if (attr.startsWith('[') || attr.startsWith('{')) {
              try {
                return JSON.parse(attr);
              } catch (_) {
                return attr;
              }
            }
            return attr;
          },
          toAttribute(val) {
            if (val === null || val === undefined) return null;
            if (Array.isArray(val) || typeof val === 'object') {
              return JSON.stringify(val);
            }
            return String(val);
          },
        },
      },
      /** Whether all items in the list should be clickable */
      clickable: { type: Boolean, reflect: true },
      /** Layout density propagated to items: "compact", "comfortable", or "spacious" */
      density: { type: String, reflect: true },
      /** Divider style propagated to items: "full", "inset", "none", or boolean */
      divider: { type: String, reflect: true },
      /** Text clamping lines propagated to items: "1", "2", "auto" */
      lines: { type: String, reflect: true },
      /** Vertical alignment propagated to items: "start", "center", "end" */
      align: { type: String, reflect: true },
      /** Horizontal body alignment propagated to items: "left", "center", "right" */
      bodyAlign: { type: String, attribute: 'body-align', reflect: true },
      /** Disabled state for the entire list */
      disabled: { type: Boolean, reflect: true },
      /** Loading state that shows spinner / overlay */
      loading: { type: Boolean, reflect: true },
      /** Text for default empty state fallback */
      emptyText: { type: String, attribute: 'empty-text' },
      /** Whether arrow key keyboard navigation with roving tabindex is enabled */
      navigable: { type: Boolean, reflect: true },
      /** Whether navigating with arrow keys automatically selects the item in single selection */
      selectOnFocus: { type: Boolean, attribute: 'select-on-focus' },
      /** Removes the outer border and border-radius */
      borderless: { type: Boolean, reflect: true },
      /** Internal flag for empty state */
      _isEmpty: { state: true },
    };
  }

  constructor() {
    super();
    this.selection = 'none';
    this.value = undefined;
    this.clickable = false;
    this.density = '';
    this.divider = '';
    this.lines = '';
    this.align = '';
    this.bodyAlign = '';
    this.disabled = false;
    this.loading = false;
    this.emptyText = '';
    this.navigable = true;
    this.selectOnFocus = false;
    this.borderless = false;
    this._isEmpty = false;
    this._focusedIndex = -1;

    this._onItemClick = this._onItemClick.bind(this);
    this._onKeydown = this._onKeydown.bind(this);
    this._onFocusIn = this._onFocusIn.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', this.selection !== 'none' ? 'listbox' : 'list');
    }
    if (this.selection === 'multiple') {
      this.setAttribute('aria-multiselectable', 'true');
    }
    this._isEmpty = this.getItems().length === 0;
    this.addEventListener('dile-list-item-click', this._onItemClick);
    this.addEventListener('keydown', this._onKeydown);
    this.addEventListener('focusin', this._onFocusIn);

    this._observer = new MutationObserver(() => this._handleSlotChange());
    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dile-list-item-click', this._onItemClick);
    this.removeEventListener('keydown', this._onKeydown);
    this.removeEventListener('focusin', this._onFocusIn);
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._handleSlotChange();
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('loading')) {
      if (this.loading) {
        this.setAttribute('aria-busy', 'true');
      } else {
        this.removeAttribute('aria-busy');
      }
    }

    if (changedProperties.has('selection')) {
      if (this.selection !== 'none') {
        if (!this.hasAttribute('role') || this.getAttribute('role') === 'list') {
          this.setAttribute('role', 'listbox');
        }
        if (this.selection === 'multiple') {
          this.setAttribute('aria-multiselectable', 'true');
        } else {
          this.removeAttribute('aria-multiselectable');
        }
      } else {
        if (!this.hasAttribute('role') || this.getAttribute('role') === 'listbox') {
          this.setAttribute('role', 'list');
        }
        this.removeAttribute('aria-multiselectable');
      }
      this._syncAriaRoles();
      this._cascadeProperties();
    }

    if (changedProperties.has('value')) {
      this._syncSelectionFromValue();
    }

    if (
      changedProperties.has('disabled') ||
      changedProperties.has('clickable') ||
      changedProperties.has('density') ||
      changedProperties.has('divider') ||
      changedProperties.has('lines') ||
      changedProperties.has('align') ||
      changedProperties.has('bodyAlign')
    ) {
      this._cascadeProperties();
    }
  }

  /**
   * Returns all slotted dile-list-item child elements.
   * @returns {Array<HTMLElement>}
   */
  getItems() {
    return Array.from(this.querySelectorAll('dile-list-item'));
  }

  _getItemValue(item, index) {
    if (item.value !== undefined && item.value !== '') {
      return item.value;
    }
    if (item.id) {
      return item.id;
    }
    return String(index);
  }

  _handleSlotChange() {
    const items = this.getItems();
    const isEmpty = items.length === 0;
    if (this._isEmpty !== isEmpty) {
      this._isEmpty = isEmpty;
    }
    this._cascadeProperties();
    this._syncAriaRoles();
    this._syncSelectionFromValue();
    this._updateRovingTabindex();
  }

  _cascadeProperties() {
    const items = this.getItems();
    items.forEach((item) => {
      const shouldBeClickable = this.clickable || this.selection !== 'none';
      if (shouldBeClickable && !item.clickable) {
        item.clickable = true;
      }
      if (this.density && item.density !== this.density) {
        item.density = this.density;
      }
      if (this.divider && item.divider !== this.divider) {
        item.divider = this.divider;
      }
      if (this.lines && item.lines !== this.lines) {
        item.lines = this.lines;
      }
      if (this.align && item.align !== this.align) {
        item.align = this.align;
      }
      if (this.bodyAlign && item.bodyAlign !== this.bodyAlign) {
        item.bodyAlign = this.bodyAlign;
      }
      if (this.disabled && !item.disabled) {
        item.disabled = true;
      }
    });
  }

  _syncAriaRoles() {
    const currentRole = this.getAttribute('role') || (this.selection !== 'none' ? 'listbox' : 'list');
    let childRole = 'listitem';
    if (currentRole === 'listbox') {
      childRole = 'option';
    } else if (currentRole === 'menu') {
      childRole = 'menuitem';
    }

    this.getItems().forEach((item) => {
      const itemRole = item.getAttribute('role');
      if (!itemRole || itemRole === 'listitem' || itemRole === 'option' || itemRole === 'menuitem') {
        item.setAttribute('role', childRole);
      }
    });
  }

  _syncSelectionFromValue() {
    if (this.selection === 'none') return;
    const items = this.getItems();

    if (this.selection === 'single') {
      if (this.value !== undefined && this.value !== null) {
        items.forEach((item, idx) => {
          const val = this._getItemValue(item, idx);
          const isSelected = String(val) === String(this.value);
          if (item.selected !== isSelected) {
            item.selected = isSelected;
          }
        });
      } else {
        const selectedItem = items.find((i) => i.selected);
        if (selectedItem) {
          const newVal = this._getItemValue(selectedItem, items.indexOf(selectedItem));
          if (this.value !== newVal) {
            this.value = newVal;
          }
        }
      }
    } else if (this.selection === 'multiple') {
      const valArr = Array.isArray(this.value)
        ? this.value.map(String)
        : typeof this.value === 'string' && this.value
        ? this.value.split(',').map((s) => s.trim())
        : null;

      if (valArr !== null) {
        items.forEach((item, idx) => {
          const val = String(this._getItemValue(item, idx));
          const isSelected = valArr.includes(val);
          if (item.selected !== isSelected) {
            item.selected = isSelected;
          }
        });
      } else {
        const selectedItems = items.filter((i) => i.selected);
        if (selectedItems.length) {
          this.value = selectedItems.map((item) => this._getItemValue(item, items.indexOf(item)));
        }
      }
    }
  }

  _onItemClick(e) {
    if (this.disabled || this.loading) return;
    const item = e.detail?.item || e.target.closest('dile-list-item');
    if (!item || item.disabled) return;

    const items = this.getItems();
    const idx = items.indexOf(item);
    if (idx === -1) return;

    this._focusedIndex = idx;
    this._updateRovingTabindex();

    if (this.selection === 'single') {
      this._selectSingle(item, idx);
    } else if (this.selection === 'multiple') {
      this._toggleMultiple(item, idx);
    }
  }

  _selectSingle(item, idx) {
    const val = this._getItemValue(item, idx);
    const items = this.getItems();

    items.forEach((i) => {
      i.selected = i === item;
    });

    this.value = val;
    this._dispatchChangeEvent(item, [item]);
  }

  _toggleMultiple(item) {
    item.selected = !item.selected;
    const items = this.getItems();
    const selectedItems = items.filter((i) => i.selected);
    this.value = selectedItems.map((i) => this._getItemValue(i, items.indexOf(i)));
    this._dispatchChangeEvent(item, selectedItems);
  }

  _dispatchChangeEvent(triggerItem, selectedItems) {
    this.dispatchEvent(
      new CustomEvent('dile-list-change', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          selectedItem: triggerItem,
          selectedItems: selectedItems,
        },
      })
    );
  }

  _onFocusIn(e) {
    const item = e.target.closest('dile-list-item');
    if (item) {
      const items = this.getItems();
      const idx = items.indexOf(item);
      if (idx !== -1) {
        this._focusedIndex = idx;
        this._updateRovingTabindex();
      }
    }
  }

  _updateRovingTabindex() {
    if (!this.navigable) return;
    const items = this.getItems();
    if (!items.length) return;

    let activeIdx = this._focusedIndex;
    if (activeIdx < 0 || activeIdx >= items.length || items[activeIdx].disabled) {
      const selIdx = items.findIndex((i) => i.selected && !i.disabled);
      if (selIdx !== -1) {
        activeIdx = selIdx;
      } else {
        const firstEnabled = items.findIndex((i) => !i.disabled);
        activeIdx = firstEnabled !== -1 ? firstEnabled : 0;
      }
    }

    this._focusedIndex = activeIdx;
    items.forEach((item, index) => {
      if (item.disabled) {
        item.itemTabindex = -1;
      } else {
        item.itemTabindex = index === activeIdx ? 0 : -1;
      }
    });
  }

  _onKeydown(e) {
    if (this.disabled || this.loading || !this.navigable) return;
    const navKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!navKeys.includes(e.key)) return;

    const enabledItems = this.getItems().filter((i) => !i.disabled);
    if (!enabledItems.length) return;

    e.preventDefault();
    const allItems = this.getItems();
    let currentItem = allItems[this._focusedIndex];
    let currentEnabledIdx = enabledItems.indexOf(currentItem);
    if (currentEnabledIdx === -1) currentEnabledIdx = 0;

    let nextEnabledIdx;
    switch (e.key) {
      case 'ArrowDown':
        nextEnabledIdx = (currentEnabledIdx + 1) % enabledItems.length;
        break;
      case 'ArrowUp':
        nextEnabledIdx = (currentEnabledIdx - 1 + enabledItems.length) % enabledItems.length;
        break;
      case 'Home':
        nextEnabledIdx = 0;
        break;
      case 'End':
        nextEnabledIdx = enabledItems.length - 1;
        break;
    }

    const nextItem = enabledItems[nextEnabledIdx];
    if (nextItem) {
      this._focusedIndex = allItems.indexOf(nextItem);
      this._updateRovingTabindex();
      nextItem.focus();

      if (this.selection === 'single' && this.selectOnFocus) {
        this._selectSingle(nextItem, this._focusedIndex);
      }
    }
  }

  /**
   * Programmatically selects an item by its value.
   * @param {string} val
   */
  select(val) {
    this.value = val;
    this._syncSelectionFromValue();
  }

  /**
   * Clears selection in the list.
   */
  clearSelection() {
    this.value = this.selection === 'multiple' ? [] : undefined;
    this.getItems().forEach((item) => {
      item.selected = false;
    });
  }

  render() {
    return html`
      <div class="list-container" part="container">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </div>

      <div class="empty-container" part="empty" ?hidden="${!this._isEmpty || this.loading}">
        <slot name="empty">
          <span>${this.emptyText || 'No items available'}</span>
        </slot>
      </div>

      <div class="loading-overlay" part="loading" ?hidden="${!this.loading}">
        <slot name="loading">
          <dile-spinner active></dile-spinner>
        </slot>
      </div>
    `;
  }
}
