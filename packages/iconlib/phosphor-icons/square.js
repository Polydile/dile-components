import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSquare extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-square')) {
  customElements.define('dile-phosphor-icon-square', DileIconlibSquare);
}
