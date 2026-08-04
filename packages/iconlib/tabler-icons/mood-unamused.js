import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMoodUnamused extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M11 16l4 -1.5" /> <path d="M10 10c-.5 -1 -2.5 -1 -3 0" /> <path d="M17 10c-.5 -1 -2.5 -1 -3 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-mood-unamused', DileIconlibMoodUnamused);
