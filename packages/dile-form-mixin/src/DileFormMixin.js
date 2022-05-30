/**
 *
 * # DileFormMixin
 *
 * Mixin to apply functionality to form components
 *
 */

export const DileFormMixin = (superclass) => class extends superclass {


  constructor() {
    super();
    this.firstValue = null;
  }

  firstUpdated() {
    super.firstUpdated();
    this.firstValue = this.getData();
  }

  getData() {
    let data = {};
    this.allNodeElements.forEach(node => {
      data[node.getAttribute('name')] = node.value;
    });
    return data;
  }

  setData(data) {
    this.allNodeElements.forEach(node => {
      node.value = data[node.getAttribute('name')];
    });
  }

  clearData() {
    this.allNodeElements.forEach(node => {
      if (typeof node.clear === "function") {
        node.clear();
      } else {
        node.value = '';
      }
    });
  }

  get allNodeElements() {
    return this.shadowRoot.querySelectorAll('[name]');
  }

  resetData() {
    this.setData(this.firstValue);
  }
}