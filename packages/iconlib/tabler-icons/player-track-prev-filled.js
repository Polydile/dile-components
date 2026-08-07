import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPlayerTrackPrevFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M20.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" /> <path d="M9.341 4.247l-8 7a1 1 0 0 0 0 1.506l8 7c.647 .565 1.659 .106 1.659 -.753v-14c0 -.86 -1.012 -1.318 -1.659 -.753z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-player-track-prev-filled')) {
  customElements.define('dile-tabler-icon-player-track-prev-filled', DileIconlibPlayerTrackPrevFilled);
}
