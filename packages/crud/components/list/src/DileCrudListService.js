import { LitElement, html, css } from 'lit';

export class DileCrudListService extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
      filters: { type: Array },
      pageSize: { type: Number },
      keyword: { type: String },
      paginationData: { type: Object },
      sort: { type: Object },
    };
  }

  constructor() {
    super();
    this.pageSize = 50;
    this.keyword = '';
    this.filters = [];
    this.paginationData = {}
    this.delayTime = 200;
    this.delayTimer = null;
  }

  firstUpdated() {
    this.ajaxget = this.shadowRoot.getElementById('ajaxget');
    this.refresh();
  }

  render() {
    return html`
      <dile-ajax
        id="ajaxget"
        method="get"
        url="${this.cleanUrl}"
        @ajax-success="${this.doSuccessGet}"
        @ajax-error="${this.doErrorGet}"
      ></dile-ajax>
    `;
  }

  get cleanUrl() {
    return `${this.config.endpoint}`;
  }

  refresh() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
    }
    this.delayTimer = setTimeout(() => this.doRefresh(), this.delayTime);
  }

  doRefresh() {
    this.delayTimer = null;
    let data = {
      per_page: this.pageSize,
      keyword: this.keyword,
      filters: this.filters,
    }
    if (this.sort && this.sort.sortField) {
      data.sortField = this.sort.sortField;
    }
    if (this.sort && this.sort.sortDirection) {
      data.sortDirection = this.sort.sortDirection;
    }
    if (this.config.belongsTo && this.config.relationId) {
      data.belongsTo = this.config.belongsTo;
      data.relationId = this.config.relationId;
    }
    this.ajaxget.data = data;
    this.ajaxget.generateRequest();
  }

  doSuccessGet(e) {
    console.log(this, 'do success get on service', e.detail);
    let elements = this.config.apiConfig.getResultsListFromResponse(e.detail);
    let numItems;
    if (!this.config.customization?.disablePagination) {
      let data = this.config.apiConfig.getDataFromResponse(e.detail);
      console.log('pagination data creating', data);
      this.paginationData = {
        nextPage: data.result.next_page_url,
        prevPage: data.result.prev_page_url,
        currentPage: data.result.current_page,
      }
      numItems = data.countItems;
    } else {
      numItems = elements.length;
    }
    this.dispatchEvent(new CustomEvent('crud-list-get-success', {
      detail: {
        elements,
        numItems,
        paginationData: this.paginationData,
      }
    }));
  }

  doErrorGet(e) {
    this.dispatchEvent(new CustomEvent('crud-list-data-error', {
      bubbles: true,
      composed: true,
      detail: data
    }));
  }

  goNext() {
    if (this.paginationData.nextPage) {
      this.ajaxget.url = this.paginationData.nextPage;
      this.ajaxget.generateRequest();
    }
  }

  goPrev() {
    if (this.paginationData.prevPage) {
      this.ajaxget.url = this.paginationData.prevPage;
      this.ajaxget.generateRequest();
    }
  }

  setKeyword(keyword) {
    console.log('setkeyword', keyword);
    this.keyword = keyword;
    this.ajaxget.url = this.cleanUrl;
    this.refresh();
  }

  setSort(sortObject) {
    console.log('set SORT OBJECT');
    this.sort = sortObject;
    this.ajaxget.url = this.cleanUrl;
    this.refresh();
  }

  setPageSize(size) {
    // console.log('set page size');
    this.pageSize = size;
    this.ajaxget.url = this.cleanUrl;
    this.refresh();
  }

  setFilters(filters) {
    // console.log('set filters');
    this.filters = filters;
    this.ajaxget.url = this.cleanUrl;
    this.refresh();
  }
}