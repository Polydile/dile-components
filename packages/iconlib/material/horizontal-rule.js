import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibHorizontalRule extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" fill-rule="evenodd" height="24" width="24"/><rect fill-rule="evenodd" height="2" width="16" x="4" y="11"/></g></svg>`;
  }
}

customElements.define('dile-material-icon-horizontal-rule', DileIconlibHorizontalRule);
