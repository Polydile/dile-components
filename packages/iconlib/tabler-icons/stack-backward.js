import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStackBackward extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 12l6 -3l-8 -4l-8 4l6 3" /> <path d="M10 12l-6 3l8 4l8 -4l-6 -3l-2 1l-2 -1" fill="currentColor" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-stack-backward', DileIconlibStackBackward);
