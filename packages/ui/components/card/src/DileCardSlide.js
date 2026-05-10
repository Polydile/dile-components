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
        h1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          padding-bottom: var(--dile-card-slide-title-padding-bottom, var(--dile-card-padding-y, 1rem));
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
        h1.opened dile-icon {
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
  }

  firstUpdated() {
    this.content = this.shadowRoot.getElementById('content');
  }

  updated(changedProperties) {
    if (changedProperties.has('opened') && this.opened != undefined) {
      if (this.opened) {
        this.slideShow(this.content);
      } else {
        this.slideHide(this.content);
      }
    }
  }

  get titleTemplate() {
    return this.title
      ? html`
        <h1 @click="${this.toggle}" class="${this.opened ? 'opened' : ''}">
          ${this.title}
          <dile-icon .icon=${this.icon}></dile-icon>
        </h1>`
      : ''
  }

  render() {
    return html`
      ${this.titleTemplate}
      <div id="content">
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
