# @dile/dile-social-icon

Web component to display icons from the main social networks and communities, based on LitElement.

## Usage

1) Install the npm package

```bash
npm i @dile/dile-social-icon
```

2) Include the script of the component in your web page or application

```html
<script type="module">
  import '@dile/dile-social-icon/dile-social-icon.js';
</script>
```

3) Use the web component

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

Note that the name of the icons is allways in lowercase.

## Custom styles

You can customize the icon styles using CSS Custom Styles.

Custom property | Description | Default
----------------|-------------|---------
--dile-social-icon-color | Icon color | #888
--dile-social-icon-size | Icon size (this sets width & height to the same value) | 24px