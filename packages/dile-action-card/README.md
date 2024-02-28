# @dile/dile-action-card

Web Component to create a customized Action Card with Buttons.

## Docs and demos

- [Docs and demos on the dile-components site](https://dile-components.polydile.com/components/dile-action-card/)

# dile-action-card

Web Component to create a customized Action Card with Buttons.

## Installation

```bash
npm i @dile/dile-action-card
```

## Usage

Import the component

```javascript
import '@dile/dile-action-card/dile-action-card.js';
```

Use the component

```html
<dile-action-card title="Title" options='["Action1","Action2"]'>
      <span slot="subtitle">Info subtitles</span>

</dile-action-card>
```

## Slots

This component has three slots.

- **subtitle slot**: for the card info content.
- **subCardsButton slot**: for buttons to view subelements
- **subCards slot**: for subelements cards.

## Properties

- **title**: Card title, string (optional).
- **options**: Array with Actions titles
- **icons**: Array with Icons for dile-button-icon

## Custom Events

- **dile-action-card-option-selected**: Dispatched when an action button is clicked. In the event detail will emmit the selected action title.

### CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-action-card-border | Card Border | 2px solid #ccc
--dile-action-card-border-radius | Card Border Radius | 0
--dile-action-card-background-color | Background color | #f5f5f573
--dile-action-card-header-justify-content | Header's Horizontal Align | flex-start
--dile-action-card-header-align-content | Header's Horizontal Align | flex-start
--dile-action-card-header-flex-direction | Header's Flex Direction | column-reverse
--dile-action-card-buttons-justify-content | Action buttons horizontal align | flex-start

