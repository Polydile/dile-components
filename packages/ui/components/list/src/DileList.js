import { LitElement, html, css } from 'lit';
import '../../spinner/spinner.js';

const HOST_FOCUS_ROLES = ['option', 'menuitem'];

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

      /* With items, the loader floats over them. Without items it takes its own space. */
      .loading-overlay.floating {
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
      /** Divider style propagated to items: boolean attribute (full), "full", "inset" or "none" */
      divider: { type: String, reflect: true },
      /** Text clamping lines propagated to items: "1", "2", "auto" or number */
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
      /**
       * Whether arrow key keyboard navigation with roving tabindex is enabled.
       * Defaults to true; use navigable="false" in HTML to disable it.
       */
      navigable: {
        type: Boolean,
        converter: {
          fromAttribute: (attr) => attr !== 'false',
        },
      },
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
    this.disabled = false;
    this.loading = false;
    this.emptyText = '';
    this.navigable = true;
    this.selectOnFocus = false;
    this.borderless = false;
    this._isEmpty = false;
    this._focusedIndex = -1;
    /** Values the list has imposed on each item, to be able to restore them later */
    this._cascadeRecords = new WeakMap();

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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dile-list-item-click', this._onItemClick);
    this.removeEventListener('keydown', this._onKeydown);
    this.removeEventListener('focusin', this._onFocusIn);
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
    }

    if (
      changedProperties.has('selection') ||
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

    if (changedProperties.has('value')) {
      this._syncSelectionFromValue();
    }

    if (
      changedProperties.has('navigable') ||
      changedProperties.has('selection') ||
      changedProperties.has('clickable') ||
      changedProperties.has('disabled')
    ) {
      this._updateRovingTabindex();
    }
  }

  /**
   * Returns the dile-list-item elements that are direct children of the list.
   * Items of nested lists are not included.
   * @returns {Array<HTMLElement>}
   */
  getItems() {
    return Array.from(this.children).filter((el) => el.localName === 'dile-list-item');
  }

  _getItemValue(item, index) {
    if (item.value !== undefined && item.value !== null && item.value !== '') {
      return item.value;
    }
    if (item.id) {
      return item.id;
    }
    return String(index);
  }

  /** Items that can receive focus: enabled and interactive (clickable, link, option or menuitem). */
  _isFocusableItem(item) {
    return (
      !item.disabled &&
      Boolean(item.clickable || item.href || HOST_FOCUS_ROLES.includes(item.getAttribute('role')))
    );
  }

  _handleSlotChange() {
    this._isEmpty = this.getItems().length === 0;
    this._cascadeProperties();
    this._syncAriaRoles();
    this._syncSelectionFromValue();
    this._updateRovingTabindex();
  }

  _cascadeProperties() {
    const shouldBeClickable = this.clickable || this.selection !== 'none';
    this.getItems().forEach((item) => {
      // Behavioural properties: the list overrides the item while active.
      this._cascadeProp(item, 'clickable', shouldBeClickable ? true : undefined, true);
      this._cascadeProp(item, 'disabled', this.disabled ? true : undefined, true);
      // Presentational properties: values defined on the item itself take precedence.
      this._cascadeProp(item, 'density', this.density || undefined);
      this._cascadeProp(item, 'divider', this.divider ?? undefined);
      this._cascadeProp(item, 'lines', this.lines || undefined);
      this._cascadeProp(item, 'align', this.align || undefined);
      this._cascadeProp(item, 'bodyAlign', this.bodyAlign || undefined);
    });
  }

  /**
   * Applies a list-level value to an item, remembering the item's original value so it
   * can be restored when the list stops imposing it (value === undefined).
   * @param {HTMLElement} item
   * @param {string} prop
   * @param {*} value value to impose, or undefined to release control
   * @param {boolean} override whether the list value wins over a value defined on the item
   */
  _cascadeProp(item, prop, value, override = false) {
    let record = this._cascadeRecords.get(item);
    if (!record) {
      record = {};
      this._cascadeRecords.set(item, record);
    }
    let entry = record[prop];

    // The item value was changed from outside since the list set it: the item takes control.
    if (entry && item[prop] !== entry.value) {
      delete record[prop];
      entry = undefined;
    }

    if (value === undefined) {
      if (entry) {
        item[prop] = entry.original;
        delete record[prop];
      }
      return;
    }

    if (!entry) {
      const own = item[prop];
      if (!override && own !== undefined && own !== null) return;
      entry = record[prop] = { original: own };
    }
    entry.value = value;
    if (item[prop] !== value) {
      item[prop] = value;
    }
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
        if (itemRole !== childRole) {
          item.setAttribute('role', childRole);
        }
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
    const item = e.detail?.item;
    if (!item || item.disabled) return;

    const items = this.getItems();
    const idx = items.indexOf(item);
    // Ignore clicks coming from items that don't belong to this list (e.g. nested lists)
    if (idx === -1) return;

    this._focusedIndex = idx;
    this._updateRovingTabindex();

    if (this.selection === 'single') {
      this._selectSingle(item, idx);
    } else if (this.selection === 'multiple') {
      this._toggleMultiple(item);
    }
  }

  _selectSingle(item, idx) {
    const val = this._getItemValue(item, idx);
    if (item.selected && this.value !== undefined && this.value !== null && String(this.value) === String(val)) {
      return;
    }

    this.getItems().forEach((i) => {
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
    const items = this.getItems();
    const idx = items.indexOf(e.target);
    if (idx !== -1) {
      this._focusedIndex = idx;
      this._updateRovingTabindex();
    }
  }

  _updateRovingTabindex() {
    const items = this.getItems();
    if (!items.length) return;

    if (!this.navigable) {
      items.forEach((item) => {
        item.itemTabindex = 0;
      });
      return;
    }

    const focusable = items.filter((i) => this._isFocusableItem(i));
    if (!focusable.length) return;

    let active = items[this._focusedIndex];
    if (!focusable.includes(active)) {
      active = focusable.find((i) => i.selected) || focusable[0];
    }

    this._focusedIndex = items.indexOf(active);
    items.forEach((item) => {
      item.itemTabindex = item === active ? 0 : -1;
    });
  }

  /** Returns the list item whose own focus target (host or inner element) originated the event. */
  _getEventItem(e, items) {
    const origin = e.composedPath()[0];
    return items.find((item) => item === origin || item.shadowRoot?.contains(origin));
  }

  _onKeydown(e) {
    if (this.disabled || this.loading || !this.navigable) return;
    const navKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!navKeys.includes(e.key)) return;

    const allItems = this.getItems();
    // Only handle keys pressed on an item itself, not on controls placed inside items.
    const currentItem = this._getEventItem(e, allItems);
    if (!currentItem) return;

    const focusable = allItems.filter((i) => this._isFocusableItem(i));
    if (!focusable.length) return;

    e.preventDefault();
    let currentIdx = focusable.indexOf(currentItem);
    if (currentIdx === -1) currentIdx = 0;

    let nextIdx;
    switch (e.key) {
      case 'ArrowDown':
        nextIdx = (currentIdx + 1) % focusable.length;
        break;
      case 'ArrowUp':
        nextIdx = (currentIdx - 1 + focusable.length) % focusable.length;
        break;
      case 'Home':
        nextIdx = 0;
        break;
      case 'End':
        nextIdx = focusable.length - 1;
        break;
    }

    const nextItem = focusable[nextIdx];
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

      <div class="loading-overlay ${this._isEmpty ? '' : 'floating'}" part="loading" ?hidden="${!this.loading}">
        <slot name="loading">
          <dile-spinner active></dile-spinner>
        </slot>
      </div>
    `;
  }
}
