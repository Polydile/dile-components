import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTextWrapDisabled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 6l10 0" /> <path d="M4 18l10 0" /> <path d="M4 12h17l-3 -3m0 6l3 -3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-text-wrap-disabled')) {
  customElements.define('dile-tabler-icon-text-wrap-disabled', DileIconlibTextWrapDisabled);
}
