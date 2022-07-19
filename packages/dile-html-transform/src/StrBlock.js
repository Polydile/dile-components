import { html } from 'lit';

export class StrBlock {
  constructor(str, convertLinks = false, convertEmails = false, anchorObject = null) {
    this.str = str;
    this.anchorObject = anchorObject;
    this.convertLinks = convertLinks;
    this.convertEmails = convertEmails;
  }
  html() {
    if (this.anchorObject === null) {
      return this.str;
    }
    if(! this.convertLinks && ! this.convertEmails) {
      return this.str;
    }
    if (this.convertLinks && this.anchorObject.isURL) {
      return html`<a href="${this.href()}" target="_blank">${this.str}</a>`
    }
    if (this.convertEmails && this.anchorObject.isEmail) {
      return html`<a href="mailto:${this.str}">${this.str}</a>`
    }
    return this.str;
  }
  href() {
    if (this.anchorObject.protocol === undefined) {
      return 'http://' + this.str;
    }
    return this.str;
  }
}