import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandGooglePodcasts extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 3v2" /> <path d="M12 19v2" /> <path d="M12 8v8" /> <path d="M8 17v2" /> <path d="M4 11v2" /> <path d="M20 11v2" /> <path d="M8 5v8" /> <path d="M16 7v-2" /> <path d="M16 19v-8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brand-google-podcasts', DileIconlibBrandGooglePodcasts);
