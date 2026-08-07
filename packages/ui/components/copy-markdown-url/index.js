import { DileCopyMarkdownUrl } from './src/DileCopyMarkdownUrl.js';

if (!customElements.get('dile-copy-markdown-url')) {
  window.customElements.define('dile-copy-markdown-url', DileCopyMarkdownUrl);
}

export { DileCopyMarkdownUrl };
