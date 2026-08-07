import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibXxx extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 8l4 8" /> <path d="M10 16l4 -8" /> <path d="M17 8l4 8" /> <path d="M17 16l4 -8" /> <path d="M3 8l4 8" /> <path d="M3 16l4 -8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-xxx')) {
  customElements.define('dile-tabler-icon-xxx', DileIconlibXxx);
}
