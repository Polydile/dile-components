import { LitElement, html, css } from 'lit';
import { DileInput } from "@dile/dile-input";
import "@dile/dile-icon/dile-icon.js";
import { closeIcon } from "@dile/icons";

export class DileColorpicker extends DileInput {
  static get styles() {
    return [
      super.styles,
      css`
        div.container {
          display: flex;
          align-items: center;
        }
        dile-icon.trigger-disabled {
          --dile-icon-color: var(
            --dile-colorpicker-trigger-disabled-color,
            #ccc
          );
        }
        input {
          padding: var(--dile-colorpicker-padding, 0px);
          width: var(--dile-colorpicker-width, 35px);
          height: var(--dile-colorpicker-height, 35px);
          border-style: var(--dile-colorpicker-border-style, none);
          border-color: var(--dile-colorpicker-border-color, none);
        }
      `,
    ];
  }

  static get properties() {
    return {
      color: { type: String },
    };
  }

  constructor() {
    super();
    this.color = "#00000";
  }

  render() {
    return html`
      <div class="container">
        <section class="input">
          <input
            type="color"
            @input="${this._onColorPicked}"
            .value="${this.color}"
            ?disabled="${this.disabled}"
          />
          ${this.disabled
            ? html`<dile-icon
                class="trigger-disabled"
                .icon="${closeIcon}"
              ></dile-icon>`
            : html``}
        </section>
      </div>
    `;
  }

  _onColorPicked(e) {
    this.color = e.target.value;
    this.dispatchEvent(
      new CustomEvent("color-changed", { detail: { color: this.color } })
    );
  }
}
