import { html, css, LitElement } from "lit";
import { DileSelectable } from "../../../mixins/selectable";

export class DileBoxSelector extends DileSelectable(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
}

