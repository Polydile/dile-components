import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandPnpm extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 17h4v4h-4l0 -4" /> <path d="M10 17h4v4h-4l0 -4" /> <path d="M17 17h4v4h-4l0 -4" /> <path d="M17 10h4v4h-4l0 -4" /> <path d="M17 3h4v4h-4l0 -4" /> <path d="M10 10h4v4h-4l0 -4" /> <path d="M10 3h4v4h-4l0 -4" /> <path d="M3 3h4v4h-4l0 -4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brand-pnpm', DileIconlibBrandPnpm);
