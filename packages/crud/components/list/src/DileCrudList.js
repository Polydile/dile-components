import { LitElement, html, css } from 'lit';
import '@dile/ui/components/spinner/spinner.js';
import '@dile/ui/components/button/button.js';
import '../../ajax/ajax.js'
import '../../ui/crud-filters-list.js';
import '../../list/crud-list-pagination-links.js';
import '../crud-list-item.js';
import '../crud-select-all';

export class DileCrudList extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                padding: 0 0 1rem 0;
                background-color: #fff;
            }
            
            .prev-summary {
                display: flex;
                flex-direction: column;
                background-color: #999;
                color: white;
                font-size: 0.8em;
                margin-bottom: 0.5rem;
                border-bottom: 1px solid #ccc;
                padding: 0.4rem 1rem;
                line-height: 1.2rem;
            }
            dile-crud-select-all {
                margin: 0.3rem 0.2rem 0.4rem 0;
            }

            .empty, .loading {
                padding: var(--dile-crud-list-empty-padding, 3rem 1rem);
                text-align: center;
            }
            
            @media(min-width: 500px) {
                .prev-summary {
                    flex-direction: row;
                    align-items: center;
                }
                dile-crud-select-all {
                    margin: 0.2rem 0.6rem 0.2rem 0;
                }
            }
        `
    ];

    static get properties() {
      return {
        config: { type: Object },
        elements: { type: Array },
        paginationData: { type: Object },
        numItems: { type: String },
        pageSize: { type: Number },
        keyword: { type: String },
        isSelectAllActive: { type: Boolean },
        loading: { type: Boolean },
        sort: { type: Object },
        actionIds: { type: Array },
        filters: { type: Array },
        belongsTo: { type: String },
        relationId: { type: String },
        
        /*
        idea es colocar todo lo que son datos de config que no cambiarán al usar el elemento
        config = {
          endpoint: string,
          filters: Array,
          belongsTo: String,
          relationId: String,
          customization: {
            hideCountSummary: false,
            hidePageReport: false,
            hideCheckboxSelection: false,
            hideEmptyInsertButton: false,
            disableInsert: false,
            disableEdit: false,
            disablePagination: false,
          },
          apiConfig = {
            responseDataProperty: 'data',
            responseMessageProperty: 'message',
            validationErrorsProperty: 'errors',
            getResultsListFromResponse: function // recibe lo que traes por ajax y te da el resultado
            getDataFromResponse: function // recibe lo que traes por ajax y te da la parte que te interesa para encontrar todos los datos, includo la páginación
          }
        }
        */
      };
    }

    constructor() {
        super();
        this.paginationData = {}
        this.elements = [];
        this.pageSize = 50;
        this.keyword = '';
        this.actionIds = [];
        this.filters = [];
        this.delayTime = 200;
        this.delayTimer = null;
        this.isSelectAllActive = false;
        this.loading = true;
    }

    firstUpdated() {
        this.refresh();
        this.createShadowDomRefs();
    }

    createShadowDomRefs() {
        this.ajaxget = this.shadowRoot.getElementById('ajaxget');
        this.ajaxgetallids = this.shadowRoot.getElementById('ajaxgetallids');
    }

    updated(changedProperties) {
        if (changedProperties.has('config') || changedProperties.has('relationId')) {
            this.refresh();
        }
    }

    itemTemplate(customer) {
        // Override
    }

    render() {
        return html`
            ${this.ajaxTemplate}

            ${this.countSummaryTemplate}

            ${this.filterListTemplate}

            ${this.loading 
                ? this.loadingTemplate 
                : this.elements.length == 0
                    ? this.emptyTemplate
                    : html`
                        ${this.elementsTemplate}
                        ${this.config.customization?.hidePageReport ? '' : this.paginationTemplate}
                    `
            }
        `;
    }

    get filterListTemplate() {
        return html`
            <dile-crud-filters-list
                keyword="${this.keyword}"
                .filters="${this.filters}"
            ></dile-crud-filters-list>
        `
    }

    get countSummaryTemplate() {
        return this.config.customization?.hideCountSummary ? '' : html`
            <div class="prev-summary">
                ${this.config.customization.hideCheckboxSelection
                  ? ''
                  : html`
                    <dile-crud-select-all 
                        @crud-select-all=${this.crudSelectAll}
                        pageSize=${this.pageSize}
                        numItems=${this.numItems}
                        ?disablePagination=${this.config.customization?.disablePagination}
                    ></dile-crud-select-all>
                  `
                }
                <span>
                    ${this.numItems} elementos en total. Mostrando ${this.pageSize} elementos por página.
                </span>
            </div>
        `
    }

    get loadingTemplate() {
        return html`
            <div class="loading">
                <dile-spinner active></dile-spinner>
            </div>
        `;
    }

    get ajaxTemplate() {
        return html`
            <dile-ajax
                id="ajaxget"
                method="get"
                url="${this.cleanUrl}"
                @ajax-success="${this.doSuccessGet}"
                @ajax-error="${this.doErrorGet}"
            ></dile-ajax>
            <dile-ajax
                id="ajaxgetallids"
                method="get"
                url="${this.allIdsUrl}"
                @ajax-success="${this.doSuccessGetIds}"
                @ajax-error="${this.doErrorGet}"
            ></dile-ajax>
        `;
    }
    get emptyTemplate() {
        return html`
            <div class="empty">
                <p>No hay elementos todavía</p>
                ${this.config.customization.disableInsert || this.config.customization?.hideEmptyInsertButton
                    ? ''
                    : html`<p><dile-button @click=${this.dispatchInsertRequest}>Insertar</dile-button></p>`
                }
                
            </div>
        `;
    }
    get elementsTemplate() {
        return html`
            ${this.elements.map(element => html`
                <dile-crud-list-item 
                    itemId="${this.computeItemId(element)}"
                    .actionIds="${this.actionIds}"
                    ?disableEdit="${this.config?.customization?.disableEdit}"
                    ?hideCheckboxSelection="${this.config?.customization?.hideCheckboxSelection}"
                    @item-checkbox-changed=${this.onItemsCheckboxChanged}
                >
                    ${this.config.itemTemplate(element)}
                </dile-crud-list-item>
            `)}
        `;
    }

    computeItemId(element) {
        return element.id;
    }

    get cleanUrl() {
        return `${this.config.endpoint}`;
    }

    get allIdsUrl() {
        return `${this.config.endpoint}/allids`;
    }

    get paginationTemplate() {
        if(! this.config.customization?.disablePagination) {
          return html`
            <dile-crud-list-pagination-links
                  .paginationData=${this.paginationData}
                  numItems="${this.numItems}"
                  pageSize="${this.pageSize}"
                  @crud-pagination-prev=${this.goPrev}
                  @crud-pagination-next=${this.goNext}
            ></dile-crud-list-pagination-links>
          `
        }
    } 

    dispatchInsertRequest() {
        this.dispatchEvent(new CustomEvent('insert-requested', {
            bubbles: true,
            composed: true,
        }));
    }

    

    doSuccessGet(e) {
        // console.log(this, 'do success get', e.detail);
        this.loading = false;
        this.elements = this.config.apiConfig.getResultsListFromResponse(e.detail);
        if(! this.config.customization?.disablePagination) {
          let data = this.config.apiConfig.getDataFromResponse(e.detail);
          console.log('pagination data creating', data);
          this.paginationData = {
            nextPage: data.result.next_page_url,
            prevPage: data.result.prev_page_url,
            currentPage: data.result.current_page,
          }
          this.numItems = data.countItems;
        } else {
          this.numItems = this.elements.length;
        }
    }

    doErrorGet(e) {
        store.dispatch(negativeFeedback(e.detail.message));
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

    refresh() {
        if(this.delayTimer) {
            clearTimeout(this.delayTimer);
        }
        this.delayTimer = setTimeout(() => this.doRefresh(), this.delayTime);
    }    

    doRefresh() {
        if (this.isSelectAllActive) {
            this.shadowRoot.querySelector('dile-crud-select-all').reset();
        } 
        this.delayTimer = null;
        let data = {
            per_page: this.pageSize,
            keyword: this.keyword,
            filters: this.filters,
        }
        if(this.sort && this.sort.sortField) {
            data.sortField = this.sort.sortField;
        }
        if(this.sort && this.sort.sortDirection) {
            data.sortDirection = this.sort.sortDirection;
        }
        if(this.belongsTo && this.relationId) {
            data.belongsTo = this.belongsTo;
            data.relationId = this.relationId;
        }
        this.ajaxget.data = data;
        this.ajaxget.generateRequest();
        this.loading = true;
    }

    setKeyword(keyword) {
        // console.log('setkeyword', keyword);
        this.keyword = keyword;
        this.ajaxget.url = this.cleanUrl;
        this.refresh();
    }

    setSort(sortObject) {
        // console.log('set SORT OBJECT');
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

    crudSelectAll(e) {
        console.log('crud select all en crud list', e.detail);
        this.isSelectAllActive = e.detail.pageChecked || e.detail.allChecked;
        if (e.detail.pageChecked) {
            this.dispactSelectAll(this.getPageIds());
        } else if (e.detail.allChecked) {
            this.getAllIds();
        } else if (!e.detail.pageChecked && !e.detail.allChecked) {
            this.dispactSelectAll([]);
        }
    }

    dispactSelectAll(ids) {
        this.actionIds = ids;
        console.log('dispactSelectAll', ids);
        this.dispatchEvent(new CustomEvent('crud-list-all-ids-selected', {
            bubbles: true,
            composed: true,
            detail: {
                ids
            }
        }));
    }

    getPageIds() {
        return this.elements.map(element => element.slug);
    }
    getAllIds() {
      if(this.config.customization?.disablePagination) {
        let ids = this.elements.map(item => item.id);
        this.dispactSelectAll(ids);
      } else{
        let data = {
            keyword: this.keyword,
            filters: this.filters,
        }
        if (this.belongsTo && this.relationId) {
            data.belongsTo = this.belongsTo;
            data.relationId = this.relationId;
        }
        // console.log(data);
        this.ajaxgetallids.data = data;
        this.ajaxgetallids.generateRequest();
      }
    }

    doSuccessGetIds(e) {
        this.dispactSelectAll(e.detail);
    }

    onItemsCheckboxChanged(e) {
        if (!e.detail.checked && this.isSelectAllActive) {
            this.shadowRoot.querySelector('dile-crud-select-all').resetWithoutDispatch();
        }
        
    }
}
