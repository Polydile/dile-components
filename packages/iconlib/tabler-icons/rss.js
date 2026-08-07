import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRss extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M4 4a16 16 0 0 1 16 16" /> <path d="M4 11a9 9 0 0 1 9 9" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-rss')) {
  customElements.define('dile-tabler-icon-rss', DileIconlibRss);
}
