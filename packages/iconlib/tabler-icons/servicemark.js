import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibServicemark extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /> <path d="M13 15v-6l3 4l3 -4v6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-servicemark')) {
  customElements.define('dile-tabler-icon-servicemark', DileIconlibServicemark);
}
