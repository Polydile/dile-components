import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMathEqualLower extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M19 18l-14 -4" /> <path d="M19 14l-14 -4l14 -4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-math-equal-lower', DileIconlibMathEqualLower);
