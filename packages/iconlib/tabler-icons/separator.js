import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSeparator extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12l0 .01" /> <path d="M7 12l10 0" /> <path d="M21 12l0 .01" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-separator', DileIconlibSeparator);
