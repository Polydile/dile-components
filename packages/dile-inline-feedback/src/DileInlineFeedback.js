import { LitElement, html, css } from "lit";
import { DileSlideDownMixin } from '@dile/dile-slide-down-mixin';

export class DileInlineFeedback extends DileSlideDownMixin(LitElement) {
  static get properties() {
    return {
      msg: { type: String },
      status: { type: String },
      opened: { type: Boolean },
    }
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
      section {
        box-sizing: border-box;
        font-size: 0.9em;
        border-radius: 5px;
        text-align: center;
        background-color: #ddd;
        height: 0px;
        overflow: hidden;
        transition: all 0.3s ease-in;
        -webkit-transition: all 0.3s ease-in;
      }
      section p {
        margin: 0;
        padding: 12px 5px;
        overflow: hidden;
      }
      .error {
        background-color: rgba(220, 60, 60, 0.3);
        box-shadow: inset 0 0 0 2px rgba(220, 60, 60, 0.5);
      }
      .success {
        background-color: rgba(30, 220, 99, 0.3);
        box-shadow: inset 0 0 0 2px rgba(30, 220, 99, 0.5);
      }
      .neutral {
        background-color: rgba(30, 100, 250, 0.2);
        box-shadow: inset 0 0 0 2px rgba(30, 100, 220, 0.5);
      }
      @media(min-width: 850px) {
        section {
          font-size: 0.8em;
        }
      }
    `;
  }

  render() {
    return html`
    <section id="msg" class="${this.status}">
      <p>
        ${this.msg}
      </p>
    </section>
    `;
  }

  firstUpdated() {
    this.msgElement = this.shadowRoot.getElementById('msg');
  }

  doFeeedback(msg, status) {
    if(this.opened) {
      this.clear();
      setTimeout(() => this.doFeeedback(msg, status), 300);
      return;
    }
    this.msg = msg;
    this.status = status;
    setTimeout(() => {
      this.slideShow(this.msgElement);
      this.opened = true
    }, 100);
    
  }
  positiveFeedback(msg) {
    this.doFeeedback(msg, 'success');
  }
  negativeFeedback(msg) {
    this.doFeeedback(msg, 'error');
  }
  neutralFeedback(msg) {
    this.doFeeedback(msg, 'neutral');    
  }
  clear() {
    this.slideHide(this.msgElement);
    this.msg = '';
    this.status = '';
    this.opened = false;
  }
}