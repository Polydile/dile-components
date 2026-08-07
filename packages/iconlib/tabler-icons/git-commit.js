import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibGitCommit extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M12 3l0 6" /> <path d="M12 15l0 6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-git-commit')) {
  customElements.define('dile-tabler-icon-git-commit', DileIconlibGitCommit);
}
