import { LitElement, html, css } from "lit-element";
import { DileSpinnerMixin } from "./DileSpinnerMixin";

export class DileSpinnerModal extends DileSpinnerMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      div {
        display: flex;
        position: fixed;
        background-color: var(
          --dile-spinner-modal-background-color,
          rgba(255, 255, 255, 0.8)
        );
        height: 100vh;
        width: 100vw;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        z-index: 999999999999999;
      }
      blockquote {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        background-color: var(
          --dile-spinner-modal-box-color,
          rgba(0, 0, 0, 0.9)
        );
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }

  render() {
    return html`
      ${this.active
        ? html` <div>
            <blockquote class="box">
              <dile-spinner ?active="${this.active}"></dile-spinner>
            </blockquote>
          </div>`
        : ""}
    `;
  }
}