import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibXboxA extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9" /> <path d="M15 16l-3 -8l-3 8" /> <path d="M14 14h-4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-xbox-a')) {
  customElements.define('dile-tabler-icon-xbox-a', DileIconlibXboxA);
}
