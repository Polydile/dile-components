import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandVercelFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M11.143 3.486a1 1 0 0 1 1.714 0l9 15a1 1 0 0 1 -.857 1.514h-18a1 1 0 0 1 -.857 -1.514z" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brand-vercel-filled', DileIconlibBrandVercelFilled);
