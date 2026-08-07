import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibListThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128ZM40,68H216a4,4,0,0,0,0-8H40a4,4,0,0,0,0,8ZM216,188H40a4,4,0,0,0,0,8H216a4,4,0,0,0,0-8Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-list-thin')) {
  customElements.define('dile-phosphor-icon-list-thin', DileIconlibListThin);
}
