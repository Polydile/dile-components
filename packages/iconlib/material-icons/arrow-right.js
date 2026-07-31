import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M10 17l5-5-5-5v10z"/><path d="M0 24V0h24v24H0z" fill="none"/></svg>`;
  }
}

customElements.define('dile-material-icon-arrow-right', DileIconlibArrowRight);
