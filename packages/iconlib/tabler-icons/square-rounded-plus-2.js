import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSquareRoundedPlus2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12.54 20.996c-.176 .004 -.356 .004 -.54 .004c-7.2 0 -9 -1.8 -9 -9s1.8 -9 9 -9s9 1.8 9 9c0 .185 -.001 .366 -.004 .544" /> <path d="M16 19h6" /> <path d="M19 16v6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-square-rounded-plus-2')) {
  customElements.define('dile-tabler-icon-square-rounded-plus-2', DileIconlibSquareRoundedPlus2);
}
