```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/index.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

import { pageTree } from '../../src/menus/pageTree.js'; 
import { ChildListMenu } from '@rocket/engine';
import { html } from 'lit';

const componentLinks = html`${pageTree.renderMenu(new ChildListMenu(), sourceRelativeFilePath)}`;
export const title = "Dile Components Catalog";
```

```js script
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```


# Components Catalog

Here you can find the dile-components catalog.

<div>${componentLinks}</div>
