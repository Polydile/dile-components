import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsDiff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 16h10" /> <path d="M11 16l4 4" /> <path d="M11 16l4 -4" /> <path d="M13 8h-10" /> <path d="M13 8l-4 4" /> <path d="M13 8l-4 -4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrows-diff', DileIconlibArrowsDiff);
