import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPlaylist extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M17 17v-13h4" /> <path d="M13 5h-10" /> <path d="M3 9l10 0" /> <path d="M9 13h-6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-playlist')) {
  customElements.define('dile-tabler-icon-playlist', DileIconlibPlaylist);
}
