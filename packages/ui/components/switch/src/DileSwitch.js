import { LitElement, html, css } from 'lit';
import { DileCheckbox } from '../../checkbox/src/DileCheckbox';

export class DileSwitch extends DileCheckbox {
    static styles = [
        css`
            :host {
                display: inline-block;
            }
            div {
              display: flex;
              flex-direction: var(--dile-switch-flex-direction, row);
              gap: var(--dile-switch-gap, 0.5rem);
              align-items: var(--dile-switch-align-items, center);
              justify-content: var(--dile-switch-justify-content, flex-start);  
            }
            section {
                width: 56px;
                height: 20px;
                border-radius: 10px;
                background-color: var(--dile-switch-bar-color, #ccc);
                display: flex;
                align-items: center;
                justify-content: flex-start;  
            }
            span {
                width: 24px;
                height: 24px;
                left: 0px;
                position: relative;
                border-radius: 50%;
                background-color: var(--dile-switch-off-state-color, #d52121);
                transition: all 0.2s linear;
            }
            :host([checked]) span {
                left: 32px;
                background-color: var(--dile-switch-on-state-color, #2566e8);
            }
            :host([disabled]) {
              opacity: 0.5;
            }
        `
    ];

    static get properties() {
      return {
        useReactiveLabels: { type: Boolean },
        checkedLabel: { type: String },
        uncheckedLabel: { type: String },
      };
    }

    render() {
        return html`
            <div @click=${this.toggle}>
              <section>
                  <span></span>
              </section>
              ${this.useReactiveLabels
                ? this.reactiveLabelsTemplate
                : this.innerTemplate
              }
            </div>
        `;
    }

    get reactiveLabelsTemplate() {
        return html`
          <label class="label">
            ${this.checked
                ? this.checkedLabel
                : this.uncheckedLabel
            }
          </label>
        `
      }

    toggle() {
        if (this.disabled) {
          return;
        }
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('dile-switch-changed', { 
            bubbles: true,
            composed: true,
            detail: {
                checked: this.checked,
                name: this.name,
            }
        }));
    }

}
