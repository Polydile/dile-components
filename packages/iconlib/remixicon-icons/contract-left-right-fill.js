import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibContractLeftRightFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 18 11 12 5 6V18ZM19 6 13 12 19 18V6Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-contract-left-right-fill', DileIconlibContractLeftRightFill);
