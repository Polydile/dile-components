
import { css } from "lit";

export const iconStyles = css`
    .dile-icon path, .dile-icon polygon {
      fill: var(--dile-icon-color, #888);
    }
    .dile-icon path[fill="none"] {
      fill: transparent;
    }
    .dile-icon {
      width: var(--dile-icon-size, 24px);
      height: var(--dile-icon-size, 24px);
    }
  `;