import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTriangleInvertedFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M20.118 3h-16.225a2.914 2.914 0 0 0 -2.503 4.371l8.116 13.549a2.917 2.917 0 0 0 4.987 .005l8.11 -13.539a2.914 2.914 0 0 0 -2.486 -4.386z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-triangle-inverted-filled')) {
  customElements.define('dile-tabler-icon-triangle-inverted-filled', DileIconlibTriangleInvertedFilled);
}
