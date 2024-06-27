import { LitElement, html, css } from 'lit';
import { DileSlideDown } from '../../../mixins/slide-down';
import { arrowDropDownIcon } from '@dile/icons';
import '@dile/ui/components/icon/icon.js';

export class DileSlideMenu extends DileSlideDown(LitElement) {
  static get properties() {
    return {
      opened: { type: Boolean },
      label: { type: String },
      icon: { type: Object },
    }
  }

  constructor() {
    super();
    this.opened = false;
    this.label = "Menu";
    this.icon = arrowDropDownIcon;
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      } 
      :host {
        display: block;
      }

      #content {
        height: 0;
        overflow: hidden;
        transition: height 0.5s ease-in;
        -webkit-transition: height 0.5s ease-in;
        padding: 1px 0;
      }
      .container {
        padding: 1px 0;
      }
      nav {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: var(--dile-slide-menu-font-size, 1em);
        color: var(--dile-foreground-color, #303030);
        font-weight: var(--dile-slide-menu-font-weight, bold);
        text-decoration: var(--dile-slide-menu-text-decoration, none);
        --dile-icon-color: var(--dile-foreground-color, #303030);
        margin: var(--dile-slide-menu-control-margin, 0 0 0.25rem 0);
      }
      
      dile-icon {
        transform: var(--dile-slide-menu-closed-transform, rotate(-90deg));
        transition: transform 0.5s ease;
      }

      nav.opened dile-icon {
        transform: var(--dile-slide-menu-opened-transform, rotate(0deg));
      }
    `;
  }

  firstUpdated() {
    this.content = this.shadowRoot.getElementById('content');
  }

  updated(changedProperties) {
    if(changedProperties.has('opened') && this.opened != undefined) {
      if(this.opened) {
        this.slideShow(this.content);
      } else {
        this.slideHide(this.content);
      }
    }
  }

  render() {
    return html`
    <nav @click="${this.toggle}" class="${this.opened ? 'opened' : ''}">
      <dile-icon .icon=${this.icon}></dile-icon>
      <span>
        ${this.label}
      </span>
    </nav>
    <div id="content">
      <div class="container">
        <slot></slot>
      </div>
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
    if(! this.opened) {
      this.slideShow(this.content);
      this.opened = true;
    }
  }
  
  close() {
    if(this.opened) {
      this.slideHide(this.content);
      this.opened = false;
    }
  }
}