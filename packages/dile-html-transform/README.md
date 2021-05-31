# @dile/dile-html-transform

A web component to  transform the HTML placed inside it.

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

Whatever you place inside the ```<dile-html-transform>``` tag will be transformed an used to show the same content with the transformations.

Transformations available:
- Transform newlines in ```<br>```tags 
- Transform urls in links

```
<dile-html-transform convertLines convertLinks>
  The main search engine is google.com
  ...but I think bing.com is also a great option.
</dile-html-transform>
```

In order to make the desired conversions you need to provide the following attributes:

- **convertLines**: should be true to convert new lines to ```<br>``` 
- **convertLinks**: should be true to convert the URLs in the text into links

