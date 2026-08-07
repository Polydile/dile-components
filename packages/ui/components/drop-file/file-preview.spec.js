import { describe, it, expect, afterEach } from 'vitest';
import './file-preview.js';

describe('dile-file-preview', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderFilePreview(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-file-preview');
    await el.updateComplete;
    return el;
  }

  it('renders nothing when there is no fileName', async () => {
    const el = await renderFilePreview('<dile-file-preview></dile-file-preview>');
    expect(el.shadowRoot.querySelector('div')).toBeNull();
  });

  it('renders the file name and a clear link when fileName is set', async () => {
    const el = await renderFilePreview('<dile-file-preview fileName="report.pdf" selectedFileLabel="Selected"></dile-file-preview>');
    expect(el.shadowRoot.querySelector('div span').textContent).toContain('report.pdf');
  });

  it('dispatches dile-file-clear when the clear link is clicked', async () => {
    const el = await renderFilePreview('<dile-file-preview fileName="report.pdf"></dile-file-preview>');
    let detail = null;
    el.addEventListener('dile-file-clear', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('a').click();

    expect(detail).toEqual({ fileName: 'report.pdf' });
  });
});
