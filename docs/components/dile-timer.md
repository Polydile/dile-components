---
title: Timer
tags: ui
---

# dile-timer

Web Component to show a countdown timer with an optional set of controls (start / pause / reset).

It emits events on every tick and when the countdown finishes so you can easily react from your application.

## Installation

```bash
npm i @dile/ui
```

## Usage

Import the component.

```javascript
import '@dile/ui/components/timer/timer.js';
```

Use the component.

```html
<dile-timer duration="60000"></dile-timer>
```

## Properties

* **duration**: `Number`. Total duration in milliseconds. Default is `60000`.
* **remaining**: `Number`. Remaining time in milliseconds. Reflected to attribute. Default is `duration`.
* **running**: `Boolean`. Whether the timer is running. Reflected to attribute.
* **tick**: `Number`. Tick interval in milliseconds (how often it updates and emits the tick event). Default is `250`.
* **autoStart**: `Boolean`. If `true`, the timer starts automatically the first time `duration` changes.
* **format**: `String`. Time format. Supported values are `"mm:ss"` and `"hh:mm:ss"`. Default is `"mm:ss"`.
* **title**: `String`. Title displayed above the timer.
* **subtitle**: `String`. Subtitle displayed below the title.
* **controls**: `Boolean`. Displays the Start / Pause / Reset buttons.
* **startText**: `String`. Text for the start button (`start-text`). Default is `"Start"`.
* **pauseText**: `String`. Text for the pause button (`pause-text`). Default is `"Pause"`.
* **resetText**: `String`. Text for the reset button (`reset-text`). Default is `"Reset"`.
* **disabled**: `Boolean`. Disables user interaction.

## Methods

* **start()**: Starts the timer.
* **pause()**: Pauses the timer.
* **reset()**: Resets the timer to the initial `duration`.

## Events

- **dile-timer-tick**: is dispatched on every tick and immediately after calling `start()`, `pause()` or `reset()`.
  - `detail.remaining`: Remaining time in ms.
  - `detail.duration`: Total duration in ms.
  - `detail.running`: Whether the timer is running.

- **dile-timer-finished**: is dispatched when the timer reaches `0`.
  - `detail.duration`: Total duration in ms.

## CSS Custom Properties

| Custom property | Description | Default |
| -- | -- | -- |
| `--dile-timer-font-family` | Font family | `inherit` |
| `--dile-timer-color` | Text color | `inherit` |
| `--dile-timer-background` | Background | `transparent` |
| `--dile-timer-border-radius` | Border radius | `10px` |
| `--dile-timer-border` | Border | `1px solid rgba(0, 0, 0, 0.08)` |
| `--dile-timer-width` | Component width | `auto` |
| `--dile-timer-min-width` | Min width | `220px` |
| `--dile-timer-max-width` | Max width | `100%` |
| `--dile-timer-padding` | Padding | `12px` |
| `--dile-timer-letter-spacing` | Letter spacing | `0.02em` |
| `--dile-timer-title-font-size` | Title font size | `1rem` |
| `--dile-timer-title-font-weight` | Title font weight | `700` |
| `--dile-timer-title-color` | Title color | `inherit` |
| `--dile-timer-subtitle-font-size` | Subtitle font size | `0.9rem` |
| `--dile-timer-subtitle-font-weight` | Subtitle font weight | `400` |
| `--dile-timer-subtitle-color` | Subtitle color | `rgba(0, 0, 0, 0.65)` |
| `--dile-timer-height` | Display height | `72px` |
| `--dile-timer-font-size` | Display font size | `2rem` |
| `--dile-timer-font-weight` | Display font weight | `700` |
| `--dile-timer-display-border-radius` | Display border radius | `10px` |
| `--dile-timer-display-background` | Display background | `rgba(0, 0, 0, 0.04)` |
| `--dile-timer-display-color` | Display color | `inherit` |
| `--dile-timer-finished-color` | Host text color when remaining is `0` | `#5ba75d` |
| `--dile-timer-finished-display-background` | Display background when remaining is `0` | `rgba(211, 47, 47, 0.1)` |
| `--dile-timer-button-padding-y` | Button vertical padding | `0.55rem` |
| `--dile-timer-button-padding-x` | Button horizontal padding | `0.75rem` |
| `--dile-timer-button-border-radius` | Button border radius | `10px` |
| `--dile-timer-button-background` | Button background | `#ffffff` |
| `--dile-timer-button-border-color` | Button border color | `rgba(0, 0, 0, 0.12)` |
| `--dile-timer-button-color` | Button text color | `rgba(0, 0, 0, 0.82)` |
| `--dile-timer-button-hover-background` | Button hover background | `rgba(0, 0, 0, 0.04)` |
| `--dile-timer-button-hover-border` | Button hover border | `rgba(0, 0, 0, 0.18)` |
| `--dile-timer-button-hover-color` | Button hover text color | `rgba(0, 0, 0, 0.82)` |
| `--dile-timer-button-focus-ring` | Button focus ring | `rgba(18, 201, 233, 0.35)` |
| `--dile-timer-button-font-size` | Button font size | `0.95rem` |
| `--dile-timer-button-font-weight` | Button font weight | `600` |

## Demos

### Basic timer

```html:preview
<script type="module">
  import '@dile/ui/components/timer/timer.js';
</script>

<dile-timer duration="90000"></dile-timer>
```

### Timer with controls

```html:preview
<script type="module">
  import '@dile/ui/components/timer/timer.js';
</script>

<dile-timer duration="120000" controls title="Break" subtitle="Take a short rest"></dile-timer>
```

> **Note:** You can force the `"hh:mm:ss"` format using `format="hh:mm:ss"`.

### Listen to events

```html:preview
<script type="module">
  import '@dile/ui/components/timer/timer.js';

  window.addEventListener('DOMContentLoaded', () => {
    const timer = document.querySelector('dile-timer');
    timer.addEventListener('dile-timer-tick', (e) => {
      // e.detail.remaining
      // e.detail.running
    });
    timer.addEventListener('dile-timer-finished', (e) => {
      // e.detail.duration
    });
  });
</script>

<dile-timer duration="10000" controls></dile-timer>
```
