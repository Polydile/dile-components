```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'mixins/index.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

import { pageTree } from '../../src/menus/pageTree.js'; 
import { ChildListMenu } from '@rocket/engine';
import { html } from 'lit';

const componentLinks = html`${pageTree.renderMenu(new ChildListMenu(), sourceRelativeFilePath)}`;
export const title = "Dile Component Mixins";
```

```js script
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
```

# Mixins Catalog

Here you can find the dile-components mixin catalog.

<div>${componentLinks}</div>
