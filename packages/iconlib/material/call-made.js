import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCallMade extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/></svg>`;
  }
}

customElements.define('dile-material-icon-call-made', DileIconlibCallMade);
