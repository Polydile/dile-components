import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStairs extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M22 5h-5v5h-5v5h-5v5h-5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-stairs')) {
  customElements.define('dile-tabler-icon-stairs', DileIconlibStairs);
}
