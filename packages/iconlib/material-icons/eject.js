import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibEject extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 24V0h24v24H0z" fill="none"/><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-eject')) {
  customElements.define('dile-material-icon-eject', DileIconlibEject);
}
