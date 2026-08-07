import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibHorizontalDistribute extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M4,22H2V2h2V22z M22,2h-2v20h2V2z M13.5,7h-3v10h3V7z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-horizontal-distribute')) {
  customElements.define('dile-material-icon-horizontal-distribute', DileIconlibHorizontalDistribute);
}
