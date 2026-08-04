import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMultiplier15x extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 16v-8l-2 2" /> <path d="M10 16h2a2 2 0 1 0 0 -4h-2v-4h4" /> <path d="M7 16v.01" /> <path d="M17 16l4 -4" /> <path d="M21 16l-4 -4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-multiplier-1-5x', DileIconlibMultiplier15x);
