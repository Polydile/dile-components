# @dile/dile-html-transform

A web component to apply breaklines and create links from URLs in a text.

## Install

```
npm install @dile/dile-html-transform
```

## Usage

### Import the component

```
import '@dile/dile-html-transform/dile-html-transform';
```

## Use the component

Apply the text to transform in the "text" property. Then, the ```<dile-html-transform>``` component will show the transformed text, to display break lines and links on the URLs. 

Transformations available:
- Transform newlines in ```<br>``` tags 
- Transform urls in links

Cross-Site Scripting note: This component will not parse strings with HTML. It uses [Linkify-string](https://linkify.js.org/docs/linkify-string.html) to convert URLs into HTML links. So, any HTML entities in the input strings will be converted to encoded characters. Later we use the lit unsafeHTML directive, to display the link on the document. Although, it is always important to ensure the input to prevent xss attacks.

```html
<dile-html-transform text="Hi! from DesarrolloWeb.com. Why not to follow us on twitter.com?" convertLines convertLinks></dile-html-transform>
```

In order to make the desired conversions you need to provide the following attributes:

- **text**: The text will be transformed 
- **convertLines**: should be true to convert new lines to ```<br>``` 
- **convertLinks**: should be true to convert the URLs in the text into links, including email addresses

## This component depends on Linkify.js

This component load [Linkify.js](https://linkify.js.org/) library by it-self, to convert the URLs in the text into links. You don't need to load this library manually.

