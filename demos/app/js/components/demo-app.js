import { LitElement, html, css } from 'lit';
import { store } from '../redux/store';
import { modalMessage } from '@dile/lib';
import { FeedbackMixin } from '../mixins/FeedbackMixin';

export class DemoApp extends FeedbackMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      dile-nav span {
        font-weight: bold;
        font-size: 1.1rem;
      }
      main {
        padding: 1rem;
      }
      .app-menu {
        padding: 1rem;
      }

      .options {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: red;
      }
      
      .options span {
        display: inline-block;
        border: 1px solid #303030;
        padding: 0.25rem;
      }

      @media(min-width: 500px) {
        dile-nav {
          --dile-nav-padding-x: 1.25rem;
        }
        main {
          padding: 1.6rem;
        }    
      }
    `
  ];

  render() {
    return html`
      <dile-nav menu="right">
        <span slot="title">App title</span>
        <dile-menu-hamburger hamburgerAlwaysVisible slot="menu">
          <nav class="app-menu" slot="menu">
            <p><a href="one.html">Link one</a></p>
            <p><a href="two.html">Link two</a></p>
          </nav>
        </dile-menu-hamburger>
      </dile-nav>
      <main>
        <p>
          Main app
        </p>
        <h2>Regular messages</h2>
        <dile-button @click=${this.openModal}>Open Modal</dile-button>
        <dile-button @click=${this.openModalLargeMessage}>Open Modal with large message</dile-button>
        <dile-button @click=${this.openLabelMessage}>Modal with label</dile-button>
        <h2>Icon messages</h2>
        <dile-button @click=${this.openModalWarning}>Modal warning icon</dile-button>
        <dile-button @click=${this.openModalSuccess}>Modal success icon</dile-button>
        <dile-button @click=${this.openModalError}>Modal error icon</dile-button>
        <dile-button @click=${this.openModalInfo}>Modal info icon</dile-button>
      </main>
      <demo-modal-feedback></demo-modal-feedback>
    `;
  }

  
  openModal() {
    this.modalFeedback('Hi, this is a message!!');
  }

  openModalLargeMessage() {
    this.modalFeedback('Voy a poner un mensaje más largo para ver lo que pasa. Espero que se renderice bien en el modal que estamos abriendo.');
  }

  openLabelMessage() {
    this.modalFeedback('If you do this it will be a problem', 'I have understood');
  }

  openModalWarning() {
    this.modalFeedback('This is a warning message!!', 'Close', 'warning');
  }

  openModalSuccess() {
    this.modalFeedback('This operation was completed successfully', 'Ok', 'success');
  }

  openModalError() {
    this.modalFeedback('An error status code was received performing this operation', 'Close', 'error');
  }

  openModalInfo() {
    this.modalFeedback('Displaying some information to the user', 'Confirm', 'info');
  }



}
customElements.define('demo-app', DemoApp);
