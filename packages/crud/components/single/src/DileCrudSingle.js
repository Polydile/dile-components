import { LitElement, html, css } from 'lit';
import { formStyles } from '../../../styles/form-styles.js';
import '@dile/ui/components/button/button.js';
import '@dile/ui/components/select/select.js';
import '@dile/ui/components/modal/modal.js';
import { editIcon } from '@dile/icons';
import { DileCrudMixin } from '../../../lib/DileCrudMixin.js';
import '../../crud/crud.js';
import '../../detail/crud-detail.js';
import '../../update/crud-update.js';
import '../../action/crud-actions.js';
import '../../action/crud-delete-action.js';

export class DileCrudSingle extends DileCrudMixin(LitElement) {
  static styles = [
    formStyles,
    css`
      :host {
          display: block;
      }
      main.elcontainer {
          margin-bottom: 1.5rem;
      }
      .actions {
          background-color: var(--dile-primary-dark-color);
          padding: 0.5rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 0.5rem;
      }
      .action-controller {
          margin-left: 0.5rem;
      }
      .statscontainer {
          margin: 0 1rem;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
      relatedId: { type: String },
      element: { type: Object },
      actionIds: { type: Array },
    };
  }

  constructor() {
    super();
    this.actionIds = [];
  }

  firstUpdated() {
    super.firstUpdated();
    this.actionIds = [this.relatedId];
  }

  updated(changedProperties) {
    if (changedProperties.has('relatedId')) {
      this.actionIds = [this.relatedId];
    }
  }

  render() {
    return html`
      ${this.relatedId
        ? this.contentTemplate
        : ''
      }
    `
  }

  get contentTemplate() {
    return html`
      <main class="elcontainer">
        ${this.detailTemplate}
        <div class="actions" @action-success=${this.actionSuccess}>
            <dile-button gray .icon="${editIcon}" @click=${this.edit}>Editar</dile-button>
            ${this.actionsTemplate}
        </div>
      </main>

      ${this.updateTemplate}
      ${this.detailActionsTemplate}
      
      ${this.config.templates.relations(this.element)}
    `;
  }

  get detailTemplate() {
    return html`
      <dile-crud-detail
        id="eldetail"
        endpoint="${this.config.endpoint}/${this.relatedId}"
        .itemDetailTemplate=${this.config.templates.detail}
        .apiConfig=${this.config.api}
        @crud-item-detail-loaded=${this.elementLoaded}
      ></dile-crud-detail>
    `
  }

  get detailElement() {
    return this.shadowRoot.getElementById('eldetail');
  }

  // get relationsTemplate() {
  //   // override
  // }
  // get detailActionsTemplate() {
  //   // override
  // }
  // get statsTemplate() {
  //   // override
  // }

  refresh() {
    this.detailElement.refresh();
  }

  elementLoaded(e) {
    console.log('elementloaded');
    this.element = this.config.api.elementGetter(e.detail);
  }


  edit() {
    this.updateElement.edit(this.relatedId);
    this.modalUpdate.open();
  }

  
}