export const lucideIconStyles = new CSSStyleSheet();
lucideIconStyles.replaceSync(`
  :host {
    display: inline-block;
    transition-duration: var(--dile-icon-transition-duration, 0.3s);
    transition-timing-function: ease-in-out;
    transition-property: background-color;
  }

  :host([rounded]) {
    background-color: var(--dile-icon-rounded-background-color, #eee);
    border-radius: 50%;
    padding: var(--dile-icon-rounded-padding, 0.5rem);
  }

  .icon-container {
    display: flex;
  }
  svg {
    width: var(--dile-icon-size, 24px);
    height: var(--dile-icon-size, 24px);
    display: block;
    color:  var(--dile-icon-color, #888);
    stroke-width: var(--dile-icon-stroke-width, 2px); !important;
    transition-duration:  var(--dile-icon-transition-duration, 0.3s);
    transition-timing-function: ease-in-out;
    transition-property: color;
    }
`);

export const iconStylesNamedIcons = new CSSStyleSheet();
iconStylesNamedIcons.replaceSync(`
  :host { display: inline-block; }
  .flex { display: flex;}
`);