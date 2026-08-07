import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandCodepen extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 15l9 6l9 -6l-9 -6l-9 6" /> <path d="M3 9l9 6l9 -6l-9 -6l-9 6" /> <path d="M3 9l0 6" /> <path d="M21 9l0 6" /> <path d="M12 3l0 6" /> <path d="M12 15l0 6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-codepen')) {
  customElements.define('dile-tabler-icon-brand-codepen', DileIconlibBrandCodepen);
}
