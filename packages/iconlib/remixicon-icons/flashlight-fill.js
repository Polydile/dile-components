import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFlashlightFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13 10H20L11 23V14H4L13 1V10Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-flashlight-fill')) {
  customElements.define('dile-remixicon-icon-flashlight-fill', DileIconlibFlashlightFill);
}
