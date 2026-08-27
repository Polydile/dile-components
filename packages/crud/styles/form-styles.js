import { css } from 'lit';

export const formStyles = css`
:host {
  display: block;
  margin-bottom: 1rem;
  --dile-modal-width: 90vw;
  --dile-modal-height: auto;
  --dile-modal-close-icon-top: 1rem;
  --dile-modal-close-icon-color: #f66;
  --dile-modal-content-background-color: var(--dile-background-color, #fff);
  --dile-modal-content-text-color: var(--dile-on-background-color, #303030);
}
@media(min-width: 380px) {
  :host {
    --dile-modal-width: 85vw;
    --dile-modal-height: auto;
    --dile-modal-close-icon-top: 1rem;
    --dile-modal-close-icon-color: #f66;
}
}
`