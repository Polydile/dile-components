import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNfc extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 20a3 3 0 0 1 -3 -3v-11l5 5" /> <path d="M13 4a3 3 0 0 1 3 3v11l-5 -5" /> <path d="M4 7a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3l0 -10" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-nfc')) {
  customElements.define('dile-tabler-icon-nfc', DileIconlibNfc);
}
