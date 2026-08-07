import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSignalE extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 8h-4v8h4" /> <path d="M10 12h2.5" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-signal-e')) {
  customElements.define('dile-tabler-icon-signal-e', DileIconlibSignalE);
}
