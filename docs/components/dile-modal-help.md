---
title: Modal Help
tags: feedback
---

# dile-modal-help

This component implements a modal dialog box based on dile-modal but with a pre-built interface for opening it.

It is designed to provide a quick way to offer help messages to users, which open when a button is pressed. The button can have text or be a simple help icon.

Like all dile-components, it can be customized by changing the colors and other styles.

## Install

```bash
npm install @dile/ui
```

## Usage

### Import the component

```javascript
import '@dile/ui/components/modal/modal-help';
```

## Use the component

To use the component, we can customize the text label or the icon. Additionally, we will introduce the help content to be displayed in the dialog box via a slot.

```html
<dile-modal-help title="Some information">
  <p>Lorem ipsum dolor sit amet...</p>
  <p>Pariatur vero impedit!</p>
</dile-modal-help>
```

## Properties

- **label**: Button text.
- **icon**: HTML template of the icon
- **title**: Modal box heading
- **onlyIcon**: Boolean. If true the open interface only shows an icon

## Methods

- **open**: Use it to open the modal box
- **close**: Use it to close the modal box

## Events

This component is implemented using dile-modal, so the events are the same as those found in that component.

## Style customization

The custom properties you can use are the same as those in dile-modal. Additionally, the buttons and icons are customized with the custom properties of their respective components. There are also new CSS variables available for further customization.

Custom property | Description | Default
----------------|-------------|---------
--dile-modal-help-width | Dialog width | 280px
--dile-primary-color | Icon background | #2962FF
--primary-dark-color | Title text color | #303030
--dile-primary-color | Title border bottom | #2962FF
--dile-modal-help-icon-color | Icon color | #fff

## dile-modal-help demos

### Default modal help box

```html:preview
<script type="module">
import '@dile/ui/components/modal/modal-help';
</script>
<dile-modal-help label="Some information">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aut ipsa laborum deserunt, fuga culpa hic quod, dolor nostrum consectetur laudantium dignissimos accusantium et repellendus illum quis aliquam earum ab!</p>
  <p>Pariatur vero impedit repudiandae labore mod!</p>
</dile-modal-help>
```

### Modal help only with icon

```html:preview
<style>
  dile-modal-help {
    --dile-primary-color: var(--dile-secondary-color);
  }
</style>
<dile-modal-help class="onlyicon" onlyIcon>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aut ipsa laborum deserunt, fuga culpa hic quod, dolor nostrum consectetur laudantium dignissimos accusantium et repellendus illum quis aliquam earum ab!</p>
  <p>Pariatur vero impedit repudiandae labore mod!</p>
</dile-modal-help>
```
### Control outside

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
  render() {
    return html`
      <dile-modal-help label="Openable" id="openable">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aut ipsa laborum deserunt, fuga culpa hic quod, dolor nostrum consectetur laudantium dignissimos accusantium et repellendus illum quis aliquam earum ab!</p>
      <p>Pariatur vero impedit repudiandae labore mod!</p>
    </dile-modal-help>

    <button id="openablebutton" @click="${this.openAndClose}">Open only for 5 seconds</button>
    `
  }
  openAndClose() {
    const openable = this.shadowRoot.getElementById('openable');
    openable.open();
    setTimeout( () => openable.close(), 5000);
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```
