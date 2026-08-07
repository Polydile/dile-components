import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNavigationNorth extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M16 21l-4 -8l-4 8l4 -2l4 2" /> <path d="M10 9v-6l4 6v-6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-navigation-north')) {
  customElements.define('dile-tabler-icon-navigation-north', DileIconlibNavigationNorth);
}
