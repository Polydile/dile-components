import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandGitlab extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 14l-9 7l-9 -7l3 -11l3 7h6l3 -7l3 11" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-gitlab')) {
  customElements.define('dile-tabler-icon-brand-gitlab', DileIconlibBrandGitlab);
}
