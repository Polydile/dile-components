import { LitElement } from "lit";

export class DileMediaQuery extends LitElement {
  
  static get properties() {
    return {
      /**
       * Media query to be watched by the element.
       *
       * Can be modified at run time by setting a new value.
       */
      query: { type: String },
      _match: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.boundResizeHandler = this._handleResize.bind(this);
  }

  updated(changedProperties) {
    if(changedProperties.has('query') && this.query) {
      this.createMatcher();
      this.reviewMediaQuery();
    }
    if(changedProperties.has('_match') && this._match !== undefined) {
      this.dispatchChange()
    }
  }

  createMatcher() {
    this.matcher = window.matchMedia(this.query);
  }

  dispatchChange() {
    this.dispatchEvent(new CustomEvent('dile-media-query-changed', {
      composed: true,
      bubbles: true,
      detail: {
        value: this._match,
      },
    }));
  }

  connectedCallback() {
    super.connectedCallback();
    // Check if Visual Viewport API is supported
    if (this.hasVisualViewport()) {
      window.visualViewport.addEventListener('resize', this.boundResizeHandler);
    } else {
      window.addEventListener('resize', this.boundResizeHandler);
    }
  }

  disconnectedCallback() {
    // Remove event listeners
    if (this.hasVisualViewport()) {
      window.visualViewport.removeEventListener('resize', this.boundResizeHandler);
    } else {
      window.removeEventListener('resize', this.boundResizeHandler);
    }
    super.disconnectedCallback();
  }

  hasVisualViewport() {
    return typeof window.visualViewport !== 'undefined'
  }

  reviewMediaQuery() {
    if(this.matcher) {
      this._match = this.matcher.matches
    }
  }

  _handleResize() {
    this.reviewMediaQuery();
  }
}
