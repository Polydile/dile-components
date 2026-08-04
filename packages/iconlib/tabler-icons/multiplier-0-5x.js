import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMultiplier05x extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 16h2a2 2 0 1 0 0 -4h-2v-4h4" /> <path d="M5 16v.01" /> <path d="M15 16l4 -4" /> <path d="M19 16l-4 -4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-multiplier-0-5x', DileIconlibMultiplier05x);
