import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibToggleLeftFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144ZM80,168a40,40,0,1,1,40-40A40,40,0,0,1,80,168Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-toggle-left-fill')) {
  customElements.define('dile-phosphor-icon-toggle-left-fill', DileIconlibToggleLeftFill);
}
