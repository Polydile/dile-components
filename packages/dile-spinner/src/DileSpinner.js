import { LitElement, html, css } from "lit";
import { DileSpinnerMixin } from "./DileSpinnerMixin";

export class DileSpinner extends DileSpinnerMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      i {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
        background-color: var(--dile-spinner-background, transparent);
        border-radius: 50%;
        border: 4px solid var(--dile-spinner-background, transparent);
      }
      i div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 32px 32px;
      }
      i div:after {
        content: " ";
        display: block;
        position: absolute;
        width: var(--dile-spinner-dot-size, 6px);
        height: var(--dile-spinner-dot-size, 6px);
        border-radius: 50%;
        background: var(--dile-spinner-color, #888);
        margin: -3px 0 0 -3px;
      }
      i div:nth-child(1) {
        animation-delay: -0.036s;
      }
      i div:nth-child(1):after {
        top: 50px;
        left: 50px;
      }
      i div:nth-child(2) {
        animation-delay: -0.072s;
      }
      i div:nth-child(2):after {
        top: 54px;
        left: 45px;
      }
      i div:nth-child(3) {
        animation-delay: -0.108s;
      }
      i div:nth-child(3):after {
        top: 57px;
        left: 39px;
      }
      i div:nth-child(4) {
        animation-delay: -0.144s;
      }
      i div:nth-child(4):after {
        top: 58px;
        left: 32px;
      }
      i div:nth-child(5) {
        animation-delay: -0.18s;
      }
      i div:nth-child(5):after {
        top: 57px;
        left: 25px;
      }
      i div:nth-child(6) {
        animation-delay: -0.216s;
      }
      i div:nth-child(6):after {
        top: 54px;
        left: 19px;
      }
      i div:nth-child(7) {
        animation-delay: -0.252s;
      }
      i div:nth-child(7):after {
        top: 50px;
        left: 14px;
      }
      i div:nth-child(8) {
        animation-delay: -0.288s;
      }
      i div:nth-child(8):after {
        top: 45px;
        left: 10px;
      }
      @keyframes lds-roller {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `;
  }

  render() {
    return html`
      ${this.active
        ? html`<i
            ><div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div
          ></i>`
        : ""}
    `;
  }
}