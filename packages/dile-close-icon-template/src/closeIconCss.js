
import { css } from "lit";

export const closeIconCss = css`
  .dileCloseIconElement path {
    fill: var(--dile-close-icon-template-color, #fff);
  }
  .dileCloseIconElement path[fill="none"] {
    fill: transparent;
  }
`;