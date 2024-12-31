---
title: Modal
tags: feedback
---

# dile-modal

This is a Web Component to implement a dialog box or modal box.

## Install

```bash
npm install @dile/ui
```

## Usage

### Import the component

```javascript
import '@dile/ui/components/modal/modal.js';
```

## Use the component

Whatever you place inside the ```<dile-modal>``` tag will be the content displayed when the modal box opens.

```html
<dile-modal id="myModal">
  <p>
    Lorem, ipsum dolor sit...
  </p>
</dile-modal> 
```

When needed, you may use the ```open()``` method to open the modal box interface, and ```close()``` to close it. 

```javascript
document.getElementById("myModal").open();
```

Other posibility in order to open or close the modal box is to set the boolean ```opened``` attribute.

## Properties

- **opened**: Bolean property used to change the modal state, false is closed / true means open.
- **showCloseIcon**: Boolean property to tell the modal box you want a close icon to be displayed.
- **blocking**: Boolean property to configure the modal box as a bloking interface. If true the modal box blocks the screen. That is, when you click in the background layer, the modal box do not close.

## Methods

- **open**: Use it to open the modal box
- **close**: Use it to close the modal box

## Events

- **dile-modal-closed**: Dispatched when the modal box becomes closed on any reason: by calling the close() method, by a click in the background modal, Esc key pressed or by a click on the close icon.
- **dile-modal-background-closed**: Dispatched when the modal box is closed because the user clicks in the background layer.

## Style customization

You can customize the modal box interface by using the CSS custom properties bellow.

Custom property | Description | Default
----------------|-------------|---------
--dile-modal-width | Content layer width | 280px
--dile-modal-min-width | Content layer min width | 250px
--dile-modal-max-width | Content layer max width | 100vw
--dile-modal-height | Conten layer height | auto
--dile-modal-min-height | Content layer max height | auto
--dile-modal-max-height | Content layer max height | 100vh
--dile-modal-content-background-color | Content layer background color | #fff
--dile-modal-content-padding | Content layer padding | 1em
--dile-modal-border-radius | Content layer border radius | 15px
--dile-modal-content-shadow-displacement | content layer shadow offset | 6px
--dile-modal-content-shadow-blur | Content layer shadow blur | 16px
--dile-modal-content-shadow-color | Content layer shadow color | #000
--dile-modal-background-color | Modal layer background color | rgba(30,30,30, 0.8)
--dile-modal-z-index | Modal layer z-index | 100
--dile-modal-content-z-index | Content layer z-index | 101
--dile-modal-close-icon-color | Close icon color | #888
--dile-modal-close-icon-size | Close icon size | 24px
--dile-modal-animation-duration | Duration of the opacity modal animation | 0.3s
--dile-modal-close-icon-top | Top position applied to the close icon | 5px
--dile-modal-close-icon-right | Right position applied to the close icon | 18px
--dile-modal-close-icon-cursor | Cursor style for the close icon | pointer
--dile-modal-extra-top-separation-when-icon | Extra separation for the content layer on the top, when the close icon is visible | 10px

## dile-modal demos

### Default modal box

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
  
  render() {
    return html`
      <dile-modal class="modalbox" id="elmodal1">
        <h2>I am dile-modal</h2>
        <p><b>Click outside to close the modal box</b></p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aut ipsa laborum deserunt, fuga culpa hic quod, dolor nostrum consectetur laudantium dignissimos accusantium et repellendus illum quis aliquam earum ab!</p>
        <p>Pariatur vero impedit repudiandae labore mod!</p>
      </dile-modal>
      <button id="open">Show default modal box</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('elmodal1').open();
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Styled modal with close icon

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class SecondComponent extends LitElement {
  static get styles() {
    return css`
      .myModalCustomized {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        --dile-modal-border-radius: 0;
        --dile-modal-content-background-color: #303030;
        --dile-modal-width: 200px;
        --dile-modal-min-width: 100px;
        --dile-modal-content-shadow-color: #ddd;
        --dile-modal-background-color: #fff;
        --dile-modal-animation-duration: 1s;
        --dile-modal-close-icon-right: 5px;
        --dile-modal-close-icon-color: yellow;
        color: #fff;
      }
      .myModalCustomized p {
        color: #f66;
        font-size: 0.9em;
        margin: 10px 0;
        text-transform: uppercase;
      }
    `
  }
  render() {
    return html`
      <dile-modal id="elmodal2" class="myModalCustomized" showCloseIcon>
        <p>Hi dile-modal!</p>
        <div>It is posible to close the modal box with the close icon</div>
      </dile-modal>
      <button id="open">Open styled modal</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('elmodal2').open();
    });
  }
}
customElements.define('second-component', SecondComponent);
</script>
<second-component></second-component>
```

### Blocking modal box

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class ThirdComponent extends LitElement {
  static get styles() {
    return css`
      dile-modal {
        --dile-modal-border-radius: 3px;
        --dile-modal-close-icon-right: 10px;
        --dile-modal-close-icon-top: 10px;
        --dile-modal-close-icon-color: red;
        --dile-modal-background-color: rgba(230,230,230, 0.6);
        --dile-modal-content-shadow-displacement: 0;
        --dile-modal-content-shadow-blur: 24px;
        --dile-modal-content-shadow-color: rgba(130,130,130, 0.6);
      }
      h2 {
        margin-top: 0;
      }
    `
  }
  render() {
    return html`
      <dile-modal class="modalbox" id="elmodal4" showCloseIcon blocking>
        <h2>Blocking</h2>
        <p>Event you click outside, the modal do not closes</p>
        <p>Pariatur vero impedit repudiandae labore mod!</p>
      </dile-modal>
      <button id="open">Open blocking modal</button>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      this.shadowRoot.getElementById('elmodal4').open();
    });
  }
}
customElements.define('third-component', ThirdComponent);
</script>
<third-component></third-component>
```