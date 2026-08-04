import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMathXDivideY extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 3l6 6" /> <path d="M9 9l6 -6" /> <path d="M9 15l3 4.5" /> <path d="M15 15l-4.5 7" /> <path d="M5 12h14" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-math-x-divide-y', DileIconlibMathXDivideY);
