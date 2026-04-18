import { html } from 'lit';
import { DileInput } from "./DileInput.js";

export class DileInputMessage extends DileInput {
  
  render() {
    return html`
      ${this.messageTemplate}  
    `
  }

}