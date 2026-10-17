import { describe, it, expect, afterEach } from 'vitest';
import './ajax.js';

describe('dile-ajax', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('appends arrays of files as multiple "key[]" entries when sending data as FormData', async () => {
    const el = document.createElement('dile-ajax');
    document.body.appendChild(el);
    await el.updateComplete;

    const files = [new File(['a'], 'a.txt'), new File(['b'], 'b.txt')];
    el.data = { title: 'Docs', files, empty: null };
    el._prepareFormData();

    expect(el.formData.get('title')).toBe('Docs');
    expect(el.formData.getAll('files[]').map(file => file.name)).toEqual(['a.txt', 'b.txt']);
    expect(el.formData.has('files')).toBe(false);
    expect(el.formData.has('empty')).toBe(false);
  });

  it('keeps sending other arrays as a single entry', async () => {
    const el = document.createElement('dile-ajax');
    document.body.appendChild(el);
    await el.updateComplete;

    el.data = { tags: [1, 2, 3] };
    el._prepareFormData();

    expect(el.formData.get('tags')).toBe('1,2,3');
    expect(el.formData.has('tags[]')).toBe(false);
  });
});
