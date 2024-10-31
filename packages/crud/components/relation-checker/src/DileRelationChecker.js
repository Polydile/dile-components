import { LitElement, html, css } from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import '@dile/ui/components/input/input-search.js';
import '../relation-checker-item.js';
import '../../ajax/ajax.js';

export class DileRelationChecker extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      dile-input-search {
        margin-bottom: 1rem;
      }
      h2 {
        font-size: var(--relation-checker-title-font-size, 1.25rem);
        font-weight: var(--relation-checker-title-font-weight, bold);
        color: #303030(--relation-checker-title-color, #303030);
      }
    `
  ];

  static get properties() {
    return {
      /**
       * Endpoint to receive the list of items that can be checked, with their status
       * Receives all items, indicating which ones are checked
       * { label, id, checked } 
      */
      endpointGet: { type: String },
      
      /**
       * Route to toggle the checked/unchecked status of an item
       * It will send an objetc { id, checked }
      */
      endpointCheck: { type: String},

      /**
       * Array of items received for potential relationships
       */
      items: { type: Array },

      /**
       * Title label for the box
       */
      label: { type: String },

      /**
       * Keyword for the filter
       */
      keyword: { type: String },

      /**
       * Function to get the items for the relations
       */
      getRelationItems: { type: Object },

      /**
       * Tooltip compute function 
       */
      computeTooltip: { type: Object },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.getRelationItems = (response) => response.data;
    this.computeTooltip = (item) => null;
  }

  render() {
    return html`
      ${this.ajaxTemplate}
      ${this.label
        ? html`<h2>${this.label}</h2>`
        : ''
      }
      <dile-input-search
        @dile-input-search=${this.searchHandler}
        @dile-input-search-cleared=${this.clearKeywordHandler}
      ></dile-input-search>
      ${this.computedItems(this.items, this.keyword).map( item => html`
        <dile-relation-checker-item 
          .item=${item} 
          @relation-item-changed="${this.relationItemChanged}"
          tooltip=${ifDefined(this.computeTooltip(item))}
        ></dile-relation-checker-item>
      `)}
    `;
  }

  firstUpdated() {
    this.ajaxsave = this.shadowRoot.getElementById('ajaxsave');
    this.ajaxget = this.shadowRoot.getElementById('ajaxget');
    this.refresh();
  }

  get ajaxTemplate() {
    return html`
      <dile-ajax
          id="ajaxget"
          method="get"
          url="${this.endpointGet}"
          @ajax-success="${this.doSuccessGet}"
          @ajax-error="${this.doErrorGet}"
      ></dile-ajax>
      <dile-ajax
          id="ajaxsave"
          method="post"
          url="${this.endpointCheck}"
          @ajax-success="${this.doSuccessSave}"
          @ajax-error="${this.doErrorSave}"
      ></dile-ajax>
    `
  }

  relationItemChanged(e) {
    this.save(e.detail.item.id, e.detail.checked);
  }

  save(name, checked) {
    this.ajaxsave.data = {
      id: name,
      checked: checked,
    };
    this.ajaxsave.generateRequest();
  }

  doSuccessGet(e) {
    this.items = this.getRelationItems(e.detail);
    this.dispatchEvent(new CustomEvent('relation-data-recived', {
      bubbles: true,
      composed: true,
      detail: {
        items: this.items
      }
    }));
  }

  doErrorGet() {
    this.customDispatch('relation-error-get');
  }

  doSuccessSave() {
    this.customDispatch('relation-success-save');
    this.refresh();
  }

  refresh() {
    this.updateComplete.then(() => this.ajaxget.generateRequest());
  }

  doErrorSave() {
    this.customDispatch('relation-error-save');
  }

  customDispatch(eventName) {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
    }));
  }

  doCheckItem(ele) {
    this.items = this.items.map(item => {
      if(item.id == ele.id) {
        return {
          ...item,
          checked: true
        } 
      }
      return item;
    })
    this.save(ele.id, true);
  }

  searchHandler(e) {
    this.keyword = e.detail.keyword;
  }

  clearKeywordHandler() {
    this.keyword = undefined;
  }

  computedItems(items, keyword) {
    if(!keyword) {
      return items;
    }
    return items.filter( item => item.label.toLowerCase().indexOf(keyword.toLowerCase()) != -1);
  }
}