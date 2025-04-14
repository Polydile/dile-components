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
        --dile-switch-off-focus-color: var(--dile-light-mode-switch-light-state-focus-color, #3d91e5);
      }
      :host([darkMode]) {
        --dile-switch-bar-color: var(--dile-light-mode-switch-dark-state-bar-color, #6c6c6c);
        --dile-icon-color: var(--dile-light-mode-switch-dark-state-icon-color, #e5e5e5);
        --dile-switch-on-focus-color: var(--dile-light-mode-switch-dark-state-focus-color, #ff9);
      }

      section {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      dile-icon {
        cursor: pointer;
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
    const storedMode = localStorage.getItem("dile_light_mode_switch_state");
    if (storedMode === "dark") {
      this.darkMode = true;
    } else if (storedMode === "light") {
      this.darkMode = false;
    } else {
      this.darkMode = document.documentElement.classList.contains(this.darkModeClass);
    }
  }

  updated(changedProperties) {
    if(changedProperties.has('darkMode')) {
      if(this.darkMode) {
        document.documentElement.classList.add(this.darkModeClass);
        localStorage.setItem("dile_light_mode_switch_state", "dark");
      } else {
        document.documentElement.classList.remove(this.darkModeClass);
        localStorage.setItem("dile_light_mode_switch_state", "light");
      }
    }
  }

  render() {
    return html`
      <section>
        <dile-icon .icon="${this.darkMode ? darkMode : lightMode }" @click=${this.toggle}></dile-icon>
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
