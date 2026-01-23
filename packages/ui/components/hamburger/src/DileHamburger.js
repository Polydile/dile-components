import { html, css, LitElement } from "lit";

export class DileHamburger extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      .hamburger {
        padding: var(--dile-hamburger-padding-y, 5px) var(--dile-hamburger-padding-x, 5px);
        display: flex;
        align-items: center;
        cursor: pointer;
        transition-property: opacity, filter;
        transition-duration: 0.15s;
        transition-timing-function: linear;
        font: inherit;
        color: inherit;
        text-transform: none;
        background-color: transparent;
        border: 0;
        margin: 0;
        overflow: visible;
      }
      .hamburger:hover {
        opacity: 0.7;
      }
      .hamburger.is-active:hover {
        opacity: 0.7;
      }
      .hamburger.is-active .hamburger-inner,
      .hamburger.is-active .hamburger-inner::before,
      .hamburger.is-active .hamburger-inner::after {
        background-color: var(--dile-hamburger-active-color, #000);
      }

      .hamburger-box {
        width: var(--dile-hamburger-width, 24px);
        height: var(--dile-hamburger-height, 24px);
        display: inline-block;
        position: relative;
      }

      .hamburger-inner {
        display: block;
        top: 50%;
        margin-top: 0px;
      }
      .hamburger-inner,
      .hamburger-inner::before,
      .hamburger-inner::after {
        width: var(--dile-hamburger-width, 24px);
        height: var(--dile-hamburger-line-size, 3px);
        background-color: var(--dile-on-primary-color, var(--dile-hamburger-color, #000));
        border-radius: var(--dile-hamburger-line-size, 3px);
        position: absolute;
        transition-property: transform;
        transition-duration: 0.15s;
        transition-timing-function: ease;
      }
      .hamburger-inner::before,
      .hamburger-inner::after {
        content: "";
        display: block;
      }
      .hamburger-inner::before {
        top: var(--dile-hamburger-line-separation, -6px);
      }
      .hamburger-inner::after {
        bottom: var(--dile-hamburger-line-separation, -6px);
      }

      /*
        * Squeeze
        */
      .hamburger--squeeze .hamburger-inner {
        transition-duration: 0.075s;
        transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
      }
      .hamburger--squeeze .hamburger-inner::before {
        transition: top 0.075s 0.12s ease, opacity 0.075s ease;
      }
      .hamburger--squeeze .hamburger-inner::after {
        transition: bottom 0.075s 0.12s ease,
          transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
      }

      .hamburger--squeeze.is-active .hamburger-inner {
        transform: rotate(45deg);
        transition-delay: 0.12s;
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      }
      .hamburger--squeeze.is-active .hamburger-inner::before {
        top: 0;
        opacity: 0;
        transition: top 0.075s ease, opacity 0.075s 0.12s ease;
      }
      .hamburger--squeeze.is-active .hamburger-inner::after {
        bottom: 0;
        transform: rotate(-90deg);
        transition: bottom 0.075s ease,
          transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
      }

      button:focus {
        outline: none;
      }
    `;
  }

  render() {
    return html`
      <button
        class="hamburger hamburger--squeeze ${this.active ? "is-active" : ""}"
        type="button"
        aria-label="Open navigation menu"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    `;
  }
}