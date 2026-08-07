import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandStrava extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 13l-5 -10l-5 10m6 0l4 8l4 -8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-strava')) {
  customElements.define('dile-tabler-icon-brand-strava', DileIconlibBrandStrava);
}
