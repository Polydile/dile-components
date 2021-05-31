import { html, css, LitElement } from "lit-element";
import "anchorme/dist/browser/anchorme.min.js";

export class DileHtmlTransform extends LitElement {
  static get styles() {
    return css`
        :host {
          display: inline-block
        }
      `
  }
  static get properties() {
    return {
      convertLines: { type: Boolean },
      convertLinks: { type: Boolean },
    };
  }
  
  firstUpdated() {
    let str = this.innerHTML;
    if(this.convertLines) {
      str = this.convertNewLines(str);
    }
    if(this.convertLinks) {
      str = this.convertUrls(str);
    }
    this.innerHTML = str;
  
  }

  render() {
    return html`<span id="content"><slot></slot></span>`;
  }

  convertNewLines(str) {
    str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    if (str.substr(0, 4) == '<br>') {
      str = str.substr(4);
    }
    return str;
  }

  convertUrls(str) {
    return anchorme(str);
  }
}
