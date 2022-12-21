/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'index.rocket.js';
import { layout } from './recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

import { pageTree } from './__shared/PageTree.js'; 
import { ChildListMenu } from '@rocket/engine';
import { html } from 'lit';
import '../../packages/dile-button/dile-button.js';
export const title = 'Dile components website';
export const heading = 'Soy indexxxx';

export default () => html`
  <script type="module">
    import "../packages/dile-menu-hamburger/dile-menu-hamburger.js";
  </script>
  <style>
    h1 {
      margin-bottom: 1rem;
    }
    .subtitle {
      background-color: #e6f9db;
      color: #666;
      padding: 0.7rem;
      border-radius: 0.5rem;
      font-size: 1.1rem;
      font-style: italic;
      margin-bottom: 1rem;
    }
    .options {
      display: flex;
      align-items: center;
      column-gap: 1rem;
    }
    dile-button {
      --dile-button-border-radius: 1rem;
      --dile-button-font-weight: bold;
    }
  </style>
  <h1>Polydile Web Components</h1>
  <p class="subtitle">
    Web Components made for all kind of projects and frameworks.
  </p>
  <div class="options">
    <a href="how-to-use"><dile-button>How to use</dile-button></a>
    <a href="components/"><dile-button>Components catalog</dile-button></a>
  </div>

<hr>

${pageTree.renderMenu(new ChildListMenu(), sourceRelativeFilePath)}

`;