import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumber11Small extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 8h1v8" /> <path d="M14 8h1v8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-number-11-small')) {
  customElements.define('dile-tabler-icon-number-11-small', DileIconlibNumber11Small);
}
