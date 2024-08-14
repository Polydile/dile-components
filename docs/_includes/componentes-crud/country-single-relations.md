```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

export class DemoCountryRelations extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      boardGameConfig: { type: Object },
      country: { type: Object },
    };
  }

  constructor() {
    super();
    this.boardGameConfig = boardGameConfig.getConfig();
  }

  firstUpdated() {
    console.log(this.country);
  }

  render() {
    return html`
    ${this.country
      ? html `
        <dile-crud
          title="Juegos de ${this.country.name}"
          .config="${this.boardGameConfig}"
          belongsTo="country"
          relationId="${this.country.id}"
        ></dile-crud>  
      `
      : ''
    }
    
    `;
  }
}
customElements.define('demo-country-relations', DemoCountryRelations);
</script>
```