import { html, css } from 'lit';
import { DileCard } from './DileCard.js';
import { DileSlideDown } from '../../../mixins/slide-down/index.js';
import { arrowDropDownIcon } from '@dile/icons';
import '@dile/ui/components/icon/icon.js';

export class DileCardSlide extends DileSlideDown(DileCard) {
  static get properties() {
    return {
      opened: { type: Boolean },
      icon: { type: Object },
    }
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        .card-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: var(--dile-card-slide-title-padding-bottom, var(--dile-card-padding-y, 1rem));
        }
        .card-title button {
          all: unset;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          text-align: left;
        }
        .card-title button:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
        #content {
          height: 0;
          overflow: hidden;
          transition: height 0.5s ease-in;
          -webkit-transition: height 0.5s ease-in;
        }
        dile-icon {
          flex-shrink: 0;
          transform: rotate(-90deg);
          transition: transform 0.5s ease;
          --dile-icon-color: var(--dile-card-slide-icon-color, var(--dile-primary-color, #303030));
        }
        .opened dile-icon {
          transform: rotate(0deg);
        }
        main {
          padding-top: var(--dile-card-slide-main-padding-top, var(--dile-card-padding-y, 1rem));
        }
      `
    ];
  }

  constructor() {
    super();
    this.opened = false;
    this.icon = arrowDropDownIcon;
    // unique id for aria-controls
    this._contentId = `dile-card-content-${Math.random().toString(36).slice(2,9)}`;
  }

  firstUpdated() {
    // content element by generated id
    this.content = this.shadowRoot.getElementById(this._contentId);
    // ensure initial aria-hidden state
    if (this.content) {
      this.content.setAttribute('aria-hidden', String(!this.opened));
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('opened') && this.opened != undefined) {
      if (this.opened) {
        this.slideShow(this.content);
        if (this.content) this.content.setAttribute('aria-hidden', 'false');
      } else {
        this.slideHide(this.content);
        if (this.content) this.content.setAttribute('aria-hidden', 'true');
      }
    }
  }

  get titleTemplate() {
    // Render a heading wrapper with a button inside so keyboard and semantics are correct.
    return this.title
      ? html`
        <div class="card-title" role="heading" aria-level="${this.titleLevel}">
          <button @click="${this.toggle}" class="${this.opened ? 'opened' : ''}" aria-expanded="${this.opened ? 'true' : 'false'}" aria-controls="${this._contentId}">
            <span>${this.title}</span>
            <dile-icon .icon=${this.icon}></dile-icon>
          </button>
        </div>`
      : ''
  }

  render() {
    return html`
      ${this.titleTemplate}
      <div id="${this._contentId}">
        <main>
          <slot></slot>
        </main>
        ${this.footerTemplate}
      </div>
    `;
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.opened) {
      this.slideShow(this.content);
      this.opened = true;
    }
  }

  close() {
    if (this.opened) {
      this.slideHide(this.content);
      this.opened = false;
    }
  }
}
