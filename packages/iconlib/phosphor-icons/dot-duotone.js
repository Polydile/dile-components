import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDotDuotone extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M176,128a48,48,0,1,1-48-48A48,48,0,0,1,176,128Z" opacity="0.2"/><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-dot-duotone')) {
  customElements.define('dile-phosphor-icon-dot-duotone', DileIconlibDotDuotone);
}
