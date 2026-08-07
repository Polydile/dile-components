import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLetterW extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 4l4 16l4 -14l4 14l4 -16" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-letter-w')) {
  customElements.define('dile-tabler-icon-letter-w', DileIconlibLetterW);
}
