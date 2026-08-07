import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibChalkboardSimpleThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M240,196H228V168a4,4,0,0,0-4-4H160a4,4,0,0,0-4,4v28H36V56a4,4,0,0,1,4-4H216a4,4,0,0,1,4,4v80a4,4,0,0,0,8,0V56a12,12,0,0,0-12-12H40A12,12,0,0,0,28,56V196H16a4,4,0,0,0,0,8H240a4,4,0,0,0,0-8Zm-76-24h56v24H164Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-chalkboard-simple-thin')) {
  customElements.define('dile-phosphor-icon-chalkboard-simple-thin', DileIconlibChalkboardSimpleThin);
}
