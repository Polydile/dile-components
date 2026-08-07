import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterB extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 20v-16h6a4 4 0 0 1 0 8a4 4 0 0 1 0 8h-6" /> <path d="M7 12l6 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-letter-b')) {
  customElements.define('dile-tabler-icon-letter-b', DileIconlibLetterB);
}
