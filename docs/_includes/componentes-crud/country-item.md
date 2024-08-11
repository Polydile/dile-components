```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

export class DemoCountryItem extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      span {
        font-style: italic;
        font-size: 0.9rem;
      }
    `
  ];

  static get properties() {
    return {
      country: { type: Object }
    };
  }

  render() {
    return html`
      ${this.country.name} - 
      <span @click=${this.dispatchContinent}>${this.country.continent}</span>
    `;
  }

  dispatchContinent() {
    this.dispatchEvent(new CustomEvent('continent-event', { 
      bubbles: true,
      composed: true,
      detail: this.country
    }));
  }
}
customElements.define('demo-country-item', DemoCountryItem);
</script>
```