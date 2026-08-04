export const badgeStyles = new CSSStyleSheet();
badgeStyles.replaceSync(`
  :host {
    display: inline-flex;
    --dile-icon-color: var(--dile-tabler-badge-on-color, var(--dile-on-primary-color, #303030));
    --dile-icon-size: var(--dile-tabler-badge-icon-size, 18px);
  }

  .badge-container {
    display: inherit;
    align-items: center;
    gap: var(--dile-tabler-badge-gap, 0.5rem);
    padding: var(--dile-tabler-badge-padding, 0.375rem 0.75rem);
    border-radius: var(--dile-tabler-badge-border-radius, 9999px);
    background-color: var(--dile-tabler-badge-color, var(--dile-primary-color, #f3f3ae));
    color: var(--dile-tabler-badge-on-color, var(--dile-on-primary-color, #303030));
    font-size: var(--dile-tabler-badge-font-size, 0.8rem);
    font-weight: var(--dile-tabler-badge-font-weight, 500);
    border: var(--dile-tabler-badge-border-width, 0px) solid var(--dile-tabler-badge-border-color, transparent);
    transition-duration: var(--dile-tabler-badge-transition-duration, 0.3s);
    transition-timing-function: ease-in-out;
    transition-property: background-color, color;
  }

  :host([variant="primary"]) .badge-container {
    background-color: var(--dile-tabler-badge-primary, var(--dile-primary-color, #f3f3ae));
    color: var(--dile-tabler-badge-on-primary, var(--dile-on-primary-color, #303030));
    --dile-icon-color: var(--dile-tabler-badge-on-primary, var(--dile-on-primary-color, #303030));
  }

  :host([variant="secondary"]) .badge-container {
    background-color: var(--dile-tabler-badge-secondary, var(--dile-secondary-color, #27a744));
    color: var(--dile-tabler-badge-on-secondary, var(--dile-on-secondary-color, #ffffff));
    --dile-icon-color: var(--dile-tabler-badge-on-secondary, var(--dile-on-secondary-color, #ffffff));
  }

  :host([variant="danger"]) .badge-container {
    background-color: var(--dile-tabler-badge-danger, var(--dile-danger-color, #e34a1b));
    color: var(--dile-tabler-badge-on-danger, var(--dile-on-danger-color, #ffffff));
    --dile-icon-color: var(--dile-tabler-badge-on-danger, var(--dile-on-danger-color, #ffffff));
  }

  :host([variant="error"]) .badge-container {
    background-color: var(--dile-tabler-badge-error, var(--dile-alert-error-color, #cf3535));
    color: var(--dile-tabler-badge-on-error, var(--dile-on-alert-color, #ffffff));
    --dile-icon-color: var(--dile-tabler-badge-on-error, var(--dile-on-alert-color, #ffffff));
  }

  :host([variant="success"]) .badge-container {
    background-color: var(--dile-tabler-badge-success, var(--dile-alert-success-color, #00900f));
    color: var(--dile-tabler-badge-on-success, var(--dile-on-alert-color, #ffffff));
    --dile-icon-color: var(--dile-tabler-badge-on-success, var(--dile-on-alert-color, #ffffff));
  }

  :host([variant="warning"]) .badge-container {
    background-color: var(--dile-tabler-badge-warning, var(--dile-alert-warning-color, #d7b740));
    color: var(--dile-tabler-badge-on-warning, var(--dile-on-alert-color, #ffffff));
    --dile-icon-color: var(--dile-tabler-badge-on-warning, var(--dile-on-alert-color, #ffffff));
  }

  :host([variant="soft"]) .badge-container {
    background-color: var(--dile-tabler-badge-soft, #2a7a9f);
    color: var(--dile-tabler-badge-on-soft, #ffffff);
    --dile-icon-color: var(--dile-tabler-badge-on-soft, #ffffff);
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .text-wrapper {
    display: flex;
    align-items: center;
  }
`);
