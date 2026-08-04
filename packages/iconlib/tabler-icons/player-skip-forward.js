import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPlayerSkipForward extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 5v14l12 -7l-12 -7" /> <path d="M20 5l0 14" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-player-skip-forward', DileIconlibPlayerSkipForward);
