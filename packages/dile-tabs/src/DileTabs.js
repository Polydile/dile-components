import { html, css, LitElement } from "lit";
import { DileSelectorMixin } from "@dile/dile-selector-mixin";

export class DileTabs extends DileSelectorMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
      }
    `;
  }
}
