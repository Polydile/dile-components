import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandFramerMotion extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 12l-8 -8v16l16 -16v16l-4 -4" /> <path d="M20 12l-8 8l-4 -4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-framer-motion')) {
  customElements.define('dile-tabler-icon-brand-framer-motion', DileIconlibBrandFramerMotion);
}
