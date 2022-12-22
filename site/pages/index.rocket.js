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
  </script>
  <style>
    h1 {
      margin-bottom: 1rem;
      text-align: center;
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
      margin: 0.5rem 0;
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
  </style>
  <h1>Polydile Web Components</h1>
  <div class="subtitle">
    <img src="images/design-components.svg" alt="Design components">
    <p>
      Web Components made for all kind of projects and frameworks.
    </p>
  </div>
  <div class="options">
    <a href="how-to-use"><dile-button>How to use</dile-button></a>
    <a href="components/"><dile-button>Components catalog</dile-button></a>
  </div>

  <hr>

${pageTree.renderMenu(new ChildListMenu(), sourceRelativeFilePath)}

`;