import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrightnessHalf extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 9a3 3 0 0 0 0 6v-6" /> <path d="M6 6h3.5l2.5 -2.5l2.5 2.5h3.5v3.5l2.5 2.5l-2.5 2.5v3.5h-3.5l-2.5 2.5l-2.5 -2.5h-3.5v-3.5l-2.5 -2.5l2.5 -2.5l0 -3.5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brightness-half')) {
  customElements.define('dile-tabler-icon-brightness-half', DileIconlibBrightnessHalf);
}
