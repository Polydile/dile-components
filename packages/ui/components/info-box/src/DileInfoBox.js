import { LitElement, html, css } from 'lit';
import { DileSlideDown } from '../../../mixins/slide-down';
import { closeIcon, infoIcon, warningIcon, iconStyles } from '@dile/icons/index.js';

export class DileInfoBox  extends DileSlideDown(LitElement) {

  static get styles() {
    return [iconStyles, css`
      :host {
        display: block;
      }
      #box {
        transition: height 0.3s ease-in;
        overflow: hidden;
      }
      section {
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        border-radius: var(--dile-info-box-border-radius, 0px);
        padding: var(--dile-info-box-padding, 1rem);
        background-color: var(--dile-info-box-background-color, #ddd);
        color: var(--dile-info-box-text-color, #303030);
      }
      .content {
        flex-grow: 1;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }
      .info {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        --dile-icon-size: 36px;
      }
      main {
        flex-grow: 1;
      }
      .close {
        padding-top: 0.5rem;
        display: flex;
        align-items: flex-start;
        --dile-icon-color: var(--dile-info-box-close-icon-color, #f33);
      }
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
      .title {
        margin-bottom: var(--dile-info-box-title-margin-bottom, 0.5rem);;
        font-size: var(--dile-info-box-title-font-size, 1.3rem);
        font-weight: var(--dile-info-box-title-font-weight, bold);
        color: var(--dile-info-box-title-text-color, inherit);
      }
      @media(min-width: 400px) {
        .content {
          flex-direction: row;
          align-items: center;
        }
        .info {
          margin: 0 1rem 0 0;
          --dile-icon-size: 28px;
        }
        .close {
          padding-top: 0;
        }
      }
      @media(min-width: 500px) {
        .info {
          --dile-icon-size: 36px;
        }
      }
    `];
  }

  static get properties() {
    return {
      showCloseButton: { type: Boolean },
      title: { type: String },
      isError: { type: Boolean}
    };
  }

  render() {
    return html`
      <div id="box">
        <section>
          <div class="content">
            <span class="info">${this.showIcon(this.isError)}</span>
            <main>
              ${this.title
                  ? html`<div class="title">${this.title}</div>`
                  : ''
              }
              <slot></slot>
            </main>
          </div>
          ${this.showCloseButton 
            ? html`
              <div class="close">
                <button @click="${this.close}">${closeIcon}</button>
              </div>` : ''}
        </section>
      </div>
    `;
  }

  close() {
    let elem = this.shadowRoot.getElementById('box');
    this.slideHide(elem);
  }

  showIcon(isError) {
    return isError ? html`${warningIcon}` : html`${infoIcon}`
  }
}