import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsDiagonalMinimize extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 10h4v-4" /> <path d="M4 4l6 6" /> <path d="M18 14h-4v4" /> <path d="M14 14l6 6" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrows-diagonal-minimize', DileIconlibArrowsDiagonalMinimize);
