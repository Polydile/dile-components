import { LitElement } from "lit";
import { DileSmoothScroll as SmoothScrollMixin } from "../../../mixins/smooth-scroll/index.js";
import { DileSmoothScrollElement } from "../../../mixins/smooth-scroll/index.js";

export class DileSmoothScroll extends SmoothScrollMixin (
  DileSmoothScrollElement(LitElement)
) {
  static get properties() {
    return {
      scrollToElementOnInit: { type: String },
    };
  }

  firstUpdated() {
    if (this.scrollToElementOnInit) {
      const el = document.getElementById(this.scrollToElementOnInit);
      if (el) {
        setTimeout(() => this.smoothScrollElementIntoView(el), 500);
      }
    }
  }
}
