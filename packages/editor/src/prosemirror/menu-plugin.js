import { Plugin } from "prosemirror-state";

const toolbarElement = 'dile-editor-toolbar';

export const menuPlugin = (menuConfig, addicionalCommands, language) => new Plugin({
  view(editorView) {
    let toolbar;
    if (!editorView.dom.parentElement.querySelector(toolbarElement)) {
      toolbar = document.createElement(toolbarElement);
      toolbar.menuConfig = menuConfig;
      toolbar.editorView = editorView;
      toolbar.addicionalCommands = addicionalCommands;
      toolbar.language = language;
      editorView.dom.parentNode.insertBefore(toolbar, editorView.dom);
    } else {
      toolbar = editorView.dom.parentElement.querySelector(toolbarElement);
    }
    return {
      update() {
        toolbar.reviewActiveElements();
      }
    };
  }
});