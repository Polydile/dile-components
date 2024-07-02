
export const DileCrudMixin = (superclass) => class extends superclass {

    get updateElement() {
        return this.shadowRoot.getElementById('elupdate');
    }
    get listElement() {
        return this.shadowRoot.querySelector('dile-crud-list');
    }
    get insertElement() {
        return this.shadowRoot.getElementById('elinsert');
    }
    get deleteElement() {
        return this.shadowRoot.getElementById('eldelete');
    }
    get actionsElement() {
        return this.shadowRoot.getElementById('elactions');
    }
    get filtersElement() {
        return this.shadowRoot.getElementById('elfilters');
    }
    
    itemDeleteRequest(e) {
        this.deleteElement.delete(e.detail.itemId);
    }

    breadcrumbNavigate(e) {
        this.navigateTo(e.detail.name);
    }
}