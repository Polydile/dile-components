import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAuth2fa extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 16h-4l3.47 -4.66a2 2 0 1 0 -3.47 -1.54" /> <path d="M10 16v-8h4" /> <path d="M10 12l3 0" /> <path d="M17 16v-6a2 2 0 0 1 4 0v6" /> <path d="M17 13l4 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-auth-2fa', DileIconlibAuth2fa);
