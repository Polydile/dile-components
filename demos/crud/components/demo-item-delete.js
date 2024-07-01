import { LitElement, html, css } from 'lit';
import '@dile/crud/components/item-delete/crud-item-delete';
import '@dile/ui/components/toast/toast';

export class DemoItemDelete extends LitElement {
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
    };
  }

  constructor() {
    super();
    this.config = {
      endpoint: 'api/countries',
      filters: [],
      itemTemplate: (country) => html`<demo-country-item .country=${country}></demo-country-item>`,
      customization: {
        hideCountSummary: false,
        hidePageReport: false,
        hideCheckboxSelection: true,
        hideEmptyInsertButton: false,
        disableInsert: false,
        disableEdit: true,
        disableDelete: false,
        disablePagination: true,
      },
      apiConfig: {
        responseDataProperty: 'data',
        responseMessageProperty: 'message',
        validationErrorsProperty: 'errors',
        getResultsListFromResponse(results) {
          return results.data;
        }
      }
    }
  }

  render() {
    return html`
        <dile-crud-item-delete
          id="cruddelete"
          @delete-error=${this.deleteError}
          @delete-success=${this.deleteSuccess}
          responseMessageProperty="message"
          endpoint="api/countries"
        ></dile-crud-item-delete>
        <dile-crud-list
          id="ellist"
          .config="${this.config}"
          @crud-item-delete=${this.deleteItem}
        ></dile-crud-list>
        <dile-toast id="feedback"></dile-toast>
          `;
  }

  get feedback() {
    return this.shadowRoot.getElementById('feedback');
  }
  get list() {
    return this.shadowRoot.getElementById('ellist');
  }

  deleteItem(e) {
    console.log('requested delete', e.detail);
    let deleteElement = this.shadowRoot.getElementById('cruddelete');
    deleteElement.delete(e.detail.itemId);
  }

  deleteError(e) {
    this.feedback.open(e.detail.msg, 'error');
  }

  deleteSuccess(e) {
    this.feedback.open('Success deleted', 'success');
    this.list.refresh();
  }
}
customElements.define('demo-item-delete', DemoItemDelete);