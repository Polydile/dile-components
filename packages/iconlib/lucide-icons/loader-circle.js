import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLoaderCircle extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-loader-circle', DileIconlibLoaderCircle);
