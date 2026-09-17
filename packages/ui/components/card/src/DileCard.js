import { LitElement, html, css } from 'lit';
import '@dile/iconlib/dile-iconlib.js';

export class DileCard extends LitElement {
    static styles = [
      css`
        * {
          box-sizing: border-box;
        }
        :host {
          display: flex;
          flex-direction: column;
          border: var(--dile-card-border, 1px solid #ccc);
          border-radius: var(--dile-card-border-radius, 0.5rem);
          background-color: var(--dile-card-background-color, #fff);
          color: var(--dile-card-text-color, #303030);
          text-align: var(--dile-card-text-align, left);
          font-weight: var(--dile-card-font-weight, normal);
          box-shadow: var(--dile-card-box-shadow, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1));
        }
        :host([grey]) {
          background-color: var(--dile-card-grey-background-color, #f4f4f4);
          color: var(--dile-card-grey-text-color, #303030);
        }
        .card-icon {
          display: flex;
          padding-right: var(--dile-card-padding-x, 1rem);
          padding-left: var(--dile-card-padding-x, 1rem);
          padding-top: var(--dile-card-padding-y, 1rem);
          --dile-icon-color: var(--dile-card-icon-color, var(--dile-on-background-color, #888));
        }

        :host([grey]) .card-icon {
          --dile-icon-color: var(--dile-card-icon-color, var(--dile-card-grey-text-color, #303030));
        }

        .card-title, main, footer {
          padding-right: var(--dile-card-padding-x, 1rem);
          padding-left: var(--dile-card-padding-x, 1rem);
        }
        .card-title {
          padding-top: var(--dile-card-padding-y, 1rem);
          font-size: var(--dile-card-title-font-size, 1.5rem);
          font-weight: var(--dile-card-title-font-weight, 300);
          color: var(--dile-card-title-color, var(--dile-card-text-color, #303030));
          margin: 0;
          margin-bottom: var(--dile-card-title-margin-bottom, 0);
        }
        .card-title-with-icon {
          padding-top: var(--dile-card-title-padding-top-with-icon, 0.75rem);
        }
        main {
          padding-top: var(--dile-card-padding-y, 1rem);
          padding-bottom: var(--dile-card-padding-y, 1rem);
          flex-grow: 1;
        }
        footer {
          border-top: var(--dile-card-footer-border-separator, 1px solid #ccc);
          padding-top: var(--dile-card-footer-padding-top, 0.75rem);
          padding-bottom: var(--dile-card-padding-y, 1rem);
          background-color: var(--dile-card-footer-background-color, transparent);
          overflow: hidden;
          border-bottom-left-radius: var(--dile-card-border-radius, 0.5rem);
          border-bottom-right-radius: var(--dile-card-border-radius, 0.5rem);
        }
        :host([shadow-none]) {
          box-shadow: var(--dile-card-box-shadow, 0 0 #0000);
        }
        :host([shadow-sm]) {
          box-shadow: var(--dile-card-box-shadow, 0 1px 2px 0 rgb(0 0 0 / 0.05));
        }
        :host([shadow-md]) {
          box-shadow: var(--dile-card-box-shadow, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1));
        }
        :host([shadow-lg]) {
          box-shadow: var(--dile-card-box-shadow, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1));
        }
        :host([shadow-xl]) {
          box-shadow: var(--dile-card-box-shadow, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1));
        }
        :host([shadow-2xl]) {
          box-shadow: var(--dile-card-box-shadow, 0 25px 50px -12px rgb(0 0 0 / 0.25));
        }

      `
    ];

    static get properties() {
      return {
        title: { type: String },
        titleLevel: { type: Number },
        icon: { type: String }
      };
    }

    constructor() {
      super();
      this.titleLevel = 2; // sensible default to avoid forcing h1 in page context
    }

    render() {
      return html`
        ${this.iconTemplate}
        ${this.titleTemplate}
        <main>
          <slot></slot>
        </main>
        ${this.footerTemplate}
      `;
    }

    get iconTemplate() {
      return this.icon
          ? html`<div class="card-icon"><dile-iconlib icon="${this.icon}"></dile-iconlib></div>`
          : '';
    }

    get titleTemplate() {
      // Allow consumers to provide a custom title slot (e.g. an h2/h3) to control heading semantics
      if (this.hasSlot('title')) {
        const titleClass = this.icon ? 'card-title card-title-with-icon' : 'card-title';
        return html`<div class="${titleClass}"><slot name="title"></slot></div>`;
      }

      if (this.title) {
        const titleClass = this.icon ? 'card-title card-title-with-icon' : 'card-title';
        return html`<div class="${titleClass}" role="heading" aria-level="${this.titleLevel}">${this.title}</div>`;
      }
      return '';
    }


    get footerTemplate() {
      return html`
        ${this.hasSlot('footer') 
          ? html`
            <footer>
                <slot name="footer"></slot>
            </footer>
            `
          : ''
        }
      `;
    }
    
    hasSlot(name) {
        return this.querySelector(`[slot="${name}"]`) !== null;
    }
}