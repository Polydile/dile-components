import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibProtocol extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 6l-7 12" /> <path d="M20 6l-7 12" /> <path d="M5 14v.015" /> <path d="M5 10.015v.015" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-protocol', DileIconlibProtocol);
