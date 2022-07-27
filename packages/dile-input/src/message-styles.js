import { css } from 'lit';

export const messageStyles = css`
  .message span {
    display: block;
    padding-top: var(--dile-input-message-padding-top, 4px);
    font-size: var(--dile-input-message-font-size, 0.875em);
    color: var(--dile-input-message-color, #888);

  }
  .errored-msg span {
    color: var(--dile-input-message-error-color, #c00);
  }
`;