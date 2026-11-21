import { LitElement, css } from "lit";
import { DileScrollRevealMixin, revealStyles } from "../../../mixins/scroll-reveal/index.js";

const FALLBACK_STYLE_ID = 'dile-scroll-reveal-styles';

/** Adds the reveal base styles to the page once, however many instances are connected. */
function adoptRevealStylesInDocument() {
  const sheet = revealStyles.styleSheet;
  if (sheet && Array.isArray(document.adoptedStyleSheets)) {
    if (!document.adoptedStyleSheets.includes(sheet)) {
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    }
    return;
  }
  // Browsers without constructable stylesheets.
  if (!document.getElementById(FALLBACK_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = FALLBACK_STYLE_ID;
    style.textContent = revealStyles.cssText;
    document.head.appendChild(style);
  }
}

/**
 * Page-level scroll reveal orchestrator. One instance anywhere in the page reveals every
 * `[data-reveal]` / `[data-reveal-group]` element of the document. It renders nothing.
 */
export class DileScrollReveal extends DileScrollRevealMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: none;
      }
    `;
  }

  get revealRoot() {
    return document;
  }

  connectedCallback() {
    adoptRevealStylesInDocument();
    super.connectedCallback();
  }
}
