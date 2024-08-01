import { LitElement, html, css } from 'lit';
import '@dile/ui/components/input/input-search';
import '@dile/ui/components/nav/nav';
import '@dile/ui/components/modal/modal';
import '../../item-delete/crud-item-delete.js';
import '../../list/crud-list.js';
import '../../ui/crud-sort-form.js';
import '../../ui/crud-page-size.js';
import '../../ui/crud-filters.js';
import '../../insert/crud-insert.js';
import '../../update/crud-update.js';
import { formStyles } from '../../../styles/form-styles.js';
import { DileCrudMixin } from '../../../lib/DileCrudMixin.js';
import { deepMerge } from '../../../lib/deepMerge.js';
import { crudStyles } from '../../../styles/crud-styles.js';
import { addIcon } from '@dile/icons';

export class DileCrud extends DileCrudMixin(LitElement) {
    static styles = [
        formStyles,
        crudStyles,
        css`
            :host {
                display: block;
                --dile-nav-padding-y: 0.4rem;
                --dile-nav-padding-x: 0.8rem;
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
            .insertButtonContainer {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 0.5rem;
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
        config: { type: Object },
        actionIds: { type: Array },
        keyword: { type: String },
        /** Cuando el crud se muestra dentro de una página como las facturas en la página del cliente */
        hasHelp: { type: Boolean },
        editUrl: { type: Boolean },
        loading: { type: Boolean },
      };

      /*
        idea es colocar todo lo que son datos de config que no cambiarán al usar el elemento
        config = {
          title: string,
          endpoint: string,
          belongsTo: String,
          relationId: String,
          sortOptions: Array,
          initialSortField: string,
          initialSortDirection: string
          filters: Array,
          availablePageSizes: Array,
          pageSize: number,
          itemTemplate: (country) => html`<demo-country-item .country=${country}></demo-country-item>`,
          insertForm: () => html`<demo-countries-form id="insertform"></demo-countries-form>`,
          updateForm: () => html`<demo-countries-form id="updateform"></demo-countries-form>`,
          customization: {
            hideCountSummary: false,
            hidePageReport: false,
            hideCheckboxSelection: false,
            hideEmptyInsertButton: false,
            disableInsert: false,
            disableEdit: false,
            disableDelete: false,
            disablePagination: false,
            disableSort: false,
            disableFilter: false,
          },
          labels: {
             insertAction: 'Insert country',
             updateAction: 'Save',
             insertWindowTitle: 'Insert a country',
             updateWindowTitle: 'Update a country',
          }, 
          apiConfig = {
            responseDataProperty: 'data',
            responseMessageProperty: 'message',
            validationErrorsProperty: 'errors',
            getResultsListFromResponse: function // recibe lo que traes por ajax y te da el resultado
            getDataFromResponse: function // recibe lo que traes por ajax y te da la parte que te interesa para encontrar todos los datos, includo la páginación
          },
          formIds: {
            insertForm: 'insertform',
            updateForm: 'updateform',
          }
        }
        */
    }

    constructor() {
        super();
        this.loading = true;
        this.actionIds = [];
        this.defaultConfig = {
            labels: {
                insertAction: 'Create'
            },
            formIds: {
                insertForm: 'insertform',
                updateForm: 'updateform'
            }
        }
    }

    firstUpdated() {
        this.config = deepMerge(this.defaultConfig, this.config);
        console.log(this.config);
        this.loading = false;
    }

    // GETTERS ELEMENTOS
    get modalInsert() {
        return this.shadowRoot.getElementById('modalInsert');
    }
    get modalUpdate() {
        return this.shadowRoot.getElementById('modalUpdate');
    }
    get updateElement() {
        return this.shadowRoot.getElementById('updateElement');
    }
    get listElement() {
        return this.shadowRoot.querySelector('dile-crud-list');
    }
    get deleteElement() {
        return this.shadowRoot.getElementById('eldelete');
    }

    // TEMPLATES

    render() {
        if(!this.loading) {
            return html`
                <header>
                    ${this.config.title 
                        ? html`<h1 class="main-crud-title">${this.title}</h1>`
                        : ''
                    }
                    ${this.config.customization.disableInsert ? '' : this.insertButtomTemplate}
                    <dile-input-search @dile-input-search=${this.keywordChanged}></dile-input-search>
                </header>

                <main>
                    ${this.navActionsTemplate}
                    <div
                        @crud-item-delete=${this.itemDeleteRequest}
                        @insert-requested=${this.doInsert}
                        @item-checkbox-changed=${this.itemCheckboxChanged}
                        @dile-chip-icon-click=${this.removeFilter}
                        @crud-list-all-ids-selected=${this.crudSelectAll}
                    >
                        ${this.listTemplate}
                    </div>
                </main>
                
                ${this.config.customization.disableUpdate ? '' : this.updateTemplate}

                <dile-crud-item-delete 
                    id="eldelete"
                    endpoint="${this.config.endpoint}"
                    @delete-success=${this.deleteSuccess}
                ></dile-crud-item-delete>

                ${this.insertTemplate}
                ${this.updateTemplate}
            `;
        }
    }

    get insertButtomTemplate() {
        return html`
            <div class="insertButtonContainer">
                <dile-button-icon @click="${this.openInsert}" .icon="${addIcon}">${this.config.labels.insertAction}</dile-button-icon>
            </div>
        `
    }

    get insertTemplate() {
        return html`
            <dile-modal 
                id="modalInsert"
                showCloseIcon
                blocking
            >
                <dile-crud-insert
                    title=${this.config.labels.insertWindowTitle}
                    endpoint="${this.config.endpoint}"
                    .apiConfig=${this.config.apiConfig}
                    .formTemplate=${this.config.insertForm()}
                    actionLabel=${this.config.labels.insertAction}
                    formIdentifier="${this.config.formIds.insertForm}"
                    @crud-insert-success="${this.modalInsertSuccess}"
                ></dile-crud-insert>
            </dile-modal>
        `
    }

    get updateTemplate() {
        return html`
            <dile-modal 
                id="modalUpdate"
                showCloseIcon
                blocking
            >
                <dile-crud-update
                    id="updateElement"
                    title=${this.config.labels.updateWindowTitle}
                    endpoint="${this.config.endpoint}"
                    .apiConfig=${this.config.apiConfig}
                    .formTemplate=${this.config.updateForm()}
                    actionLabel=${this.config.labels.updateAction}
                    formIdentifier="${this.config.formIds.updateForm}"
                    @crud-update-success="${this.modalUpdateSuccess}"
                ></dile-crud-update>
            </dile-modal>
        `
    }

    get listTemplate() {
        return html`
            <dile-crud-list
                .config=${this.config}
                @crud-item-edit=${this.updateRequest}
            ></dile-crud-list>
        `
    }
    get actionsTemplate() {
        // Overwirte
    }
    get helpTemplate() {
        // Override
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
                    ${this.config.customization.disableFilter
                        ? ''
                        : html`
                            <dile-crud-filters
                                class="action-controller" 
                                id="elfilters"
                                @filters-changed=${this.filtersChanged}
                                .filters=${this.config.filters || []}
                            ></dile-crud-filters>
                        `
                    }
                    ${this.config.customization.disablePagination
                        ? ''
                        : html`
                            <dile-crud-page-size 
                                class="action-controller" 
                                @page-size-changed=${this.pageSizeChanged}
                                .pageSizes=${this.config.availablePageSizes || [10, 25, 50]}
                                pageSize="${this.config.pageSize}"
                            ></dile-crud-page-size>
                        `
                    } 
                    ${this.config.customization.disableSort
                        ? ''
                        : html`
                            <dile-crud-sort-form 
                                class="action-controller"
                                .sortOptions=${this.config.sortOptions || []} 
                                sortField="${this.config.initialSortField}"
                                sortDirection="${this.config.initialSortDirection || 'desc'}"
                                @sort-changed=${this.sortFormChanged}
                            ></dile-crud-sort-form>  
                        `
                    }
                </div>   
            </dile-nav>
        `
    }

    // BEHAVIOURS

    openInsert() {
        this.modalInsert.open();
    }

    insertSaveSuccess() {
        this.listElement.refresh();
    }

    updateRequest(e) {
        console.log('itemEditRequest en crud', e.detail, this.updateElement);
        this.updateElement.edit(e.detail.itemId);
        this.modalUpdate.open();
    }

    keywordChanged(e) {
        console.log('keywordChanged');
        this.listElement.setKeyword(e.detail.keyword);
    }

    sortFormChanged(e) {
        console.log('sortFormChanged');
        this.listElement.setSort(e.detail);
    }

    pageSizeChanged(e) {
        console.log('pageSizeChanged');
        this.listElement.setPageSize(e.detail.pageSize);
    }

    itemCheckboxChanged(e) {
        console.log('itemboxchanged');
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
        // console.log('crud select all en dile-crud', e.detail);
        this.actionIds = e.detail.ids;
    }

    itemDeleteRequest(e) {
        console.log('itemDeleteRequest', e.detail);
        this.deleteElement.delete(e.detail.itemId)
    }

    // SUCCESS HANDLERS
    modalInsertSuccess() {
        this.modalInsert.close();
        this.listElement.refresh();
    }
    modalUpdateSuccess() {
        console.log('updatesuccess');
        setTimeout( () => this.updateElement.clearFeedback(), 1000);
        this.modalUpdate.close();
        this.listElement.refresh();
    }
    deleteSuccess() {
        this.listElement.refresh();
    }
}
