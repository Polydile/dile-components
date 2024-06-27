---
title: Html Transform
tags: utils
---

# dile-html-transform

A web component to transform plain text into HTML applying breaklines and transform URLs into links.

## Install

```bash
npm install @dile/utils
```

## Usage

Import the component.

```javascript
import '@dile/utils/components/html-transform/html-transform';
```

## Use the component

You can assign the text to transform in the "text" property of the component. Then, the ```<dile-html-transform>``` component will show the transformed text, to display break lines and links on the URLs. 

Transformations available:
- Transform newlines in ```<br>``` tags 
- Transform urls in HTML links (```<a href="...">text</a>```)

> **Cross-Site Scripting note**: This component will not parse strings with HTML. It uses [Linkify-string](https://linkify.js.org/docs/linkify-string.html) to convert URLs into HTML links. So, any HTML entities in the input strings will be converted to encoded characters. Later we use the lit unsafeHTML directive, to display the link on the document. Although, it is always important to validate the input to prevent xss attacks.

```html
<dile-html-transform text="Hi! from DesarrolloWeb.com. Why not to follow us on twitter.com?" convertLines convertLinks></dile-html-transform>
```

In order to make the desired conversions you need to provide the following attributes:

- **text**: The text that will be transformed 
- **convertLines**: should be true to convert new lines to ```<br>``` 
- **convertLinks**: should be true to convert the URLs in the text into links, including email addresses

## This component depends on Linkify.js

This component load [Linkify.js](https://linkify.js.org/) library by it-self, to convert the URLs in the text into links. You don't need to load this library manually.

## dile-html-transform demos

### Simple demo

```html:preview
<script type="module">
  import '@dile/utils/components/html-transform/html-transform';
</script>
<dile-html-transform text="I found Escuela.it a interesting site. 
Contact them at contacto@escuela.it" convertLines convertLinks></dile-html-transform>
```

### Interactive demo

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
  render() {
    return html`
      <p>
      <dile-html-transform id="transform" convertLines convertLinks></dile-html-transform>
    </p>
    <button id="links" @click=${this.toggleLinks}>Toggle links</button> 
    <button id="lines" @click=${this.toggleLines}>Toggle breaklines</button>
    `;
  }

  firstUpdated() {
    this.transformElement = this.shadowRoot.getElementById('transform');
    this.transformElement.text = `Hi!
The main search engine is google.com.
...but I think bing.com is also a great option.`
  }

  toggleLinks() {
    this.transformElement.convertLinks = !this.transformElement.convertLinks;
  }

  toggleLines() {
    this.transformElement.convertLines = !this.transformElement.convertLines;
  }  
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```