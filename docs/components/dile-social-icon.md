---
title: Social Icon
package: '@dile/ui'
element: '&lt;dile-social-icon&gt;'
status: stable
summary: Social network icon component displaying curated social media icons. Legacy component with limited icon set available.
tags: icons
---

# dile-social-icon

Lit-based Web Component that displays icons for the main social networks and communities.

> **Legacy social icon set.** It ships a short, curated list of social network icons. If you need a much wider social icon library — plus logos of many other brands — use the [Font Awesome icon components](/icons/fontawesome-icons/), or [`dile-iconlib`](/icons/dile-iconlib/), which brings the icons of several open-source libraries together in a single component.

## Installation

1) Install the npm package

```bash
npm i @dile/ui
```

## Usage

Import the component

```javascript
import '@dile/ui/components/social-icon/social-icon.js';
```

Use the web component

```html
<dile-social-icon icon="facebook"></dile-social-icon>
```

The icon property is used to set the icon you want to show. There are icons from the main social networks and services. 

## Icons available

The icon property accepts the social icons listed bellow:

- facebook
- google
- twitter
- pinterest
- linkedin
- youtube
- whatsapp
- instagram
- gmail
- snapchat
- github

![Available icons](/images/social-icons.png "Available icons")

> Note that the name of the icons is always in lowercase.


## Custom styles

You can customize the icon styles using CSS Custom Styles.

Custom property | Description | Default
----------------|-------------|---------
--dile-social-icon-color | Icon color | #888
--dile-social-icon-size | Icon size (this sets width & height to the same value) | 24px




