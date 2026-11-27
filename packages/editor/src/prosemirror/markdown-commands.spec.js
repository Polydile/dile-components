import { describe, it, expect } from 'vitest';
import { EditorState, TextSelection } from 'prosemirror-state';
import { history, undo, redo } from 'prosemirror-history';
import {
  schema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from 'prosemirror-markdown';
import {
  boldCommand,
  italicCommand,
  codeMarkCommand,
  setCodeCommand,
  setParagraphCommand,
  setUnorderedListCommand,
  setOrderedListCommand,
  liftCommand,
  linkCommand,
  headingCommandCreator,
  markActive,
} from './markdown-commands.js';

// Builds a state from markdown and selects the text between the first
// occurrence of `selected` (or places the cursor at the start of the doc).
function createState(markdown, selected) {
  let state = EditorState.create({
    doc: defaultMarkdownParser.parse(markdown),
    plugins: [history()],
  });
  if (selected) {
    let from = null;
    state.doc.descendants((node, pos) => {
      if (from === null && node.isText && node.text.includes(selected)) {
        from = pos + node.text.indexOf(selected);
      }
    });
    if (from === null) throw new Error(`"${selected}" not found`);
    state = state.apply(state.tr.setSelection(TextSelection.create(state.doc, from, from + selected.length)));
  } else {
    state = state.apply(state.tr.setSelection(TextSelection.atStart(state.doc)));
  }
  return state;
}

function run(command, state) {
  let next = state;
  const applied = command(state, (tr) => { next = state.apply(tr); });
  return { applied, state: next, markdown: defaultMarkdownSerializer.serialize(next.doc) };
}

describe('mark commands', () => {
  it('toggles bold on the selection', () => {
    const first = run(boldCommand, createState('hello world', 'world'));
    expect(first.markdown).toBe('hello **world**');

    const second = run(boldCommand, first.state);
    expect(second.markdown).toBe('hello world');
  });

  it('toggles italic on the selection', () => {
    expect(run(italicCommand, createState('hello world', 'hello')).markdown).toBe('*hello* world');
  });

  it('toggles inline code on the selection', () => {
    expect(run(codeMarkCommand, createState('call fn now', 'fn')).markdown).toBe('call `fn` now');
  });

  it('adds a link with href and title', () => {
    const command = linkCommand({ href: 'https://example.com', title: 'Example' });
    expect(run(command, createState('go here', 'here')).markdown)
      .toBe('go [here](https://example.com "Example")');
  });

  it('reports applicability without a dispatch function', () => {
    const state = createState('text', 'text');
    expect(boldCommand(state)).toBe(true);
    expect(italicCommand(state)).toBe(true);
  });
});

describe('markActive', () => {
  it('detects a mark over a range selection', () => {
    const state = createState('plain **bold**', 'bold');
    expect(markActive(state, schema.marks.strong)).toBe(true);
    expect(markActive(state, schema.marks.em)).toBe(false);
  });

  it('detects a mark at a collapsed cursor inside marked text', () => {
    let state = createState('a [link](https://x.com) b', 'link');
    state = state.apply(state.tr.setSelection(TextSelection.create(state.doc, state.selection.from + 2)));
    expect(state.selection.empty).toBe(true);
    expect(markActive(state, schema.marks.link)).toBe(true);
  });

  it('detects stored marks at a collapsed cursor', () => {
    let state = createState('text');
    state = state.apply(state.tr.addStoredMark(schema.marks.em.create()));
    expect(markActive(state, schema.marks.em)).toBe(true);
  });
});

describe('block commands', () => {
  for (const level of [1, 2, 3, 4]) {
    it(`converts a paragraph into a level ${level} heading`, () => {
      expect(run(headingCommandCreator(level), createState('Title')).markdown)
        .toBe(`${'#'.repeat(level)} Title`);
    });
  }

  it('converts a heading back into a paragraph', () => {
    expect(run(setParagraphCommand, createState('## Title')).markdown).toBe('Title');
  });

  it('converts a paragraph into a code block', () => {
    expect(run(setCodeCommand, createState('const a = 1;')).markdown).toBe('```\nconst a = 1;\n```');
  });

  it('reports the current block type as not applicable', () => {
    // dile-editor-toolbar uses this to know which block is selected.
    const state = createState('## Title');
    expect(headingCommandCreator(2)(state)).toBe(false);
    expect(headingCommandCreator(1)(state)).toBe(true);
    expect(setParagraphCommand(state)).toBe(true);
  });

  it('wraps a paragraph in a bullet list', () => {
    expect(run(setUnorderedListCommand, createState('item')).markdown).toBe('* item');
  });

  it('wraps a paragraph in an ordered list', () => {
    expect(run(setOrderedListCommand, createState('item')).markdown).toBe('1. item');
  });

  it('lifts a list item out of its list', () => {
    expect(run(liftCommand, createState('* item')).markdown).toBe('item');
  });

  it('lifts a paragraph out of a blockquote', () => {
    expect(run(liftCommand, createState('> quoted')).markdown).toBe('quoted');
  });
});

describe('history', () => {
  it('undoes and redoes a command', () => {
    const bold = run(boldCommand, createState('hello world', 'world'));
    const undone = run(undo, bold.state);
    expect(undone.applied).toBe(true);
    expect(undone.markdown).toBe('hello world');

    const redone = run(redo, undone.state);
    expect(redone.markdown).toBe('hello **world**');
  });

  it('has nothing to undo in a fresh state', () => {
    expect(undo(createState('text'))).toBe(false);
    expect(redo(createState('text'))).toBe(false);
  });
});
