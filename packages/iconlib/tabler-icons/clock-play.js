import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibClockPlay extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 7v5l2 2" /> <path d="M17 22l5 -3l-5 -3l0 6" /> <path d="M13.017 20.943a9 9 0 1 1 7.831 -7.292" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-clock-play')) {
  customElements.define('dile-tabler-icon-clock-play', DileIconlibClockPlay);
}
