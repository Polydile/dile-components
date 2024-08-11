```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

export class DemoBoardGameItem extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      boardGame: { type: Object }
    };
  }

  render() {
    return html`
      ${this.boardGame.name} - (${this.boardGame.year})
    `;
  }
}
customElements.define('demo-board-game-item', DemoBoardGameItem);
</script>
```