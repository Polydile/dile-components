import { css } from "lit";

// Styles of scanic's corner editor (scanic 1.7.1). scanic injects them into
// document.head, which does not reach the shadow root, so the component
// includes them. Only the handles are needed: the toolbar and the nudge pad
// are disabled. Review this copy when updating scanic.
export const cornerEditorStyles = css`
  .scanic-corner-editor {
    --scanic-accent: var(--dile-scanner-accent-color, var(--dile-primary-color, #6366f1));
    --scanic-mask: var(--dile-scanner-mask-color, rgba(15, 23, 42, 0.45));
    --scanic-edge-color: var(--scanic-accent);
    --scanic-edge-width: 2.5;
    --scanic-handle-size: 22px;
    --scanic-handle-hit: 44px;
    --scanic-handle-color: #ffffff;
    --scanic-handle-ring: 2px;
    --scanic-handle-ring-color: var(--scanic-accent);
    --scanic-handle-shadow: 0 1px 4px rgba(15, 23, 42, 0.45);
    --scanic-handle-active-shadow: 0 8px 22px rgba(15, 23, 42, 0.5);
    --scanic-handle-active-scale: 1.28;
  }
  .scanic-handle {
    position: absolute;
    box-sizing: border-box;
    width: var(--scanic-handle-size);
    height: var(--scanic-handle-size);
    margin: 0;
    padding: 0;
    border: var(--scanic-handle-ring) solid var(--scanic-handle-ring-color);
    border-radius: 50%;
    background: var(--scanic-handle-color);
    box-shadow: var(--scanic-handle-shadow);
    transform: translate(-50%, -50%);
    cursor: grab;
    touch-action: none;
    z-index: 2;
    transition:
      transform 0.12s ease,
      box-shadow 0.12s ease,
      background 0.12s ease,
      border-color 0.12s ease;
  }
  /* Enlarges the touch target without changing the visual size. */
  .scanic-handle::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--scanic-handle-hit);
    height: var(--scanic-handle-hit);
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  .scanic-handle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: var(--scanic-accent);
    opacity: 0;
    transform: translate(-50%, -50%);
    transition:
      opacity 0.15s ease,
      width 0.15s ease,
      height 0.15s ease;
    pointer-events: none;
  }
  .scanic-handle:hover {
    transform: translate(-50%, -50%) scale(1.12);
  }
  .scanic-handle:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--scanic-accent) 45%, transparent),
      var(--scanic-handle-shadow);
  }
  .scanic-handle.is-selected {
    border-color: var(--scanic-accent);
    transform: translate(-50%, -50%) scale(1.12);
  }
  .scanic-handle.is-selected::before {
    opacity: 0.16;
    width: calc(var(--scanic-handle-size) * 2);
    height: calc(var(--scanic-handle-size) * 2);
  }
  .scanic-handle.is-active {
    cursor: grabbing;
    background: var(--scanic-accent);
    border-color: #ffffff;
    transform: translate(-50%, -50%) scale(var(--scanic-handle-active-scale));
    box-shadow: var(--scanic-handle-active-shadow);
  }
  .scanic-handle.is-active::before {
    opacity: 0.22;
    width: calc(var(--scanic-handle-size) * 2.8);
    height: calc(var(--scanic-handle-size) * 2.8);
  }
`;
