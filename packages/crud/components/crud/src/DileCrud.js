import { LitElement, html, css } from 'lit';
import '@dile/ui/components/input/input-search.js';
import '@dile/ui/components/nav/nav.js';
import '@dile/ui/components/select/select.js';
import '@dile/ui/components/modal/modal.js';
import '@dile/ui/components/modal/modal-help.js';
import '../../item-delete/crud-item-delete.js';
import '../../list/crud-list.js';
import '../../ui/crud-sort-form.js';
import '../../ui/crud-page-size.js';
import '../../ui/crud-filters.js';
import '../../insert/crud-insert.js';
import '../../update/crud-update.js';
import '../../action/crud-actions.js';
import '../../action/crud-delete-action.js';
import { formStyles } from '../../../styles/form-styles.js';
import { DileCrudMixin } from '../../../lib/DileCrudMixin.js';
import { crudStyles } from '../../../styles/crud-styles.js';
import { addIcon } from '@dile/icons';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileCrud extends DileI18nMixin(DileCrudMixin(LitElement)) {
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
        title: { type: String },
        config: { type: Object },
        actionIds: { type: Array },
        keyword: { type: String },
        belongsTo: { type: String },
        relationId: { type: String },
      };
    }

    constructor() {
        super();
        this.actionIds = [];
    }

    // GETTERS ELEMENTOS
    get modalInsert() {
        return this.shadowRoot.getElementById('modalInsert');
    }
    get listElement() {
        return this.shadowRoot.querySelector('dile-crud-list');
    }
    get deleteElement() {
        return this.shadowRoot.getElementById('eldelete');
    }
    get filtersElement() {
        return this.shadowRoot.getElementById('elfilters');
    }

    // TEMPLATES

    render() {
        return html`
            <header>
                ${this.title 
                    ? html`<h1 class="main-crud-title">${this.title}</h1>`
                    : ''
                }
                ${this.config.customization.disableInsert ? '' : this.insertButtomTemplate}
                ${this.config.customization.disableKeywordSearch ? '' : html`<dile-input-search @dile-input-search=${this.keywordChanged}></dile-input-search>`}
            </header>

            <main>
                ${this.navActionsTemplate}
                <div
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
                language="${this.language}"
            ></dile-crud-item-delete>

            ${this.insertTemplate}
            ${this.updateTemplate}
        `;
    }

    get insertButtomTemplate() {
        return html`
            <div class="insertButtonContainer">
                <dile-button-icon @click="${this.openInsert}" .icon="${addIcon}">
                    ${this.insertLabelComputed(this.config.labels.insertAction, this.translations)}
                </dile-button-icon>
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
                    title=${this.insertLabelComputed(this.config.labels.insertWindowTitle, this.translations)}
                    endpoint="${this.config.endpoint}"
                    .responseAdapter=${this.config.responseAdapter}
                    .formTemplate=${this.config.templates.insertForm}
                    actionLabel=${this.insertLabelComputed(this.config.labels.insertAction, this.translations)}
                    formIdentifier="${this.config.formIds.insertForm}"
                    @crud-insert-success="${this.modalInsertSuccess}"
                    belongsTo=${this.belongsTo}
                    relationId=${this.relationId}
                ></dile-crud-insert>
            </dile-modal>
        `
    }

    get listTemplate() {
        return html`
            <dile-crud-list
                .config=${this.config}
                @crud-item-edit=${this.updateRequest}
                @crud-item-delete=${this.itemDeleteRequest}
                @insert-requested=${this.openInsert}
                .actionIds=${this.actionIds}
                belongsTo=${this.belongsTo}
                relationId=${this.relationId}
                language="${this.language}"
            ></dile-crud-list>
        `
    }
    get helpTemplate() {
        return html`
            <dile-modal-help 
                title="${this.helpLabelComputed(this.config.labels.helpTitle, this.translations)}"
                label="${this.helpLabelComputed(this.config.labels.helpButtonLabel, this.translations)}"
            >${this.config.templates.help()}</dile-modal-help>`
    }

    get navActionsTemplate() {
        return html`
            ${this.disableAllActionFunctionalities 
                ? ''
                : html`
                <dile-nav>
                    ${this.config.customization.disableHelp
                        ? ''
                        : html`<div slot="menu">${this.helpTemplate}</div>`
                    }
                    <div class="actions" slot="actions">
                        ${this.actionsTemplate}
                        ${this.config.customization.disableFilter
                            ? ''
                            : html`
                                <dile-crud-filters
                                    class="action-controller" 
                                    id="elfilters"
                                    @filters-changed=${this.filtersChanged}
                                    .filters=${this.config.availableFilters || []}
                                    language="${this.language}"
                                ></dile-crud-filters>
                            `
                        }
                        ${this.config.customization.disablePagination
                            ? ''
                            : html`
                                <dile-crud-page-size 
                                    class="action-controller" 
                                    @page-size-changed=${this.pageSizeChanged}
                                    .pageSizes=${this.config.pageSize.available || [10, 25, 50]}
                                    pageSize="${this.config.pageSize.initial}"
                                    language="${this.language}"
                                ></dile-crud-page-size>
                            `
                        } 
                        ${this.config.customization.disableSort
                            ? ''
                            : html`
                                <dile-crud-sort-form 
                                    class="action-controller"
                                    .sortOptions=${this.config.sort.options || []} 
                                    sortField="${this.config.sort.initialSortField}"
                                    sortDirection="${this.config.sort.initialSortDirection || 'desc'}"
                                    @sort-changed=${this.sortFormChanged}
                                    language="${this.language}"
                                ></dile-crud-sort-form>  
                            `
                        }
                    </div>   
                </dile-nav>
            `
          }
        `
    }

    get disableAllActionFunctionalities() {
        const customization = this.config.customization;
        return customization.disableHelp 
            && customization.disableFilter 
            && customization.disablePagination
            && customization.disableSort
            && customization.hideCheckboxSelection;
    }
    // BEHAVIOURS

    openInsert() {
        this.dispatchEvent(new CustomEvent('crud-item-insert', { bubbles: true, composed: true }));
        if (this.config.insertOperation?.type === 'modal') {
            this.modalInsert.open();
        } else if (this.config.insertOperation?.type == 'handler') {
            this.config.insertOperation.handler(this);
        }          
    }

    insertSaveSuccess() {
        this.refresh();
    }

    updateRequest(e) {
        const itemId = e.detail.itemId;
        if (this.config.updateOperation?.type === 'modal') {
            this.editItem(itemId);
            this.modalUpdate.open();
        } else if (this.config.updateOperation?.type == 'handler') {
            this.config.updateOperation.handler(itemId, this);
        }        
    }

    editItem(id) {
        this.updateElement.edit(id);
    }

    keywordChanged(e) {
        this.setKeyword(e.detail.keyword);
    }

    setKeyword(keyword) {
        this.listElement.setKeyword(keyword);
    }

    sortFormChanged(e) {
        this.listElement.setSort(e.detail);
    }

    pageSizeChanged(e) {
        this.listElement.setPageSize(e.detail.pageSize);
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
    }

    actionSuccess(e) {
        if (e.detail.action === 'DeleteAction') {
            this.removeActionItems(e.detail.data.delete_elems);
        }
        this.refresh();
        if(this.config.onActionListSuccess) {
            const handler = this.config.onActionListSuccess.bind(this);
            handler(e.detail);
        }
    }

    removeActionItems(idsArray) {
        idsArray.forEach(item => this.detachActionId(item));
    }

    filtersChanged(e) {
        this.listElement.setFilters(e.detail.filters);
    }

    removeFilter(e) {
        if(e.detail.name == 'keyword') {
            this.shadowRoot.querySelector('dile-input-search').clear();
        } else {
            this.filtersElement.removeFilter(e.detail.name);
        }
    }

    crudSelectAll(e) {
        this.actionIds = e.detail.ids;
    }

    itemDeleteRequest(e) {
        this.deleteElement.delete(e.detail.itemId)
    }

    // SUCCESS HANDLERS
    modalInsertSuccess() {
        this.modalInsert.close();
        this.refresh();
    }

    deleteSuccess() {
        this.refresh();
    }

    refresh() {
        this.listElement.refresh();
    }
}
