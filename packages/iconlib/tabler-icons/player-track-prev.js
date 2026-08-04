import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPlayerTrackPrev extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 5v14l-8 -7l8 -7" /> <path d="M10 5v14l-8 -7l8 -7" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-player-track-prev', DileIconlibPlayerTrackPrev);
