import { html, css, LitElement } from "lit";
import { DileSelectorItemMixin } from "@dile/dile-selector-mixin";

export class DileTab  extends DileSelectorItemMixin(LitElement) {

  static get styles() {
    return css`
      :host {
        display: inline-block;
        margin: 0 3px;
      }
      article {
        border-top-left-radius: var(--dile-tab-border-radius, 4px);
        border-top-right-radius: var(--dile-tab-border-radius, 4px);
        transition: all 0.3s ease;
        color: var(--dile-tab-text-color, #666);
        background-color: var(--dile-tab-background-color, transparent);
        cursor: pointer;
        border: var(--dile-tab-border, none);
        font-weight: var(--dile-tab-font-weight, normal);
        font-size: var(--dile-tab-font-size, 1rem);
      }
      div.label {
        padding: var(--dile-label-padding, 8px 12px 6px 12px);
        text-transform: var(--dile-tab-text-transform, uppercase);
        white-space: nowrap;
      }
      .selected {
        background-color: var(--dile-tab-selected-background-color, #039be5);
        color: var(--dile-tab-selected-text-color, #fff);
        border: var(--dile-tab-selected-border, none);
      }
      span {
        display: block;
        height: var(--dile-tab-selected-line-height, 5px);
        width: 0;
        background-color: var(--dile-tab-selected-line-color, #0070c0);
        transition: width 0.3s ease;
      }
      .markselected {
        width: 100%;
      }
      .line {
        display: flex;
        justify-content: center;
      }
    `;
  }

  render() {
    return html`
      <article @click='${this.select}' class="${this.selected ? 'selected' : ''}">
        <div class="label"><slot></slot></div>
        <div class="line">
          <span class="${this.selected ? 'markselected' : ''}"></span>
        </div>
      </article>
    `;
  }
}
