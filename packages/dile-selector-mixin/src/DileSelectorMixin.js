/**
 *
 * # DileSelectorMixin
 *
 * Mixin to select one item from a list.
 *
 */
 import { html } from "lit";

export const DileSelectorMixin = (SuperClass) =>
  class extends SuperClass {

    static get properties() {
      return {
        selected: { type: String },
        attrForSelected: { type: String },
      }
    }

    constructor() {
      super();
      this.selected = 0;
      this._items = [];
      this.itemSelectedChangedHandler = this._itemSelectedChanged.bind(this);
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener('dile-item-selected', this.itemSelectedChangedHandler);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('dile-item-selected', this.itemSelectedChangedHandler);
    }

    firstUpdated() {
      super.firstUpdated();
      this._items = this.shadowRoot.querySelector('slot').assignedElements({flatten: true});
      let index = 0;
      this._items.forEach(el => {
        el._assignedIndex = index;
        index++;
      });
      this.setSelectedItem();
    }

    render() {
      return html`
        <slot></slot>
      `;
    }

    setSelectedItem() {
      if(! this.attrForSelected) {
        // Selected by index
        let selectedIndex = parseInt(this.selected);
        if(! isNaN(selectedIndex) && this._items[selectedIndex]) {
          this._items.forEach((el, index) => {
            if(index == selectedIndex) {
              el.selected = true;
            } else {
              el.selected = false;
            }
          });
        }
      } else {

        // Selected by attribute
        this._items.forEach(el => {
          if(el.getAttribute(this.attrForSelected) == this.selected) {
            el.selected = true;
          } else {
            el.selected = false;
          }
        });
      }
    }

    _itemSelectedChanged(e) {
      if(! this.attrForSelected) {
        // selected by index
        this.selected = e.detail._assignedIndex;
      } else {
        // selected by attribute
        this.selected = e.detail.getAttribute(this.attrForSelected);
      }
      this.dispatchSelectedChanged();
    }
  
    dispatchSelectedChanged() {
      this.dispatchEvent(new CustomEvent('dile-selected-changed', {
        bubbles: true,
        composed: true,
        detail: this.selected
      }));
    }
    
    updated(changedProperties) {
      this.setSelectedItem();
    }
  }