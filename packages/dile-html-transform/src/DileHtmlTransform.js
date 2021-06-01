import { html, css, LitElement } from "lit-element";
import { StrBlock } from './StrBlock';

export class DileHtmlTransform extends LitElement {
  
  static get styles() {
    return css`
        :host {
          display: inline;
        }
      `
  }

  static get properties() {
    return {
      convertLines: { type: Boolean },
      convertLinks: { type: Boolean },
      convertEmails: { type: Boolean },
      text: { type: String },
    };
  }

  constructor() {
    super();
    this.text = '';
  }

  render() {
    return html`${this.transform(this.text, this.convertLines, this.convertLinks, this.convertEmails)}`;
  }

  transform(str, convertLines, convertLinks, convertEmails) {
    if(convertLines) {
      return html`${this.convertNewLines(str, convertLinks, convertEmails)}`;
    }
    return html`${this.convertUrls(str, convertLinks, convertEmails)}`;
  }

  convertNewLines(str, convertLinks, convertEmails) {
    let breakStr = '(-..#_#..-)';
    str = str.replace(/(?:\r\n|\r|\n)/g, breakStr);
    let arrStr = str.split(breakStr);
    return arrStr.map( (element, index) => 
      html`
        ${element != '' 
        ? html`${this.convertUrls(element, convertLinks, convertEmails)}${index < arrStr.length - 1 ? html`<br>` : ''}`
          : ''
        }
      `);
  }

  convertUrls(str, convertLinks, convertEmails) {
    if (!anchorme || (!convertLinks && !convertEmails)) {
      return str;
    }
    let anchorBlocks = anchorme.list(str);
    if(anchorBlocks.length == 0) {
      return str;
    }
    let position = 0;
    let finalBlocks = [];
    anchorBlocks.forEach(anchorBlock => {
      if (position < anchorBlock.start) {
        finalBlocks.push(new StrBlock(str.substr(position, anchorBlock.start - position)));
      }
      finalBlocks.push(new StrBlock(str.substr(anchorBlock.start, anchorBlock.end - anchorBlock.start), convertLinks, convertEmails, anchorBlock));
      position = anchorBlock.end;
    });
    if(position < str.length) {
      finalBlocks.push(new StrBlock(str.substr(position)));
    }
    console.log(finalBlocks);
    return finalBlocks.map(block => block.html());
  }
}
