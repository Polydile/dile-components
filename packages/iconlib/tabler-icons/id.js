import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibId extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -10" /> <path d="M7 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M15 8l2 0" /> <path d="M15 12l2 0" /> <path d="M7 16l10 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-id')) {
  customElements.define('dile-tabler-icon-id', DileIconlibId);
}
