import { LitElement, html, css } from 'lit';
import { DileSlideDownMixin } from '@dile/dile-slide-down-mixin';

export class DileSlideShow extends DileSlideDownMixin(LitElement) {
  static get properties() {
    return {
      _opened: { attribute: false },
      targetHeight: { type: String },
      showLabel: { type: String },
      hideLabel: { type: String },
    }
  }

  constructor() {
    super();
    this.targetHeight = '0px';
    this._opened = false;
    this.showLabel = "Open";
    this.hideLabel = "Close";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .closed {
        padding: 0px;
        margin-bottom: 0px;
      }
      #content {
        height: var(--dile-slide-down-initial-height, 0);
        overflow: hidden;
        transition: height 0.5s ease-in;
        -webkit-transition: height 0.5s ease-in;
        padding: 1px 0;
      }
      nav {
        padding-top: 0.5em;
        cursor: pointer;
        text-align: var(--dile-slide-show-align-control, left);
        font-size: var(--dile-slide-down-font-size, 1em);
        color: var(--dile-slide-show-text-color, #39c);
        font-weight: var(--dile-slide-show-font-weight, bold);
        text-decoration: var(--dile-slide-show-text-decoration, none);
      }
      .showmoreopen span , .showmoreclose span{
        position: relative;
        padding: 10px;
        left: 15px;
      }
      .showmoreopen span::before, .showmoreclose span::before {
        content: '';
        border-style: solid;
        border-width: 8px 12px 8px 0;
        border-color: transparent var(--dile-slide-show-icon-color, #39c);
        position: absolute;
        left: -15px;
        top: 0.75em;
        transition: transform ease 0.5s;
        transition-delay: 0.5s;
      }
      .showmoreclose span::before {
        transform: rotate(-90deg);
      }

      .showmoreopen span::before {
        transform: rotate(90deg);
      }
    `;
  }

  render() {
    return html`
    <div id="content">
      <slot></slot>
    </div> 
    <nav @click="${this.toggle}" class="${this._opened ? 'showmoreopen' : 'showmoreclose'}">
      <span>
        ${this._opened ? this.hideLabel : this.showLabel}
      </span>
    </nav>
    `;
  }

  firstUpdated() {
    this.content = this.shadowRoot.getElementById('content');
  }

  toggle() {
    if (this._opened) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if(! this._opened) {
      this.slideShow(this.content, this.targetHeight);
      this._opened = true;
    }
  }
  
  close() {
    if(this._opened) {
      this.slideHide(this.content, this.targetHeight);
      this._opened = false;
    }
  }
}