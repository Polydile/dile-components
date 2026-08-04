import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibUmbrellaOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 12h-8c0 -2.209 .895 -4.208 2.342 -5.656m2.382 -1.645a8 8 0 0 1 11.276 7.301l-4 0" /> <path d="M12 12v6a2 2 0 1 0 4 0" /> <path d="M3 3l18 18" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-umbrella-off', DileIconlibUmbrellaOff);
