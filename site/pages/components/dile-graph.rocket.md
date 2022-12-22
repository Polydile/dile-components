```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'components/dile-graph.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'dile-graph';
```

```js script
import { html, css, LitElement } from 'lit'; 
import 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import '../../../packages/dile-graph/dile-graph.js'
import "../../../packages/dile-menu-hamburger/dile-menu-hamburger.js";
```

# dile-graph

Web Component to create a custom charts based on the library [Chart.js](https://www.chartjs.org/)

## Installation

```bash
npm i @dile/dile-graph
```

## Usage

Add the ChartJS library to your page, with your preferred way, por example:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
```
> Is necessary to use Chart.js version 3 or higher. To use Chart.js version 2 you need to use the version 0.1.1 of @dile/dile-graph component.

Import the component your js module

```javascript
import '@dile/dile-graph/dile-graph.js';
````
Use the component

```html
<dile-graph 
    class="example"
    charttype="line" labels='["A", "B", "C", "D", "E", "F"]'
    datasets='[{ "label": "Dataset 1", "data": [65, 59, 80, 81, 56, 55], "borderColor": "rgb(255, 99, 132)", "backgroundColor": "rgb(177, 199, 232)"},{ "label": "Dataset 2", "data": [28, 48, 40, 19, 86, 27], "borderColor": "rgb(33, 150, 232)", "backgroundColor": "rgb(55, 199, 200)"}]'>
</dile-graph>
```

Set the graph values ​​with the following properties

| Property          | Description          | Examples                                               |
| ----------------- | -------------------- | ------------------------------------------------------ |
| cartType          | Chart type           | 'line', 'bar'...                                       |
| labels            | Horizonal Labels     | ['Jan', 'Feb', 'Mar']                               |
| datasets          | Data                 | [ { "label": "Users", "data": [1, 4, 8], "backgroundColor": "rgba(255, 99, 132, 0.2)", "borderColor": "rgba(255,99,132,1)", "borderWidth": 2 } ] |

Consult the [Chart.js](https://www.chartjs.org/) documentation for more information about datasets.

## CSS Custom Properties

It is possible to use some CSS custom properties to customize the component.

| Custom variable                   | Description           | Default |
| --------------------------------- | --------------------- | ------- |
| --dile-graph-width                | card width            | 100%    |
| --dile-graph-background-color     | card background color | white   |
| --dile-graph-border-radius        | card border radius    | 0px     |
| --dile-graph-shadow               | card box shadow       | 0 4px 8px 0 rgba(0, 0, 0, 0.2)   |
| --dile-graph-hover-shadow         | card hover box shadow | 0 8px 16px 0 rgba(0, 0, 0, 0.2) |
| --dile-graph-padding              | card padding          | 10px     |

## dile-graph demos

### Default Graph

```html preview-story
<dile-graph 
    charttype="bar" 
    labels='["Jan","Feb","Mar"]'
    datasets='[ { "label": "Users", "data": [1, 4, 6], "backgroundColor": "rgba(255, 99, 132, 0.2)", "borderColor": "rgba(255,99,132,1)", "borderWidth": 2 } ]'
></dile-graph>
```

### Custom Graph

```html preview-story
<style>
  .example {
      --dile-graph-width: 700px;
      --dile-graph-border-radius: 12px;
      --dile-graph-background-color: #ddf0ff;
      --dile-graph-width: 400px;
      --dile-graph-shadow: none;
      --dile-graph-hover-shadow: 0 0 10px rgba(40, 100, 200, 0.2);
  }
</style>
<dile-graph 
    class="example"
    charttype="line" labels='["A", "B", "C", "D", "E", "F"]'
    datasets='[{ "label": "Dataset 1", "data": [65, 59, 80, 81, 56, 55], "borderColor": "rgb(255, 99, 132)", "backgroundColor": "rgb(177, 199, 232)"},{ "label": "Dataset 2", "data": [28, 48, 40, 19, 86, 27], "borderColor": "rgb(33, 150, 232)", "backgroundColor": "rgb(55, 199, 200)"}]'>
</dile-graph>
```