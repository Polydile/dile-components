import { undo, redo } from "prosemirror-history";
import {
  formatBoldIcon,
  formatItalicIcon,
  codeIcon,
  redoIcon,
  undoIcon,
  formatIndentDecreaseIcon,
  formatListBulletedIcon,
  formatListNumberedIcon,
  insertLinkIcon,
  linkOffIcon,
  imageIcon,
} from '@dile/icons';
import {
  boldCommand,
  italicCommand,
  setCodeCommand,
  setParagraphCommand,
  headingCommandCreator,
  setUnorderedListCommand,
  setOrderedListCommand,
  liftCommand,
  codeMarkCommand,
  linkCommand,
} from './markdown-commands.js';
import { ToolbarItem, ToolbarLink, ToolbarRemoveLink, ToolbarImage } from "./toolbar-item.js";

export const toolbarItems = [
  new ToolbarItem({
    command: boldCommand,
    commandName: 'bold',
    icon: formatBoldIcon,
  }),
  new ToolbarItem({
    command: italicCommand,
    commandName: 'italic',
    icon: formatItalicIcon,
  }),
  new ToolbarItem({
    command: codeMarkCommand,
    commandName: 'code_mark',
    icon: codeIcon,
  }),
  new ToolbarLink({
    command: linkCommand,
    commandName: 'link',
    icon: insertLinkIcon,
  }),
  new ToolbarRemoveLink({
    commandName: 'removeLink',
    icon: linkOffIcon,
  }),
  new ToolbarImage({
    command: linkCommand,
    commandName: 'image',
    icon: imageIcon,
  }),
  new ToolbarItem({
    command: setUnorderedListCommand,
    commandName: 'unordered_list',
    icon: formatListBulletedIcon,
  }),
  new ToolbarItem({
    command: setOrderedListCommand,
    commandName: 'ordered_list',
    icon: formatListNumberedIcon,
  }),
  new ToolbarItem({
    command: liftCommand,
    commandName: 'lift',
    icon: formatIndentDecreaseIcon,
  }),
];

export const undoItems = [
  new ToolbarItem({
    command: undo,
    commandName: 'undo',
    icon: undoIcon,
  }),
  new ToolbarItem({
    command: redo,
    commandName: 'redo',
    icon: redoIcon,
  })
];

export const blockItems = [
  {
    command: setParagraphCommand,
    commandName: 'paragraph',
  },
  {
    command: headingCommandCreator(1),
    commandName: 'h1',
  },
  {
    command: headingCommandCreator(2),
    commandName: 'h2',
  },
  {
    command: headingCommandCreator(3),
    commandName: 'h3',
  },
  {
    command: setCodeCommand,
    commandName: 'code',
  },

];