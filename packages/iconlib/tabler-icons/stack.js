import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStack extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 6l-8 4l8 4l8 -4l-8 -4" /> <path d="M4 14l8 4l8 -4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-stack', DileIconlibStack);
