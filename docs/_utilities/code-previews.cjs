let count = 1;

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Turns code fields with the :preview suffix into interactive code previews.
 */
module.exports = function (doc, options) {
  options = {
    within: 'body', // the element containing the code fields to convert
    ...options
  };

  const within = doc.querySelector(options.within);
  if (!within) {
    return doc;
  }

  within.querySelectorAll('[class*=":preview"]').forEach(code => {
    const pre = code.closest('pre');
    if (!pre) {
      return;
    }
    const adjacentPre = pre.nextElementSibling?.tagName.toLowerCase() === 'pre' ? pre.nextElementSibling : null;
    const sourceGroupId = `code-preview-source-group-${count}`;
    const isExpanded = code.getAttribute('class').includes(':expanded');
    
    count++;

    const codePreview = `
      <div class="code-preview">
        <div class="code-preview__preview">
          ${code.textContent}
        </div>

        <dile-slide-show showLabel="Show Code" hideLabel="Hide Code">
          <div class="">
            <pre><code class="language-html">${escapeHtml(code.textContent)}</code></pre>
          </div>          
        </dile-slide-show>
      </div>
    `;

    pre.insertAdjacentHTML('afterend', codePreview);
    pre.remove();

    if (adjacentPre) {
      adjacentPre.remove();
    }
  });

  // Wrap code preview scripts in anonymous functions so they don't run in the global scope
  doc.querySelectorAll('.code-preview__preview script').forEach(script => {
    if (script.type === 'module') {
      // Modules are already scoped
      script.textContent = script.innerHTML;
    } else {
      // Wrap non-modules in an anonymous function so they don't run in the global scope
      script.textContent = `(() => { ${script.innerHTML} })();`;
    }
  });

  return doc;
};