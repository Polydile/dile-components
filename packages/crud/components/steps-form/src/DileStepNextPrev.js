import { LitElement, html, css } from "lit";
import "@dile/ui/components/button/button.js";
import { DileI18nMixin } from "../../../lib/DileI18nMixin.js";

export class DileStepNextPrev extends DileI18nMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
        container-type: inline-size;
        margin-top: var(--dile-step-next-prev-margin-top, 1.5rem);
      }
      section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.25rem;
        align-items: center;
      }
      @container (min-width: 420px) {
        section {
          flex-direction: row;
          gap: 1rem;
        }
      }
      .alternative-exit {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
      }
      .alternative-exit button {
        color: var(--dile-step-alternative-exit-color, var(--dile-link-color));
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        text-decoration: none;
      }
      .alternative-exit button:disabled {
        cursor: default;
        opacity: 0.5;
      }
    `,
  ];

  static get properties() {
    return {
      current: { type: Number },
      steps: { type: Array },
      prevLabel: { type: String },
      nextLabel: { type: String },
      endLabel: { type: String },
      alternativeExit: { type: Boolean },
      alternativeExitLabel: { type: String },
      loading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.current = 0;
    this.steps = [];
    this.alternativeExit = false;
    this.loading = false;
  }

  get isLast() {
    return this.current >= this.steps.length - 1;
  }

  get computedPrevLabel() {
    return this.prevLabel || this.translations?.step_prev_label || "Previous";
  }

  get computedNextLabel() {
    return this.nextLabel || this.translations?.step_next_label || "Next";
  }

  get computedEndLabel() {
    return this.endLabel || this.translations?.step_end_label || "Finish";
  }

  render() {
    return html`
      <section>
        <div class="prev">
          ${this.current > 0
            ? html`<dile-button ?disabled=${this.loading} @click=${this.prev}
                >${this.computedPrevLabel}</dile-button
              >`
            : ""}
        </div>
        ${this.alternativeExit && this.alternativeExitLabel
          ? html`<div class="alternative-exit">
              <button
                type="button"
                ?disabled=${this.loading}
                @click=${this.alternativeExitClick}
              >
                ${this.alternativeExitLabel}
              </button>
            </div>`
          : ""}
        <div class="next">
          <dile-button ?loading=${this.loading} @click=${this.next}>
            ${this.isLast ? this.computedEndLabel : this.computedNextLabel}
          </dile-button>
        </div>
      </section>
    `;
  }

  dispatchNavigationEvent(eventName) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          current: this.current,
        },
      }),
    );
  }

  next() {
    this.dispatchNavigationEvent("dile-step-next-click");
  }
  prev() {
    this.dispatchNavigationEvent("dile-step-prev-click");
  }

  alternativeExitClick() {
    this.dispatchNavigationEvent("dile-step-alternative-exit");
  }
}
