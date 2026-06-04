import { css } from 'lit';

export const formStyles = css`
:host {
  display: block;
  margin-bottom: 1rem;
  --dile-modal-width: 90vw;
  --dile-modal-height: auto;
  --dile-modal-close-icon-top: 1rem;
  --dile-modal-close-icon-color: #f66;
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