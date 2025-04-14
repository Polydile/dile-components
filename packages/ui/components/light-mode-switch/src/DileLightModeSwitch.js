import { LitElement, html, css } from "lit";
import { darkMode, lightMode } from "../../../../icons/index.js";
import '../../switch/switch.js';
import '../../icon/icon.js';

export class DileLightModeSwitch extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        --dile-switch-off-state-color: var(--dile-light-mode-switch-light-state-color, #303030);
        --dile-switch-on-state-color: var(--dile-light-mode-switch-dark-state-color, #e5e5e5);
        --dile-switch-bar-color: var(--dile-light-mode-switch-light-state-bar-color, #dddddd);
        --dile-icon-color: var(--dile-light-mode-switch-light-state-icon-color, #303030);
      }
      :host([darkMode]) {
        --dile-switch-bar-color: var(--dile-light-mode-switch-dark-state-bar-color, #0e0e0e);
        --dile-icon-color: var(--dile-light-mode-switch-dark-state-icon-color, #e5e5e5);
      }
      section {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `;
  }
  static get properties() {
    return {
      darkModeClass: { type: String },
      darkMode: { type: Boolean, reflect: true },
    };
  }
  constructor() {
    super();
    this.darkModeClass = "dark-theme";
    this.darkMode = document.documentElement.classList.contains(this.darkModeClass);
  }

  updated(changedProperties) {
    if(changedProperties.has('darkMode')) {
      if(this.darkMode) {
        document.documentElement.classList.add(this.darkModeClass);
      } else {
        document.documentElement.classList.remove(this.darkModeClass);
      }
    }
  }

  render() {
    return html`
      <section>
        <dile-icon .icon="${this.darkMode ? darkMode : lightMode }"></dile-icon>
        <dile-switch ?checked="${this.darkMode}" @element-changed=${this.change}></dile-switch>
      </section>
    `;
  }

  change(e) {
    this.darkMode = e.detail.value;
  } 

  toggle() {
    this.darkMode = !this.darkMode;
  }
}
