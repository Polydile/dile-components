---
title: Tooltip
tags: feedback
---

# dile-tooltip

Here’s an improved version of your explanation:

`dile-tooltip` is a web component that provides a customizable tooltip interface.

It displays a message in an overlay when the user hovers over an element. You can control the position of the tooltip using the component's properties. Additionally, the dile-tooltip apareance can be fully customized using CSS custom properties.

## Installation

```bash
npm install @dile/ui
```

> In this package you also will find [dile-chip-tooltip](/components/dile-chip-tooltip/) component.

## Usage

Import the component.

```javascript
import '@dile/ui/components/tooltip/tooltip';
```

Use the component.

```html
<dile-tooltip tooltip="tooltip text" position="top" arrow fadeIn > Text </dile-tooltip>
```

## Properties

The `dile-tooltip` component has the properties bellow:

- **tooltip**: This property sets the text that will be displayed when the mouse hovers over the element or when the element receives keyboard focus.
- **position**: This property sets the orientation where the tooltip text will be displayed. Possible values: top, left, right, bottom. By default is top. If you set a position that doesn't exist, the position will be top.
- **fadeIn**: This is a boolean property and establishes if the tooltip text will be displayed with an animation. By default is false.
- **arrow**: This is a boolean property and establishes if the tooltip will be displayed with an arrow. By default is false.

## Keyboard Support

- **Tab**: The tooltip container is focusable by default (`tabindex="0"`), so users can navigate to it with Tab key
- **Escape**: Close the tooltip when focused
- The tooltip is automatically displayed on focus and hidden on blur
- Works with any content in the slot, whether it's focusable or not

## Accessibility

The `dile-tooltip` component is built with accessibility in mind and meets WCAG 2.2 AA standards:

- **Keyboard Navigation**: Fully keyboard accessible with Tab navigation and Escape key support
- **ARIA Support**: Includes `role="tooltip"` and `aria-hidden` attributes for screen reader compatibility
- **Focus Visibility**: Clear visual focus indicator (customizable via CSS custom properties)
- **Motion Preferences**: Respects user's `prefers-reduced-motion` setting by disabling animations
- **Viewport Management**: Uses fixed positioning to ensure tooltips remain visible even in containers with `overflow: hidden`

## Styling

You can customize the component using CSS Custom Properties. The component accepts both specific tooltip custom properties and generic fallback variables for a consistent design system.

Custom property | Description | Default
----------------|-------------|---------
--dile-tooltip-background-color | Tooltip background color | --dile-primary-color or #e74c3c
--dile-tooltip-color | Tooltip text color | --dile-on-primary-color or #fff
--dile-tooltip-width | The width of the tooltip | 120px
--dile-tooltip-border-radius | The border radius of the tooltip | 6px
--dile-tooltip-padding | The padding of the tooltip text | 5px
--dile-tooltip-time-transition | The time of transition of the animation if fadeIn is true | 0.5s
--dile-tooltip-font-size | The font size of the tooltip | 16px
--dile-tooltip-text-align | Text align for the tooltip | center
--dile-tooltip-focus-outline-width | Focus indicator outline width | 2px
--dile-tooltip-focus-outline-color | Focus indicator outline color | #12c9e9
--dile-tooltip-focus-outline-offset | Focus indicator outline offset | 2px

## dile-tooltip demos

### Default tooltips

```html:preview
<style>
  dile-tooltip {
    color: #777;
  }
</style>
<dile-tooltip tooltip="tooltip text" position="top" fadeIn>I have a top tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="right" fadeIn>I have a right tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="left" fadeIn>I have a left tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="bottom" fadeIn>I have a bottom tooltip</dile-tooltip> 
```

### Arrow tooltips

```html:preview
<dile-tooltip tooltip="tooltip text" position="top" fadeIn arrow>I have a top tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="right" fadeIn arrow>I have a right tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="left" fadeIn arrow>I have a left tooltip</dile-tooltip> | 
<dile-tooltip tooltip="tooltip text" position="bottom" fadeIn arrow>I have a bottom tooltip</dile-tooltip> 
```

### Styled tooltips

```html:preview
<style>
.styled {
  --dile-tooltip-background-color: #cef;
  --dile-tooltip-color: #303030;
  --dile-tooltip-padding: 8px;
  --dile-tooltip-font-size: 1.1rem;
}
</style>
<dile-tooltip class="styled" tooltip="tooltip text" position="top" fadeIn arrow>I have a top tooltip</dile-tooltip> | 
<dile-tooltip class="styled" tooltip="tooltip text" position="right" fadeIn arrow>I have a right tooltip</dile-tooltip> | 
<dile-tooltip class="styled" tooltip="tooltip text" position="left" fadeIn arrow>I have a left tooltip</dile-tooltip> | 
<dile-tooltip class="styled" tooltip="tooltip text" position="bottom" fadeIn arrow>I have a bottom tooltip</dile-tooltip> 
```