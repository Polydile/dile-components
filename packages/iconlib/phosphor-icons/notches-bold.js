import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNotchesBold extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216.49,136.49l-80,80a12,12,0,1,1-17-17l80-80a12,12,0,1,1,17,17Zm-16-105a12,12,0,0,0-17,0l-152,152a12,12,0,0,0,17,17l152-152A12,12,0,0,0,200.49,31.51Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-notches-bold')) {
  customElements.define('dile-phosphor-icon-notches-bold', DileIconlibNotchesBold);
}
