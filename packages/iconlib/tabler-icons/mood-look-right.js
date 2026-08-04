import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMoodLookRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18" /> <path d="M15 9h-.01" /> <path d="M20 15h-4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-mood-look-right', DileIconlibMoodLookRight);
