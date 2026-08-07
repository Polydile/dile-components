import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibShieldFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,56v56c0,52.72-25.52,84.67-46.93,102.19-23.06,18.86-46,25.27-47,25.53a8,8,0,0,1-4.2,0c-1-.26-23.91-6.67-47-25.53C57.52,196.67,32,164.72,32,112V56A16,16,0,0,1,48,40H208A16,16,0,0,1,224,56Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-shield-fill')) {
  customElements.define('dile-phosphor-icon-shield-fill', DileIconlibShieldFill);
}
