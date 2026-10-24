import { LitElement, html, css } from 'lit';
import '../step.js';

export class DileSteps extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      /* ── Horizontal ── */
      .horizontal {
        display: flex;
        position: relative;
        padding-bottom: 0.5rem;
      }
      .line-bg {
        position: absolute;
        top: calc(var(--dile-step-size, 1.5rem) / 2 - var(--dile-steps-line-width, 0.5rem) / 2);
        left: 0.75rem;
        right: 0.75rem;
        height: var(--dile-steps-line-width, 0.5rem);
        background-color: var(--dile-steps-line-color, var(--dile-primary-color, #2962ff));
        border-radius: 2rem;
      }
      .h-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        position: relative;
        z-index: 1;
      }
      .h-label {
        font-size: var(--dile-step-label-font-size, 0.7rem);
        text-align: center;
        margin-top: 0.3rem;
        color: var(--dile-step-label-color, #606060);
        line-height: 1.2;
      }

      /* ── Vertical ── */
      .vertical {
        display: flex;
        flex-direction: column;
      }
      .v-step {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 0.75rem;
      }
      .v-track {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: var(--dile-step-size, 1.5rem);
        flex-shrink: 0;
      }
      .connector {
        width: var(--dile-steps-connector-width, 0.35rem);
        height: var(--dile-steps-connector-height, 1rem);
        background-color: var(--dile-steps-line-color, var(--dile-primary-color, #2962ff));
        border-radius: 2rem;
      }
      .v-label {
        font-size: var(--dile-step-label-font-size, 0.85rem);
        color: var(--dile-step-label-color, #606060);
        padding-top: 0.2rem;
        line-height: 1.2;
      }

      .active .h-label,
      .active .v-label {
        color: var(--dile-step-active-label-color, var(--dile-step-active-border-color, var(--dile-primary-dark-color, #0039cb)));
        font-weight: 600;
      }
    `
  ];

  static get properties() {
    return {
      /** Array with the label of each step */
      steps: { type: Array },
      /** Zero-based index of the current step */
      current: { type: Number },
      /** Highest step index reached so far */
      reached: { type: Number },
      /** All steps can be selected, regardless of reached */
      freeNavigation: { type: Boolean },
      /** Vertical layout */
      vertical: { type: Boolean },
      /** Display only: steps can not be clicked */
      readonly: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.steps = [];
    this.current = 0;
    this.reached = 0;
    this.freeNavigation = false;
    this.vertical = false;
    this.readonly = false;
  }

  isReached(index) {
    return this.freeNavigation || index <= this.reached;
  }

  render() {
    return this.vertical ? this.renderVertical() : this.renderHorizontal();
  }

  renderHorizontal() {
    return html`
      <div class="horizontal" role="list" @dile-step-click=${this.onStepClick}>
        <div class="line-bg"></div>
        ${this.steps.map((step, index) => html`
          <div class="h-step ${index === this.current ? 'active' : ''}" role="listitem" aria-current=${index === this.current ? 'step' : 'false'}>
            ${this.stepTemplate(step, index)}
            <span class="h-label">${step}</span>
          </div>
        `)}
      </div>
    `;
  }

  renderVertical() {
    return html`
      <div class="vertical" role="list" @dile-step-click=${this.onStepClick}>
        ${this.steps.map((step, index) => html`
          <div class="v-step ${index === this.current ? 'active' : ''}" role="listitem" aria-current=${index === this.current ? 'step' : 'false'}>
            <div class="v-track">
              ${this.stepTemplate(step, index)}
              ${index < this.steps.length - 1
                ? html`<div class="connector"></div>`
                : ''}
            </div>
            <span class="v-label">${step}</span>
          </div>
        `)}
      </div>
    `;
  }

  stepTemplate(step, index) {
    return html`
      <dile-step
        ?active=${index === this.current}
        ?reached=${this.isReached(index)}
        ?readonly=${this.readonly}
        label="${step}"
        index="${index}"
      ></dile-step>
    `;
  }

  onStepClick(e) {
    e.stopPropagation();
    if (this.readonly) {
      return;
    }
    this.dispatchEvent(new CustomEvent('dile-steps-select', {
      bubbles: true,
      composed: true,
      detail: { index: e.detail.index, label: e.detail.label }
    }));
  }
}
