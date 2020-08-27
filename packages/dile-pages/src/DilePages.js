import { LitElement, html, css } from 'lit-element';

export class DilePages extends LitElement {
  static get properties() {
    return {
      /** Attribute in the page element, to match the selected property value */
      attrForSelected: { type: String },
      /** Set the selected page */
      selected: { type: String },
    };
  }
  render() {
    return html`
    <slot></slot>
    `;
  }

  constructor() {
    super();
    this.transitionTime = 1000;
    this.selected = 0;
    this._pageInitialization();
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  /**
   * Private method to process the light DOM and it's elements, creating and updating necesary styles 
   *
   * @return {void}
   */
  _pageInitialization() {
    this.pages = [];

    let pages = this.children;
    for (let ele of pages) {
      ele.style.display = 'none';
      ele.style.transition = `opacity ${this.transitionTime}ms`;
      ele.style.opacity = '0';
      this.pages.push(ele);
    }
  }

  /**
   * Call this method to attach other HTML in the component, to use it as pages, instead of the light DOM
   *
   * @return {void}
   */
  initializeExternalPages(htmlElements) {
    this.innerHTML = htmlElements;
    this._pageInitialization();
  }

  /**
   * Livecycle method to ensure the view of the correct page in start 
   *
   * @return {void}
   */
  firstUpdated() {
    let page = this._selectPage(this.selected, this.attrForSelected);
    if (page) {
      page.style.display = 'block';
    }
  }

  /**
   * Livecycle method. Listening changes in selected and attrForSelected properties
   *
   * @return {void}
   */
  updated(changedProperties) {
    if (this._updatedAndNotUndefined(changedProperties, 'selected') || this._updatedAndNotUndefined(changedProperties, 'attrForSelected')) {
      let lastSelected = this._getLastValueProperty(changedProperties, 'selected');
      let lastAttrForSelected = this._getLastValueProperty(changedProperties, 'attrForSelected');
      this.hidePage(lastSelected, lastAttrForSelected);
    }
    this._showCurrentPage();
  }

  /**
   * Private method to get the current active page
   *
   * @return {page}
   */
  _selectPage(selected, attrForSelected) {
    let page;
    if (!attrForSelected) {
      page = this.pages[selected];
    } else {
      for (let ele of this.pages) {
        if (ele.getAttribute(attrForSelected) == selected) {
          page = ele;
          break;
        }
      }
    }
    return page;
  }

  /**
   * Private method to show the current active page
   *
   * @return {page}
   */
  _showCurrentPage() {
    let page = this._selectPage(this.selected, this.attrForSelected)
    if (page) {
      page.style.display = 'block';
      setTimeout(() => {
        page.style.opacity = '1';
      }, 50);
    }
  }

  /**
   * Hide a page, sending arbitrary data as parameters.  
   *
   * @param {selected} the page to hide
   * @param {attrForSelected} the attribute to match the selected value
   * @return {void}
   */
  hidePage(selected, attrForSelected) {
    let page = this._selectPage(selected, attrForSelected)
    if (page) {
      page.style.display = 'none';
      page.style.opacity = '0';
    }
  }

  /**
   * Private method to know when a property is changed, and its value is not undefined
   * 
   * @param {changedProperties} map of the properties changed (same as you get in updated livecycle method)
   * @param {field} the name of the property you need to know is updated
   * @return {boolean}
   */
  _updatedAndNotUndefined(changedProperties, field) {
    return (changedProperties.has(field) && changedProperties.get(field) != undefined)
  }

  /**
   * Private method to get the last value of a property
   * 
   * @param {changedProperties} map of the properties changed (same as you get in updated livecycle method)
   * @param {field} the name of the property you need to know it's last value
   * @return {boolean}
   */
  _getLastValueProperty(changedProperties, field) {
    return (changedProperties.has(field)) ? changedProperties.get(field) : this[field];
  }
}
