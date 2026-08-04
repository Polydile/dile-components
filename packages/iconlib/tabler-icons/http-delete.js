import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibHttpDelete extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2l-2 0" /> <path d="M14 8h-4v8h4" /> <path d="M10 12h2.5" /> <path d="M17 8v8h4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-http-delete', DileIconlibHttpDelete);
