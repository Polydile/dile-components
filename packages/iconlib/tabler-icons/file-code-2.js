import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFileCode2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 12h-1v5h1" /> <path d="M14 12h1v5h-1" /> <path d="M14 3v4a1 1 0 0 0 1 1h4" /> <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-file-code-2')) {
  customElements.define('dile-tabler-icon-file-code-2', DileIconlibFileCode2);
}
