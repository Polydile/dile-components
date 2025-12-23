import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRows3 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect width="18" height="18" x="3" y="3" rx="2" /> <path d="M21 9H3" /> <path d="M21 15H3" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-rows-3', DileIconlibRows3);
