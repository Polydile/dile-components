import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsDiagonal extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M16 4l4 0l0 4" /> <path d="M14 10l6 -6" /> <path d="M8 20l-4 0l0 -4" /> <path d="M4 20l6 -6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-arrows-diagonal')) {
  customElements.define('dile-tabler-icon-arrows-diagonal', DileIconlibArrowsDiagonal);
}
