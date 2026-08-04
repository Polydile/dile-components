import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFlag2Off extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 14h9m4 0h1v-9h-10m-4 0v16" /> <path d="M3 3l18 18" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-flag-2-off', DileIconlibFlag2Off);
