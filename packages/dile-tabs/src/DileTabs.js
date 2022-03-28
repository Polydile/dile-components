import { html, css, LitElement } from "lit";
import { DileSelectorMixin } from "@dile/dile-selector-mixin";

export class DileTabs extends DileSelectorMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
      }
    `;
  }

  // constructor() {
  //   super();
  //   this.selected = 0;
  //   this.tabs = [];
  //   this.addEventListener('dile-tab-selected', this.tabSelectedChanged.bind(this));
  // }

  // render() {
  //   return html`
  //     <slot></slot>
  //   `;
  // }

  // firstUpdated() {
  //   let DOMTabs = this.children;
  //   let index = 0;
  //   for (let item of DOMTabs) {
  //     if(item.tagName.toLowerCase() == 'dile-tab') {
  //       item.index = index;
  //       index++;
  //       this.tabs.push(item);
  //     }
  //   }
  //   this.setSelectedTab();
  // }

  // setSelectedTab() {
  //   if(! this.attrForSelected) {
  //     // Selected by index
  //     let selectedIndex = parseInt(this.selected);
  //     if(! isNaN(selectedIndex) && this.tabs[selectedIndex]) {
  //       for (let index in this.tabs) {
  //         if(index == selectedIndex) {
  //           this.tabs[index].selected = true;
  //         } else {
  //           this.tabs[index].selected = false;
  //         }
  //       }
  //     }
  //   } else {
  //     // Selected by attribute
  //     for (let tab of this.tabs) {
  //       if(tab.getAttribute(this.attrForSelected) == this.selected) {
  //         tab.selected = true;
  //       } else {
  //         tab.selected = false;
  //       }
  //     }
  //   }
  // }

  // tabSelectedChanged(e) {
  //   if(! this.attrForSelected) {
  //     // selected by index
  //     this.selected = e.detail.index;
  //   } else {
  //     // selected by attribute
  //     this.selected = e.detail.getAttribute(this.attrForSelected);
  //   }
  //   this.dispatchSelectedChanged();
  // }

  // dispatchSelectedChanged() {
  //   this.dispatchEvent(new CustomEvent('dile-tabs-selected-changed', {
  //     bubbles: true,
  //     composed: true,
  //     detail: this.selected
  //   }));
  // }
  
  // updated(changedProperties) {
  //   this.setSelectedTab();
  // }
}
