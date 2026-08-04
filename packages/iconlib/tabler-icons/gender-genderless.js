import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibGenderGenderless extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 10a5 5 0 1 1 0 10a5 5 0 0 1 0 -10" /> <path d="M12 10v-7" /> <path d="M7 15h10" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-gender-genderless', DileIconlibGenderGenderless);
