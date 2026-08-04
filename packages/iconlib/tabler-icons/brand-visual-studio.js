import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandVisualStudio extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 8l2 -1l10 13l4 -2v-12l-4 -2l-10 13l-2 -1l0 -8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brand-visual-studio', DileIconlibBrandVisualStudio);
