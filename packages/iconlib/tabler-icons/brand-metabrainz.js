import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandMetabrainz extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 7v10l7 4v-18l-7 4" /> <path d="M21 7v10l-7 4v-18l7 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-metabrainz')) {
  customElements.define('dile-tabler-icon-brand-metabrainz', DileIconlibBrandMetabrainz);
}
