import { html, css, LitElement } from "lit";
import { DileSelectable } from "../../../mixins/selectable/index.js";

export class DileTabs extends DileSelectable(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
      }
    `;
  }
}
