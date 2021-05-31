# \<dile-graph>

Web Component to show a custom graph to the user usign Chart.js

## Installation

```bash
npm i dile-graph
```

## Usage

Add the following library in the index

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.js"></script>
```

then

```html
<script type="module">
    import 'dile-graph/dile-graph.js';
</script>

<dile-graph></dile-graph>
```

It is also possible to set the values ​​of the graph with the following variables

| Custom variable   | Description          | Default                                                |
| ----------------- | -------------------- | ------------------------------------------------------ |
| graphicTitle      | graphic title        | Default Graph                                          |
| columnsOfTheChart | columns of the graph | ['Column 1', 'Column 2']                               |
| columnsValues     | Column values        | [3, 7]                                                 |
| columnColors      | Columns colors       | ["rgba(200, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"] |
| ColumnEdgeColors  | Column Border Colors | ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)"]        |

## Css

It is also possible to set the values of the css with the following variables

| Custom variable                  | Description           | Default |
| -------------------------------- | --------------------- | ------- |
| --eit-card-graph-width           | card width            | 400px   |
| --eit-card-graph-backgroundColor | card background color | white   |
| --eit-card-graph-borderRadius    | card border radius    | 0px     |
| --eit-graph-width                | graph width           | 300px   |
| --eit-graph-heigth               | graph heigth          | 300px   |

## Local Demo with `web-dev-server`

```bash
npm run start
```

To run a local development server that serves the basic demo located in `demos/dile-graph.html`
