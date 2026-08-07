import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6l0 -7" /> <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-bold')) {
  customElements.define('dile-tabler-icon-bold', DileIconlibBold);
}
