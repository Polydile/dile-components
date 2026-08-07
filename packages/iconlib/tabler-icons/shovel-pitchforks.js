import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibShovelPitchforks extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 3h4" /> <path d="M7 3v12" /> <path d="M4 15h6v3a3 3 0 0 1 -6 0v-3" /> <path d="M14 21v-3a3 3 0 0 1 6 0v3" /> <path d="M17 21v-18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-shovel-pitchforks')) {
  customElements.define('dile-tabler-icon-shovel-pitchforks', DileIconlibShovelPitchforks);
}
