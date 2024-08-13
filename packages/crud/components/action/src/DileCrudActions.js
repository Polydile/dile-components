import { LitElement, html, css } from 'lit';
import { moreVertIcon } from '@dile/icons';
import '@dile/ui/components/confirm/confirm';
import '@dile/ui/components/select/select';
import '../../ajax/ajax.js'
import '../../ui/crud-list-options.js';

export class DileCrudActions extends LitElement {
  static styles = css`
        :host {
            display: block;
            --dile-modal-border-radius: 2px;
            --dile-modal-width: 100vw;
            --dile-modal-height: 100vh;
            --dile-modal-content-padding: 1.5rem;
            --dile-modal-background-color: rgba(0, 0, 0, 0.5);
            --dile-modal-content-shadow-color: rgba(0, 0, 0, 0.5);
            --dile-confirm-accept-button-color: var(--dile-primary-color, #378dca);
            --dile-confirm-accept-text-button-color: var(--dile-on-primary-color, #fff);
            --dile-confirm-cancel-button-color: var(--dile-danger-color, #E31E1B);
            --dile-confirm-cancel-text-button-color: var(--dile-on-danger-color, #fff);
        }
        p {
          margin: 0 0 0.75rem 0;
        }
        .visible {
            display: block;
        }
        .hide {
            display: none;
        }
        .modalcontainer {
            color: #303030;
        }
        @media(min-width: 400px) {
            :host {
                --dile-modal-width: 90%;
                --dile-modal-height: 90%;
            }
        }
        @media(min-width: 500px) {
            :host {
                --dile-modal-width: 80%;
                --dile-modal-height: 80%;
            }
        }
    `;

  static get properties() {
    return {
      actionIds: { type: Array },
      selection: { type: String },
      endpoint: { type: String },
      actions: { type: Array },
      formActionsTemplate: { type: Object },
    };
  }

  constructor() {
    super();
    this.actionIds = [];
    this.actions = [];
    this.selection = 'DeleteAction'
  }

  firstUpdated() {
    this.confirmElement = this.shadowRoot.getElementById('elconfirm');
    this.ajaxAction = this.shadowRoot.getElementById('ajaxaction');
  }

  render() {
    return html`
        ${this.ajaxTemplate}
        ${this.actionListTemplate}
        ${this.confirmActionTemplate}
        `;
  }

  get ajaxTemplate() {
    return html`
        <dile-ajax
            id="ajaxaction"
            method="post"
            url="${this.endpoint}/action"
            @ajax-success="${this.doSuccessAction}"
            @ajax-error="${this.doErrorAction}"
        ></dile-ajax>
    `;
  }

  get actionListTemplate() {
    return html`
            <dile-crud-list-options .icon="${moreVertIcon}" label="Acciones" class="${this.actionIds.length > 0 ? 'visible' : 'hide'}">
                <p>${this.actionIds.length} ${this.actionIds.length == 1 ? 'elemento' : 'elementos'}</p>
                <div @element-changed=${this.selectorChanged}>
                    ${this.selectActionsTemplate}
                </div>
                <dile-button @click=${this.showAction}>Realizar acción</dile-button>
            </dile-crud-list-options>
        `;
  }

  get selectActionsTemplate() {
    return html`
      <dile-select>
          <select slot="select">
              ${this.actions.map(action => html`<option value="${action.name}">${action.label}</option>`)}
          </select>
      </dile-select>
    `
  }

  get confirmActionTemplate() {
    return html`
            <dile-confirm 
                id="elconfirm"
                cancelLabel="Cancelar"
                acceptLabel="Aceptar"
                @dile-confirm-accepted=${this.doAction}
            >
                <div class="modalcontainer">
                    ${this.formActionsTemplate(this.selection)}
                </div>
            </dile-confirm>
        `;
  }

  setActionIds(items) {
    this.actionIds = items;
  }

  selectorChanged(e) {
    this.selection = e.target.value;
  }

  showAction() {
    this.confirmElement.open();
    this.shadowRoot.querySelector('dile-crud-list-options').close()
  }

  get selectedActionForm() {
    return this.shadowRoot.querySelector(`[action="${this.selection}"]`)
  }

  doAction() {
    let actionData = this.selectedActionForm.getData();
    this.ajaxAction.data = {
      type: this.selection,
      relatedIds: this.actionIds,
      data: actionData,
    };
    this.ajaxAction.generateRequest();
  }

  doSuccessAction(e) {
    console.log('doSuccessAction', e.detail);
    this.selectedActionForm.resetData();
    this.dispatchEvent(new CustomEvent('crud-action-success', {
      bubbles: true,
      composed: true,
      detail: {
        msg: e.detail.message,
        action: e.detail.data.action,
        data: e.detail.data.data,
      }
    }));
  }

  doErrorAction(e) {
    this.dispatchEvent(new CustomEvent('crud-action-error', {
      bubbles: true,
      composed: true,
      detail: {
        msg: e.detail,
      }
    }));
  }

}
