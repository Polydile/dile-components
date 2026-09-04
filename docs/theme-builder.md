---
layout: layout.html
title: Theme Builder
tags: theming
---

# Theme Builder

Use this tool to build your own color theme for the Dile components: pick a color for each CSS Custom Property, see it previewed live, and download the resulting CSS to use on your own site.

Everything runs in your browser — nothing is uploaded anywhere, and your choices are saved locally so you won't lose them if you reload the page.

<dile-theme-builder></dile-theme-builder>

## What to do with the downloaded file

Paste the contents of the downloaded `theme.css` into your own stylesheet, loaded after the default Dile Components styles, so your custom `:root` values override the defaults. See [Theming](/theming/) for more details on how these CSS Custom Properties are used across components.
