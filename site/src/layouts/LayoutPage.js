import { html } from 'lit';
import '../../../packages/dile-nav/dile-nav.js';
import '../../../packages/dile-social-icon/dile-social-icon.js';
import { DrawerMenu } from '../menus/DrawerMenu.js';
import { pageTree } from '../menus/pageTree.js';
const componentsFilePath = 'components/index.rocket.md';
const mixinsFilePath = 'mixins/index.rocket.md';
const utilsFilePath = 'utils/index.rocket.md';

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
          <link rel="stylesheet" href="/styles/prism.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap" rel="stylesheet">
          <script src="/js/prism.js"></script>
          <style>
            body {
              font-family: 'Rubik', Helvetica, Arial, sans-serif;
              color: #303030;
              --primary-color: #7BB93D;
              --secondary-color: #f3f3ae;

              --primary-lines-color: var(--secondary-color);

              --dile-social-icon-color: #303030;
              --dile-social-icon-size: 1.5rem;

              --dile-hamburger-color: #303030;
            }
            .sitenav {
              --dile-nav-padding-y: 0;
              --dile-nav-padding-x: 0;
              --dile-nav-background-color: var(--secondary-color);
              --dile-hamburger-padding-x: 0.7rem;
              --dile-nav-column-gap: 0.25rem;
            }
            code {
              font-family: 'Cutive Mono', monospace;
            }
            h1 {
              font-size: 1.8rem;
              margin-bottom: 1.5rem;
            }
            h2 {
              margin-bottom: 1rem;
            }
            h3 {
              margin-bottom: 0.6rem;
            }
            p {
              margin-bottom: 1rem;
            }
            [dile-cloak] {
              display: none !important;
            }
            dile-selector-item {
              display: block;
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
              height: 36px;
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
            .actionsnav {
              margin-right: 1rem;
              display: flex;
              align-items: center;
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
            table {
              border-spacing: 0;
              border-collapse: collapse;
              margin-bottom: 1.5rem;
            }
            th {
              border-bottom: 1px solid #ddd;
              background-color: var(--primary-color);
              color: #fff;
              padding: 0.5rem 0.5rem;
            }
            td {
              padding: 0.3rem 0.5rem;
              font-size: 0.9rem;
            }
            tr:nth-child(even) {
              background: #f5f5f5;
            }

            blockquote {
              border-left: 7px solid var(--primary-color);
              margin: 0 0 1rem 0;
              padding: 1rem;
              background-color: #f5f5f5;
            }

            blockquote p:last-child {
              margin-bottom: 0;
            }

            mdjs-preview div {
              padding: 10px;
            }

            mdjs-preview dile-textarea div {
              padding: 0;
            }
            
            mdjs-preview pre {
              border-bottom: 10px solid #fff;
            }

            @media(min-width: 350px) {
              body {
                --dile-nav-padding-y: 0.2rem;
                --dile-social-icon-size: 2rem;
                --dile-hamburger-padding-x: 1rem;
              }
              dile-nav img {
                height: 40px;
              }
            }
            @media(min-width: 400px) {
              dile-nav img {
                height: 48px;
              }
              dile-nav b {
                font-size: 1.5rem;
              }
            }
            @media(min-width: 800px) {
              body {
                --dile-nav-padding-x: 0.8rem;
                --dile-hamburger-line-size: 5px;
                --dile-hamburger-line-separation: -10px;
                --dile-hamburger-width: 32px;
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
            @media(min-width: 1000px) {
              body {
                --dile-nav-padding-x: 1.2rem;
              }
              main {
                padding: 1.5rem 2rem;
              }
            }
          </style>
        </head>
        <body>
          <dile-nav class="sitenav">
            <div slot="title">
              <img src="/images/logo-polydile.png" alt="logo polydile">
              <b slot="title">
                <span>dile</span>-components
              </b>
            </div>
            <div class="menuslot" slot="menu">
                <dile-menu-hamburger hamburgerAlwaysVisible direction="left" loading="hydrate:onClientLoad">
                    <div slot="menu" class="app-menu" dile-cloak>
                        <dile-selector
                            class="drawernav" 
                            selected=${this.page} 
                            attrForSelected="name"
                            @dile-selected-changed=${this.navitateSelected}
                        >
                            <dile-selector-item icon="navigate_next" href="/">Home</dile-selector-item>
                            <dile-selector-item icon="navigate_next" href="/how-to-use">How to use</dile-selector-item>
                            <dile-selector-item icon="navigate_next" href="/contribute">Contribute</dile-selector-item>
                            <dile-selector-item icon="navigate_next" href="/components/">Components</dile-selector-item>
                            ${pageTree.renderMenu(new DrawerMenu(), componentsFilePath)}
                            <dile-selector-item icon="navigate_next" href="/mixins/">Mixins</dile-selector-item>
                            ${pageTree.renderMenu(new DrawerMenu(), mixinsFilePath)}

                            <dile-selector-item icon="navigate_next" href="/utils/">Utils</dile-selector-item>
                            ${pageTree.renderMenu(new DrawerMenu(), utilsFilePath)}
                            
                        </dile-selector>
                    </div>
                </dile-menu-hamburger>
            </div>
            <span slot="actions" class="actionsnav">
              <a href="https://github.com/Polydile/dile-components"><dile-social-icon icon="github" class="github"></dile-social-icon></a>
            </span>
          </dile-nav>
          <main>
            ${data.content()}
          </main>
        </body>
      </html>
      `
  }
}
