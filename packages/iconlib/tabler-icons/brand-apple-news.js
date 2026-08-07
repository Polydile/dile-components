import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandAppleNews extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 14l6 6h-6l0 -6" /> <path d="M20 10l-6 -6h6l0 6" /> <path d="M4 4v4l12 12h4v-4l-12 -12l-4 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-apple-news')) {
  customElements.define('dile-tabler-icon-brand-apple-news', DileIconlibBrandAppleNews);
}
