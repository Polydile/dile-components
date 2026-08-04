import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStop extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-stop', DileIconlibStop);
