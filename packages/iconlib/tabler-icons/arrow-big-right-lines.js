import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowBigRightLines extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3" /> <path d="M3 9v6" /> <path d="M6 9v6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-big-right-lines')) {
  customElements.define('dile-tabler-icon-arrow-big-right-lines', DileIconlibArrowBigRightLines);
}
