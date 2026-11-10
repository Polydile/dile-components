---
title: Ajax Input Tags
tags: 'Crud extras'
element: dile-ajax-input-tags
package: '@dile/crud'
summary: Tags editor whose suggestions come from an API endpoint. Controlled component that emits events to add or remove tags.
---

# dile-ajax-input-tags

Ajax variant of [dile-input-tags](/components/dile-input-tags/). It is a tags editor whose suggestions come from an API endpoint, with the same request API as [dile-ajax-input-suggestions](/crud/ajax-input-suggestions/).

Like `dile-input-tags`, it is a **controlled** component: it emits `dile-input-tags-add` and `dile-input-tags-remove`, and you update `tags`, usually after saving the change on the server.

## Installation

```bash
npm i @dile/crud
```

## Usage

Import the component.

```javascript
import '@dile/crud/components/ajax-input-tags/ajax-input-tags.js';
```

Use the component, saving each change on the server.

```javascript
html`
  <dile-ajax-input-tags
    name="tags"
    label="Tags"
    endpoint="/api/tags"
    queryStringVariable="keyword"
    resultDataProperty="data"
    colorProperty="color"
    .additionalQueryString=${{ type: 'customer' }}
    .tags=${this.tags}
    @dile-input-tags-add=${this.addTag}
    @dile-input-tags-remove=${this.removeTag}
  ></dile-ajax-input-tags>
`

async addTag(e) {
  const response = await this.axiosInstance.post(`/api/customers/${this.uuid}/tags`, { name: e.detail.text });
  this.tags = [...this.tags, response.data.data];
}

async removeTag(e) {
  await this.axiosInstance.delete(`/api/customers/${this.uuid}/tags/${e.detail.item.uuid}`);
  this.tags = this.tags.filter((tag) => tag !== e.detail.item);
}
```

Already assigned tags are not suggested, and a tag equal to an assigned one (ignoring case and accents) is not emitted.

## Properties

All [dile-input-tags](/components/dile-input-tags/) properties (`tags`, `colorProperty`, `removeLabel`, `addLabel`...) and the request ones of [dile-ajax-input-suggestions](/crud/ajax-input-suggestions/) (`endpoint`, `queryStringVariable`, `additionalQueryString`, `resultDataProperty`, `getSelectResultList`, `pageParamName`, `maxResults`).

## Events

- **dile-input-tags-add**: `detail: { name, text, item }`. `item` is the chosen suggestion, or `null` when typed by hand.
- **dile-input-tags-remove**: `detail: { name, item }`.

To show server errors (e.g. a name too long), set `errored` and `message`; with `hideErrorOnInput` they are cleared when the user types again.
