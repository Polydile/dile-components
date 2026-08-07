import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMenuUnfold3Line extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17 4H3V6H17V4ZM13 11H3V13H13V11ZM17 18H3V20H17V18ZM15.9896 8.81412L17.4038 7.3999L22 11.9961L17.4038 16.5923L15.9896 15.1781L19.1716 11.9961L15.9896 8.81412Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-menu-unfold-3-line')) {
  customElements.define('dile-remixicon-icon-menu-unfold-3-line', DileIconlibMenuUnfold3Line);
}
