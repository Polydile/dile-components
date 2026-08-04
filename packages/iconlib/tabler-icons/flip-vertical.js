import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFlipVertical extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12l18 0" /> <path d="M7 16l10 0l-10 5l0 -5" /> <path d="M7 8l10 0l-10 -5l0 5" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-flip-vertical', DileIconlibFlipVertical);
