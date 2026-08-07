import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStepInto extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 3l0 12" /> <path d="M16 11l-4 4" /> <path d="M8 11l4 4" /> <path d="M11 20a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-step-into')) {
  customElements.define('dile-tabler-icon-step-into', DileIconlibStepInto);
}
