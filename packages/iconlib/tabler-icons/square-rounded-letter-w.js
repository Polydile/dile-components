import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSquareRoundedLetterW extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 8l1 8l2 -5l2 5l1 -8" /> <path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-square-rounded-letter-w')) {
  customElements.define('dile-tabler-icon-square-rounded-letter-w', DileIconlibSquareRoundedLetterW);
}
