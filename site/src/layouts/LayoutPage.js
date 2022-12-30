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
          <link rel="stylesheet" href="/styles/site.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap" rel="stylesheet">
          <script src="/js/prism.js"></script>
          <style>
            body {
              font-family: 'Rubik', Helvetica, Arial, sans-serif;
              color: #303030;
            }
            [dile-cloak] {
              display: none !important;
            }
            .xsmallandup {
              display: none !important;
            }
            @media(min-width: 380px) {
              .xsmallandup {
                display: flex !important;
              } 
            }    
          </style>
        </head>
        <body>
          <header>
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
                <a href="https://twitter.com/DileComponents" class="xsmallandup"><dile-social-icon icon="twitter" class="twitter"></dile-social-icon></a>
              </span>
            </dile-nav>
          </header>
          <main>
            <nav class="fixednav">
              <dile-selector
                  class="drawernav"
                  selected=${this.page} 
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
            </nav>
            <div class="maincontent">
              ${data.content()}
            </maincontent>
          </main>
          <footer>
            <div class="footer">
              <section>
                <b>Information</b>
                <ul>
                  <li><a href="/how-to-use">How to use</a></li>
                  <li><a href="/contribute">Contribute</a></li>
                </ul>
              </section>
              <section>
                <b>Packages</b>
                <ul>
                  <li><a href="/components/">Components</a></li>
                  <li><a href="/mixins/">Mixins</a></li>
                  <li><a href="/utils/">Utils</a></li>
                </ul>
              </section>
            </div>
          </footer>
        </body>
      </html>
      `
  }
}
