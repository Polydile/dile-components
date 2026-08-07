import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPriorityHigh extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="19" r="2"/><path d="M10 3h4v12h-4z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-priority-high')) {
  customElements.define('dile-material-icon-priority-high', DileIconlibPriorityHigh);
}
