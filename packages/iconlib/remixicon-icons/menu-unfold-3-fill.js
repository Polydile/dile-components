import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMenuUnfold3Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17 4H3V6H17V4ZM13 11H3V13H13V11ZM17 18H3V20H17V18ZM17 17V7L22 11.9996L17 17Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-menu-unfold-3-fill', DileIconlibMenuUnfold3Fill);
