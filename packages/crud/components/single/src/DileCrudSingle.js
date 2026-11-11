import { LitElement, html, css } from 'lit';
import { formStyles } from '../../../styles/form-styles.js';
import '@dile/ui/components/button/button.js';
import '@dile/ui/components/button/button-icon.js';
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
      .actions dile-button-icon {
        --dile-button-font-size: var(--dile-crud-list-options-font-size, 1rem);
        --dile-button-font-weight: var(--dile-crud-list-options-font-weight, bold);
        --dile-button-text-transform: var(--dile-crud-list-options-text-transform, none);
        --dile-button-letter-spacing: var(--dile-crud-list-options-letter-spacing, 0);
        --dile-button-padding-y: var(--dile-crud-list-options-padding-y, 0.5rem);
        --dile-button-padding-x: var(--dile-crud-list-options-padding-x, 0.8rem);
      }
      dile-button-icon.action-controller {
        --dile-button-font-size: var(--dile-crud-list-options-font-size, 1rem);
        --dile-button-font-weight: var(--dile-crud-list-options-font-weight, bold);
        --dile-button-text-transform: var(--dile-crud-list-options-text-transform, none);
        --dile-button-letter-spacing: var(--dile-crud-list-options-letter-spacing, 0);
        --dile-button-padding-y: var(--dile-crud-list-options-padding-y, 0.5rem);
        --dile-button-padding-x: var(--dile-crud-list-options-padding-x, 0.8rem);
      }
      dile-button.action-controller {
        --dile-button-background-color: var(--dile-crud-direct-action-background-color, var(--dile-button-background-color, var(--dile-primary-color, #7BB93D)));
        --dile-button-text-color: var(--dile-crud-direct-action-text-color, var(--dile-button-text-color, var(--dile-on-primary-color, #fff)));
        --dile-button-border-color: var(--dile-crud-direct-action-border-color, var(--dile-button-border-color, var(--dile-primary-dark-color, #12354d)));
        --dile-button-hover-background-color: var(--dile-crud-direct-action-hover-background-color, var(--dile-button-hover-background-color, var(--dile-primary-light-color, #f3f3ae)));
        --dile-button-hover-text-color: var(--dile-crud-direct-action-hover-text-color, var(--dile-button-hover-text-color, var(--dile-on-primary-light-color, #303030)));
        --dile-button-hover-border-color: var(--dile-crud-direct-action-hover-border-color, var(--dile-button-hover-border-color, var(--dile-primary-color, #666666)));
        --dile-button-font-size: var(--dile-crud-list-options-font-size, var(--dile-crud-direct-action-font-size, var(--dile-button-font-size, 1rem)));
        --dile-button-font-weight: var(--dile-crud-list-options-font-weight, var(--dile-crud-direct-action-font-weight, var(--dile-button-font-weight, bold)));
        --dile-button-text-transform: var(--dile-crud-list-options-text-transform, var(--dile-crud-direct-action-text-transform, var(--dile-button-text-transform, none)));
        --dile-button-letter-spacing: var(--dile-crud-list-options-letter-spacing, 0);
        --dile-button-padding-y: var(--dile-crud-list-options-padding-y, 0.5rem);
        --dile-button-padding-x: var(--dile-crud-list-options-padding-x, 0.8rem);
      }
      .statscontainer {
          margin: 0 1rem;
      }

      /* Sidebar layout */
      .sidebar-container {
          container-type: inline-size;
          container-name: dile-crud-single;
          margin-bottom: 1.5rem;
      }
      .sidebar-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: var(--dile-crud-single-gap, 1.5rem);
          align-items: start;
      }
      @container dile-crud-single (min-width: 48rem) {
          .sidebar-layout {
              grid-template-columns: minmax(0, 1fr) var(--dile-crud-single-sidebar-width, 18rem);
          }
      }
      .sidebar-layout main.elcontainer {
          margin-bottom: 0;
          min-width: 0;
          /* The detail takes the look of the action group cards. These are fallbacks
             read by dile-crud-detail: the app's --dile-crud-detail-data-* still win. */
          --dile-crud-single-detail-background-color: var(--dile-crud-single-group-background-color, var(--dile-background-color, #fff));
          --dile-crud-single-detail-border: var(--dile-crud-single-group-border, 1px solid rgba(0, 0, 0, 0.08));
          --dile-crud-single-detail-box-shadow: var(--dile-crud-single-group-box-shadow, 0 1px 3px rgba(0, 0, 0, 0.08));
          --dile-crud-single-detail-border-radius: var(--dile-crud-single-group-border-radius, 0.5rem);
      }
      aside.sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--dile-crud-single-sidebar-gap, 1rem);
          min-width: 0;
      }
      aside.sidebar .actions {
          flex-direction: column;
          align-items: stretch;
          gap: 0.5rem;
          margin-bottom: 0;
          padding: var(--dile-crud-single-sidebar-actions-padding, 1rem);
          border-radius: var(--dile-crud-single-sidebar-actions-border-radius, 0.5rem);
          background-color: var(--dile-crud-single-sidebar-actions-background-color, var(--dile-primary-dark-color, #d7d353));
          --dile-button-width: 100%;
          /* Inherited by every button in the column, including the dile-button-icon
             rendered by dile-crud-list-options inside dile-crud-actions. */
          --dile-button-justify-content: var(--dile-crud-single-group-action-justify-content, center);
          --dile-button-text-align: var(--dile-crud-single-group-action-text-align, center);
      }
      aside.sidebar .action-controller {
          margin-left: 0;
      }
      aside.sidebar dile-crud-single-actions {
          --dile-crud-single-actions-columns: 1fr;
          --dile-crud-single-actions-card-margin-bottom: 0;
      }

      /* Action groups */
      .action-groups {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(var(--dile-crud-single-groups-min-width, 16rem), 1fr));
          gap: var(--dile-crud-single-groups-gap, 1rem);
          align-items: start;
          margin-bottom: 1.5rem;
      }
      aside.sidebar .action-groups {
          grid-template-columns: minmax(0, 1fr);
          margin-bottom: 0;
      }
      .action-group {
          display: flex;
          flex-direction: column;
          gap: var(--dile-crud-single-group-buttons-gap, 0.6rem);
          padding: var(--dile-crud-single-group-padding, 1rem);
          border-radius: var(--dile-crud-single-group-border-radius, 0.5rem);
          background-color: var(--dile-crud-single-group-background-color, var(--dile-background-color, #fff));
          color: var(--dile-crud-single-group-text-color, var(--dile-on-background-color, #303030));
          border: var(--dile-crud-single-group-border, 1px solid rgba(0, 0, 0, 0.08));
          box-shadow: var(--dile-crud-single-group-box-shadow, 0 1px 3px rgba(0, 0, 0, 0.08));
      }
      .action-group-title {
          margin: 0 0 0.25rem 0;
          font-size: var(--dile-crud-single-group-title-font-size, 1.25rem);
          font-weight: var(--dile-crud-single-group-title-font-weight, 400);
          color: var(--dile-crud-single-group-title-color, inherit);
      }
      .group-action {
          display: block;
          --dile-button-width: 100%;
          --dile-button-font-size: var(--dile-crud-single-group-action-font-size, 1rem);
          --dile-button-font-weight: var(--dile-crud-single-group-action-font-weight, normal);
          --dile-button-border-radius: var(--dile-crud-single-group-action-border-radius, 0.5rem);
          --dile-button-border-width: var(--dile-crud-single-group-action-border-width, 1px);
          --dile-button-padding-y: var(--dile-crud-single-group-action-padding-y, 0.6rem);
          --dile-button-padding-x: var(--dile-crud-single-group-action-padding-x, 0.8rem);
          --dile-button-justify-content: var(--dile-crud-single-group-action-justify-content, center);
          --dile-button-text-align: var(--dile-crud-single-group-action-text-align, center);
      }
      .group-action.variant-primary {
          --dile-button-background-color: var(--dile-crud-single-action-primary-background-color, var(--dile-primary-color, #7BB93D));
          --dile-button-text-color: var(--dile-crud-single-action-primary-text-color, var(--dile-on-primary-color, #fff));
          --dile-button-border-color: var(--dile-crud-single-action-primary-border-color, var(--dile-primary-color, #7BB93D));
          --dile-button-hover-background-color: var(--dile-crud-single-action-primary-hover-background-color, var(--dile-primary-dark-color, #12354d));
          --dile-button-hover-text-color: var(--dile-crud-single-action-primary-hover-text-color, var(--dile-on-primary-dark-color, #fff));
          --dile-button-hover-border-color: var(--dile-crud-single-action-primary-hover-border-color, var(--dile-primary-dark-color, #12354d));
          --dile-button-icon-color: var(--dile-button-text-color);
          --dile-button-icon-hover-color: var(--dile-button-hover-text-color);
      }
      .group-action.variant-outline {
          --dile-button-background-color: var(--dile-crud-single-action-outline-background-color, transparent);
          --dile-button-text-color: var(--dile-crud-single-action-outline-text-color, var(--dile-on-background-color, #303030));
          --dile-button-border-color: var(--dile-crud-single-action-outline-border-color, currentColor);
          --dile-button-hover-background-color: var(--dile-crud-single-action-outline-hover-background-color, rgba(0, 0, 0, 0.05));
          --dile-button-hover-text-color: var(--dile-crud-single-action-outline-hover-text-color, var(--dile-on-background-color, #303030));
          --dile-button-hover-border-color: var(--dile-crud-single-action-outline-hover-border-color, var(--dile-on-background-color, #303030));
          --dile-button-icon-color: var(--dile-button-text-color);
          --dile-button-icon-hover-color: var(--dile-button-hover-text-color);
      }
      .group-action.variant-danger {
          --dile-button-background-color: var(--dile-crud-single-action-danger-background-color, color-mix(in srgb, var(--dile-danger-color, #e31e1b) 15%, transparent));
          --dile-button-text-color: var(--dile-crud-single-action-danger-text-color, var(--dile-danger-color, #e31e1b));
          --dile-button-border-color: var(--dile-crud-single-action-danger-border-color, color-mix(in srgb, var(--dile-danger-color, #e31e1b) 40%, transparent));
          --dile-button-hover-background-color: var(--dile-crud-single-action-danger-hover-background-color, var(--dile-danger-color, #e31e1b));
          --dile-button-hover-text-color: var(--dile-crud-single-action-danger-hover-text-color, var(--dile-on-danger-color, #fff));
          --dile-button-hover-border-color: var(--dile-crud-single-action-danger-hover-border-color, var(--dile-danger-color, #e31e1b));
          --dile-button-icon-color: var(--dile-button-text-color);
          --dile-button-icon-hover-color: var(--dile-button-hover-text-color);
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
      relatedId: { type: String },
      element: { type: Object },
      actionIds: { type: Array },
      /**
       * Visual layout of the component:
       * - 'stacked' (default): detail, then the actions bar and the action card below.
       * - 'sidebar': detail on the left and a column with the actions on the right.
       * Falls back to config.customization.singleLayout when not set.
       */
      layout: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.actionIds = [];
  }

  get computedLayout() {
    const layout = this.layout || this.config?.customization?.singleLayout;
    return DileCrudSingle.layouts.includes(layout) ? layout : 'stacked';
  }

  /** List actions (batch menu or dispatcher) take the full width of the column in the sidebar layout. */
  get fullWidthActions() {
    return this.computedLayout === 'sidebar';
  }

  static get layouts() {
    return ['stacked', 'sidebar'];
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
    const hasDirectActions = this.ungroupedDirectActionNames.length > 0;
    const hasListActions = !c?.customization?.disableListActionsOnSingleComponent && c?.actions?.list?.length > 0;
    return hasEdit || hasDirectActions || hasListActions;
  }

  get contentTemplate() {
    return html`
      ${this.computedLayout === 'sidebar'
        ? this.sidebarLayoutTemplate
        : this.stackedLayoutTemplate
      }
      ${this.element ? this.config.templates.relations(this.element) : ''}
    `;
  }

  get stackedLayoutTemplate() {
    return html`
      <main class="elcontainer">
        ${this.detailTemplate}
        ${this.actionsBarTemplate}
      </main>

      ${this.updateTemplate}
      ${this.actionGroupsTemplate}
      ${this.singleActionsTemplate}
    `;
  }

  get sidebarLayoutTemplate() {
    return html`
      <div class="sidebar-container">
        <div class="sidebar-layout">
          <main class="elcontainer">
            ${this.detailTemplate}
          </main>
          <aside class="sidebar">
            ${this.actionsBarTemplate}
            ${this.actionGroupsTemplate}
            ${this.singleActionsTemplate}
          </aside>
        </div>
      </div>
      ${this.updateTemplate}
    `;
  }

  get actionsBarTemplate() {
    if (!this.showActionsBar) return '';
    return html`
      <div class="actions" @action-success=${this.actionSuccess}>
          ${!this.config?.customization?.disableEdit ? html`
            <dile-button-icon .icon="${editIcon}" @click=${this.edit}>
              ${this.startUpdateLabelComputed(this.config.labels.startUpdateAction, this.translations)}
            </dile-button-icon>
          ` : ''}
          ${this.directActionsTemplate}
          ${this.config?.customization?.disableListActionsOnSingleComponent ? '' : this.actionsTemplate}
      </div>
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
        .directSingleActions=${[...(this.config.actions.directSingleActions || []), ...this.groupedActionNames]}
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
    return this.ungroupedDirectActionNames.map(actionName => {
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

  get ungroupedDirectActionNames() {
    const grouped = this.groupedActionNames;
    return (this.config?.actions?.directSingleActions || []).filter(name => !grouped.includes(name));
  }

  get groupedActionNames() {
    const groups = this.config?.actions?.singleGroups || [];
    return [...new Set(groups.flatMap(group => group?.actions || []))];
  }

  get actionGroups() {
    const groups = this.config?.actions?.singleGroups || [];
    const singleActions = this.config?.actions?.single || [];
    return groups
      .map(group => ({
        title: group?.title || '',
        actions: (group?.actions || [])
          .map(name => singleActions.find(action => action.name === name))
          .filter(action => action && (!action.shouldAppear || action.shouldAppear(this.element))),
      }))
      .filter(group => group.actions.length > 0);
  }

  static get actionVariants() {
    return ['primary', 'outline', 'danger'];
  }

  actionVariant(action) {
    if (DileCrudSingle.actionVariants.includes(action.variant)) {
      return action.variant;
    }
    return action.destructive ? 'danger' : 'primary';
  }

  get actionGroupsTemplate() {
    const groups = this.actionGroups;
    if (groups.length === 0) return '';
    return html`
      <div class="action-groups">
        ${groups.map(group => html`
          <section class="action-group">
            ${group.title ? html`<h3 class="action-group-title">${group.title}</h3>` : ''}
            ${group.actions.map(action => html`
              <dile-button
                class="group-action variant-${this.actionVariant(action)}"
                name="${action.name}"
                icon="${action.icon || ''}"
                @click=${() => this.triggerAction(action.name)}
              >${action.label}</dile-button>
            `)}
          </section>
        `)}
      </div>
    `;
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

  triggerDirectAction(actionName, initialData) {
    this.singleActionsElement.triggerAction(actionName, initialData);
  }

  triggerAction(actionName, initialData) {
    this.singleActionsElement.triggerAction(actionName, initialData);
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