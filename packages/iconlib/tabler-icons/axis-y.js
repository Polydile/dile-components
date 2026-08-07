import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAxisY extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 20h-.01" /> <path d="M15 20h-.01" /> <path d="M19 20h-.01" /> <path d="M4 7l3 -3l3 3" /> <path d="M7 20v-16" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-axis-y')) {
  customElements.define('dile-tabler-icon-axis-y', DileIconlibAxisY);
}
