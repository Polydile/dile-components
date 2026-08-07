import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowNarrowDown extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 5l0 14" /> <path d="M16 15l-4 4" /> <path d="M8 15l4 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrow-narrow-down')) {
  customElements.define('dile-tabler-icon-arrow-narrow-down', DileIconlibArrowNarrowDown);
}
