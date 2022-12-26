/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'index.rocket.js';
import { layout } from './recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

import { pageTree } from '../src/menus/pageTree.js'; 
import { ChildListMenu } from '@rocket/engine';
import { html } from 'lit';
import '../../packages/dile-button/dile-button.js';
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

  <hr>

${pageTree.renderMenu(new ChildListMenu(), sourceRelativeFilePath)}

`;