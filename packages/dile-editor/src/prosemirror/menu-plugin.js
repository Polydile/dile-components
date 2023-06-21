import { Plugin } from "prosemirror-state";

export const createMenuPlugin = () => {
  const toolbarElement = 'dile-editor-toolbar';
  const toolbar = document.createElement(toolbarElement);
  
  return new Plugin({
    view(editorView) {
      console.log('view method in menu plugin');
      if (!editorView.dom.parentElement.querySelector(toolbarElement)) {
        console.log('aki!!');
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
