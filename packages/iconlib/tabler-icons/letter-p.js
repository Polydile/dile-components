import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterP extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 20v-16h5.5a4 4 0 0 1 0 9h-5.5" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-letter-p', DileIconlibLetterP);
