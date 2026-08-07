import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSunHigh extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656" /> <path d="M6.343 17.657l-1.414 1.414" /> <path d="M6.343 6.343l-1.414 -1.414" /> <path d="M17.657 6.343l1.414 -1.414" /> <path d="M17.657 17.657l1.414 1.414" /> <path d="M4 12h-2" /> <path d="M12 4v-2" /> <path d="M20 12h2" /> <path d="M12 20v2" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-sun-high')) {
  customElements.define('dile-tabler-icon-sun-high', DileIconlibSunHigh);
}
