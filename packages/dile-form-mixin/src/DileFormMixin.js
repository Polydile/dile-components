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
      if(data[node.getAttribute('name')]  !== undefined) {
        if (typeof node.set === "function") {
          node.set(data[node.getAttribute('name')]);
        } else {
          node.value = data[node.getAttribute('name')];
        }

      }
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

  getNodeElement(name) {
    return this.shadowRoot.querySelector('[name="' + name + '"]');
  }

  resetData() {
    this.setData(this.firstValue);
  }

  resetField(name) {
    if(this.firstValue.hasOwnProperty(name)) {
      let value = this.firstValue[name];
      let node = this.getNodeElement(name);
      node.value = value;
    }
  }

  showError(name, error) {
    let node = this.getNodeElement(name);
    node.errored = true;
    node.message = error;
  }

  showErrors(errors) {
    for(let name in errors) {
      this.showError(name, errors[name]);
    } 
  }

  clearErrors() {
    this.allNodeElements.forEach(node => {
      node.errored = false;
      node.message = '';
    });
  }

  isDirty() {
    const currentData = this.getData();
    const originProperties = Object.keys(this.firstValue);
    const currentProperties = Object.keys(currentData);
    if (originProperties.length !== currentProperties.length) {
      return true;
    }
    for (let prop of originProperties) {
      if (this.firstValue[prop] != currentData[prop]) {
          return true; // Si alguna propiedad no coincide, retorna false
      }
    }
    return false;
  }

}
