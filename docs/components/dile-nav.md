---
title: Nav
---

# dile-nav

Web Component to create a nav bar

## Installation
```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/nav/nav.js';
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
  <span slot="menu">[x]</span>
  <span slot="actions">Create</span>
</dile-nav>
```

## Properties
  - menu: position of the menu, between "left" and "right"

## Style customization

You can customize the navigation bar by using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-nav-background-color | Nav background color | --dile-primary-color or #2962FF
--dile-nav-color | Nav text color | --dile-on-primary-color or #fff
--dile-nav-align-items | Nav align items (display grid property) | center
--dile-nav-column-gap | Nav column gap (display grid property)| 1rem
--dile-nav-padding-x | Nav padding horizontal | 0.6rem
--dile-nav-padding-y | Nav padding vertical | 0.8rem

## dile-nav demos

### Default nav

```html:preview
<style>
  main dile-nav.demo {
    --dile-primary-color: #2962FF;
    --dile-foreground-color: #fff;
  }
  dile-nav.demo h2 {
    margin: 0 0 0 1rem; 
  }
  dile-nav.demo {
    color: #fff;
  }
  .hamburger {
    position: relative;
    top: -2px;
    --dile-hamburger-padding-x: 0;
    --dile-hamburger-color: #fff;
  }
</style>
<dile-nav class="demo">
  <h2 slot="title">Nav title</h2>
  <span slot="menu"><dile-hamburger class="hamburger"></dile-hamburger></span>
  <span slot="actions">Action</span>
</dile-nav>
```

### Styled nav

```html:preview
<style>
  h2 {
    margin: 0;
  }
  .hamburger2 {
    position: relative;
    top: -2px;
    --dile-hamburger-padding-x: 0;
    --dile-hamburger-color: #369;
  }
  .styled {
    --dile-nav-background-color: #bbdefb;
    --dile-nav-color: #303030;
    --dile-nav-padding-y: 1rem;
    --dile-nav-padding-x: 1rem;
    color: #666;
  }
  .demoactions {
    display: inline-block;
    margin: 0 0.6rem;
  }
</style>
<dile-nav class="styled" menu="right">
  <h2 slot="title">Nav title</h2>
  <span slot="menu"><dile-hamburger class="hamburger2"></dile-hamburger></span>
  <span slot="actions" class="demoactions">Action</span>
</dile-nav>
```

