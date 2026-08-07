import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSourceCode extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14.5 4h2.5a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-5" /> <path d="M6 5l-2 2l2 2" /> <path d="M10 9l2 -2l-2 -2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-source-code')) {
  customElements.define('dile-tabler-icon-source-code', DileIconlibSourceCode);
}
