import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDehaze extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-dehaze')) {
  customElements.define('dile-material-icon-dehaze', DileIconlibDehaze);
}
