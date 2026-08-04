import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTextHThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M204,56V200a4,4,0,0,1-8,0V132H60v68a4,4,0,0,1-8,0V56a4,4,0,0,1,8,0v68H196V56a4,4,0,0,1,8,0Z"/></svg>`;
  }
}

customElements.define('dile-phosphor-icon-text-h-thin', DileIconlibTextHThin);
