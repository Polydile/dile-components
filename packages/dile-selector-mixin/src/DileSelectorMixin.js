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
        selectorId: { type: String },
        hashSelection: { type: Boolean },
      }
    }

    constructor() {
      super();
      this.selected = 0;
      this._items = [];
      this.hashSelection = false;
      this.itemSelectedChangedHandler = this._itemSelectedChanged.bind(this);
      this.onHashChangeHandler = this._onHashChange.bind(this);
    }

    _onHashChange() {
      if(this.hashSelection) {
        let items = this.getItems();
        let hashValue = this.getCleanHash();
        let elementIndex;
        let elem = items.find( (item, index) => {
          let value = this.getItemValueComputed(item, index);
          elementIndex = index;
          return value == hashValue;
        });
        let valueItem = this.getItemValueComputed(elem, elementIndex);
        if(elem && this.selected != valueItem) {
          this.selected = valueItem;
          this.setSelectedItem();
          this.dispatchSelectedChanged();
        }
      }
    }

    getCleanHash() {
      let hashValue = window.location.hash;
      if(hashValue.length > 1) {
        hashValue = hashValue.substring(1);
      }
      return hashValue;
    }

    getItemValueComputed(item, index) {
      return this.attrForSelected ? item.getAttribute(this.attrForSelected) : index
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener('dile-item-selected', this.itemSelectedChangedHandler);
      window.addEventListener("hashchange", this.onHashChangeHandler);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('dile-item-selected', this.itemSelectedChangedHandler);
      window.removeEventListener("hashchange", this.onHashChangeHandler);
    }

    firstUpdated() {
      super.firstUpdated();
      this._items = this.getItems()
      let index = 0;
      this._items.forEach(el => {
        el._assignedIndex = index;
        index++;
      });
      this._onHashChange();
      this.setSelectedItem();
      if(this.selected !== undefined) {
        setTimeout( () => this.dispatchSelectedChanged(), 500);
      }
    }

    render() {
      return html`
        <slot></slot>
      `;
    }

    setSelectedItem() {
      if(this.attrForSelected) {
        // Selected by attribute
        this._items.forEach(el => {
          if(el.getAttribute(this.attrForSelected) == this.selected) {
            el.selected = true;
          } else {
            el.selected = false;
          }
        });
      } else {
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
      }
      if(this.hashSelection && this.selected != undefined) {
        window.location.hash = this.selected;
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
        detail: {
          selected: this.selected,
          selectorId: this.selectorId,
        }
      }));
    }
    
    updated(changedProperties) {
      this.setSelectedItem();
    }

    getItems() {
      return this.shadowRoot.querySelector('slot').assignedElements({flatten: true});
    }
  }