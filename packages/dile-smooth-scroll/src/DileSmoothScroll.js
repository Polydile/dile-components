import { LitElement } from "lit";
import { DileSmoothScrollMixin } from "./DileSmoothScrollMixin";
import { DileSmoothScrollElementMixin } from "./DileSmoothScrollElementMixin";

export class DileSmoothScroll extends DileSmoothScrollMixin(
  DileSmoothScrollElementMixin(LitElement)
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
