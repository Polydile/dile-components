import { LitElement, html, css } from 'lit';
import '@dile/ui/components/order-switch/order-switch';
import '@dile/ui/components/radio-group/radio-group';
import '@dile/ui/components/radio-group/radio';
import { sortIcon } from '@dile/icons';
import '../crud-list-options';

export class DileCrudSortForm extends LitElement {
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
            --dile-icon-color: var(--dile-secondary-color);

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
  }

  render() {
    return html`
        <dile-crud-list-options class="action-controller" .icon="${sortIcon}" label="Order">
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
    this.sortField = e.detail.value;
    this.sortDirection = this.getDirection(this.sortField);
    this.dispatchChanged();
  }

  getDirection(field) {
    if(field) {
      return this.shadowRoot.querySelector(`dile-order-switch[name="${field}"]`).value;
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