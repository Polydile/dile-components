/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'index.rocket.js';
import { layout } from './recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

import { pageTree } from '../src/menus/pageTree.js'; 
import { ChildListMenu } from '@rocket/engine';
import { html } from 'lit';
import '../../packages/dile-button/dile-button.js';
import { helpIcon, settingsIcon, checkboxCheckedIcon, paletteIcon, autoAwesomeIcon, scaleIcon } from "../../packages/icons/index.js";
import "../../packages/dile-icon/dile-icon.js";
export const title = 'Dile components website';

export default () => html`
  <script type="module">
    import "../packages/dile-menu-hamburger/dile-menu-hamburger.js";
    import "../packages/dile-selector/dile-selector.js";
    import "../packages/dile-selector/dile-selector-item.js";
  </script>
  <style>
    h1 {
      margin-bottom: 1rem;
      text-align: center;
    }
    dile-selector-item {
      display: block;
    }
    .subtitle {
      color: #666;
      font-size: 1.1rem;
      font-style: italic;
      margin: 1.5rem;
    }
    .subtitle img {
      max-width: 100%;
    }
    .subtitle p {
      margin: 1rem 0 1.5rem;
      text-align: center;
    }
    .options {
      display: flex;
      flex-direction: column;
      align-items: center;
      column-gap: 1rem;
      row-gap: 1rem;
      margin-bottom: 1.5rem;
    }
    @media(min-width: 450px) {
      .subtitle .image {
        margin: 0 2rem;
      }
      .subtitle p {
        font-size: 1.3rem;
        margin-left: 2rem;
        margin-right: 2rem;
      }
    }
    @media(min-width: 650px) {
      .subtitle {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        column-gap: 3rem;
      }
      h1 {
        margin-top: 2rem;
        margin-bottom: 2rem;
        font-size: 2.5rem;
      }
      .subtitle .image {
        flex-grow: 1;
        margin: 0;
      }
      .subtitle p {
        max-width: 250px;
        font-size: 1.3rem;
      }
    }
    @media(min-width: 750px) {
      h1 {
        font-size: 2.5rem;
      }
      .subtitle {
        margin: 3rem 5rem;
      }
      .subtitle p {
        font-size: 1.4rem;

      }
      .options {
        flex-direction: row;
      }
    }

    @media(min-width: 850px) {
      h1 {
        font-size: 3rem;
      }
      .subtitle {
        margin: 3rem 6rem 4.5rem;
        column-gap: 6rem;
      }
    }

    @media(min-width: 950px) {
      .subtitle {
        column-gap: 8rem;
      }
    }

    /* FEATURED */
    .Featured {
      background-color: #f5f5f5;
      display: grid;
      column-gap: 1.5rem;
      row-gap: 2.5rem;
      color: #303030;
      padding: 2.5rem 1rem;
      --dile-icon-color: var(--primary-color);
      --dile-icon-size: 4rem;
      font-size: 1.2rem;

    }  

    .Featured a {
        color: inherit;
        text-decoration: none;
        margin-bottom: 1rem;
    }

    .Featured p {
        margin-bottom: 0.3rem;
    }

    .Featured h2 {
        font-size: 1.5rem;
        margin: 0.5rem 0 1rem 0;
    }
    @media(min-width: 450px) {
      .Featured {
        padding-left: 2.5rem;
        padding-right: 2.5rem;
      }
      .Featured img {
        width: 100px;
      } 
    }

    @media(min-width: 550px) {
      .Featured {
        grid-template-columns: 1fr 1fr;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
      .Featured img {
        width: 100px;
      } 
    }

    @media(min-width: 780px) {
      .Featured {
        grid-template-columns: 1fr 1fr 1fr;
        padding-left: 2rem;
        padding-right: 2rem;
      }
      .Featured img {
        width: 100px;
      } 
    }
    @media(min-width: 830px) {
        .Featured {
          column-gap: 3.5rem;
          padding-left: 3rem;
          padding-right: 3rem;
        } 
    }

    .Featured-item {
        text-align: center;
    }
    

  </style>
  <h1>Polydile Web Components</h1>
  <div class="subtitle">
    <div class="image">
      <img src="images/design-components.svg" alt="Design components">
    </div>
    <section>
      <p>
        Web Components made for all kind of projects and frameworks.
      </p>
      <div class="options">
        <a href="how-to-use"><dile-button>How to use</dile-button></a>
        <a href="components/"><dile-button>Components catalog</dile-button></a>
      </div>
    </section>
  </div>
  
  <div class="Featured">
    <a href="/how-to-use">
      <div class="Featured-item">
              
        <dile-icon .icon="${settingsIcon}"></dile-icon>

        <h2>Use everywhere</h2>
        <p>
          It's Javascript Web Components, you can use in Vanilla.js or any framework you want.
        </p>
      </div>
    </a>
    <a href="/how-to-use">
      <div class="Featured-item">

        <dile-icon .icon="${paletteIcon}"></dile-icon>

        <h2>Customizable</h2>
        <p>
          Every component has a base design and they are also fully customizable.
        </p>
      </div>
    </a>
    <a href="/how-to-use">
      <div class="Featured-item">

        <dile-icon .icon="${scaleIcon}"></dile-icon>

        <h2>Lightweight</h2>
        <p>
          Only a few Kb per component! Always lightweight, for optimized projects.
        </p>
      </div>
    </a>
    <a href="/components/">
      <div class="Featured-item">
        <dile-icon .icon="${checkboxCheckedIcon}"></dile-icon>

        <h2>Multiple purposes</h2>
        <p>
          Components for common (and no so common) purposes. You can use only one... or all of them.
        </p>
      </div>
    </a>
    <a href="/mixins/">
      <div class="Featured-item">
        <dile-icon .icon="${autoAwesomeIcon}"></dile-icon>

        <h2>Generic mixins</h2>
        <p>
          There are components, but also mixins for many generic case to develop user interfaces.
        </p>
      </div>
    </a>
    <a href="/contribute">
      <div class="Featured-item">
        
        <dile-icon .icon="${helpIcon}"></dile-icon>

        <h2>Easy to understand</h2>
        <p>
          The components are easy to understand for every developer, so you can expand and contribute with us.
        </p>
      </div>
    </a>
  </div>
`;