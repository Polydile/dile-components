import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandCampaignmonitor extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 18l9 -6.462l-9 -5.538v12h18v-12l-9 5.538" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-campaignmonitor')) {
  customElements.define('dile-tabler-icon-brand-campaignmonitor', DileIconlibBrandCampaignmonitor);
}
