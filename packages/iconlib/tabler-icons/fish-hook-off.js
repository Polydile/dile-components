import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFishHookOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M16 9v3m-.085 3.924a5 5 0 0 1 -9.915 -.924v-4l3 3" /> <path d="M14 7a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /> <path d="M16 5v-2" /> <path d="M3 3l18 18" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-fish-hook-off')) {
  customElements.define('dile-tabler-icon-fish-hook-off', DileIconlibFishHookOff);
}
