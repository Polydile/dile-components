import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBookThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,28H72A28,28,0,0,0,44,56V224a4,4,0,0,0,4,4H192a4,4,0,0,0,0-8H52v-4a20,20,0,0,1,20-20H208a4,4,0,0,0,4-4V32A4,4,0,0,0,208,28Zm-4,160H72a27.94,27.94,0,0,0-20,8.42V56A20,20,0,0,1,72,36H204Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-book-thin')) {
  customElements.define('dile-phosphor-icon-book-thin', DileIconlibBookThin);
}
