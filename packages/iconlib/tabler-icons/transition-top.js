import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTransitionTop extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 6a3 3 0 0 0 -3 -3h-12a3 3 0 0 0 -3 3" /> <path d="M6 21h12a3 3 0 0 0 0 -6h-12a3 3 0 0 0 0 6" /> <path d="M12 15v-8" /> <path d="M9 10l3 -3l3 3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-transition-top')) {
  customElements.define('dile-tabler-icon-transition-top', DileIconlibTransitionTop);
}
