# \<dile-graph>

Web Component to show a custom graph to the user usign [Chart.js](https://www.chartjs.org/)

## Installation

```bash
npm i @dile/dile-graph
```

## Usage

Add the following library in the index

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
```
* Is necesary to use Chart.js version 3 or higher. To use Chart.js version 2 you need to use the version 0.1.1 of @dile/dile-graph component.

Import the component js module

```html
<script type="module">
    import 'dile-graph/dile-graph.js';
</script>
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

It is also possible to use some CSS custom properties to customize the component.

| Custom variable                   | Description           | Default |
| --------------------------------- | --------------------- | ------- |
| --dile-graph-width                | card width            | 100%    |
| --dile-graph-background-color     | card background color | white   |
| --dile-graph-border-radius        | card border radius    | 0px     |
| --dile-graph-shadow               | card box shadow       | 0 4px 8px 0 rgba(0, 0, 0, 0.2)   |
| --dile-graph-hover-shadow         | card hover box shadow | 0 8px 16px 0 rgba(0, 0, 0, 0.2) |
| --dile-graph-padding              | card padding          | 10px     |

