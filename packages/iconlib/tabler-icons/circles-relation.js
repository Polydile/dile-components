import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCirclesRelation extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9.183 6.117a6 6 0 1 0 4.511 3.986" /> <path d="M14.813 17.883a6 6 0 1 0 -4.496 -3.954" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-circles-relation', DileIconlibCirclesRelation);
