/**
 *
 * # DileSelectorItem
 *
 * Mixin to implement a selector item.
 *
 */
export const DileSelectableItem = (SuperClass) =>
  class extends SuperClass {
    static get properties() {
      return {
        selected: { 
          type: Boolean,
          reflect: true,
        },
        index: { type: Number },
      };
    }
    constructor() {
      super();
      this.selected = false;
    }
    select() {
      this.dispatchEvent(new CustomEvent('dile-item-selected', {
        bubbles: true,
        composed: true,
        detail: this
      }));
    }
  }