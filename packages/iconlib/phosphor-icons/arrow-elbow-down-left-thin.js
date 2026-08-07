import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowElbowDownLeftThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M196,32V176a4,4,0,0,1-4,4H57.66l41.17,41.17a4,4,0,0,1-5.66,5.66l-48-48a4,4,0,0,1,0-5.66l48-48a4,4,0,1,1,5.66,5.66L57.66,172H188V32a4,4,0,0,1,8,0Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-arrow-elbow-down-left-thin')) {
  customElements.define('dile-phosphor-icon-arrow-elbow-down-left-thin', DileIconlibArrowElbowDownLeftThin);
}
