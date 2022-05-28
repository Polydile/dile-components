/**
 *
 * # DileFormMixin
 *
 * Mixin to apply functionality to form components
 *
 */

export const DileFormMixin = (superclass) => class extends superclass {
  getData() {
    let data = {};
    this.shadowRoot.querySelectorAll('[name]').forEach(node => {
      data[node.getAttribute('name')] = node.value;
    });
    return data;
  }

  setData(data) {
    this.shadowRoot.querySelectorAll('[name]').forEach(node => {
      node.value = data[node.getAttribute('name')];
    });
  }

  clearData() {
    this.shadowRoot.querySelectorAll('[name]').forEach(node => {
      if (typeof node.clear === "function") {
        node.clear();
      } else {
        node.value = '';
      }
    });
  }
}