import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../redux/store.js';
import { formStyles } from './form-styles.js';
import '../crud/fct-crud-sort-form';
import '../crud/fct-crud-page-size';
import '@dile/ui/components/input/input-search';
import './fct-crud-item-delete';
import './fct-crud-filters';
import { CrudMixin } from './crud-mixin.js';
import { crudPageStyles } from './crud-page-styles.js';
import { breadcrumbsStyles } from './breadcrumbs-styles.js';

export class DileCrud extends CrudMixin(connect(store)(LitElement)) {
    static styles = [
        formStyles,
        breadcrumbsStyles,
        crudPageStyles,
        css`
            :host {
                display: block;
                --dile-nav-padding-y: 0.4rem;
                --dile-nav-padding-x: 0.8rem;
                --dile-nav-background-color: var(--secondary-light-color) ;
            }
            header {
                display: grid;
                grid-template-columns: 1fr auto;
                column-gap: 1rem;
                row-gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            dile-input-search {
                grid-column-start: 1;
                grid-column-end: 3;
            }
            .actions {
                display: flex;
            }
            .action-controller {
                margin-right: 0.5rem;
            }
            .action-controller:last-child {
                margin-right: 0;
            }
            .simplecard {
                --dile-card-box-shadow: none;
                --dile-card-border: none;
                margin: 0.7rem;
            }
            @media(min-width: 400px) {
                .simplecard {
                    --dile-card-border: none;
                    margin: 1rem;
                }   
            }
            @media(min-width: 500px) {
                .simplecard {
                    margin: 1.2rem 0.5rem;
                }
            }
            @media(min-width: 500px) {
                .simplecard {
                    margin: 1rem 0rem;
                }
            }
        `
    ];

    static get properties() {
      return {
        sortOptions: { type: String },
        title: { type: String },
        endpoint: { type: String },
        actionIds: { type: Array },
        belongsTo: { type: String },
        relationId: { type: String },
        disableInsert: { type: Boolean },
        disableUpdate: { type: Boolean },
        /** Cuando el crud se muestra dentro de una página como las facturas en la página del cliente */
        insideOfPage: { type: Boolean },
        hasHelp: { type: Boolean },
        editUrl: { type: Boolean },
      };
    }

    constructor() {
        super();
        this.actionIds = [];
        this.disableInsert = false;
        this.disableUpdate = false;
    }

    get breadcrumbTemplate() {
        // Overwirte
    }
    get insertTemplate() {
        // Overwirte
    }
    get listTemplate() {
        // Overwirte
    }
    get updateTemplate() {
        // Overwirte
    }
    get actionsTemplate() {
        // Overwirte
    }
    get helpTemplate() {
        // Override
    }

    render() {
        return html`
            ${this.endpoint === undefined 
                ? '' 
                : html `
                    ${this.insideOfPage
                       ? this.simpleTemplate
                       : this.completeTemplate        
                    }
                `
            }
        `;
    }
    
    get completeTemplate() {
        return html`
            ${this.breadcrumbTemplate}
            <div class="elcontainer">
                ${this.crudTemplate}
            </div>
        `;
    }

    get simpleTemplate() {
        return html`
            <dile-card class="simplecard">
                ${this.crudTemplate}
            </dile-card>
        `;
    }


    get crudTemplate() {
        return html`
            
            <header>
                <h1 class="main-crud-title">${this.title}</h1>
                ${this.disableInsert ? '' : this.insertTemplate}
                <dile-input-search @dile-input-search=${this.keywordChanged}></dile-input-search>
            </header>

            <main>
                ${this.navActionsTemplate}
                <div
                    @item-delete=${this.itemDeleteRequest}
                    @item-edit=${this.itemEditRequest}
                    @insert-requested=${this.doInsert}
                    @item-checkbox-changed=${this.itemCheckboxChanged}
                    @dile-chip-icon-click=${this.removeFilter}
                    @crud-list-all-ids-selected=${this.crudSelectAll}
                >
                    ${this.listTemplate}
                </div>
            </main>
            
            ${this.disableUpdate ? '' : this.updateTemplate}

            <fct-crud-item-delete 
                id="eldelete"
                endpoint="${this.endpoint}"
                @delete-success=${this.deleteSuccess}
            ></fct-crud-item-delete>
        `;
    }

    get navActionsTemplate() {
        return html`
            <dile-nav>
                ${this.hasHelp
                    ? html`<div slot="menu">${this.helpTemplate}</div>`
                    : ''
                }
                <div class="actions" slot="actions" @action-success=${this.actionSuccess}>
                    ${this.actionsTemplate}
                    <fct-crud-filters
                        class="action-controller" 
                        id="elfilters"
                        @filters-changed=${this.filtersChanged}
                        .filters=${this.filters}
                    ></fct-crud-filters>
                    <fct-crud-page-size 
                        class="action-controller" 
                        @page-size-changed=${this.pageSizeChanged}
                    ></fct-crud-page-size>
                    <fct-crud-sort-form 
                        class="action-controller"
                        .sortOptions=${this.sortOptions} 
                        sortField="created"
                        sortDirection="desc"
                        @sort-changed=${this.sortFormChanged}
                    ></fct-crud-sort-form>  
                </div>   
            </dile-nav>
        `
    }
 
    doInsert() {
        if(this.insertUrl()) {
            window.location = this.insertUrl();
        }
    }

    insertSaveSuccess() {
        this.listElement.refresh();
    }

    itemEditRequest(e) {
        console.log('itemEditRequest', e.detail);
        window.location = `${this.editUrl}/${e.detail.itemId}`;
        // if (this.pageEdit) {
        //     this.navigateTo(this.pageEdit(e.detail.itemId));
        // } else {
        //     this.updateElement.edit(e.detail.itemId);
        // }
    }

    keywordChanged(e) {
        this.listElement.setKeyword(e.detail.keyword);
    }

    sortFormChanged(e) {
        this.listElement.setSort(e.detail);
    }

    pageSizeChanged(e) {
        this.listElement.setPageSize(e.detail.pageSize);
    }

    updateSuccess() {
        this.updateElement.close();
        this.listElement.refresh();
    }
    deleteSuccess() {
        this.listElement.refresh();
    }

    itemCheckboxChanged(e) {
        if(e.detail.checked) {
            this.attachActionId(e.detail.itemId);
        } else {
            this.detachActionId(e.detail.itemId);
        }
    }

    attachActionId(id) {
        if(! this.actionIds.includes(id)) {
            this.actionIds = [
                ...this.actionIds,
                id
            ];
        }
    }

    detachActionId(id) {
        if(this.actionIds.includes(id)) {
            this.actionIds.splice(this.actionIds.indexOf(id), 1);
            this.count = this.actionIds.length;
        }
        this.actionIds = [...this.actionIds]
        //this.actionsElement.setActionIds(this.actionIds);
    }

    actionSuccess(e) {
        if (e.detail.action === 'DeleteAction') {
            this.removeActionItems(e.detail.data.delete_elems);
        }
        this.listElement.refresh();
    }

    removeActionItems(elems) {
        // console.log('removeActionItems', elems);
        elems.forEach(item => this.detachActionId(item));
    }

    filtersChanged(e) {
        this.listElement.setFilters(e.detail.filters);
    }

    removeFilter(e) {
        // console.log('removefilter', e.detail)
        if(e.detail.name == 'keyword') {
            this.shadowRoot.querySelector('dile-input-search').clear();
        } else {
            this.filtersElement.removeFilter(e.detail.name);
        }
    }

    crudSelectAll(e) {
        // console.log('crud select all en fct-crud', e.detail);
        this.actionIds = e.detail.ids;
    }
}
