import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAi extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 16v-6a2 2 0 1 1 4 0v6" /> <path d="M8 13h4" /> <path d="M16 8v8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-ai', DileIconlibAi);
