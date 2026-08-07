import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterL extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 4v16h10" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-letter-l')) {
  customElements.define('dile-tabler-icon-letter-l', DileIconlibLetterL);
}
