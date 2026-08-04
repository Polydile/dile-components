import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCornerLeftUpDouble extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 19h-6a3 3 0 0 1 -3 -3v-7" /> <path d="M13 13l-4 -4l-4 4m8 -5l-4 -4l-4 4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-corner-left-up-double', DileIconlibCornerLeftUpDouble);
