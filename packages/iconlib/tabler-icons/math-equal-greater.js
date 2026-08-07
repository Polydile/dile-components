import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMathEqualGreater extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 18l14 -4" /> <path d="M5 14l14 -4l-14 -4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-math-equal-greater')) {
  customElements.define('dile-tabler-icon-math-equal-greater', DileIconlibMathEqualGreater);
}
