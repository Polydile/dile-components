import {
  toggleMark,
  setBlockType,
  lift,
} from "prosemirror-commands";
import {
  schema,
} from "prosemirror-markdown";
import { wrapInList, liftListItem, sinkListItem } from "prosemirror-schema-list"

export const codeMarkCommand = toggleMark(schema.marks.code);
export const boldCommand = toggleMark(schema.marks.strong);
export const italicCommand = toggleMark(schema.marks.em);
export const setCodeCommand = setBlockType(schema.nodes.code_block);
export const setParagraphCommand = setBlockType(schema.nodes.paragraph);
export const setUnorderedListCommand = wrapInList(schema.nodes.bullet_list, {tight: true});
export const setOrderedListCommand = wrapInList(schema.nodes.ordered_list, {tight: true});
export const liftCommand = lift;
export const linkCommand = (attrs) => toggleMark(schema.marks.link, attrs);

export function markActive(state, type) {
  let { from, $from, to, empty } = state.selection
  if (empty) {
    return !!type.isInSet(state.storedMarks || $from.marks())
  } else {
    return state.doc.rangeHasMark(from, to, type)
  } 
}

export function headingCommandCreator(level) {
  return setBlockType(schema.nodes.heading, { level });
}