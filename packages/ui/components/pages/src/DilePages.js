import { LitElement, html, css } from 'lit';

let idCounter = 0;
const generateId = (prefix) => `${prefix}-${++idCounter}`;

export class DilePages extends LitElement {
  static get properties() {
    return {
      /** Attribute in the page element, to match the selected property value */
      attrForSelected: { type: String },
      /** Set the selected page */
      selected: { type: String },
      /** A selector interface to change the tabs */
      selectorId: { type: String },
      /** Display to the element that is shown */
      showDisplay: { type: String },
      /** Tabs mode: marks each page as role="tabpanel" and links it with its dile-tab (same selectorId) */
      tabpanels: { type: Boolean },
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
    this._onSelectorIdChangedHandler = this._onSelectorIdChanged.bind(this);
    this.showDisplay = 'block';
    this.tabpanels = false;
    this._ariaPages = new Set();
    this._ariaTabs = new Set();
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
    this.linkTabs();
  }

  /**
   * Livecycle method to ensure the view of the correct page in start 
   *
   * @return {void}
   */
  firstUpdated() {
    let page = this._selectPage(this.selected, this.attrForSelected);
    if (page) {
      page.style.display = this.showDisplay;
    }
    if(this.selectorId) {
      document.addEventListener('dile-selected-changed', this._onSelectorIdChangedHandler);
    }
    this._linkTabsWhenReady();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if(this.selectorId) {
      document.removeEventListener('dile-selected-changed', this._onSelectorIdChangedHandler);
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
    if (this.hasUpdated && (changedProperties.has('tabpanels') || changedProperties.has('attrForSelected') || changedProperties.has('selectorId'))) {
      this.linkTabs();
    }
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
      page.style.display = this.showDisplay;
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

  _onSelectorIdChanged(e) {
    if(e.detail.selectorId == this.selectorId) {
      this.selected = e.detail.selected;
    }
  }

  async _linkTabsWhenReady() {
    this.linkTabs();
    const tabs = this._findTabs();
    if (tabs) {
      await customElements.whenDefined('dile-tabs');
      await tabs.updateComplete;
      this.linkTabs();
    }
  }

  _findTabs() {
    if (!this.selectorId) {
      return null;
    }
    const root = this.getRootNode();
    return [...root.querySelectorAll('dile-tabs')]
      .find((tabs) => tabs.selectorId === this.selectorId || tabs.getAttribute('selectorid') === this.selectorId) ?? null;
  }

  /**
   * Applies (tabpanels mode) or removes the tab panel semantics on the pages: role="tabpanel",
   * aria-labelledby pointing to the dile-tab and aria-controls from the tab to the page.
   *
   * @return {void}
   */
  linkTabs() {
    this._unlinkTabs();
    if (!this.tabpanels) {
      return;
    }
    const tabs = this._findTabs();
    const tabItems = tabs?.hasUpdated ? tabs.getItems() : [];
    this.pages.forEach((page, index) => {
      page.setAttribute('role', 'tabpanel');
      if (!page.id) {
        page.id = generateId('dile-tabpanel');
      }
      this._ariaPages.add(page);
      const pageValue = this.attrForSelected ? page.getAttribute(this.attrForSelected) : index;
      const tab = tabItems.find((item, tabIndex) => tabs.getItemValueComputed(item, tabIndex) == pageValue);
      if (tab) {
        if (!tab.id) {
          tab.id = generateId('dile-tab');
        }
        page.setAttribute('aria-labelledby', tab.id);
        tab.controlsElement = page;
        this._ariaTabs.add(tab);
      }
    });
  }

  _unlinkTabs() {
    this._ariaPages.forEach((page) => {
      page.removeAttribute('role');
      page.removeAttribute('aria-labelledby');
    });
    this._ariaTabs.forEach((tab) => {
      tab.controlsElement = undefined;
    });
    this._ariaPages.clear();
    this._ariaTabs.clear();
  }
}
