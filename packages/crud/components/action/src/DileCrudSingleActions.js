import { LitElement, html, css } from 'lit';
import { DileCrudActions } from './DileCrudActions.js';
import '@dile/ui/components/box-selector/box-selector.js';
import '@dile/ui/components/box-selector/box-selector-item.js';
import '@dile/ui/components/card/card.js';

export class DileCrudSingleActions extends DileCrudActions {
  static styles = [
    super.styles,
    css`
      :host {
          display: block;
          --dile-box-selector-item-text-align: center;
          --dile-box-selector-item-font-weight: bold;
      }
      dile-card {
          --dile-card-border: none;
          margin-bottom: 1.5rem;
          --dile-card-background-color: var(--dile-secondary-light-color);
      }
      .action-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
          align-items: stretch;
      }
      dile-box-selector-item:hover {
          --dile-box-selector-item-background-color: var(--dile-primary-light-color);
          --dile-box-selector-item-color: var(--dile-on-primary-light-color);
          --dile-box-selector-item-border: 4px solid var(--dile-primary-color);
      }
      
    `
  ];

  static get properties() {
    return {
      actions: { type: Array },
    };
  }

  constructor() {
    super();
    this.actions = [];
  }

  get actionListTemplate() {
    return html`
      ${this.actions.length > 0
        ? html`
          <dile-card title="Element action">
            <dile-box-selector 
                class="action-list" 
                attrForSelected="name"
                @dile-selected-changed="${this.onActionSelected}"
            >
                ${this.actions.map(action => html`
                    <dile-box-selector-item 
                        label="${action.label}"
                        name="${action.name}"
                    ></dile-box-selector-item>
                `)}
            </dile-box-selector>
          </dile-card>
        `
        : ''
      }
        `;
  }



  onActionSelected(e) {
    this.selection = e.detail.selected;
    this.showAction();
  }
}
