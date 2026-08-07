import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChevronRightPipe extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 6l6 6l-6 6" /> <path d="M17 5v13" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-chevron-right-pipe')) {
  customElements.define('dile-tabler-icon-chevron-right-pipe', DileIconlibChevronRightPipe);
}
