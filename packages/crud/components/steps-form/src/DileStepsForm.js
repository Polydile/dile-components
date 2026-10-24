import { LitElement, html, css } from "lit";
import "@dile/ui/components/steps/steps.js";
import "../../ajax/ajax.js";
import "@dile/ui/components/inline-feedback/inline-feedback.js";
import { ResponseApiAdapter } from "../../../lib/ResponseApiAdapter.js";
import { DileI18nMixin } from "../../../lib/DileI18nMixin.js";

export class DileStepsForm extends DileI18nMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      dile-steps {
        margin-bottom: 1rem;
      }
      .header {
        margin-bottom: 1.5rem;
        font-size: var(--dile-steps-form-header-font-size, 1rem);
        color: var(--dile-steps-form-header-color, var(--dile-on-background-color, #303030));
      }
      .title {
        font-weight: var(--dile-steps-form-title-font-weight, 600);
        color: var(--dile-on-background-color, #303030);
      }
      .separator {
        margin: 0 0.4rem;
        opacity: 0.5;
      }
      .step-label {
        opacity: 0.75;
        color: var(--dile-on-background-color, #303030);
      }
      .header:focus-visible {
        outline: 2px solid var(--dile-step-active-border-color, var(--dile-primary-dark-color, #0039cb));
        outline-offset: 2px;
      }
      dile-inline-feedback {
        margin-top: var(--dile-steps-form-feedback-margin-top, 1rem);
      }
      :host([hidefeedback]) dile-inline-feedback {
        display: none;
      }
    `,
  ];

  static get properties() {
    return {
      /** Labels of the steps. If empty, the label attribute of each dile-step-form is used */
      steps: { type: Array },
      title: { type: String },
      /** Endpoint to load the data of every step form */
      endpoint: { type: String },
      current: { type: Number },
      reached: { type: Number },
      freeNavigation: { type: Boolean },
      vertical: { type: Boolean },
      /** Default labels for the navigation buttons of every step */
      prevLabel: { type: String },
      nextLabel: { type: String },
      endLabel: { type: String },
      /** Response adapter for the initial load and, if set, for every step */
      responseAdapter: { type: Object },
      /** Hides the inline feedback messages */
      hideFeedback: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.steps = [];
    this.current = 0;
    this.reached = 0;
    this.freeNavigation = false;
    this.vertical = false;
    this.hideFeedback = false;
    this.defaultResponseAdapter = new ResponseApiAdapter();
  }

  get adapter() {
    return this.responseAdapter ?? this.defaultResponseAdapter;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("dile-step-next", this.onStepNext);
    this.addEventListener("dile-step-prev", this.onStepPrev);
    this.addEventListener("dile-step-form-loading", this.onStepLoading);
    this.addEventListener("dile-step-form-success", this.onStepSuccess);
    this.addEventListener("dile-step-form-error", this.onStepError);
    this.addEventListener("dile-step-form-label-change", this.syncStepForms);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("dile-step-next", this.onStepNext);
    this.removeEventListener("dile-step-prev", this.onStepPrev);
    this.removeEventListener("dile-step-form-loading", this.onStepLoading);
    this.removeEventListener("dile-step-form-success", this.onStepSuccess);
    this.removeEventListener("dile-step-form-error", this.onStepError);
    this.removeEventListener("dile-step-form-label-change", this.syncStepForms);
  }

  updated(changedProperties) {
    if (
      ["steps", "current", "prevLabel", "nextLabel", "endLabel", "responseAdapter", "language"].some(
        (property) => changedProperties.has(property),
      )
    ) {
      this.syncStepForms();
    }
    if (changedProperties.has("endpoint") && this.endpoint) {
      this.fetchData();
    }
    if (
      changedProperties.has("current") &&
      changedProperties.get("current") !== undefined
    ) {
      this.focusHeader();
    }
  }

  render() {
    return html`
      ${this.endpoint
        ? html`
            <dile-ajax
              id="ajaxget"
              method="get"
              url="${this.endpoint}"
              language="${this.language}"
              @ajax-success="${this.onFetchSuccess}"
              @ajax-error="${this.onFetchError}"
            ></dile-ajax>
          `
        : ""}
      ${this.headerTemplate}
      <dile-steps
        .steps=${this.stepLabels}
        current="${this.current}"
        reached="${this.reached}"
        ?freeNavigation=${this.freeNavigation}
        ?vertical=${this.vertical}
        @dile-steps-select=${this.onStepSelect}
      ></dile-steps>
      <slot @slotchange=${this.syncStepForms}></slot>
      <dile-inline-feedback id="feedback"></dile-inline-feedback>
    `;
  }

  get feedback() {
    return this.shadowRoot.getElementById("feedback");
  }

  get stepForms() {
    return [...this.querySelectorAll(":scope > dile-step-form")];
  }

  get stepLabels() {
    if (this.steps.length) {
      return this.steps;
    }
    return this.stepForms.map((stepForm) => stepForm.label ?? "");
  }

  get formElements() {
    return this.stepForms
      .map((stepForm) => stepForm.form)
      .filter((form) => form);
  }

  get currentStepLabel() {
    return this.stepLabels[this.current] ?? "";
  }

  get headerTemplate() {
    if (!this.title && !this.currentStepLabel) return "";
    return html`
      <div class="header" tabindex="-1" role="status">
        ${this.title
          ? html`<span class="title">${this.title}</span
              ><span class="separator">›</span
              ><span class="step-label">${this.currentStepLabel}</span>`
          : html`<span class="step-label">${this.currentStepLabel}</span>`}
      </div>
    `;
  }

  focusHeader() {
    this.shadowRoot.querySelector(".header")?.focus();
  }

  syncStepForms() {
    const forms = this.stepForms;
    const labels = this.stepLabels;
    forms.forEach((form, index) => {
      form.step = index;
      form.steps = labels;
      form.active = index === this.current;
      form.language = this.language;
      form.defaultLabels = {
        prev: this.prevLabel,
        next: this.nextLabel,
        end: this.endLabel,
      };
      if (this.responseAdapter) {
        form.responseAdapter = this.responseAdapter;
      }
    });
    if (this.steps.length && forms.length && forms.length !== this.steps.length) {
      console.warn(
        `[dile-steps-form] The number of <dile-step-form> elements (${forms.length}) does not match steps.length (${this.steps.length}).`,
      );
    }
    this.requestUpdate();
  }

  dispatchLoading(loading) {
    this.dispatchEvent(
      new CustomEvent("dile-steps-form-loading", {
        bubbles: true,
        composed: true,
        detail: { loading },
      }),
    );
  }

  fetchData() {
    this.dispatchLoading(true);
    this.shadowRoot.getElementById("ajaxget")?.generateRequest();
  }

  async onFetchSuccess(e) {
    this.adapter.setResponse(e.detail);
    const data = this.adapter.getData();
    await Promise.all(this.formElements.map((form) => form.updateComplete));
    this.setData(data);
    this.dispatchLoading(false);
    this.dispatchEvent(
      new CustomEvent("dile-steps-form-loaded", {
        bubbles: true,
        composed: true,
        detail: { data },
      }),
    );
  }

  onFetchError(e) {
    this.dispatchLoading(false);
    this.dispatchEvent(
      new CustomEvent("dile-steps-form-error", {
        bubbles: true,
        composed: true,
        detail: {
          message: e.detail.message,
          data: e.detail.data,
          errors: e.detail.errors,
          status: e.detail.status,
        },
      }),
    );
  }

  /** Loads again the data of every step form from the endpoint */
  reload() {
    if (this.endpoint) {
      this.fetchData();
    }
  }

  /** Sets the same data in the form of every step */
  setData(data) {
    this.formElements.forEach((form) => form.setData(data));
  }

  onStepLoading(e) {
    if (e.detail.loading) {
      this.feedback?.clear();
    }
  }

  onStepSuccess(e) {
    this.stepForms
      .filter((stepForm) => stepForm.refreshOnSave && !e.composedPath().includes(stepForm))
      .forEach((stepForm) => stepForm.form?.setData(e.detail.data));
    this.feedback?.positiveFeedbackWithDelay(
      e.detail.message || this.translations?.step_success || "Data saved",
      5000,
    );
  }

  onStepError(e) {
    this.feedback?.negativeFeedbackWithDelay(
      e.detail.message || this.translations?.step_error || "Data could not be saved",
      5000,
    );
  }

  onStepNext(e) {
    e.stopPropagation();
    const next = this.current + 1;
    if (next < this.stepForms.length && !e.detail.alternativeExit) {
      this.navigateTo(next);
    } else {
      this.dispatchEvent(
        new CustomEvent("dile-steps-form-complete", {
          bubbles: true,
          composed: true,
          detail: {
            data: e.detail.data,
            alternativeExit: Boolean(e.detail.alternativeExit),
          },
        }),
      );
    }
  }

  onStepPrev(e) {
    e.stopPropagation();
    this.feedback?.clear();
    this.navigateTo(this.current - 1);
  }

  onStepSelect(e) {
    e.stopPropagation();
    this.feedback?.clear();
    this.navigateTo(e.detail.index);
  }

  /** Shows the step at the given zero-based index */
  navigateTo(index) {
    if (index < 0 || index >= this.stepForms.length) return;
    this.current = index;
    if (index > this.reached) this.reached = index;
    this.stepForms.forEach((stepForm, i) => {
      stepForm.active = i === index;
    });
  }

  next() {
    this.navigateTo(this.current + 1);
  }

  prev() {
    this.navigateTo(this.current - 1);
  }
}
