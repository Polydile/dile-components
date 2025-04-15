import { html, css, LitElement } from "lit";
import linkifyStr from 'linkify-string';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const options = { defaultProtocol: 'https' };

export class DileHtmlTransform extends LitElement {
  
  static get styles() {
    return css`
        :host {
          display: inline;
        }
        a {
          color: var(--dile-link-color, #3399ff);
        }
      `
  }

  static get properties() {
    return {
      convertLines: { type: Boolean },
      convertLinks: { type: Boolean },
      text: { type: String },
      init: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.init = false;
    this.text = '';
    this.convertLines = false;
    this.convertLinks = false;
  }

  firstUpdated() {
    this.init = true;
  }

  render() {
    if (!this.init) {
      return '';
    }
    if (!this.convertLines && !this.convertLinks) {
      return this.text;
    }
    if (!this.convertLinks) {
      return html`${this.convertNewLines(this.text)}`;
    }
    return html`${unsafeHTML(linkifyStr(this.text, this.generateOptions(this.convertLines)))}`;
  }

  generateOptions(convertLines) {
    let options = {
      nl2br: convertLines,
    };
    return options;
  }

  convertNewLines(str, convertLinks, convertEmails) {
    let breakStr = '(-..#_#..-)';
    str = str.replace(/(?:\r\n|\r|\n)/g, breakStr);
    let arrStr = str.split(breakStr);
    return arrStr.map( (element, index) => 
      html`
        ${element != '' 
          ? html`${element}${index < arrStr.length - 1 ? html`<br>` : ''}`
          : ''
        }
      `);
  }
}
