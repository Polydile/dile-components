import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSpaceBar extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>`;
  }
}

customElements.define('dile-material-icon-space-bar', DileIconlibSpaceBar);
