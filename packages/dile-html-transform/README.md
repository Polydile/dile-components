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

Apply the text to transform in the "text" property. Then, the ```<dile-html-transform>``` component will show the transformed text, to display break lines and links on the URLs. This component makes the transformations without using the lit-html unsafeHTML directive, to make the transformations more safe against cross-site-scripting vulnerabilities.

Transformations available:
- Transform newlines in ```<br>```tags 
- Transform urls in links

```
<dile-html-transform text="Hi! from DesarrolloWeb.com. Why not to follow us on twitter.com?" convertLines convertLinks></dile-html-transform>
```

In order to make the desired conversions you need to provide the following attributes:

- **text**: The text will be transformed 
- **convertLines**: should be true to convert new lines to ```<br>``` 
- **convertLinks**: should be true to convert the URLs in the text into links
- **convertEmails**: should be true to convert the emails into links (mailto:)

## This component depends on "anchorme"

You need to load the [anchorme library](https://alexcorvi.github.io/anchorme.js/) before to this component, in order to make available the URLs-to-link and email-to-link transformations.

You may require it in your js bundle, or use a CDN like this:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/anchorme/2.1.2/anchorme.min.js"></script>
```
