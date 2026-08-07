import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibClockRecord extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 12.3a9 9 0 1 0 -8.683 8.694" /> <path d="M12 7v5l2 2" /> <path d="M16 19a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-clock-record')) {
  customElements.define('dile-tabler-icon-clock-record', DileIconlibClockRecord);
}
