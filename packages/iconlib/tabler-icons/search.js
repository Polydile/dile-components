import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSearch extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /> <path d="M21 21l-6 -6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-search')) {
  customElements.define('dile-tabler-icon-search', DileIconlibSearch);
}
