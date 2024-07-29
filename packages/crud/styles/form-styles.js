import { css } from 'lit';

export const formStyles = css`
:host {
  display: block;
  margin-bottom: 1rem;
  --dile-modal-width: 100vw;
  --dile-modal-height: 100vh;
  --dile-modal-close-icon-top: 1rem;
  --dile-modal-close-icon-color: #f66;
}
h1 {
  font-size: 1.5rem;
  margin-top: 0;
}
@media(min-width: 380px) {
  :host {
    --dile-modal-width: 90vw;
    --dile-modal-height: auto;
    --dile-modal-close-icon-top: 1rem;
    --dile-modal-close-icon-color: #f66;
}
}
`