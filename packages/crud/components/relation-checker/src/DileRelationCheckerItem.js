import { LitElement, html, css } from 'lit';
import '@dile/ui/components/checkbox/checkbox.js';
import '@dile/ui/components/tooltip/chip-tooltip';

export class DileRelationCheckerItem extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        --dile-checkbox-size: 24px;
      }
      div.item {
        display: flex;
        align-items: center;
        margin: 0 0 0.6rem;
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #ddd;
      }
      div.grow {
        flex-grow: 1;
      }
      dile-chip-tooltip {
        margin-right: 0.5rem;
      }
      .onlyicon {
        --dile-chip-tooltip-padding: 0.15rem;
        --dile-chip-tooltip-icon-size: 18px;
      }
    `
  ];
  
  static get properties() {
    return {
      item: { type: Object },
      tooltip: { type: String }, 
    };
  }

  render() {
    return html`
      <div class="item">
        <div class="grow">
          <dile-checkbox 
            name="${this.item.id}"
            @dile-checkbox-changed=${this.checkboxChanged}
            ?checked=${this.item.checked}
          >${this.item.label}</dile-checkbox>
        </div>
        ${this.tooltip
          ? html`<dile-chip-tooltip class="onlyicon" message="${this.tooltip}" position="left"></dile-chip-tooltip>`
          : ''
        }
      </div>    
    `;
  }

  checkboxChanged(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('relation-item-changed', { 
      bubbles: true,
      composed: true,
      detail: { 
        item: this.item,
        checked: e.detail.checked
      }
    }));
  }

}