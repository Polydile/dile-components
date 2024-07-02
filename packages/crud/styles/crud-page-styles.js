import { css } from 'lit';

export const crudPageStyles = css`
    dile-card.page {
      margin: 0 auto;
      --dile-card-background-color: transparent;
      --dile-card-border: none;
      --dile-card-box-shadow: 0 0 0 #000;
      --dile-card-title-font-weight: bold;
      --dile-card-padding-x: 0.75rem;
      --dile-card-padding-y: 1rem;
    }

    dile-tabs {
      margin-bottom: 1rem;
    }

    @media(min-width: 400px) {
      dile-card.page {
        margin: 0.75rem;
        --dile-card-background-color: #fff;
      }
    }

    @media(min-width: 500px) {
      :host {
        padding: 0.5rem;
      }
      dile-card.page {
        --dile-card-padding-x: 1.25rem;
        --dile-card-padding-y: 1.5rem;
      }
    }

    @media(min-width: 768px) {
      :host {
        padding: 1rem;
      }
      dile-card.page {
        --dile-card-padding-x: 1.75rem;
        --dile-card-padding-y: 1.85rem;
        --dile-card-title-font-size: 1.8rem;
      }
    }
`;