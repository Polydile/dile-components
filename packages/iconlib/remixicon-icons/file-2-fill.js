import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFile2Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 9H9C9.55228 9 10 8.55228 10 8V2H20.0017C20.5531 2 21 2.45531 21 2.9918V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5511 3 20.9925V9ZM3 7L8 2.00318V7H3Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-file-2-fill')) {
  customElements.define('dile-remixicon-icon-file-2-fill', DileIconlibFile2Fill);
}
