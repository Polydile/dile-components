import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSquareRotatedForbid extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M13.446 2.6l7.955 7.954a2.045 2.045 0 0 1 0 2.892l-7.955 7.955a2.045 2.045 0 0 1 -2.892 0l-7.955 -7.955a2.045 2.045 0 0 1 0 -2.892l7.955 -7.955a2.045 2.045 0 0 1 2.892 0" /> <path d="M9.5 14.5l5 -5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-square-rotated-forbid')) {
  customElements.define('dile-tabler-icon-square-rotated-forbid', DileIconlibSquareRotatedForbid);
}
