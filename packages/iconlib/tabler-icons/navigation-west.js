import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNavigationWest extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 3l1 6l2 -3.75l2 3.75l1 -6" /> <path d="M16 21l-4 -8l-4 8l4 -2l4 2" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-navigation-west', DileIconlibNavigationWest);
