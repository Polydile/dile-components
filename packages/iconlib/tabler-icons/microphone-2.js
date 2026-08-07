import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMicrophone2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" /> <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-microphone-2')) {
  customElements.define('dile-tabler-icon-microphone-2', DileIconlibMicrophone2);
}
