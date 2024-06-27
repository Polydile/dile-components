/**
 *
 * # DileFormChangeDetect
 *
 * Mixin to detect changes in form components
 *
 */

export const DileFormChangeDetect = (superclass) => class extends superclass {

  constructor() {
    super();
    this.changeHandler = this.detectChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('element-changed', this.changeHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('element-changed', this.changeHandler);
  }

  detectChange(e) {
    this.dispatchEvent(new CustomEvent('dile-form-changed', {
        bubbles: true,
        composed: true,
        detail: {
          data: this.getData()
        }
    }));
  }
}