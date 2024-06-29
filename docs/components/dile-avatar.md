---
layout: layout.html
title: Avatar
---

# dile-avatar

This is a web component to create a user avatar interface that can be configured on diferent ways. In order of preference:

- User image file 
- Initial letter of the name
- Default avatar icon

So, when an image is provided, the component uses the image. If not, the initial letter is used. If neither an image nor an initial is provided, the avatar shows a default user icon.

## Installation
```bash
npm i @dile/ui
```

## Usage

Import the component:

```javascript
import '@dile/ui/components/avatar/avatar.js';
```

Use the component:

```html
<dile-avatar src="./images/user.jpg"></dile-avatar>
```

## Properties

- **src**: the route of the user image file.
- **initial**: Initial letter of the user name. If initial is a string with more than one character, then only the first letter is used.

## CSS Custom Properties

You can customize the avatar using these CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-avatar-size | The size of the avatar | 36px
--dile-avatar-background-color | background color for the avatar | --dile-primary-color or #ddd
--dile-avatar-color | Color for the initial letter | #888
--dile-avatar-font-family | Initial font family | Arial, sans-serif


## dile-avatar demos

### Avatar configured with an image

```html:preview
<dile-avatar src="/images/random-user.jpg"></dile-avatar>
```

### Avatar configured with an initial letter

```html:preview
<dile-avatar initial="julian"></dile-avatar>
```

### Avatar without configuration

```html:preview
<dile-avatar></dile-avatar>
```

### Styled avatars

```html:preview
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

<style>
  #avatar3 {
    --dile-avatar-size: 48px;
    --dile-avatar-background-color: #bef;
  }
</style>
<dile-avatar id="avatar3"></dile-avatar>
```