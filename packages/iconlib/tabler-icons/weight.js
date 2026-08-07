import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWeight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M6.835 9h10.33a1 1 0 0 1 .984 .821l1.637 9a1 1 0 0 1 -.984 1.179h-13.604a1 1 0 0 1 -.984 -1.179l1.637 -9a1 1 0 0 1 .984 -.821" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-weight')) {
  customElements.define('dile-tabler-icon-weight', DileIconlibWeight);
}
