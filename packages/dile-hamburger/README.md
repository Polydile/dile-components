# @dile/dile-hamburger>

A component to show the typical hamburger menu icon with two states, open and closed and an animation between them. 

The component states, opended and closed, defines the icon displayed. There is a boolean property "active" to define the state. 

This component do not responds to any user interaction by itself. The component that uses ```dile-hamburger``` has the responsability to change the state when is desired, binding the state to the "active" property, or changing it programaticaly.

The hamburger component use a smooth CSS animation when changes it's state. 

## Installation

```bash
npm i @dile/dile-hamburger
```

## Usage

Import the component.

```javascript
import 'dile-hamburger/dile-hamburger.js';
```

Use the component.

```html
<dile-hamburger></dile-hamburger>
```

## Properties

- **active**: Boolean property to set the state of the hamburger icon.

## Customization

You can customize the icons using this CSS Custom properties;

Custom property | Description | Default
----------------|-------------|---------
--dile-hamburger-color | Icon color | #000
--dile-hamburger-padding-x | Horizontal icon box padding  | 15px
--dile-hamburger-padding-y | Vertical icon box padding  | 15px
--dile-hamburger-active-color | Icon color | #000
--dile-hamburger-line-size | Width of the icon lines | 3px
--dile-hamburger-width | Width of the entire icon | 24px
--dile-hamburger-height | Height of the entire icon | 24px
--dile-hamburger-line-separation | Separation between lines, only in inactive state icon | -6px