import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBookA extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /> <path d="m8 13 4-7 4 7" /> <path d="M9.1 11h5.7" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-book-a', DileIconlibBookA);
