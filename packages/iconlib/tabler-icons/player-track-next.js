import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPlayerTrackNext extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 5v14l8 -7l-8 -7" /> <path d="M14 5v14l8 -7l-8 -7" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-player-track-next', DileIconlibPlayerTrackNext);
