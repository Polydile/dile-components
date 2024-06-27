import { LitElement, html, css } from 'lit';

import { icons } from './icons.js';

/**
 * 
 * # <social-icon>
 * 
 * Web component to create social icons, based on Lit.
 * 
 * The "icon" property is used to set the social network to display
 * 
 */


export class DileSocialIcon extends LitElement {

  static get properties() {
    return {
      icon: { type: String }
    };
  }

  constructor() {
    super();
    this.icon = 'facebook';
  }

  static get styles() {
    return css`
      :host[hidden] { display: none; }
      :host { 
        display: inline-block;
      }
      path {
        fill: var(--dile-social-icon-color, #888);
      }
      path[fill="none"] {
        fill: transparent;
      }
      svg {
        width: var(--dile-social-icon-size, 24px);
        height: var(--dile-social-icon-size, 24px);
      }
      span {
        display: flex;
        align-items: center;
      }
    `;
  }

  render() {
    return html`
    <span>
      ${this._getIcon(this.icon)}
    </span>
    `;
  }

  _getIcon(icon) {
    return icons[icon];
  }
}