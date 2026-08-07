import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSquareFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-square-filled')) {
  customElements.define('dile-tabler-icon-square-filled', DileIconlibSquareFilled);
}
