import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCodeCircle extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 14l-2 -2l2 -2" /> <path d="M14 10l2 2l-2 2" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-code-circle')) {
  customElements.define('dile-tabler-icon-code-circle', DileIconlibCodeCircle);
}
