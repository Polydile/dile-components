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
              align-items: center;
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
            label {
              margin-left: 0.5rem;
            }
        `
    ];

    render() {
        return html`
            <div @click=${this.toggle}>
              <section>
                  <span></span>
              </section>
              ${this.innerTemplate}
            </div>
        `;
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
