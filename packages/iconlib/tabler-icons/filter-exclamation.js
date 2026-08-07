import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFilterExclamation extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227" /> <path d="M19 16v3" /> <path d="M19 22v.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-filter-exclamation')) {
  customElements.define('dile-tabler-icon-filter-exclamation', DileIconlibFilterExclamation);
}
