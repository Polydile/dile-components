import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCircleCaretUp extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 9l4 4h-8l4 -4" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-circle-caret-up')) {
  customElements.define('dile-tabler-icon-circle-caret-up', DileIconlibCircleCaretUp);
}
