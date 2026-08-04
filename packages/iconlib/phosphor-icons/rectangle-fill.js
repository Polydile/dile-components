import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRectangleFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-rectangle-fill', DileIconlibRectangleFill);
