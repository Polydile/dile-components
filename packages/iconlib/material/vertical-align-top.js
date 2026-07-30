import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibVerticalAlignTop extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/></svg>`;
  }
}

customElements.define('dile-material-icon-vertical-align-top', DileIconlibVerticalAlignTop);
