import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMailPause extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M13 19h-8a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6" /> <path d="M3 7l9 6l9 -6" /> <path d="M17 17v5" /> <path d="M21 17v5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-mail-pause')) {
  customElements.define('dile-tabler-icon-mail-pause', DileIconlibMailPause);
}
