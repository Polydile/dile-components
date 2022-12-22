```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-avatar.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-avatar';
```

```js script
import { html } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-avatar/dile-avatar.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
```

# dile-avatar

Webcomponent to create a user avatar interface, configured on diferent ways, in order of preference:

- User image file 
- Initial letter of the name
- Default avatar icon

When a image is provided, the component uses the image. If not, then the initial letter is used. If is not provided image nor initial, then the avatar shows a default user icon.

## Installation
```bash
npm i @dile/dile-avatar
```

## Usage

Import the component:

```javascript
import '@dile/dile-avatar/dile-avatar.js';
```

Use the component:

```html
<dile-avatar src="./images/user.jpg"></dile-avatar>
```

## Properties

- **src**: the route of the user image file.
- **initial**: Initial letter of the user name. If initial is a string with more than one character, then only the first letter is used.

## CSS Custom Properties

You can customize the avatar using this CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-avatar-size | The size of the avatar | 36px
--dile-avatar-background-color | background color for the avatar. Is only visible when the image src is not provided | #ddd
--dile-avatar-color | Color for the initial letter | #888

## dile-avatar demos

### Avatar configured with an image

```html preview-story
<dile-avatar src="/images/logo-polydile.png"></dile-avatar>
```

### Avatar configured with an initial letter

```html preview-story
<dile-avatar initial="j"></dile-avatar>
```

### Avatar without configuration

```html preview-story
<dile-avatar></dile-avatar>
```

### Styled avatar

```html preview-story
<style>
  #avatar {
    --dile-avatar-background-color: #936;
    --dile-avatar-color: #fff;
    --dile-avatar-size: 48px;
  }
</style>
<dile-avatar initial="M" id="avatar"></dile-avatar>

<style>
  #avatar2 {
    --dile-avatar-size: 48px;
    --dile-avatar-background-color: #eee;
  }
</style>
<dile-avatar src="/images/logo-polydile.png" id="avatar2"></dile-avatar>
```