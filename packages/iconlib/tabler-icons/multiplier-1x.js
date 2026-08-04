import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMultiplier1x extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 16v-8l-2 2" /> <path d="M13 16l4 -4" /> <path d="M17 16l-4 -4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-multiplier-1x', DileIconlibMultiplier1x);
