import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFoldDown extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 11v8l3 -3m-6 0l3 3" /> <path d="M9 7l1 0" /> <path d="M14 7l1 0" /> <path d="M19 7l1 0" /> <path d="M4 7l1 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-fold-down', DileIconlibFoldDown);
