import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTrademark extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4.5 9h5m-2.5 0v6" /> <path d="M13 15v-6l3 4l3 -4v6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-trademark')) {
  customElements.define('dile-tabler-icon-trademark', DileIconlibTrademark);
}
