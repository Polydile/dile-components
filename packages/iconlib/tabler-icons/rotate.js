import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRotate extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-rotate')) {
  customElements.define('dile-tabler-icon-rotate', DileIconlibRotate);
}
