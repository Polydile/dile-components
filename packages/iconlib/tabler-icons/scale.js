import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibScale extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 20l10 0" /> <path d="M6 6l6 -1l6 1" /> <path d="M12 3l0 17" /> <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" /> <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-scale')) {
  customElements.define('dile-tabler-icon-scale', DileIconlibScale);
}
