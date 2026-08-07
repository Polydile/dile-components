import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibHeading extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 12h12" /> <path d="M6 20V4" /> <path d="M18 20V4" /></svg>`;
  }
}

if (!customElements.get('dile-lucide-icon-heading')) {
  customElements.define('dile-lucide-icon-heading', DileIconlibHeading);
}
