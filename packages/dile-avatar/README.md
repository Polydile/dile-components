# @dile/dile-avatar

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