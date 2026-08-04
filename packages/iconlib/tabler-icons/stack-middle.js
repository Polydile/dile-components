import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStackMiddle extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M16 10l4 -2l-8 -4l-8 4l4 2" /> <path d="M12 12l-4 -2l-4 2l8 4l8 -4l-4 -2l-4 2" fill="currentColor" /> <path d="M8 14l-4 2l8 4l8 -4l-4 -2" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-stack-middle', DileIconlibStackMiddle);
