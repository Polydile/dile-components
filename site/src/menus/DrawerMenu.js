import { html, nothing } from 'lit';

export class DrawerMenu {
  render(tree) {
    return this.currentNode?.children 
      ? html`
          ${this.currentNode.children.map(child => html`<dile-selector-item class="drawercomponent" icon="label_important" href="${child.model.url}">${child.model.name}</dile-selector-item>`)}
      `
      : nothing
  }
}