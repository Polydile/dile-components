---
title: Rating Scale Question
tags: feedback
---

# dile-rating-scale-question

Web Components to create a semantic-differential rating-scale questions.

These types of questions allow for degrees of opinion. Semantic-differential questions require respondents to rate their attitude by selecting a position on a bipolar adjectival scale. The two ends of the scale host antonym adjectives (e.g., agree - disagree, ugly – beautiful, easy – difficult, very difficult - very easy)

There are one component in this package:

- ```dile-rating-scale-question```: allows to create a question, only is possible to select one option at same time.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the components.

```javascript
import '@dile/ui/components/rating-scale-question/rating-scale-question.js';
```

Use the components.

```html
<dile-rating-scale-question
  name="question_1"
  label="You spend a lot of your free time exploring twitter.">
</dile-rating-scale-question>
```

## Properties

- **disabled**: the question is disabled.
- **name**: element name
- **label**: text label for the question
- **scale_left_label**: left label of the scale, e.i: difficult. Agree by default
- **scale_right_label**: right label of the scale, e.i: easy. Disagree by default
- **scale_neutral_label**: neutral label of the scale. Neutral by default
- **scale_point**: point scale (options number). It could be 7, 5 or 3. 7 by default

## Custom events

- **dile-rating-scale-question-changed**: Is dispatched when the value changes. In the event detail will emmit the element ```name``` and ```value```properties.

## CSS Custom Properties

Custom property | Description | Default
----------------|-------------|---------
--dile-rating-scale-color-left | Color for the left options and text | #4db6ac
--dile-rating-scale-color-right | Color for the right options and text | #ff8a65
--dile-rating-scale-color-neutral | Color for the neutral option | #9b9faa
--dile-rating-scale-option-size-bigger | Bigger circle size | 45px
--dile-rating-scale-option-size-big | Big circle size | 35px
--dile-rating-scale-option-size-small | Small circle size | 28px
--dile-rating-scale-option-size-smaller | Smaller circle size | 25px
--dile-rating-scale-option-checked-color | Checked icon color |  #fff

## dile-rating-scale-question demos

### Default dile-rating-scale-question

```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/rating-scale-question/rating-scale-question.js';

class MyComponent extends LitElement {

  render() {
    return html`
      <dile-rating-scale-question
        id="question_1"
        name="question_1"
        label="You spend a lot of your free time exploring twitter.">
      </dile-rating-scale-question>
      <p id="message">Select one value</p>
    `
  }
  firstUpdated() {
    this.shadowRoot.getElementById('question_1').addEventListener('dile-rating-scale-question-changed', (e) => {
      this.shadowRoot.getElementById('message').innerText = e.detail.name + ' has value: ' + e.detail.value;
    });
  }
}
customElements.define('my-component', MyComponent);
</script>
<my-component></my-component>
```

### Change labels and scale point

```html:preview
<dile-rating-scale-question
    name="question_2"
    label="Overall, this task was:"
    scale_left_label="Difficult"
    scale_right_label="Easy"
    scale_point="5">
</dile-rating-scale-question>
```

### Disabled question

```html:preview
<dile-rating-scale-question disabled
  name="question_3"
  label="You often make a backup plan for a backup plan.">
</dile-rating-scale-question>
```

### Styled options

```html:preview
<style>
.styled {
      --dile-rating-scale-color-left: #0bb805;
      --dile-rating-scale-color-neutral: #ccc;
      --dile-rating-scale-color-right: #e91f10;
      --dile-rating-scale-option-size-bigger: 60px;
      --dile-rating-scale-option-size-big: 60px;
      --dile-rating-scale-option-size-small: 60px;
      --dile-rating-scale-option-size-smaller: 60px;
      --dile-rating-scale-option-checked-color: #473232;
}
</style>
<dile-rating-scale-question class="styled"
    name="question_4"
    label="El problema principal es la educación básica."
    scale_left_label="A Favor"
    scale_right_label="En contra"
    scale_point="3">
</dile-rating-scale-question>
```
