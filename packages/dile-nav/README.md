# @dile/dile-nav

Web Component to create a nav bar

## Installation
```bash
npm i @dile/dile-nav
```

## Usage

Import the component.

```javascript
import '@dile/dile-nav/dile-nav.js';
```

Use the component

```html
<dile-nav>
  <span slot="title">Hi from Polydile!!</span>
</dile-nav>
```

The dile-nav component has 3 slots of content: "title", "menu" and "actions". It is not necessary to use all of them. 

There is am example in a more complex implementation.

```html
<dile-nav>
  <h2 slot="title">Nav title</h2>
  <span slot="menu">[X]</span>
  <span slot="actions">Create</span>
</dile-nav>
```

## Properties
  - menu: position of the menu, between "left" and "right"

## Style customization

You can customize the navigation bar by using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-nav-color | Nav text color | #fff
--dile-nav-background-color | Nav background color | #666
--dile-nav-align-items | Nav align items (display grid property) | center
--dile-nav-column-gap | Nav column gap (display grid property)| 1rem
--dile-nav-padding-x | Nav padding horizontal | 0.6rem
--dile-nav-padding-y | Nav padding vertical | 0.8rem