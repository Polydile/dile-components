import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMessagePause extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 9h8" /> <path d="M8 13h6" /> <path d="M13 18l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6" /> <path d="M17 17v5" /> <path d="M21 17v5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-message-pause')) {
  customElements.define('dile-tabler-icon-message-pause', DileIconlibMessagePause);
}
