import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBlendMode extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 9.5a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0" /> <path d="M3 14.5a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-blend-mode', DileIconlibBlendMode);
