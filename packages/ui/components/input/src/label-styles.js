import { css } from 'lit';

export const labelStyles = css`
  label, .label {
    display: block;
    margin-bottom: var(--dile-input-label-margin-bottom, 4px);
    font-size: var(--dile-input-label-font-size, 1em);
    color: var(--dile-input-label-color, var(--dile-on-background-color, #59e));
    font-weight: var(--dile-input-label-font-weight, normal);
  }
`;
