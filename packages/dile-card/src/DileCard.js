import { LitElement, html, css } from 'lit';

export class DileCard extends LitElement {
    static styles = [
      css`
        :host {
          display: block;
          align-items: stretch;
        }
        section {
          border: var(--dile-card-border, 1px solid #ccc);
          border-radius: var(--dile-card-border-radius, 0.5rem);
          background-color: var(--dile-card-background-color, #fff);
          color: var(--dile-card-text-color, #303030);
          width: 100%;
          text-align: var(--dile-card-text-align, left);
          font-weight: var(--dile-card-font-weight, normal);
          box-shadow: var(--dile-card-box-shadow, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1));
        }
        h1, main, footer {
          padding-right: var(--dile-card-padding-x, 1rem);
          padding-left: var(--dile-card-padding-x, 1rem);
        }
        h1 {
          padding-top: var(--dile-card-padding-y, 1rem);
          font-size: var(--dile-card-title-font-size, 1.5rem);
          font-weight: var(--dile-card-title-font-weight, 300);
          margin: 0;
        }
        main {
          padding-top: var(--dile-card-padding-y, 1rem);
          padding-bottom: var(--dile-card-padding-y, 1rem);
        }
        footer {
          border-top: var(--dile-card-footer-border-separator, 1px solid #ccc);
          padding-top: 0.75rem;
          padding-bottom: var(--dile-card-padding-y, 1rem);
          background-color: var(--dile-card-footer-background-color, transparent);
          overflow: hidden;
          border-bottom-left-radius: var(--dile-card-border-radius, 0.5rem);
          border-bottom-right-radius: var(--dile-card-border-radius, 0.5rem);
        }
        :host([shadow-none]) section {
          box-shadow: var(--dile-card-box-shadow, 0 0 #0000);
        }
        :host([shadow-sm]) section {
          box-shadow: var(--dile-card-box-shadow, 0 1px 2px 0 rgb(0 0 0 / 0.05));
        }
        :host([shadow-md]) section {
          box-shadow: var(--dile-card-box-shadow, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1));
        }
        :host([shadow-lg]) section {
          box-shadow: var(--dile-card-box-shadow, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1));
        }
        :host([shadow-xl]) section {
          box-shadow: var(--dile-card-box-shadow, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1));
        }
        :host([shadow-2xl]) section {
          box-shadow: var(--dile-card-box-shadow, 0 25px 50px -12px rgb(0 0 0 / 0.25));
        }

      `
    ];

    static get properties() {
      return {
        title: { type: String }
      };
    }

    render() {
      return html`
        <section>
          ${this.titleTemplate}
          <main>
            <slot></slot>
          </main>
          ${this.footerTemplate}
        </section>
      `;
    }

    get titleTemplate() {
      return this.title 
          ? html`<h1>${this.title}</h1>`
          : ''
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