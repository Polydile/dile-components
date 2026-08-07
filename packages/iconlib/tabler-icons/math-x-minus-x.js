import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMathXMinusX extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M2 9l6 6" /> <path d="M2 15l6 -6" /> <path d="M16 9l6 6" /> <path d="M16 15l6 -6" /> <path d="M10 12h4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-math-x-minus-x')) {
  customElements.define('dile-tabler-icon-math-x-minus-x', DileIconlibMathXMinusX);
}
