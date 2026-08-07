import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCircleLetterD extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M10 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-circle-letter-d')) {
  customElements.define('dile-tabler-icon-circle-letter-d', DileIconlibCircleLetterD);
}
