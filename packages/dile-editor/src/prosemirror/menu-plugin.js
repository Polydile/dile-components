import { Plugin } from "prosemirror-state";

const toolbarElement = 'dile-editor-toolbar';
const toolbar = document.createElement(toolbarElement);

export const menuPlugin = new Plugin({
  view(editorView) {
    if (!editorView.dom.parentElement.querySelector(toolbarElement)) {
      toolbar.editorView = editorView;
      editorView.dom.parentNode.insertBefore(toolbar, editorView.dom);
    }
    return {
      update() {
        toolbar.reviewActiveElements();
      }
    };
  }
});
