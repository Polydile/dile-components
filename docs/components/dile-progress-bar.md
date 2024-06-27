---
title: Progress Bar
---

# dile-progress-bar

Web Component to create a customized progress bar.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component

```javascript
import '@dile/ui/components/progress-bar/progress-bar.js';
```

Use the component

```html
<dile-progress-bar
  title="I am a styled progress bar and animated"
  class="styled"
  value="80"
>
  <div slot="animated"></div>
</dile-progress-bar>
```

## Properties

- **title**: Progress bar title, string (optional).
- **value**: Progress bar percentage, number.
- **animated**: Boolean property to display an animated progress bar. If it's true the progress bar has a animation on the component initialization

### CSS Custom Properties

You can customize it using CSS Custom Properties.

| Custom property                              | Description                         | Default    |
| -------------------------------------------- | ----------------------------------- | ---------- |
| --dile-progress-bar-title-margin-top         | Top margin                          | 0px        |
| --dile-progress-bar-title-margin-right       | Right margin                        | 0px        |
| --dile-progress-bar-title-margin-bottom      | Bottom margin                       | 10px       |
| --dile-progress-bar-title-margin-left        | Left margin                         | 0px        |
| --dile-progress-background                   | Color of background progress bar    | #e9ecef    |
| --dile-progress-border-radius                | Border of background progress bar   | 20px       |
| --dile-progress-bar-min-height               | Min height progress                 | 20px       |
| --dile-progress-bar-align                    | Text align of percentage            | flex-start |
| --dile-progress-bar-background               | Color of progress bar               | #b8b9b9    |
| --dile-progress-bar-border-radius            | Border of progress bar              | 20px       |
| --dile-progress-bar-percentage-font-size     | Font size of text progress bar      | 14px       |
| --dile-progress-bar-percentage-font-weight   | Font weight of text progress bar    | 500        |
| --dile-progress-bar-percentage-color         | Font color of text progress bar     | #eaeaea    |
| --dile-progres-bar-percentage-padding-top    | Padding top of text progress bar    | 6px        |
| --dile-progres-bar-percentage-padding-right  | Padding right of text progress bar  | 6px        |
| --dile-progres-bar-percentage-padding-bottom | Padding bottom of text progress bar | 6px        |
| --dile-progres-bar-percentage-padding-left   | Padding left of text progress bar   | 10px       |

## dile-progress-bar demos

### Regular progress bar

```html:preview
<style>
  dile-progress-bar {
    margin: 1.2rem;
  }
</style>
<dile-progress-bar></dile-progress-bar>
```

### Progress bar with title

```html:preview
<style>
  dile-progress-bar {
    margin: 1.2rem;
  }
</style>
<dile-progress-bar title="Title of progress bar"></dile-progress-bar>
```

### Progress bar with title and percentage

```html:preview
<style>
  dile-progress-bar {
    margin: 1.2rem;
  }
</style>
<dile-progress-bar
  title="Title of progress bar with percentage"
  value="80"
></dile-progress-bar>
```

### Styled progress bar

```html:preview
<style>
  .styled {
    --dile-progress-background: #e6f3fa;
    --dile-progress-border-radius: 20px;
    --dile-progress-bar-align: flex-end;
    --dile-progress-bar-background: #2cb7cc;
    --dile-progress-bar-border-radius: 20px;
    --dile-progress-bar-percentage-color: #fff;
    --dile-progress-bar-percentage-font-size: 16px;
    --dile-progres-bar-percentage-padding-right: 20px;
  }
  dile-progress-bar {
    margin: 1.2rem;
  }
</style>
<dile-progress-bar
  title="I am a styled progress bar"
  class="styled"
  value="80"
></dile-progress-bar>
```

### Styled progress bar and animated

```html:preview
<style>
  dile-progress-bar {
    margin: 1.2rem;
  }
</style>
<h2>Styled progress bar and animated</h2>
<dile-progress-bar
  animated
  title="I am a styled progress bar and animated"
  class="styled"
  value="80"
></dile-progress-bar>
```
