import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFerry extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M2 18h15.293c1.02 0 1.972 -.503 2.536 -1.34l2.171 -3.66h-18.479l-1.521 5" /> <path d="M14 8l-1 -2" /> <path d="M6.107 12.675l1.384 -4.675h8l2.675 4.598" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-ferry')) {
  customElements.define('dile-tabler-icon-ferry', DileIconlibFerry);
}
