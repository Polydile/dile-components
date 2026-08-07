import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRuler2Off extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12.03 7.97l4.97 -4.97l4 4l-5 5m-2 2l-7 7l-4 -4l7 -7" /> <path d="M16 7l-1.5 -1.5" /> <path d="M10 13l-1.5 -1.5" /> <path d="M7 16l-1.5 -1.5" /> <path d="M3 3l18 18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-ruler-2-off')) {
  customElements.define('dile-tabler-icon-ruler-2-off', DileIconlibRuler2Off);
}
