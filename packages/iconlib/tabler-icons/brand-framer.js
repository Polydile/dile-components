import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandFramer extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 15h12l-12 -12h12v6h-12v6l6 6v-6" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brand-framer', DileIconlibBrandFramer);
