import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibGitCherryPick extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M7 3v6" /> <path d="M7 15v6" /> <path d="M13 7h2.5l1.5 5l-1.5 5h-2.5" /> <path d="M17 12h3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-git-cherry-pick')) {
  customElements.define('dile-tabler-icon-git-cherry-pick', DileIconlibGitCherryPick);
}
