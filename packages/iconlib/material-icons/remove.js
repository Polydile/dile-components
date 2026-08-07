import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibRemove extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-remove')) {
  customElements.define('dile-material-icon-remove', DileIconlibRemove);
}
