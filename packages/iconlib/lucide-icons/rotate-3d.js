import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRotate3d extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m15.194 13.707 3.814 1.86-1.86 3.814" /> <path d="M16.47214 7.52786 A 5 10 0 1 0 13 21.79796" /> <path d="M21.79796 11 A 10 5 0 1 0 19 15.57071" /></svg>`;
  }
}

if (!customElements.get('dile-lucide-icon-rotate-3d')) {
  customElements.define('dile-lucide-icon-rotate-3d', DileIconlibRotate3d);
}
