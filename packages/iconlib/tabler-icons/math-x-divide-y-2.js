import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMathXDivideY2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 21l18 -18" /> <path d="M15 14l3 4.5" /> <path d="M21 14l-4.5 7" /> <path d="M3 4l6 6" /> <path d="M3 10l6 -6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-math-x-divide-y-2')) {
  customElements.define('dile-tabler-icon-math-x-divide-y-2', DileIconlibMathXDivideY2);
}
