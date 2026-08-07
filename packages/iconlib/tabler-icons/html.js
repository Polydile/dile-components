import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibHtml extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M13 16v-8l2 5l2 -5v8" /> <path d="M1 16v-8" /> <path d="M5 8v8" /> <path d="M1 12h4" /> <path d="M7 8h4" /> <path d="M9 8v8" /> <path d="M20 8v8h3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-html')) {
  customElements.define('dile-tabler-icon-html', DileIconlibHtml);
}
