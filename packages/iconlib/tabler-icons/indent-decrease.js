import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibIndentDecrease extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20 6l-7 0" /> <path d="M20 12l-9 0" /> <path d="M20 18l-7 0" /> <path d="M8 8l-4 4l4 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-indent-decrease')) {
  customElements.define('dile-tabler-icon-indent-decrease', DileIconlibIndentDecrease);
}
