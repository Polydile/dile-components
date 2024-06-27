import { html } from 'lit';
import { DileInput } from "./DileInput";

export class DileInputMessage extends DileInput {
  
  render() {
    return html`
      ${this.messageTemplate}  
    `
  }

}