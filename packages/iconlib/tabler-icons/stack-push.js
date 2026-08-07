import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStackPush extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 10l-2 1l8 4l8 -4l-2 -1" /> <path d="M4 15l8 4l8 -4" /> <path d="M12 4v7" /> <path d="M15 8l-3 3l-3 -3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-stack-push')) {
  customElements.define('dile-tabler-icon-stack-push', DileIconlibStackPush);
}
