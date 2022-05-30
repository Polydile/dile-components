/**
 *
 * # DileEmmitChangeMixin
 *
 * Mixin to detect changes in form components
 *
 */

 export const DileEmmitChangeMixin = (superclass) => class extends superclass {

    emmitChange() {
        this.dispatchEvent(new CustomEvent('element-changed', {
          bubbles: true,
          composed: true,
          detail: {
            name: this.name,
            value: this.value
          }
        }));
      }
      
  }