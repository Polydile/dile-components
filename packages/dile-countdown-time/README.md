# dile-countdown-time

Web component that shows a countdown to a date based on LitElement

Go to [DEMOS page](https://dile-countdown-time.polydile.com)!

```
<dile-countdown-time dateString="31-12-2020 10:00" language="es"></dile-countdown-time>
```

## dateString

The dateString property works with the date in "DD-MM-YYYY HH:mm" format

## Languages available

The language property accepts the languages listed bellow:

- en (default)
- es

## Shapes available

The shape property accepts the shapes listed bellow:

- square (default)
- circle

## Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|---------
--dile-countdown-time-shape-color | shape color | #212121
--dile-countdown-time-number-color | number color | #f5f5f5
--dile-countdown-time-word-color | word color | #212121