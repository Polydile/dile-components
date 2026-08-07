import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCloudSnow extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /> <path d="M11 15v.01m0 3v.01m0 3v.01m4 -4v.01m0 3v.01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-cloud-snow')) {
  customElements.define('dile-tabler-icon-cloud-snow', DileIconlibCloudSnow);
}
