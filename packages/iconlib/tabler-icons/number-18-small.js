import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumber18Small extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 8h1v8" /> <path d="M15 12h-1a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-number-18-small')) {
  customElements.define('dile-tabler-icon-number-18-small', DileIconlibNumber18Small);
}
