import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibOvalVerticalFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 5c-5.457 0 -10 3.028 -10 7s4.543 7 10 7s10 -3.028 10 -7s-4.543 -7 -10 -7z" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-oval-vertical-filled', DileIconlibOvalVerticalFilled);
