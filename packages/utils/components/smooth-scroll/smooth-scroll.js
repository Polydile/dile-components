import { DileSmoothScroll } from './src/DileSmoothScroll.js';

if (!customElements.get("dile-smooth-scroll")) {
  window.customElements.define("dile-smooth-scroll", DileSmoothScroll);
}
