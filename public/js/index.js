import './prism.js'
import '@dile/ui/components/card/card';
import '@dile/ui/components/avatar/avatar';
import '@dile/ui/components/menu-hamburger/menu-hamburger';
import '@dile/ui/components/nav/nav';
import '@dile/ui/components/selector/selector';
import '@dile/ui/components/selector/selector-item';
import '@dile/ui/components/social-icon/social-icon';
import '@dile/ui/components/slide-show/slide-show';
import '@dile/ui/components/button/button';
import '@dile/ui/components/checkbox/checkbox';
import '@dile/ui/components/breadcrumbs/breadcrumbs.js';
import '@dile/ui/components/social-icon/social-icon.js';
import '@dile/ui/components/tooltip/chip-tooltip';
import '@dile/utils/components/datepicker/datepicker.js';
import '@dile/ui/components/info-box/info-box';
import '@dile/ui/components/inline-feedback/inline-feedback';
import '@dile/ui/components/input/input-integer';
import '@dile/ui/components/input/input-money';
import '@dile/ui/components/input/input-number-mask.js';
import '@dile/ui/components/input/input-percentage';
import '@dile/ui/components/input/input-search.js';
import '@dile/ui/components/input/input.js';
import '@dile/ui/components/menu-overlay/menu-overlay.js';
import '@dile/ui/components/modal/modal.js';
import '@dile/ui/components/pages/pages.js';
import '@dile/ui/components/tabs/tabs.js';
import '@dile/ui/components/password/password.js';
import '@dile/ui/components/progress-bar/progress-bar.js';
import '@dile/ui/components/slide-menu/slide-menu.js';
import './components/dile-icon-name.js';

document.querySelectorAll('.code-preview__button').forEach(button => {
  button.addEventListener('click', () => {
    let control = button.getAttribute('aria-controls');
    document.querySelector('#' + control).style.display = 'block'
  })
})