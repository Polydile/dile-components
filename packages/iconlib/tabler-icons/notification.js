import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNotification extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 6h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /> <path d="M14 7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-notification', DileIconlibNotification);
