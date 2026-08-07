import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChatTeardropBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M132,20A104.11,104.11,0,0,0,28,124v84a20,20,0,0,0,20,20h84a104,104,0,0,0,0-208Zm0,184H52V124a80,80,0,1,1,80,80Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-chat-teardrop-bold')) {
  customElements.define('dile-phosphor-icon-chat-teardrop-bold', DileIconlibChatTeardropBold);
}
