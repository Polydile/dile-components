import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRoute2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /> <path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4" /> <path d="M14 5a2 2 0 0 0 -2 2v10a2 2 0 0 1 -2 2" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-route-2', DileIconlibRoute2);
