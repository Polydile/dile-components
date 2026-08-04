import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandPrintables extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 21l12 -7v-7.5l-6 -3.5l-6 3.5l6 3.5v7.5l-6 -3.5l0 7" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brand-printables', DileIconlibBrandPrintables);
