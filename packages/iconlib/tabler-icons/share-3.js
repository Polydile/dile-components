import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibShare3 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-share-3')) {
  customElements.define('dile-tabler-icon-share-3', DileIconlibShare3);
}
