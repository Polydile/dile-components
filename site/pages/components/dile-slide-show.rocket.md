```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-slide-show.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-slide-show';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import "../../../packages/dile-slide-show/dile-slide-show.js";
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
import "../../../packages/dile-selector/dile-selector.js";
import "../../../packages/dile-selector/dile-selector-item.js";
```

# dile-slide-show

Component to show or hide some content with a smooth slide down / slide up animation.

## Installation

```bash
npm i @dile/dile-slide-show
```

## Usage

Import the component.

```javascript
import '@dile/dile-slide-show/dile-slide-show.js';
```

Use the component.

```html
<dile-slide-show>
  This is the content to show when the user do click in the open control.
</dile-slide-show>
```

## Properties

- **showLabel**: label to open the conten (it is shown when the element is closed).
- **hideLabel**: label to close the conten (it is shown when the element is opened).
- **targetHeight**: height of the element when the interface is closed.

> When you use ```targetHeight``` property the component starts with ```height: 0```. To allow to show some content on the initial rendering you should use the ```--dile-slide-down-initial-height``` CSS custom property. See demos for more details.

## Methods

- **open()**: open the element
- **close()**: close the element
- **toggle()**: toggle the element

### CSS custom properties

You can customize the component styles using this CSS custom properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-slide-down-initial-height | Interface initial height | 0
--dile-slide-show-align-control | Text align for the open / close control | 1em
--dile-slide-down-font-size | Font size for the open or close labels | 1em
--dile-slide-show-text-color | Label text color | #39c
--dile-slide-show-font-weight | Label font weight | bold
--dile-slide-show-text-decoration | Label text decoration | none
--dile-slide-show-icon-color | Color for the arrow icon | #39c


## dile-slide-show demos

### Regular demo

```html preview-story
<dile-slide-show>
  This is the content to show when the user do click in the open control.
</dile-slide-show>
```

### Using targetHeight demo

```html preview-story
<style>
  .showmore {
    --dile-slide-down-initial-height: 40px;
  }
  .styledlist {
    margin-bottom: 0;
  }
</style>
<dile-slide-show class="showmore" showLabel="Show more" hideLabel="Show less" targetHeight="40px">
  <p>
    In this demo we are using the targetHeight component property. When you use this property the element only closes to the targetHeight configurated value.
  </p>
  <p>
    Ea molestiae provident velit ex eaque aperiam quod corrupti saepe nemo, aut ipsum iusto voluptatum. Fuga quidem amet molestiae laudantium autem odit cupiditate, est numquam dolor dolorem, beatae, veritatis dignissimos.
  </p>
  <ul class="styledlist">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li>Item 4</li>
  </ul>
</dile-slide-show>
```


### Interactive from outside demo

```js preview-story
class MyComponent extends LitElement {
  static get styles() {
    return css`
      p {
        margin-top: 0;
      }
      p:last-child {
        margin-bottom: 0;
      }
      dile-slide-show {
        margin-bottom: 1rem;
      }
    `
  }

  render() {
    return html`
      <dile-slide-show id="slide">
        <p>
          This is the content to show when the user do click in the open control.
        </p>
        <p>
          You can open or close this interface using outside buttons.
        </p>
      </dile-slide-show>
      <p>
        <button id="open">Open</button>
        <button id="close">Close</button>
        <button id="toggle">Toggle</button>
      </p>
    `
  }
  firstUpdated() {
    let slide = this.shadowRoot.getElementById('slide');
    this.shadowRoot.getElementById('open').addEventListener('click', () => {
      slide.open();
    });
    this.shadowRoot.getElementById('close').addEventListener('click', () => {
      slide.close();
    });
    this.shadowRoot.getElementById('toggle').addEventListener('click', () => {
      slide.toggle();
    });
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```

### Styled element

```html preview-story
<style>
  .styled {
    --dile-slide-show-text-color: #085439;
    --dile-slide-show-icon-color: #13d366;
    --dile-slide-show-text-decoration: underline;
    --dile-slide-show-align-control: center;
    --dile-slide-down-font-size: 1.5rem;
    --dile-slide-down-initial-height: 73px;
  }
  .styled ul {
    margin-bottom: 0;
  }
</style>
<dile-slide-show class="styled" showLabel="Show more" hideLabel="Collapse" targetHeight="73px">
  <p>
    Laudantium autem odit cupiditate, est numquam dolor dolorem, beatae, veritatis dignissimos. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis quam illo iste necessitatibus vitae ducimus quos blanditiis debitis quasi asperiores, velit nostrum esse magni repellat, atque corporis assumenda porro. Facilis!
  </p>
  <ul>
    <li>Slide element 1</li>
    <li>Slide element 2</li>
    <li>Slide element 3</li>
    <li>Slide element 4</li>
    <li>Slide element 5</li>
    <li>Slide element 6</li>
    <li>Slide element 7</li>
    <li>Slide element 8</li>
  </ul>
</dile-slide-show>
```