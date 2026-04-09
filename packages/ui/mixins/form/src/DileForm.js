/**
 *
 * # DileForm
 *
 * Mixin to apply functionality to form components
 *
 */

export const DileForm = (superclass) => class extends superclass {


  constructor() {
    super();
    this.firstValue = null;
  }

  static get properties() {
    return {
      setOnInit: { type: Object }
    };
  }

  firstUpdated() {
    super.firstUpdated();
    this.firstValue = this.getData();
    if(this.setOnInit) {
      this.setData(this.setOnInit);
    }
  }

  getData() {
    let data = {};
    this.allNodeElements.forEach(node => {
      const name = node.getAttribute('name');
      const isArray = name.endsWith('[]');
      const fieldName = isArray ? name.slice(0, -2) : name;
      
      if (isArray) {
        if (!data[fieldName]) {
          data[fieldName] = [];
        }
        data[fieldName].push(node.value);
      } else {
        data[fieldName] = node.value;
      }
    });
    return data;
  }

  setData(data) {
    this.allNodeElements.forEach(node => {
      const name = node.getAttribute('name');
      const isArray = name.endsWith('[]');
      const fieldName = isArray ? name.slice(0, -2) : name;
      
      if (isArray && Array.isArray(data[fieldName])) {
        // with arrays, the index is the element order in the DOM
        const arrayElements = Array.from(this.allNodeElements).filter(el => el.getAttribute('name') === name);
        const elementIndex = arrayElements.indexOf(node);
        if (elementIndex >= 0 && elementIndex < data[fieldName].length) {
          const value = data[fieldName][elementIndex];
          if (typeof node.set === "function") {
            node.set(value);
          } else {
            node.value = value;
          }
        }
      } else if (!isArray && data[fieldName] !== undefined && data[fieldName] !== null) {
        if (typeof node.set === "function") {
          node.set(data[fieldName]);
        } else {
          node.value = data[fieldName];
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
    // Check if it's an array field reference like "items.0"
    const arrayMatch = name.match(/^(.+)\.(\d+)$/);
    if (arrayMatch) {
      const fieldName = arrayMatch[1];
      const index = parseInt(arrayMatch[2]);
      const arrayElements = this.shadowRoot.querySelectorAll(`[name="${fieldName}[]"]`);
      return arrayElements[index] || null;
    }
    // Regular field
    return this.shadowRoot.querySelector('[name="' + name + '"]');
  }

  resetData() {
    this.setData(this.firstValue);
  }

  resetField(name) {
    // Check if it's an array field reference like "items.0"
    const arrayMatch = name.match(/^(.+)\.(\d+)$/);
    if (arrayMatch) {
      const fieldName = arrayMatch[1];
      const index = parseInt(arrayMatch[2]);
      if (this.firstValue.hasOwnProperty(fieldName) && Array.isArray(this.firstValue[fieldName])) {
        const value = this.firstValue[fieldName][index];
        const node = this.getNodeElement(name);
        if (node) {
          node.value = value;
        }
      }
    } else if (this.firstValue.hasOwnProperty(name)) {
      let value = this.firstValue[name];
      let node = this.getNodeElement(name);
      if (node) {
        node.value = value;
      }
    }
  }

  showError(name, error) {
    const parts = name.split('.');
    
    // Check if it's a nested field reference like "product_lines.0.name"
    if (parts.length > 2) {
      const fieldName = parts[0];
      const nestedPath = parts.slice(1).join('.');
      const node = this.shadowRoot.querySelector('[name="' + fieldName + '"]');
      if (node) {
        node.errored = true;
        node.message = nestedPath + ':' + error;
      } else {
        console.warn(`Error to ${name} not shown because this element is not found`);
      }
    } else {
      // Regular field or array element reference (handled by getNodeElement)
      let node = this.getNodeElement(name);
      if(node) {
        node.errored = true;
        node.message = error;
      } else {
        console.warn(`Error to ${name} not shown because this element is not found`);
      }
    }
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
      const isArray = Array.isArray(this.firstValue[prop]);
      if (isArray) {
        const originalArray = this.firstValue[prop];
        const currentArray = currentData[prop];
        if (!Array.isArray(currentArray) || originalArray.length !== currentArray.length) {
          return true;
        }
        for (let i = 0; i < originalArray.length; i++) {
          if (originalArray[i] != currentArray[i]) {
            return true;
          }
        }
      } else {
        if (this.firstValue[prop] != currentData[prop]) {
          return true;
        }
      }
    }
    return false;
  }

}
