```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'how-to-use.rocket.md';
import { layout } from './recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */
```

```js script
import "../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
```

# How to use dile-components

You can use this components in any Javascript project, with Vanilla-JS or any framework.

## 1.- Install any of the web components

```javascript
npm install @dile/dile-input
```

## 2.- Import the component

You can do that with an ESModules import in your Javascript code, usually using the npm package name. 

```javascript
import '@dile/dile-input/dile-input.js';
```

In order process imports with the package name in the browser you will need to use a tool like Webpack or Rollup. 

## 3.- Use the component

```html
<dile-input
  name="name"
  label="Name"
  value="John"
></dile-input>
```

## 4.- Read the docs

In the component documentation of each component you will find more information about component properties, CSS custom properties, API methods and custom events.

Each component documentation is on the related package folder. For example, the ```<dile-input>``` documentation is located on  the file:  ```packages/dile-input/README.md```. 

## 5.- Serve your proyect

There are many development servers to help you in this point. Our recomendation is to use [ViteJS](https://vitejs.dev/) or [Web Dev Server](https://modern-web.dev/docs/dev-server/overview/). 

## 6.- Build your Project

To build your project is necesary to use Webpack, Rollup or similar. At this moment, the best and easiest option is to use ViteJS.