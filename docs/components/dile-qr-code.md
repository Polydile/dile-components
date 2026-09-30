---
title: QR Code
package: '@dile/utils'
element: '&lt;dile-qr-code&gt;'
status: ready
summary: Lightweight Web Component to generate and render customizable QR codes on HTML5 Canvas using qr-creator.
tags: utils
---

# dile-qr-code

Web Component to generate responsive and customizable QR codes rendered directly on an HTML5 `<canvas>` element. Powered by the lightweight `qr-creator` library, it offers full control over size, fill and background colors, module corner roundness, error correction levels, and accessibility labels.

## Installation

```bash
npm i @dile/utils
```

## Usage

Import the component in your JavaScript module:

```js
import '@dile/utils/components/qr-code/qr-code.js';
```

Use it in your HTML:

```html
<dile-qr-code value="https://dile-components.com"></dile-qr-code>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `String` | `""` | The payload, text or URL encoded in the QR code. If empty, the canvas is cleaned silently. |
| `size` | `Number` | `128` | Width and height of the canvas in pixels. |
| `fill` | `String` | `"#000000"` | Fill color of the QR code modules (hex, rgb, etc.). |
| `background` | `String` | `"#ffffff"` | Background color of the canvas. Use `"transparent"` for a transparent background. |
| `radius` | `Number` | `0` | Corner roundness of the modules (from `0` for square blocks up to `0.5` for maximum rounding). |
| `errorCorrection` | `String` | `"M"` | Error correction level (`"L"`, `"M"`, `"Q"`, `"H"`). Automatically elevated to `"H"` when `logo` is set to ensure scannability. Exposed via `error-correction`. |
| `label` | `String` | `""` | Accessibility text for the canvas `aria-label`. If not provided, it falls back to the `value`. |
| `logo` | `String` | `""` | Image URL or data URI of the logo to embed in the center of the QR code. Square images (1:1 aspect ratio) are expected to avoid visual distortion. |
| `logoSize` | `Number` | `0` | Size of the logo in pixels. If 0, dynamically calculates a safe proportion (~22% of QR size, capped at 28%). Exposed via `logo-size`. |
| `logoRadius` | `Number` | `4` | Corner radius for the badge background drawn behind the logo. Exposed via `logo-radius`. |
| `logoBackground` | `String` | `""` | Background color for the badge behind the logo. Defaults to `background` (or `#ffffff`). Exposed via `logo-background`. |
| `logoPadding` | `Number` | `4` | Padding in pixels around the logo inside its protective badge. Exposed via `logo-padding`. |

## CSS Encapsulation

The component uses Shadow DOM with default block styles:

```css
:host {
  display: inline-block;
}
canvas {
  display: block;
  max-width: 100%;
  height: auto;
}
```

## Examples

### Basic Usage

```html:preview
<script type="module">
  import '@dile/utils/components/qr-code/qr-code.js';
</script>
<dile-qr-code value="https://dile-components.com"></dile-qr-code>
```

### Different Sizes

```html:preview
<div style="display: flex; gap: 1.5rem; align-items: center;">
  <dile-qr-code value="https://dile-components.com" size="80"></dile-qr-code>
  <dile-qr-code value="https://dile-components.com" size="128"></dile-qr-code>
  <dile-qr-code value="https://dile-components.com" size="180"></dile-qr-code>
</div>
```

### Custom Colors & Rounded Modules

You can customize the fill color, background color, and corner radius (`0` to `0.5`):

```html:preview
<div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
  <dile-qr-code
    value="https://dile-components.com"
    fill="#0284c7"
    background="#e0f2fe"
    radius="0.4"
    size="130"
  ></dile-qr-code>

  <dile-qr-code
    value="mailto:contact@example.com"
    fill="#059669"
    background="#d1fae5"
    radius="0.5"
    size="130"
  ></dile-qr-code>

  <dile-qr-code
    value="tel:+123456789"
    fill="#e11d48"
    background="#ffe4e6"
    radius="0.25"
    size="130"
  ></dile-qr-code>
</div>
```

### Transparent Background

Setting `background="transparent"` lets the underlying surface show through the QR code:

```html:preview
<div style="padding: 1.5rem; background: repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 20px 20px; display: inline-block; border-radius: 8px;">
  <dile-qr-code
    value="https://dile-components.com"
    fill="#4338ca"
    background="transparent"
    radius="0.3"
    size="140"
  ></dile-qr-code>
</div>
```

### Error Correction Levels

Four levels of Reed-Solomon error correction are supported:
- **L**: Low (~7% recovery)
- **M**: Medium (~15% recovery, default)
- **Q**: Quartile (~25% recovery)
- **H**: High (~30% recovery)

```html:preview
<div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
  <dile-qr-code value="https://dile-components.com" error-correction="L" size="110"></dile-qr-code>
  <dile-qr-code value="https://dile-components.com" error-correction="M" size="110"></dile-qr-code>
  <dile-qr-code value="https://dile-components.com" error-correction="Q" size="110"></dile-qr-code>
  <dile-qr-code value="https://dile-components.com" error-correction="H" size="110"></dile-qr-code>
</div>
```

### Accessibility Label

Use the `label` property to provide a screen-reader friendly description when the encoded value is a cryptic URL or token:

```html:preview
<dile-qr-code
  value="https://example.com/pay/tx_99812938120"
  label="QR code to complete checkout transaction"
  size="140"
></dile-qr-code>
```

### Embedded Company Logo

Embed a brand logo or icon into the center of the QR code. The component automatically adjusts error correction to `H` level, centers the image, and renders a protective badge background behind it:

> **Square logos recommended:** The component draws the logo inside a centered square bounding area (`1:1` aspect ratio). To avoid visual stretching or deformation, use square images or brand icon marks (isotipos). If your company logo is rectangular, place it centered on a square canvas with transparent padding before passing it.

```html:preview
<div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
  <dile-qr-code
    value="https://dile-components.com"
    logo="/images/logo-polydile.png"
    radius="0.3"
    logo-radius="8"
    logo-padding="4"
    size="160"
  ></dile-qr-code>

  <dile-qr-code
    value="https://dile-components.com"
    logo="/images/loto.png"
    fill="#eb2585ff"
    radius="0.4"
    logo-radius="99"
    logo-padding="6"
    size="160"
  ></dile-qr-code>
</div>
```

