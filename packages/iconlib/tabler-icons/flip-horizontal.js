import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFlipHorizontal extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 3l0 18" /> <path d="M16 7l0 10l5 0l-5 -10" /> <path d="M8 7l0 10l-5 0l5 -10" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-flip-horizontal', DileIconlibFlipHorizontal);
