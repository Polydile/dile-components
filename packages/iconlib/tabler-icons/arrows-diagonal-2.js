import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsDiagonal2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M16 20l4 0l0 -4" /> <path d="M14 14l6 6" /> <path d="M8 4l-4 0l0 4" /> <path d="M4 4l6 6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrows-diagonal-2')) {
  customElements.define('dile-tabler-icon-arrows-diagonal-2', DileIconlibArrowsDiagonal2);
}
