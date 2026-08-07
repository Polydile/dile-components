import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumber4Small extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 8v3a1 1 0 0 0 1 1h3" /> <path d="M14 8v8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-number-4-small')) {
  customElements.define('dile-tabler-icon-number-4-small', DileIconlibNumber4Small);
}
