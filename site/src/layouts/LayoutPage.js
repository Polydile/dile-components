import { html } from 'lit';
import '../../../packages/dile-nav/dile-nav.js';
import '../../../packages/dile-selector/dile-selector.js';
import '../../../packages/dile-selector/dile-selector-item.js';
import { DrawerMenu } from '../menus/DrawerMenu.js';
import { pageTree } from '../menus/pageTree.js';
const componentsFilePath = 'components/index.rocket.md';

export class LayoutPage {

  render(data) {
    return html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title-server-only>${data.title}</title-server-only>
          <link rel="stylesheet" href="/styles/reset.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700&display=swap" rel="stylesheet">
          
          <style>
            body {
              font-family: 'Rubik', Helvetica, Arial, sans-serif;
              color: #303030;
              --primary-color: #7BB93D;
              --secondary-color: #f3f3ae;
              
              --dile-nav-padding-y: 0.2rem;
              --dile-nav-padding-x: 0;
              --dile-nav-background-color: var(--secondary-color);
              --dile-hamburger-padding-x: 1rem;
              --dile-nav-column-gap: 0.25rem;
              
              --dile-button-background-color: var(--primary-color);
              --dile-button-text-color: #fff;
              --dile-button-border-radius: 2rem;
              --dile-button-border-width: 3px;
              --dile-button-border-color: #07193b;
              --dile-button-hover-background-color: var(--secondary-color);
              --dile-button-font-weight: bold;
            }
            h1 {
              font-size: 1.8rem;
            }
            dile-nav {
              color: #303030;
            }
            dile-nav b {
              font-weight: normal;
              font-size: 1.2rem;
            }
            dile-nav b span {
              font-weight: bold;
            }
            dile-nav div {
              display: flex;
              align-items: center;
            }
            dile-nav img {
              position: relative;
              top: 2px;
              height: 40px;
              margin-right: 0.5rem;
            }
            .desktop {
              display: none;
            }
            .menuslot {
              display: flex;
              align-items: center;
              background-color: var(--primary-dark-color);
              padding-bottom: 2px;
            }
            .app-menu {
              margin-top: 3.5rem;
              min-width: 250px;
              font-size: 1.2rem;
            }
            main {
              padding: 1rem;
            }
            .drawercomponent {
              font-size: 0.875rem;
              --dile-selector-icon-size: 20px;
              --dile-selector-icon-color: var(--primary-color);
              margin-left: 1.3rem;
            }
            @media(min-width: 400px) {
              dile-nav img {
                height: 48px;
              }
              dile-nav b {
                font-size: 1.5rem;
              }
            }
            @media(min-width: 900px) {
              body {
                --dile-nav-padding-x: 1rem;
              }
              main {
                padding: 1.5rem;
              }
              .mobile {
                outline: 3px solid red;
                display: none;
              }
              .desktop {
                  display: block;
              }
            }
          </style>
        </head>
        <body>
          <dile-nav>
            <div slot="title">
              <img src="/images/logo-polydile.png" alt="logo polydile">
              <b slot="title">
                <span>dile</span>-components
              </b>
            </div>
            <div class="menuslot" slot="menu">
                <dile-menu-hamburger hamburgerAlwaysVisible direction="left" loading="hydrate:onClientLoad">
                    <div slot="menu" class="app-menu">
                        <dile-selector
                            class="drawernav" 
                            selected=${this.page} 
                            attrForSelected="name"
                            @dile-selected-changed=${this.navitateSelected}
                        >
                            <dile-selector-item icon="navigate_next" href="/">Home</dile-selector-item>
                            <dile-selector-item icon="navigate_next" href="/how-to-use">How to use</dile-selector-item>
                            <dile-selector-item icon="navigate_next" href="/components/">Components</dile-selector-item>

                            ${pageTree.renderMenu(new DrawerMenu(), componentsFilePath)}
                        </dile-selector>
                    </div>
                </dile-menu-hamburger>
            </div>
          </dile-nav>
          <main>
            ${data.content()}
          </main>
        </body>
      </html>
      `
  }
}
