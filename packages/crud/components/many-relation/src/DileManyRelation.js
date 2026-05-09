import { LitElement, html, css } from 'lit';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';
import { addIcon, clearIcon } from '@dile/icons';
import '../../ajax/ajax.js';
import '../../ajax-select-crud/ajax-select-crud.js';
import '@dile/ui/components/icon/icon.js';
import '@dile/ui/components/spinner/spinner.js';

export class DileManyRelation extends DileI18nMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      label {
        display: block;
        margin-bottom: var(--dile-input-label-margin-bottom, 4px);
        font-size: var(--dile-input-label-font-size, 1em);
        color: var(--dile-input-label-color, #59e);
        font-weight: var(--dile-input-label-font-weight, normal);
      }
      dile-ajax-select-crud{
          margin-bottom: 0;
      }
      .relation-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0;
      }
      .relation-item-content {
        flex: 1;
        padding-left: 0.4rem;
        font-size: var(--many-relation-item-font-size, 0.9rem);
        color: var(--many-relation-item-color, inherit);
      }
      button.remove-btn,
      button.add-btn {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--many-relation-add-size, 38px);
        flex-shrink: 0;
      }
      button.remove-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      button.remove-btn dile-icon {
        --dile-icon-color: var(--many-relation-remove-color, #c00);
        --dile-icon-size: var(--many-relation-remove-size, 24px);
      }
      .add-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .add-row dile-ajax-select-crud {
        flex: 1;
      }
      button.add-btn dile-icon {
        --dile-icon-color: var(--many-relation-add-color, #2962ff);
        --dile-icon-size: var(--many-relation-add-size, 38px);
        margin-bottom: 8px;
      }
      button.add-btn:disabled dile-icon {
        --dile-icon-color: var(--many-relation-add-disabled-color, #ccc);
      }
      button.add-btn:disabled {
        cursor: default;
      }
      .empty-msg {
        color: var(--many-relation-empty-color, #888);
        font-style: var(--many-relation-empty-font-style, italic);
        font-size: var(--many-relation-empty-font-size, 0.9rem);
      }
    `
  ];

  static get properties() {
    return {
      label: { type: String },

      // Endpoints
      endpointGet: { type: String },
      endpointList: { type: String },
      endpointAdd: { type: String },
      endpointRemove: { type: String },

      // Initial data behaviour
      relatedItems: { type: Array },
      loadFromEndpoint: { type: Boolean },

      // Select (dile-ajax-select-crud) passthrough
      displayProperty: { type: String },
      idProperty: { type: String },
      queryStringVariable: { type: String },
      placeholder: { type: String },
      selectDefaultPlaceholder: { type: String },
      resultDataProperty: { type: String },
      maxResults: { type: Number },
      pageParamName: { type: String },
      getSelectResultList: { type: Object },

      // Related list customisation
      itemTemplate: { type: Object },
      getListItems: { type: Object },
      addRelationLabel: { type: String },
      bodyIdProperty: { type: String },

      // Internal state
      _items: { type: Array, state: true },
      _selectedId: { type: String, state: true },
      _removingItemId: { type: String, state: true },
      _loadingList: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.relatedItems = [];
    this._items = [];
    this.loadFromEndpoint = false;
    this.displayProperty = 'name';
    this.idProperty = 'id';
    this.getListItems = (response) => response.data;
    this.itemTemplate = (item) => html`${item[this.displayProperty]}`;
    this.bodyIdProperty = null;
    this._loadingList = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('relatedItems') && !this.loadFromEndpoint) {
      this._items = [...this.relatedItems];
    }
  }

  firstUpdated() {
    this._ajaxlist = this.shadowRoot.getElementById('ajaxlist');
    this._ajaxadd = this.shadowRoot.getElementById('ajaxadd');
    this._ajaxrem = this.shadowRoot.getElementById('ajaxrem');

    if (this.loadFromEndpoint) {
      this._refreshList();
    }
  }

  render() {
    return html`
      <dile-ajax
        id="ajaxlist"
        method="get"
        url="${this.endpointList}"
        @ajax-success="${this._onListSuccess}"
        @ajax-error="${this._onListError}"
      ></dile-ajax>
      <dile-ajax
        id="ajaxadd"
        method="post"
        url="${this.endpointAdd}"
        @ajax-success="${this._onAddSuccess}"
        @ajax-error="${this._onAddError}"
      ></dile-ajax>
      <dile-ajax
        id="ajaxrem"
        method="delete"
        @ajax-success="${this._onRemoveSuccess}"
        @ajax-error="${this._onRemoveError}"
      ></dile-ajax>

      ${this.label
          ? html`<label for="textField">${this.label}</label>`
          : ""
      }
      <div class="add-row">
        <dile-ajax-select-crud
          id="theselect"
          endpoint="${this.endpointGet}"
          displayProperty="${this.displayProperty}"
          idProperty="${this.idProperty}"
          queryStringVariable="${this.queryStringVariable}"
          placeholder="${this.placeholder}"
          selectDefaultPlaceholder="${this.selectDefaultPlaceholderComputed(this.selectDefaultPlaceholder, this.translations)}"
          resultDataProperty="${this.resultDataProperty}"
          maxResults="${this.maxResults}"
          pageParamName="${this.pageParamName}"
          .getSelectResultList="${this.getSelectResultList}"
          language="${this.language}"
          @element-changed="${this._onSelectChanged}"
        ></dile-ajax-select-crud>
        <button
          class="add-btn"
          ?disabled="${!this._selectedId}"
          title="${this.addRelationLabelComputed(this.addRelationLabel, this.translations)}"
          @click="${this._addSelectedItem}"
        ><dile-icon .icon="${addIcon}"></dile-icon></button>
      </div>

      ${this._loadingList
        ? html`<dile-spinner active></dile-spinner>`
        : this._items.length === 0
          ? html`<p class="empty-msg">${this.translations?.empty_list ?? 'There are no items yet'}</p>`
          : this._items.map(item => html`
              <div class="relation-item">
                <span class="relation-item-content">${this.itemTemplate(item)}</span>
                <button
                  class="remove-btn"
                  ?disabled="${this._removingItemId === item[this.idProperty]}"
                  @click="${() => this._removeItem(item)}"
                  title="${this.translations?.delete_label ?? 'Delete'}"
                ><dile-icon .icon="${clearIcon}"></dile-icon></button>
              </div>
            `)
      }
    `;
  }

  _onSelectChanged(e) {
    this._selectedId = e.detail.value || null;
  }

  _addSelectedItem() {
    if (!this._selectedId) {
      this._dispatch('many-relation-add-no-selection');
      return;
    }
    const bodyKey = this.bodyIdProperty || this.idProperty;
    this._ajaxadd.data = { [bodyKey]: this._selectedId };
    this._ajaxadd.generateRequest();
  }

  _onAddSuccess() {
    this._selectedId = null;
    this._clearSelect();
    this._refreshList();
    this._dispatch('many-relation-add-success');
  }

  _onAddError() {
    this._dispatch('many-relation-add-error');
  }

  _removeItem(item) {
    const id = item[this.idProperty];
    this._removingItemId = id;
    this._ajaxrem.url = `${this.endpointRemove}/${id}`;
    this._ajaxrem.generateRequest();
  }

  _onRemoveSuccess() {
    this._removingItemId = undefined;
    this._refreshList();
    this._dispatch('many-relation-remove-success');
  }

  _onRemoveError() {
    this._removingItemId = undefined;
    this._dispatch('many-relation-remove-error');
  }

  _refreshList() {
    this._loadingList = true;
    this.updateComplete.then(() => this._ajaxlist.generateRequest());
  }

  _onListSuccess(e) {
    this._items = this.getListItems(e.detail);
    this._loadingList = false;
  }

  _onListError() {
    this._loadingList = false;
    this._dispatch('many-relation-list-error');
  }

  _clearSelect() {
    const select = this.shadowRoot.getElementById('theselect');
    if (select) {
      select.clear();
    }
  }

  _dispatch(eventName) {
    this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true }));
  }

  addRelationLabelComputed(label, translations) {
    return label ? label : translations?.add_relation_label ?? 'Add';
  }

  selectDefaultPlaceholderComputed(value, translations) {
    return value ? value : translations?.select_relation_placeholder ?? 'Select...';
  }
}
