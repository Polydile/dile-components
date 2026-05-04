---
layout: layout.html
title: Crud Components
---

# Dile Components Crud System

The dile-components catalog offers the `@dile/crud` package, a complete set for creating advanced and fully configurable CRUD systems. Thanks to these components and utilities, you can **build administration panels quickly and easily**, avoiding tedious and repetitive tasks.

This CRUD system is designed to communicate via Ajax with a backend that exposes data and resource operations as a REST API. You can adjust everything from its appearance to the backend communications, so it adapts to the format of requests or responses. In addition, it provides a [CLI](/cli/) to easily and quickly generate the scaffolding for components.

> To learn more about the features of this library, we recommend starting with the [CRUD general information page](/crud/general-information/).

## Modules and components in this package

<div class="Clasification">
  {% for tag in crudTagsList %}        
    <dile-card 
     title="{{ tag | capitalize }}" 
    >
      <dile-selector>
        {% assign sortedComponents = collections[tag] | sort: "data.order" %}
        {% for component in sortedComponents %}
          {% include "layout-partials/nav-item.html" %}
        {% endfor %}
  
      </dile-selector>
    </dile-card>
  {% endfor %}

  {% if collections.uncategorizedCrud.size > 0 %}
    <dile-card 
     title="Other components" 
    >
      {% for component in collections.uncategorizedCrud %}
        {% include "layout-partials/nav-item.html" %}
      {% endfor %}
    </dile-card>
  {% endif %}
</div>

