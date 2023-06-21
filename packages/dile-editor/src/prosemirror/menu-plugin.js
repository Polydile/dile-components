import { Plugin } from "prosemirror-state";

export const createMenuPlugin = () => {
  const toolbarElement = 'dile-editor-toolbar';
  const toolbar = document.createElement(toolbarElement);
  
  return new Plugin({
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
}
