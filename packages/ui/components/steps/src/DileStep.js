import { LitElement, html, css } from 'lit';

export class DileStep extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: var(--dile-step-size, 1.5rem);
        height: var(--dile-step-size, 1.5rem);
      }
      .step {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: var(--dile-step-background-color, var(--dile-background-color, #fff));
        border-radius: 3rem;
        font-size: var(--dile-step-font-size, 0.8rem);
        font-weight: normal;
        font-family: inherit;
        padding: 0;
        border: var(--dile-step-border-width, 2px) solid var(--dile-step-border-color, #ddd);
        color: var(--dile-step-text-color, var(--dile-on-background-color, #303030));
        cursor: default;
      }
      button.step:focus-visible {
        outline: 2px solid var(--dile-step-active-border-color, var(--dile-primary-dark-color, #0039cb));
        outline-offset: 2px;
      }
      :host([reached]) .step {
        background-color: var(--dile-step-reached-background-color, var(--dile-primary-color, #2962ff));
        border-color: var(--dile-step-reached-background-color, var(--dile-primary-color, #2962ff));
        color: var(--dile-step-reached-text-color, var(--dile-on-primary-color, #fff));
      }
      :host([reached]:not([readonly])) .step {
        cursor: pointer;
      }
      :host([active]) .step {
        border-color: var(--dile-step-active-border-color, var(--dile-primary-dark-color, #0039cb));
        font-weight: bold;
      }
    `
  ];

  static get properties() {
    return {
      /** Step label, used as accessible name of the button */
      label: { type: String },
      /** Zero-based position of the step */
      index: { type: Number },
      /** The step is the current one */
      active: { type: Boolean, reflect: true },
      /** The step can be navigated to */
      reached: { type: Boolean, reflect: true },
      /** Display only: renders the bubble without a button */
      readonly: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.index = 0;
    this.active = false;
    this.reached = false;
    this.readonly = false;
  }

  render() {
    if (this.readonly) {
      return html`<span class="step" aria-hidden="true">${this.index + 1}</span>`;
    }
    return html`<button
      type="button"
      class="step"
      ?disabled=${!this.reached}
      aria-label=${this.label ?? ''}
      @click=${this.doClick}
    >${this.index + 1}</button>`;
  }

  doClick() {
    this.dispatchEvent(new CustomEvent('dile-step-click', {
      bubbles: true,
      composed: true,
      detail: { index: this.index, label: this.label }
    }));
  }
}
