import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPower extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 6a7.75 7.75 0 1 0 10 0" /> <path d="M12 4l0 8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-power', DileIconlibPower);
