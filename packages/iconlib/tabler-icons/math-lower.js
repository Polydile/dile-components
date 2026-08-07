import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMathLower extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M19 18l-14 -6l14 -6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-math-lower')) {
  customElements.define('dile-tabler-icon-math-lower', DileIconlibMathLower);
}
