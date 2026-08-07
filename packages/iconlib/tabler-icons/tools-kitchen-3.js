import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibToolsKitchen3 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 4v17m-3 -17v3a3 3 0 1 0 6 0v-3" /> <path d="M14 8a3 4 0 1 0 6 0a3 4 0 1 0 -6 0" /> <path d="M17 12v9" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-tools-kitchen-3')) {
  customElements.define('dile-tabler-icon-tools-kitchen-3', DileIconlibToolsKitchen3);
}
