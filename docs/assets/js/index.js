import './prism.js'
import './theme-builder/theme-builder.js';
import '@dile/iconlib/dile-iconlib.js';
import '@dile/iconlib/lucide-icons/copy.js';
import '@dile/iconlib/lucide-icons/arrow-big-right.js';
import '@dile/iconlib/lucide-icons/globe.js';
import '@dile/iconlib/lucide-icons/palette.js';
import '@dile/iconlib/lucide-icons/wand-sparkles.js';
import '@dile/iconlib/lucide-icons/swatch-book.js';
import '@dile/iconlib/lucide-icons/eye.js';
import '@dile/iconlib/lucide-icons/rocket.js';
import '@dile/iconlib/lucide-icons/download.js';
import '@dile/iconlib/lucide-icons/import.js';
import '@dile/iconlib/lucide-icons/code-xml.js';
import '@dile/iconlib/lucide-icons/server.js';
import '@dile/iconlib/lucide-icons/hammer.js';
import '@dile/iconlib/lucide-icons/package.js';
import '@dile/iconlib/lucide-icons/blocks.js';
import '@dile/iconlib/lucide-icons/feather.js';
import '@dile/iconlib/lucide-icons/check-check.js';
import '@dile/iconlib/lucide-icons/layers.js';
import '@dile/iconlib/lucide-icons/book-open.js';
import '@dile/iconlib/lucide-icons/bot.js';
import '@dile/iconlib/lucide-icons/terminal.js';
import '@dile/iconlib/lucide-icons/hash.js';
import '@dile/iconlib/lucide-icons/badge-dollar-sign.js';
import '@dile/iconlib/lucide-icons/calculator.js';
import '@dile/iconlib/lucide-icons/badge-percent.js';
import '@dile/iconlib/lucide-icons/message-circle.js';
import '@dile/iconlib/lucide-icons/book-type.js';
import '@dile/iconlib/lucide-icons/search.js';
import '@dile/iconlib/lucide-icons/phone.js';
import '@dile/ui/components/card/card.js';
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
import '@dile/ui/components/input/input-contact.js';
import '@dile/ui/components/input/input-search.js';
import '@dile/ui/components/input/input.js';
import '@dile/ui/components/menu-overlay/menu-overlay.js';
import '@dile/ui/components/modal/modal.js';
import '@dile/ui/components/pages/pages.js';
import '@dile/ui/components/tabs/tabs.js';
import '@dile/ui/components/password/password.js';
import '@dile/ui/components/progress-bar/progress-bar.js';
import '@dile/ui/components/slide-menu/slide-menu.js';
import '@dile/ui/components/light-mode-switch/light-mode-switch.js';
import '@dile/ui/components/switch/switch.js';
import '@dile/ui/components/select/select.js';
import '@dile/ui/components/copy-text/copy-text.js';
import '@dile/ui/components/copy-markdown-url/copy-markdown-url.js';
import '@dile/ui/components/color-picker/color-picker.js';
import '@dile/iconlib/dile-fontawesome-badge.js';
import '@dile/iconlib/fontawesome-icons/github.js';
import '@dile/iconlib/lucide-icons/book-open.js';
import '@dile/iconlib/phosphor-icons/package.js';
import '@dile/iconlib/lucide-icons/form.js';
import '@dile/iconlib/tabler-icons/icons.js';
import '@dile/iconlib/material-icons/feedback.js';
import '@dile/iconlib/phosphor-icons/app-window.js';
import '@dile/iconlib/remixicon-icons/menu-fill.js';
import '@dile/iconlib/phosphor-icons/spinner.js';

document.querySelectorAll('.code-preview__button').forEach(button => {
  button.addEventListener('click', () => {
    let control = button.getAttribute('aria-controls');
    document.querySelector('#' + control).style.display = 'block'
  })
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[dile-cloak]').forEach(el => {
    el.removeAttribute('dile-cloak');
  });
})
