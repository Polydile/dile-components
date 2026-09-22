import { LitElement, html, css } from 'lit';
import '@dile/ui/components/order-switch/order-switch.js';
import '@dile/ui/components/radio-group/radio-group.js';
import '@dile/ui/components/radio-group/radio.js';
import { sortIcon } from '@dile/icons';
import '../crud-list-options.js';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileCrudSortForm extends DileI18nMixin(LitElement) {
  static styles = [
    css`
        :host {
            display: block;
        }
        div {
            display: flex;
            align-items: center;
            margin-bottom: 0.1rem;
        }
        .selected {
            font-weight: bold;
        }
        dile-radio-group {
            margin-top: 10px;
        }
        dile-radio {
            margin-right: 0.2rem;
            --dile-icon-color: var(--dile-primary-color);
        }
        dile-order-switch {
            margin-bottom: 0;
            --dile-icon-color: var(--dile-crud-order-switch-icon-color, var(--dile-secondary-color, #888));
        }
    `
  ];

  static get properties() {
    return {
      sortOptions: { type: Array },
      sortField: { type: String },
      sortDirection: { type: String },
    };
  }

  constructor() {
    super();
    this.sortOptions = [];
    this._suppressChangeEcho = false;
  }

  // Reflects a sort that was already applied elsewhere (e.g. a DataGrid column header
  // click) without re-dispatching sort-changed. Setting `sortField` below causes the
  // inner <dile-radio-group> to echo a "changed" event on its own (it can't tell a
  // programmatic update from a user click), which radioGroupChanged() would otherwise
  // treat as a real selection and re-derive sortDirection from the option's *static*
  // configured default — silently overriding whichever direction was actually requested.
  syncSort(sortField, sortDirection) {
    this._suppressChangeEcho = true;
    this.sortField = sortField;
    this.sortDirection = sortDirection;
  }

  render() {
    return html`
        <dile-crud-list-options class="action-controller" .icon="${sortIcon}" label="${this.translations.sort_label}">
            <dile-radio-group 
                name="selector" 
                @dile-radio-group-changed=${this.radioGroupChanged}
                value="${this.sortField}"
            >
                ${this.sortOptions.map(option => html`
                    <div class="${this.sortField === option.name ? 'selected' : ''}">
                        <dile-radio
                            groupName="selector"
                            radioId="${option.name}"
                            ?checked=${this.sortField === option.name}
                            value="${option.name}"
                        ></dile-radio>
                        <dile-order-switch
                            label="${option.label}"
                            name="${option.name}"
                            value="${option.direction}"
                            ?selected=${this.sortField === option.name}
                            @element-changed=${this.elementChanged}
                        ></dile-order-switch>
                    </div>
                `)}
            </dile-radio-group>
        </dile-crud-list-options> 
    `;
  }

  elementChanged(e) {
    this.sortField = e.detail.name;
    this.sortDirection = e.detail.value;
    this.dispatchChanged();
  }

  radioGroupChanged(e) {
    if (this._suppressChangeEcho) {
      this._suppressChangeEcho = false;
      return;
    }
    this.sortField = e.detail.value;
    this.sortDirection = this.getDirection(this.sortField);
    this.dispatchChanged();
  }

  getDirection(field) {
    if(field) {
      const orderSwitch = this.shadowRoot.querySelector(`dile-order-switch[name="${field}"]`);
      return orderSwitch ? orderSwitch.value : undefined;
    }
  }

  dispatchChanged() {
    this.dispatchEvent(new CustomEvent('sort-changed', {
      detail: {
        sortField: this.sortField,
        sortDirection: this.sortDirection,
      }
    }));
  }
}