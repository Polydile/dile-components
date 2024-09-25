import { html } from "lit";

export const DileCrudMixin = (superclass) => class extends superclass {

    get updateElement() {
        return this.shadowRoot.getElementById('updateElement');
    }
    get modalUpdate() {
        return this.shadowRoot.getElementById('modalUpdate');
    }

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
                language="${this.language}"
                .responseAdapter=${this.config.responseAdapter}
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
                    title="${this.updateLabelComputed(this.config.labels.updateWindowTitle, this.translations)}"
                    endpoint="${this.config.endpoint}"
                    .responseAdapter=${this.config.responseAdapter}
                    .formTemplate=${this.config.templates.updateForm}
                    actionLabel="${this.updateLabelComputed(this.config.labels.updateAction, this.translations)}"
                    formIdentifier="${this.config.formIds.updateForm}"
                    @crud-update-success="${this.modalUpdateSuccess}"
                ></dile-crud-update>
            </dile-modal>
        `
    }

    modalUpdateSuccess() {
        setTimeout(() => this.updateElement.clearFeedback(), 1000);
        this.modalUpdate.close();
        this.refresh();
    }

    insertLabelComputed(label, translations) {
        return label ? label : translations?.insert_label ? translations.insert_label : 'Insert';
    }
    updateLabelComputed(label, translations) {
        return label ? label : translations?.update_label ? translations.update_label : 'Save';
    }
    startUpdateLabelComputed(label, translations) {
        return label ? label : translations?.start_update_label ? translations.start_update_label : 'Edit';
    }
    helpLabelComputed(label, translations) {
        return label ? label : translations?.help_label ? translations.help_label : 'Help';
    }
    
}