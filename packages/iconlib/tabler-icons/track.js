import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTrack extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 15l11 -11m5 5l-11 11m-4 -8l7 7m-3.5 -10.5l7 7m-3.5 -10.5l7 7" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-track', DileIconlibTrack);
