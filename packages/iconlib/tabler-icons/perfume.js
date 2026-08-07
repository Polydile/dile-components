import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPerfume extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 6v3" /> <path d="M14 6v3" /> <path d="M5 11a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -8" /> <path d="M10 15a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M9 3h6v3h-6l0 -3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-perfume')) {
  customElements.define('dile-tabler-icon-perfume', DileIconlibPerfume);
}
