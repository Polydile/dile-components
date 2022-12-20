import { html, css, LitElement } from "lit";

export class DileRating extends LitElement {
  static get properties() {
    return {
      value: { type: Number },
      disableChanges: { type: Boolean },
      _mouseInside: { type: Boolean },
      _starValues: { type: Array },
      _temporalValue: { type: Number },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          align-items: center;
        }
        section {
          display: flex;
          align-items: center;
          gap: var(--dile-rating-gap, 0);
          flex-wrap: nowrap;
        }
        section.undefined {
          --dile-star-color: var(--dile-rating-undefined-color, #ddd); 
        }
        section.interactive dile-star {
          cursor: pointer;
        }
      `
    ];
  }

  constructor() {
    super();
    this._mouseInside = false;
    this.disableChanges = false;
    this.value = 0;
    this._starValues = [1, 1, 1, 1, 1];
  }

  updated(changedProperties) {
    if (changedProperties.has('value') || changedProperties.has('_temporalValue')) {
      setTimeout(() => this.updateStarValues(), 100);
    }
  }

  render() {
    return html`
      <section 
        @mouseenter=${this.doMouseEnter}
        @mouseleave=${this.doMouseLeave}
        class="${this.value === 0 && this._temporalValue === undefined ? 'undefined' : ''} ${this.disableChanges ? '' : 'interactive'}"
      >
        ${this._starValues.map((value, index) => html`
          <dile-star 
            value="${value}" 
            index="${index}"
            @dile-star-selected=${this.starSelected}
            @dile-star-enter=${this.starEnter}
          ></dile-star>
        `)}
      </section>
    `;
  }

  updateStarValues() {
    if (this._mouseInside) {
      this._starValues = this.generateValuesArray(this._temporalValue);  
    } else {
      this._starValues = this.generateValuesArray(this.value);  
    }
  }

  generateValuesArray(value) {
    let values = [];
    for (let i = 0; i < 5; i++) {
      let current = 0;
      if (value - i >= 1) {
        current = 1;
      } else if (value - i > 0) {
        current = value - i;
      }
      values.push(current);
    }
    return values;
  }

  starSelected(e) {
    if (! this.disableChanges) {
      this.value = e.detail.index + 1;
      this.dispatchEvent(new CustomEvent('dile-rating-selected', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value
        }
      }));
    }
  }

  starEnter(e) {
    this._temporalValue = e.detail.index + 1;
  }

  doMouseEnter() {
    if (! this.disableChanges) {
      this._mouseInside = true;
    }
  }

  doMouseLeave() {
    this._mouseInside = false;
    this._temporalValue = undefined;
  }
}
