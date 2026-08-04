import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrightnessDown extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M12 5l0 .01" /> <path d="M17 7l0 .01" /> <path d="M19 12l0 .01" /> <path d="M17 17l0 .01" /> <path d="M12 19l0 .01" /> <path d="M7 17l0 .01" /> <path d="M5 12l0 .01" /> <path d="M7 7l0 .01" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brightness-down', DileIconlibBrightnessDown);
