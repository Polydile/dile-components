import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterY extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 4l5 9l5 -9" /> <path d="M12 13l0 7" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-letter-y', DileIconlibLetterY);
