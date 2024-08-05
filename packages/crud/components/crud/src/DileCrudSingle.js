import { LitElement, html, css } from 'lit';

export class DileCrudSingle extends LitElement {
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
    super.updated(changedProperties);
    if (changedProperties.has('relatedId')) {
      this.actionIds = [this.relatedId];
    }
  }

  render() {
    return html`
    <main
        class="elcontainer"
        @fct-crud-item-detail-loaded="${this.elementLoaded}"
    >
        ${this.detailTemplate}

        <div class="actions" @action-success=${this.actionSuccess}>
            <fct-button gray .icon="${editIcon}" @click="${this.itemEditRequest}">Editar</fct-button>
            ${this.actionsTemplate}
        </div>
    </main>

    ${this.updateTemplate}
    ${this.detailActionsTemplate}
    ${this.statsTemplate}
    ${this.relationsTemplate}
    `;
  }

  get detailTemplate() {
    // override
  }
  get updateTemplate() {
    // override
  }
  get actionsTemplate() {
    // override
  }
  get relationsTemplate() {
    // override
  }
  get breadcrumbsTemplate() {
    // override
  }
  get detailActionsTemplate() {
    // override
  }
  get statsTemplate() {
    // override
  }

  // stateChanged(state) {
  //     this.loggedIn = state.user.loggedIn;
  //     this.initialized = state.user.initialized;
  //     this.company = state.user.company;
  // }

  get detailElement() {
    return this.shadowRoot.getElementById('eldetail');
  }

  itemEditRequest(e) {
    if (this.pageEdit) {
      //console.log('voy a navegar', `panel/${this.companySlug}/clientes/${this.relatedId}/editar`);
      this.navigateTo(this.pageEdit(this.relatedId));
    } else {
      this.updateElement.edit(this.relatedId);
    }
  }

  updateSuccess() {
    this.updateElement.close();
    this.detailElement.refresh();
  }

  elementLoaded(e) {
    this.element = e.detail;
  }
}