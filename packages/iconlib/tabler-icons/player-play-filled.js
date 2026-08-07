import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPlayerPlayFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-player-play-filled')) {
  customElements.define('dile-tabler-icon-player-play-filled', DileIconlibPlayerPlayFilled);
}
