import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandCouchdb extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 12h12v-2a2 2 0 0 1 2 -2a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2a2 2 0 0 1 2 2v2" /> <path d="M6 15h12" /> <path d="M6 18h12" /> <path d="M21 11v7" /> <path d="M3 11v7" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-couchdb')) {
  customElements.define('dile-tabler-icon-brand-couchdb', DileIconlibBrandCouchdb);
}
