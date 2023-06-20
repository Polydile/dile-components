import { markActive } from './markdown-commands.js';
import { toggleMark } from 'prosemirror-commands';
import {
  schema,
} from "prosemirror-markdown";

export class ToolbarItem {
  constructor(config) {
    this.active = true;
    this.visible = true;
    this.command = config.command;
    this.commandName = config.commandName;
    this.icon = config.icon;
  }

  checkActive(editorView) {
    this.active = this.command(editorView.state, null, editorView)
  }

  doCommand(editorView) {
    this.command(editorView.state, editorView.dispatch)
  }

  is(commandName) {
    return commandName == this.commandName;
  }
}

export class ToolbarLink extends ToolbarItem {
  constructor(config) {
    super(config);
    this.dialog = 'linkDialog';
  }
  checkActive(editorView) {
    this.visible = !markActive(editorView.state, schema.marks.link);
    this.active = ! editorView.state.selection.empty;
  }
}

export class ToolbarImage extends ToolbarItem {
  constructor(config) {
    super(config);
    this.dialog = 'imageDialog';
  }
  checkActive(editorView) {
    //this.visible = !markActive(editorView.state, schema.marks.link);
    this.active = true
  }
}

export class ToolbarRemoveLink extends ToolbarItem {
  constructor(config) {
    super(config);
    this.visible = false;
  }
  checkActive(editorView) {
    this.visible = markActive(editorView.state, schema.marks.link);
  }
  doCommand(editorView) {
    if (markActive(editorView.state, schema.marks.link)) {
      toggleMark(schema.marks.link)(editorView.state, editorView.dispatch)
    }
  }
}