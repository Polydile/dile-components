import { html } from "lit";

export const DileCrudMixin = (superclass) => class extends superclass {

    get updateElement() {
        return this.shadowRoot.getElementById('updateElement');
    }
    get modalUpdate() {
        return this.shadowRoot.getElementById('modalUpdate');
    }

    // get listElement() {
    //     return this.shadowRoot.querySelector('dile-crud-list');
    // }
    // get insertElement() {
    //     return this.shadowRoot.getElementById('elinsert');
    // }
    // get deleteElement() {
    //     return this.shadowRoot.getElementById('eldelete');
    // }
    // get actionsElement() {
    //     return this.shadowRoot.getElementById('elactions');
    // }
    // get filtersElement() {
    //     return this.shadowRoot.getElementById('elfilters');
    // }
    
    // itemDeleteRequest(e) {
    //     this.deleteElement.delete(e.detail.itemId);
    // }

    get actionsTemplate() {
        return html`
            <dile-crud-actions
                @crud-action-success=${this.actionSuccess}
                class="action-controller"
                id="elactions"
                .actionIds=${this.actionIds}
                endpoint=${this.config.endpoint}
                .actions=${this.config.actions.list}
                .formActionsTemplate=${this.config.templates.formActions}
            ></dile-crud-actions>
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
                    .apiConfig=${this.config.api}
                    .formTemplate=${this.config.templates.updateForm}
                    actionLabel=${this.config.labels.updateAction}
                    formIdentifier="${this.config.formIds.updateForm}"
                    @crud-update-success="${this.modalUpdateSuccess}"
                ></dile-crud-update>
            </dile-modal>
        `
    }

    modalUpdateSuccess() {
        console.log('updatesuccess');
        setTimeout(() => this.updateElement.clearFeedback(), 1000);
        this.modalUpdate.close();
        this.refresh();
    }
}