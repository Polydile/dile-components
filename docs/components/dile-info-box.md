---
title: Info Box
tags: feedback
---

# dile-info-box

Web Component to create a customized information box.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
  import '@dile/ui/components/info-box/info-box.js';
```

Use the component.

```html
<dile-info-box showCloseButton>Information message...</dile-info-box>
```

### Properties

- **title**: String. Configure a title for the info box.
- **showCloseButton**: Boolean. When true the box will display a close icon.
- **isError**: Boolean. When true the box icon will be a warning icon.

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-info-box-background-color | Background color | #ddd
--dile-info-box-border-radius | Box border radius | 0.8rem
--dile-info-box-padding | Box padding | 1rem
--dile-info-box-text-color | Text color | #303030
--dile-icon-color | Info icon color | #888
--dile-info-box-close-icon-color | Close icon color | #f33
--dile-info-box-title-margin-bottom | Title margin bottom | 0.5rem
--dile-info-box-title-font-size | Title font size | 1.3rem
--dile-info-box-title-font-weight | Title font weight | bold
--dile-info-box-title-text-color | Title text color | inherit

# dile-info-box demos

### Default box

```html:preview
<dile-info-box>
  Info message
</dile-info-box>
```

### Default box with title

```html:preview
<dile-info-box class="with-title" title="Hi from dile-components">
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea et aspernatur aliquam est deserunt illum explicabo quis id aut nulla.
</dile-info-box>
```

### With close icon

```html:preview
<dile-info-box showCloseButton>
  This box has a close icon. Please, click at the icon and the box will dissapear with a smooth animation.
</dile-info-box>
```

### Styled box

```html:preview
<style>
.styled {
  font-size: 1rem;
  --dile-icon-color: #bbdefb;
  --dile-info-box-background-color: #303030;
  --dile-info-box-text-color: white;
  --dile-info-box-border-radius: 2rem;
  --dile-info-box-title-text-color: #ffa;
}
</style>
<dile-info-box showCloseButton class="styled" title="I am the title!">
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis quae at sequi! Earum tenetur dolorum, eaque deserunt nam cumque aut repellendus aliquid dolorem, numquam quo impedit praesentium explicabo quis. Sequi?
</dile-info-box>
```

### Styled box warning

```html:preview
<style>
.stylederror {
  font-size: 1rem;
  --dile-icon-color: #f6f04a;
  --dile-info-box-background-color: #9c1111;
  --dile-info-box-text-color: white;
  --dile-info-box-border-radius: 0.2rem;
  --dile-info-box-title-text-color: #ffa;
  --dile-info-box-close-icon-color: #fff;
}
</style>
<dile-info-box isError showCloseButton class="stylederror" title="Error found!">
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis quae at sequi! Earum tenetur dolorum, eaque deserunt nam cumque aut repellendus aliquid dolorem, numquam quo impedit praesentium explicabo quis. Sequi?
</dile-info-box>
```