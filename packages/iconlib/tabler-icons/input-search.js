import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibInputSearch extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20 11v-2a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h5" /> <path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M20.2 20.2l1.8 1.8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-input-search')) {
  customElements.define('dile-tabler-icon-input-search', DileIconlibInputSearch);
}
