import { LitElement, html, css } from "lit";
import "../../ajax/ajax.js";
import { ResponseApiAdapter } from "../../../lib/ResponseApiAdapter.js";
import "../step-next-prev.js";

export class DileStepForm extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      :host(:not([active])) {
        display: none;
      }
    `,
  ];

  static get properties() {
    return {
      /** Label of the step, shown in the steps indicator */
      label: { type: String },
      /** The step is the visible one. Managed by dile-steps-form */
      active: { type: Boolean, reflect: true },
      /** Endpoint where the step data is saved */
      endpoint: { type: String },
      /** HTTP method used to save the step */
      method: { type: String },
      /** Zero-based index of the step, set by dile-steps-form */
      step: { type: Number },
      /** Labels of all the steps, set by dile-steps-form */
      steps: { type: Array },
      /** Shows the alternative exit link in this step */
      alternativeExit: { type: Boolean },
      alternativeExitLabel: { type: String },
      /** Name of the field added to the payload when the alternative exit is used. Empty to not send it */
      alternativeExitField: { type: String },
      prevLabel: { type: String },
      nextLabel: { type: String },
      endLabel: { type: String },
      /** Default labels, set by dile-steps-form: { prev, next, end } */
      defaultLabels: { type: Object },
      /** The form of this step receives the data returned when another step is saved */
      refreshOnSave: { type: Boolean },
      sendDataAsFormData: { type: Boolean },
      responseAdapter: { type: Object },
      language: { type: String },
      loading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.active = false;
    this.method = "patch";
    this.steps = [];
    this.alternativeExit = false;
    this.alternativeExitField = "alternativeExit";
    this.defaultLabels = {};
    this.refreshOnSave = false;
    this.sendDataAsFormData = false;
    this.language = "en";
    this.loading = false;
    this.alternativeExitRequested = false;
    this.defaultResponseAdapter = new ResponseApiAdapter();
  }

  get elajax() {
    return this.shadowRoot.getElementById("ajaxsave");
  }

  get form() {
    return this.querySelector('[slot="form"]');
  }

  get adapter() {
    return this.responseAdapter ?? this.defaultResponseAdapter;
  }

  updated(changedProperties) {
    if (
      changedProperties.has("label") &&
      changedProperties.get("label") !== undefined
    ) {
      this.dispatchEvent(
        new CustomEvent("dile-step-form-label-change", {
          bubbles: true,
          detail: { label: this.label },
        }),
      );
    }
  }

  render() {
    return html`
      <dile-ajax
        id="ajaxsave"
        method="${this.method}"
        url="${this.endpoint}"
        language="${this.language}"
        ?sendDataAsFormData=${this.sendDataAsFormData}
        @ajax-success="${this.doSuccessSave}"
        @ajax-error="${this.doErrorSave}"
      ></dile-ajax>
      <slot name="form"></slot>
      <dile-step-next-prev
        .current=${this.step}
        .steps=${this.steps}
        ?alternativeExit=${this.alternativeExit}
        .alternativeExitLabel=${this.alternativeExitLabel}
        .prevLabel=${this.prevLabel || this.defaultLabels?.prev}
        .nextLabel=${this.nextLabel || this.defaultLabels?.next}
        .endLabel=${this.endLabel || this.defaultLabels?.end}
        language="${this.language}"
        ?loading=${this.loading}
        @dile-step-next-click=${this.next}
        @dile-step-alternative-exit=${this.alternativeNext}
        @dile-step-prev-click=${this.navigatePrev}
      ></dile-step-next-prev>
    `;
  }

  next() {
    this.submit(false);
  }

  alternativeNext() {
    this.submit(true);
  }

  submit(alternativeExit) {
    const form = this.form;
    if (!form) {
      throw new Error(
        `[dile-step-form] No element with slot="form" was found in step ${this.step + 1}. The form element must have the slot="form" attribute.`,
      );
    }
    const data = form.getData();
    if (alternativeExit && this.alternativeExitField) {
      data[this.alternativeExitField] = true;
    }
    this.alternativeExitRequested = alternativeExit;
    this.setLoading(true);
    this.elajax.data = data;
    this.elajax.generateRequest();
  }

  setLoading(loading) {
    this.loading = loading;
    this.dispatchEvent(
      new CustomEvent("dile-step-form-loading", {
        bubbles: true,
        composed: true,
        detail: { loading },
      }),
    );
  }

  doSuccessSave(e) {
    const alternativeExit = this.alternativeExitRequested;
    this.alternativeExitRequested = false;
    this.setLoading(false);
    this.adapter.setResponse(e.detail);
    const data = this.adapter.getData();
    this.dispatchEvent(
      new CustomEvent("dile-step-form-success", {
        bubbles: true,
        composed: true,
        detail: { message: this.adapter.getMessage(), data },
      }),
    );
    this.dispatchEvent(
      new CustomEvent("dile-step-next", {
        bubbles: true,
        detail: { data, alternativeExit },
      }),
    );
  }

  doErrorSave(e) {
    this.alternativeExitRequested = false;
    this.setLoading(false);
    this.adapter.setResponse(e.detail);
    const errors = this.adapter.getValidationErrors();
    this.dispatchEvent(
      new CustomEvent("dile-step-form-error", {
        bubbles: true,
        composed: true,
        detail: { message: e.detail.message, errors, status: e.detail.status },
      }),
    );
    this.form?.showErrors(errors);
  }

  navigatePrev() {
    this.dispatchEvent(
      new CustomEvent("dile-step-prev", {
        bubbles: true,
        detail: { index: this.step - 1 },
      }),
    );
  }
}
