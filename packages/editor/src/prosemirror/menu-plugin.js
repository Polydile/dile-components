import { Plugin } from "prosemirror-state";

const toolbarElement = 'dile-editor-toolbar';

export const menuPlugin = () => new Plugin({
  view(editorView) {
    let toolbar;
    if (!editorView.dom.parentElement.querySelector(toolbarElement)) {
      toolbar = document.createElement(toolbarElement);
      toolbar.editorView = editorView;
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