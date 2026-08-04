import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandCss3 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5l16 0" /> <path d="M8.5 8h7l-4.5 4h4l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brand-css3', DileIconlibBrandCss3);
