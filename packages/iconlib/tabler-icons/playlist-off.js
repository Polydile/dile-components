import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPlaylistOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 14a3 3 0 1 0 3 3" /> <path d="M17 13v-9h4" /> <path d="M13 5h-4m-4 0h-2" /> <path d="M3 9h6" /> <path d="M9 13h-6" /> <path d="M3 3l18 18" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-playlist-off', DileIconlibPlaylistOff);
