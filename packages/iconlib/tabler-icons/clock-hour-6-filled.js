import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibClockHour6Filled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-6 12.16a1 1 0 0 0 2 0v-8.5a1 1 0 0 0 -2 0z" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-clock-hour-6-filled', DileIconlibClockHour6Filled);
