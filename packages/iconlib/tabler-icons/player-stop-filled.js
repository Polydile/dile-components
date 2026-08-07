import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPlayerStopFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-player-stop-filled')) {
  customElements.define('dile-tabler-icon-player-stop-filled', DileIconlibPlayerStopFilled);
}
