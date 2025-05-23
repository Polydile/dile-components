---
layout: layout.html
title: Dile Components Theming
---

# Theming

All components in the Dile Components catalog are designed to allow design customization through CSS properties, so you can freely modify their appearance.

Additionally, whenever possible, we strive to keep the CSS properties consistent, meaning that many components use the same variables for the same design attributes. This makes it easier to customize the theme globally, with these changes affecting most of the components.

## How to Create a Design Theme

The most common way to create a design theme is by defining styles on the root element, which is typically done using the `:root` selector.

> You can also use the `html` tag selector, which is practically equivalent. The only difference is specificity, as `:root` has slightly higher specificity than `html`.

```css
:root {
  --dile-hamburger-active-color: #000;
  --dile-primary-color: #f3f3ae;
  --dile-on-primary-color: #303030;
}
```

In the `:root` selector, you can define as many custom properties as you need to personalize your design. All components come with a default theme, so if you don’t specify anything, they will simply appear as shown in the light theme of this site.

## Which CSS Custom Properties We Use

The CSS custom properties we use across components are quite consistent and are based on a set of variables that we’ll explore below.

> If you regularly use these same variables, they can also help you personalize your website’s design while maintaining a consistent pattern, improving the overall cohesion of your site and giving it a more professional appearance.

Each component has its own CSS variables, which you can find detailed on each documentation page.

### CSS Custom Properties for Defining Colors

The most common theme adaptations are color-related. That’s why most of the shared CSS variables across the components in the catalog are color customizations.

You can view the complete set of the CSS Custom Properties to define the color theme in the `colors.css` file located in the UI package at:
[@dile/ui/styles/colors.css](https://github.com/Polydile/dile-components/blob/master/packages/ui/styles/colors.css)

## Defining a Light and Dark Theme

You can use the `dile-light-mode-switch` component to toggle the design theme between light and dark modes.

This component is essentially a switch that adds a `dark-theme` CSS class to the HTML tag of the page when switching to dark mode. You can find usage documentation for this component on the [dile-light-mode-switch](/components/dile-light-mode-switch/) page.

As developers, we are responsible for defining the desired styles for our CSS color variables. Here's an example of how this can be achieved:

```css
:root {
  /* Light colors */
  --dile-background-color: #ffffff;
  --dile-on-background-color: #303030;
  --dile-primary-color: #f3f3ae;
  --dile-on-primary-color: #303030;
}

:root.dark-theme {
  /* Dark colors */
  --dile-background-color: #1e1e1e;
  --dile-on-background-color: #ffffff;
  --dile-primary-color: #e1e181;
  --dile-on-primary-color: #1e1e1e;
}
```

