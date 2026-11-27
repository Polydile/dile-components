import { describe, it, expect } from 'vitest';
import {
  schema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from 'prosemirror-markdown';

// Contract tests for the markdown <-> ProseMirror conversion that dile-editor
// relies on. They pin the current output of prosemirror-markdown so that a
// dependency update that changes the produced markdown is detected.

const roundTrip = (markdown) =>
  defaultMarkdownSerializer.serialize(defaultMarkdownParser.parse(markdown));

const blockTypes = (markdown) =>
  defaultMarkdownParser.parse(markdown).content.content.map(node => node.type.name);

describe('markdown round trip', () => {
  const stableCases = {
    'headings': '# Title\n\n## Sub\n\n#### Four',
    'inline marks': 'Some *italic*, **bold** and `code` text',
    'nested marks': '***both*** and **bold *nested***',
    'links with title': 'A [link](https://example.com "Title") here',
    'autolinks': '<https://example.com>',
    'images with title': '![Alt text](https://example.com/a.png "Img title")',
    'nested bullet lists': '* one\n* two\n  * nested\n* three',
    'ordered lists': '1. first\n2. second\n3. third',
    'ordered lists with custom start': '3. three\n4. four',
    'loose lists': '* one\n\n* two',
    'fenced code with language': '```js\nconst a = 1;\n```',
    'horizontal rules': 'above\n\n---\n\nbelow',
    'hard breaks': 'line one\\\nline two',
    'inline html': 'text <b>bold</b>',
    'empty documents': '',
  };

  for (const [name, markdown] of Object.entries(stableCases)) {
    it(`preserves ${name}`, () => {
      expect(roundTrip(markdown)).toBe(markdown);
    });
  }

  it('normalizes bullet markers to "*"', () => {
    expect(roundTrip('- one\n- two')).toBe('* one\n* two');
  });

  it('normalizes underscore emphasis and keeps intra-word underscores', () => {
    expect(roundTrip('snake_case_word and _em_')).toBe('snake_case_word and *em*');
  });

  it('converts indented code into fenced code', () => {
    expect(roundTrip('    indented code')).toBe('```\nindented code\n```');
  });

  it('joins lazy blockquote lines into one paragraph', () => {
    expect(roundTrip('> quote\n> more')).toBe('> quote more');
  });

  it('escapes markdown characters only where needed', () => {
    expect(roundTrip('a \\* star and 1\\. not list and \\# hash'))
      .toBe('a \\* star and 1. not list and # hash');
  });

  it('escapes literal markdown syntax typed as plain text', () => {
    const doc = schema.node('doc', null, [
      schema.node('paragraph', null, [schema.text('*not em* and # not heading')]),
    ]);
    const markdown = defaultMarkdownSerializer.serialize(doc);
    expect(markdown).toBe('\\*not em\\* and # not heading');
    expect(defaultMarkdownParser.parse(markdown).textContent).toBe('*not em* and # not heading');
  });
});

describe('markdown parsing', () => {
  it('produces the expected block node types', () => {
    const markdown = [
      '# Heading',
      'Paragraph',
      '* item',
      '1. item',
      '> quote',
      '```\ncode\n```',
      '---',
    ].join('\n\n');

    expect(blockTypes(markdown)).toEqual([
      'heading',
      'paragraph',
      'bullet_list',
      'ordered_list',
      'blockquote',
      'code_block',
      'horizontal_rule',
    ]);
  });

  it('keeps heading levels, code block params and list attributes', () => {
    const doc = defaultMarkdownParser.parse('### Three\n\n```css\na{}\n```\n\n5. five\n6. six');
    const [heading, code, list] = doc.content.content;

    expect(heading.attrs.level).toBe(3);
    expect(code.attrs.params).toBe('css');
    expect(list.attrs.order).toBe(5);
    expect(list.attrs.tight).toBe(true);
  });

  it('parses link and image attributes', () => {
    const doc = defaultMarkdownParser.parse('[t](https://a.com "T") ![alt](https://b.com/i.png "I")');
    let link, image;
    doc.descendants((node) => {
      if (node.isText && node.marks.length) link = node.marks.find(m => m.type === schema.marks.link);
      if (node.type === schema.nodes.image) image = node;
    });

    expect(link.attrs).toMatchObject({ href: 'https://a.com', title: 'T' });
    expect(image.attrs).toMatchObject({ src: 'https://b.com/i.png', alt: 'alt', title: 'I' });
  });

  it('exposes the schema nodes and marks the editor uses', () => {
    for (const name of ['doc', 'paragraph', 'heading', 'code_block', 'bullet_list', 'ordered_list', 'list_item', 'image', 'blockquote', 'horizontal_rule', 'hard_break']) {
      expect(schema.nodes[name], `node ${name}`).toBeTruthy();
    }
    for (const name of ['strong', 'em', 'code', 'link']) {
      expect(schema.marks[name], `mark ${name}`).toBeTruthy();
    }
  });
});
