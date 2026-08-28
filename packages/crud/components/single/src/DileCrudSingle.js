import { LitElement, html, css } from 'lit';
import { formStyles } from '../../../styles/form-styles.js';
import '@dile/ui/components/button/button.js';
import '@dile/ui/components/select/select.js';
import '@dile/ui/components/modal/modal.js';
import '@dile/ui/components/pages/pages.js';
import { editIcon } from '@dile/icons';
import { DileCrudMixin } from '../../../lib/DileCrudMixin.js';
import '../../crud/crud.js';
import '../../detail/crud-detail.js';
import '../../update/crud-update.js';
import '../../action/crud-actions.js';
import '../../action/crud-single-actions.js';
import '../../action/crud-delete-action.js';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';
import { crudStyles } from '../../../styles/crud-styles.js';

export class DileCrudSingle extends DileI18nMixin(DileCrudMixin(LitElement)) {
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
          background-color: var(--dile-primary-dark-color, #d7d353);
          padding: 0.5rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 0.5rem;
      }
      .action-controller {
          margin-left: 0.5rem;
      }
      dile-button.action-controller {
        --dile-button-background-color: var(--dile-crud-direct-action-background-color, var(--dile-button-background-color, var(--dile-primary-color, #7BB93D)));
        --dile-button-text-color: var(--dile-crud-direct-action-text-color, var(--dile-button-text-color, var(--dile-on-primary-color, #fff)));
        --dile-button-border-color: var(--dile-crud-direct-action-border-color, var(--dile-button-border-color, var(--dile-primary-dark-color, #12354d)));
        --dile-button-hover-background-color: var(--dile-crud-direct-action-hover-background-color, var(--dile-button-hover-background-color, var(--dile-primary-light-color, #f3f3ae)));
        --dile-button-hover-text-color: var(--dile-crud-direct-action-hover-text-color, var(--dile-button-hover-text-color, var(--dile-on-primary-light-color, #303030)));
        --dile-button-hover-border-color: var(--dile-crud-direct-action-hover-border-color, var(--dile-button-hover-border-color, var(--dile-primary-color, #666666)));
        --dile-button-font-size: var(--dile-crud-direct-action-font-size, var(--dile-button-font-size, 1rem));
        --dile-button-text-transform: var(--dile-crud-direct-action-text-transform, var(--dile-button-text-transform, none));
        --dile-button-font-weight: var(--dile-crud-direct-action-font-weight, var(--dile-button-font-weight, bold));
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

  get showActionsBar() {
    const c = this.config;
    const hasEdit = !c?.customization?.disableEdit;
    const hasDirectActions = c?.actions?.directSingleActions?.length > 0;
    const hasListActions = !c?.customization?.disableListActionsOnSingleComponent && c?.actions?.list?.length > 0;
    return hasEdit || hasDirectActions || hasListActions;
  }

  get contentTemplate() {
    return html`
      <main class="elcontainer">
        ${this.detailTemplate}
        ${this.showActionsBar ? html`
          <div class="actions" @action-success=${this.actionSuccess}>
              ${!this.config?.customization?.disableEdit ? html`
                <dile-button .icon="${editIcon}" @click=${this.edit}>
                  ${this.startUpdateLabelComputed(this.config.labels.startUpdateAction, this.translations)}
                </dile-button>
              ` : ''}
              ${this.directActionsTemplate}
              ${this.config?.customization?.disableListActionsOnSingleComponent ? '' : this.actionsTemplate}
          </div>
        ` : ''}
      </main>

      ${this.updateTemplate}
      ${this.singleActionsTemplate}
      
      ${this.element ? this.config.templates.relations(this.element) : ''}
    `;
  }

  get detailTemplate() {
    return html`
      <dile-crud-detail
        id="eldetail"
        endpoint="${this.config.endpoint}/${this.relatedId}"
        .itemDetailTemplate=${this.config.templates.detail}
        .responseAdapter=${this.config.responseAdapter}
        @crud-item-detail-loaded=${this.elementLoaded}
      ></dile-crud-detail>
    `
  }

  get singleActionsTemplate() {
    return html`
      <dile-crud-single-actions
        .actions=${this.config.actions.single}
        .directSingleActions=${this.config.actions.directSingleActions || []}
        .formActionsTemplate=${this.config.templates.formSingleActions}
        .actionIds=${this.actionIds}
        endpoint=${this.config.endpoint}
        @crud-action-success=${this.actionSuccess}
        language="${this.language}"
        .element=${this.element}
        .responseAdapter=${this.config.responseAdapter}
      ></dile-crud-single-actions>
    `
  }

  get directActionsTemplate() {
    const directSingleActions = this.config.actions.directSingleActions || [];
    return directSingleActions.map(actionName => {
      const action = (this.config.actions.single || []).find(a => a.name === actionName);
      if (!action) return '';
      if (action.shouldAppear && !action.shouldAppear(this.element)) return '';
      return html`
        <dile-button class="action-controller" @click=${() => this.triggerDirectAction(actionName)}>
          ${action.label}
        </dile-button>
      `;
    });
  }

  get detailElement() {
    return this.shadowRoot.getElementById('eldetail');
  }

  get singleActionsElement() {
    return this.shadowRoot.querySelector('dile-crud-single-actions');
  }

  refresh() {
    this.detailElement.refresh();
  }

  triggerDirectAction(actionName) {
    this.singleActionsElement.triggerAction(actionName);
  }

  elementLoaded(e) {
    this.element = e.detail.element;
  }

  actionSuccess(e) {
    if(!this.config.destructiveActionNames.includes(e.detail.action)) {
      this.refresh();
    }
    if(this.config.onActionSingleSuccess) {
      const handler = this.config.onActionSingleSuccess.bind(this);
      handler(e.detail);
    }
  }

  edit() {
    if (this.config.updateOperation?.type === 'modal') {
      this.updateElement.edit(this.relatedId);
      this.modalUpdate.open();
    } else if (this.config.updateOperation?.type == 'handler') {
      this.config.updateOperation.handler(this.relatedId, this, this.element);
    }  

    
  }

  
}