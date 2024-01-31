```js server
/* START - Rocket auto generated - do not touch */
export const sourceRelativeFilePath = 'utils/icons.rocket.md';
import { layout } from '../recursive.data.js';
export { layout };
/* END - Rocket auto generated - do not touch */

export const title = 'icons';
```

```js script
import { html, css, LitElement } from 'lit'; 
import '@mdjs/mdjs-story/define';
import '@mdjs/mdjs-preview/define';
import "@dile/dile-menu-hamburger/dile-menu-hamburger.js";
import "@dile/dile-selector/dile-selector.js";
import "@dile/dile-selector/dile-selector-item.js";
import '@dile/dile-icon/dile-icon.js'

import { iconStyles } from "../../../packages/icons/index.js";
import { accountIcon } from "../../../packages/icons/index.js";
import { addIcon } from "../../../packages/icons/index.js";
import { announcementIcon } from "../../../packages/icons/index.js";
import { appsIcon } from "../../../packages/icons/index.js";
import { arrowDropDownIcon } from "../../../packages/icons/index.js";
import { arrowDropUpIcon } from "../../../packages/icons/index.js";
import { arrowRightIcon } from "../../../packages/icons/index.js";
import { attachFileIcon } from "../../../packages/icons/index.js";
import { attachmentIcon } from "../../../packages/icons/index.js";
import { autoAwesomeIcon } from "../../../packages/icons/index.js";
import { calendarIcon } from "../../../packages/icons/index.js";
import { checkboxBlankIcon } from "../../../packages/icons/index.js";
import { checkboxCheckedIcon } from "../../../packages/icons/index.js";
import { circleIcon } from "../../../packages/icons/index.js";
import { circleBorderIcon } from "../../../packages/icons/index.js";
import { clearIcon } from "../../../packages/icons/index.js";
import { closeIcon } from "../../../packages/icons/index.js";
import { codeIcon } from "../../../packages/icons/index.js";
import { cookieIcon } from "../../../packages/icons/index.js";
import { cropIcon } from "../../../packages/icons/index.js";
import { deleteIcon } from "../../../packages/icons/index.js";
import { descriptionIcon } from "../../../packages/icons/index.js";
import { doneIcon } from "../../../packages/icons/index.js";
import { doubleArrowLeftIcon } from "../../../packages/icons/index.js";
import { doubleArrowRightIcon } from "../../../packages/icons/index.js";
import { downloadIcon } from "../../../packages/icons/index.js";
import { eastIcon } from "../../../packages/icons/index.js";
import { editIcon } from "../../../packages/icons/index.js";
import { emailIcon } from "../../../packages/icons/index.js";
import { euroIcon } from "../../../packages/icons/index.js";
import { favoriteIcon } from "../../../packages/icons/index.js";
import { filterIcon } from "../../../packages/icons/index.js";
import { filterListIcon } from "../../../packages/icons/index.js";
import { folderIcon } from "../../../packages/icons/index.js";
import { folderZipIcon } from "../../../packages/icons/index.js";
import { formatAlignCenterIcon } from "../../../packages/icons/index.js";
import { formatAlignLeftIcon } from "../../../packages/icons/index.js";
import { formatAlignRightIcon } from "../../../packages/icons/index.js";
import { formatBoldIcon } from "../../../packages/icons/index.js";
import { formatColorTextIcon } from "../../../packages/icons/index.js";
import { formatIndentDecreaseIcon } from "../../../packages/icons/index.js";
import { formatIndentIncreaseIcon } from "../../../packages/icons/index.js";
import { formatItalicIcon } from "../../../packages/icons/index.js";
import { formatListBulletedIcon } from "../../../packages/icons/index.js";
import { formatListNumberedIcon } from "../../../packages/icons/index.js";
import { formatQuoteIcon } from "../../../packages/icons/index.js";
import { formatUnderlinedIcon } from "../../../packages/icons/index.js";
import { helpIcon } from "../../../packages/icons/index.js";
import { homeIcon } from "../../../packages/icons/index.js";
import { imageIcon } from "../../../packages/icons/index.js";
import { infoIcon } from "../../../packages/icons/index.js";
import { insertLinkIcon } from "../../../packages/icons/index.js";
import { insertPhotoIcon } from "../../../packages/icons/index.js";
import { labelIcon } from "../../../packages/icons/index.js";
import { lightbulbIcon } from "../../../packages/icons/index.js";
import { linkOffIcon } from "../../../packages/icons/index.js";
import { listIcon } from "../../../packages/icons/index.js";
import { loginIcon } from "../../../packages/icons/index.js";
import { logoutIcon } from "../../../packages/icons/index.js";
import { moreIcon } from "../../../packages/icons/index.js";
import { moreVertIcon } from "../../../packages/icons/index.js";
import { newReleasesIcon } from "../../../packages/icons/index.js";
import { notesIcon } from "../../../packages/icons/index.js";
import { notificationsIcon } from "../../../packages/icons/index.js";
import { openWithIcon } from "../../../packages/icons/index.js";
import { paidIcon } from "../../../packages/icons/index.js";
import { paletteIcon } from "../../../packages/icons/index.js";
import { panToolIcon } from "../../../packages/icons/index.js";
import { pdfIcon } from "../../../packages/icons/index.js";
import { photoCameraIcon } from "../../../packages/icons/index.js";
import { priorityHighIcon } from "../../../packages/icons/index.js";
import { questionAnswerIcon } from "../../../packages/icons/index.js";
import { radioCheckedIcon } from "../../../packages/icons/index.js";
import { receiptIcon } from "../../../packages/icons/index.js";
import { receiptLongIcon } from "../../../packages/icons/index.js";
import { redoIcon } from "../../../packages/icons/index.js";
import { refreshIcon } from "../../../packages/icons/index.js";
import { rotateLeftIcon } from "../../../packages/icons/index.js";
import { rotateRightIcon } from "../../../packages/icons/index.js";
import { saveIcon } from "../../../packages/icons/index.js";
import { scaleIcon } from "../../../packages/icons/index.js";
import { searchIcon } from "../../../packages/icons/index.js";
import { settingsIcon } from "../../../packages/icons/index.js";
import { shoppingCartIcon } from "../../../packages/icons/index.js";
import { sortIcon } from "../../../packages/icons/index.js";
import { starIcon } from "../../../packages/icons/index.js";
import { starBorderIcon } from "../../../packages/icons/index.js";
import { starHalfIcon } from "../../../packages/icons/index.js";
import { swapIcon } from "../../../packages/icons/index.js";
import { switchLeftIcon } from "../../../packages/icons/index.js";
import { textFieldsIcon } from "../../../packages/icons/index.js";
import { thumbUpIcon } from "../../../packages/icons/index.js";
import { thumbDownIcon } from "../../../packages/icons/index.js";
import { timerIcon } from "../../../packages/icons/index.js";
import { tuneIcon } from "../../../packages/icons/index.js";
import { undoIcon } from "../../../packages/icons/index.js";
import { uploadIcon } from "../../../packages/icons/index.js";
import { videocamIcon } from "../../../packages/icons/index.js";
import { warningIcon } from "../../../packages/icons/index.js";
import { zoomInIcon } from "../../../packages/icons/index.js";
import { zoomOutIcon } from "../../../packages/icons/index.js";
import { zoomOutMapIcon } from "../../../packages/icons/index.js";
```

# icons

This package contains some useful icons and a style declaration to customize the size and the icon color.

## Installation 

```bash
npm install @dile/icons 
```

## Usage

Import the icon you need:

```javascript
import { infoIcon } from '@dile/icons';
```

Use the icon in a Lit template:

```javascript
render() {
  return html`
    // Your component template
    ${ infoIcon }
  `;
}
```

### Manage icon styles

To create the icon styles easily you may use the CSS declaration provided in this package.

```javascript
import { iconStyles } from '@dile/icons';
```

Then, you can use the style declaration in your Lit component:

```javascript
static get styles() {
  return [iconStyles, css`
    :host {
        --dile-icon-color: #fce;
      }
  `];
}
```

### Using icons with dile-icon component

This icons library works well with the [dile-icon](/components/dile-icon) component. 


When you use ```<dile-icon>``` you will have configured the icon custom properties and styles to the icon box, in order to fit your icons in a better way.

```javascript
import { calendarIcon } from '@dile/icons';
import '@dile/dile-icon/dile-icon.js';

html`<dile-icon icon=${calendarIcon}</dile-icon>`;
```

See [dile-icon docs](/components/dile-icon) for more information.

## CSS Custom Properties

You can customize it using CSS Custom Properties.

Custom property | Description | Default
----------------|-------------|---------
--dile-icon-size | Icon size | 24px
--dile-icon-color | Icon color | #888

## Icons included

```js preview-story
class MyComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        --dile-icon-color: rgb(41, 164, 119);
      }
      #icons {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 1rem;
      }
      @media(min-width: 370px) {
        #icons {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media(min-width: 550px) {
        #icons {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
      @media(min-width: 710px) {
        #icons {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
      }
      @media(min-width: 900px) {
        #icons {
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
      }
      #icons article {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      #icons article span {
        margin-top: 0.3rem;
        font-size: 0.9rem;
      }
      .dile-icon path, .dile-icon polygon {
        fill: var(--dile-icon-color, #888);
      }
      .dile-icon path[fill="none"] {
        fill: transparent;
      }
      .dile-icon {
        width: var(--dile-icon-size, 24px);
        height: var(--dile-icon-size, 24px);
      }
    `
  }
  render() {
    return html`
    <div id="icons">
      <article>
        <dile-icon id="accountIcon"></dile-icon>
        <span>accountIcon</span>
      </article>

      <article>
        <dile-icon id="addIcon"></dile-icon>
        <span>addIcon</span>
      </article>

      <article>
        <dile-icon id="announcementIcon"></dile-icon>
        <span>announcementIcon</span>
      </article>

      <article>
        <dile-icon id="appsIcon"></dile-icon>
        <span>appsIcon</span>
      </article>

      <article>
        <dile-icon id="arrowDropDownIcon"></dile-icon>
        <span>arrowDropDownIcon</span>
      </article>

      <article>
        <dile-icon id="arrowDropUpIcon"></dile-icon>
        <span>arrowDropUpIcon</span>
      </article>

      <article>
        <dile-icon id="arrowRightIcon"></dile-icon>
        <span>arrowRightIcon</span>
      </article>

      <article>
        <dile-icon id="attachFileIcon"></dile-icon>
        <span>attachFileIcon</span>
      </article>

      <article>
        <dile-icon id="attachmentIcon"></dile-icon>
        <span>attachmentIcon</span>
      </article>

      <article>
        <dile-icon id="autoAwesomeIcon"></dile-icon>
        <span>autoAwesomeIcon</span>
      </article>

      <article>
        <dile-icon id="calendarIcon"></dile-icon>
        <span>calendarIcon</span>
      </article>

      <article>
        <dile-icon id="checkboxBlankIcon"></dile-icon>
        <span>checkboxBlanckIcon</span>
      </article>

      <article>
        <dile-icon id="checkboxCheckedIcon"></dile-icon>
        <span>checkboxCheckedIcon</span>
      </article>

      <article>
        <dile-icon id="circleIcon"></dile-icon>
        <span>circleIcon</span>
      </article>

      <article>
        <dile-icon id="circleBorderIcon"></dile-icon>
        <span>circleBorderIcon</span>
      </article>

      <article>
        <dile-icon id="clearIcon"></dile-icon>
        <span>clearIcon</span>
      </article>

      <article>
        <dile-icon id="closeIcon"></dile-icon>
        <span>closeIcon</span>
      </article>

      <article>
        <dile-icon id="codeIcon"></dile-icon>
        <span>codeIcon</span>
      </article>

      <article>
        <dile-icon id="cookieIcon"></dile-icon>
        <span>cookieIcon</span>
      </article>

      <article>
        <dile-icon id="cropIcon"></dile-icon>
        <span>cropIcon</span>
      </article>

      <article>
        <dile-icon id="deleteIcon"></dile-icon>
        <span>deleteIcon</span>
      </article>

      <article>
        <dile-icon id="descriptionIcon"></dile-icon>
        <span>descriptionIcon</span>
      </article>

      <article>
        <dile-icon id="doneIcon"></dile-icon>
        <span>doneIcon</span>
      </article>

      <article>
        <dile-icon id="doubleArrowLeftIcon"></dile-icon>
        <span>doubleArrowLeftIcon</span>
      </article>

      <article>
        <dile-icon id="doubleArrowRightIcon"></dile-icon>
        <span>doubleArrowRightIcon</span>
      </article>

      <article>
        <dile-icon id="downloadIcon"></dile-icon>
        <span>downloadIcon</span>
      </article>

      <article>
        <dile-icon id="eastIcon"></dile-icon>
        <span>eastIcon</span>
      </article>

      <article>
        <dile-icon id="editIcon"></dile-icon>
        <span>editIcon</span>
      </article>

      <article>
        <dile-icon id="emailIcon"></dile-icon>
        <span>emailIcon</span>
      </article>

      <article>
        <dile-icon id="euroIcon"></dile-icon>
        <span>euroIcon</span>
      </article>

      <article>
        <dile-icon id="favoriteIcon"></dile-icon>
        <span>favoriteIcon</span>
      </article>

      <article>
        <dile-icon id="filterIcon"></dile-icon>
        <span>filterIcon</span>
      </article>

      <article>
        <dile-icon id="filterListIcon"></dile-icon>
        <span>filterListIcon</span>
      </article>

      <article>
        <dile-icon id="folderIcon"></dile-icon>
        <span>folderIcon</span>
      </article>

      <article>
        <dile-icon id="folderZipIcon"></dile-icon>
        <span>folderZipIcon</span>
      </article>

      <article>
        <dile-icon id="formatAlignCenterIcon"></dile-icon>
        <span>formatAlignCenterIcon</span>
      </article>

      <article>
        <dile-icon id="formatAlignLeftIcon"></dile-icon>
        <span>formatAlignLeftIcon</span>
      </article>

      <article>
        <dile-icon id="formatAlignRightIcon"></dile-icon>
        <span>formatAlignRightIcon</span>
      </article>

      <article>
        <dile-icon id="formatBoldIcon"></dile-icon>
        <span>formatBoldIcon</span>
      </article>

      <article>
        <dile-icon id="formatColorTextIcon"></dile-icon>
        <span>formatColorTextIcon</span>
      </article>

      <article>
        <dile-icon id="formatIndentDecreaseIcon"></dile-icon>
        <span>formatIndentDecreaseIcon</span>
      </article>

      <article>
        <dile-icon id="formatIndentIncreaseIcon"></dile-icon>
        <span>formatIndentIncreaseIcon</span>
      </article>

      <article>
        <dile-icon id="formatItalicIcon"></dile-icon>
        <span>formatItalicIcon</span>
      </article>

      <article>
        <dile-icon id="formatListBulletedIcon"></dile-icon>
        <span>formatListBulletedIcon</span>
      </article>

      <article>
        <dile-icon id="formatListNumberedIcon"></dile-icon>
        <span>formatListNumberedIcon</span>
      </article>

      <article>
        <dile-icon id="formatQuoteIcon"></dile-icon>
        <span>formatQuoteIcon</span>
      </article>

      <article>
        <dile-icon id="formatUnderlinedIcon"></dile-icon>
        <span>formatUnderlinedIcon</span>
      </article>

      <article>
        <dile-icon id="helpIcon"></dile-icon>
        <span>helpIcon</span>
      </article>

      <article>
        <dile-icon id="homeIcon"></dile-icon>
        <span>homeIcon</span>
      </article>

      <article>
        <dile-icon id="imageIcon"></dile-icon>
        <span>imageIcon</span>
      </article>

      <article>
        <dile-icon id="infoIcon"></dile-icon>
        <span>infoIcon</span>
      </article>

      <article>
        <dile-icon id="insertLinkIcon"></dile-icon>
        <span>insertLinkIcon</span>
      </article>

      <article>
        <dile-icon id="insertPhotoIcon"></dile-icon>
        <span>insertPhotoIcon</span>
      </article>

      <article>
        <dile-icon id="labelIcon"></dile-icon>
        <span>labelIcon</span>
      </article>

      <article>
        <dile-icon id="lightbulbIcon"></dile-icon>
        <span>lightbulbIcon</span>
      </article>

      <article>
        <dile-icon id="linkOffIcon"></dile-icon>
        <span>linkOffIcon</span>
      </article>

      <article>
        <dile-icon id="listIcon"></dile-icon>
        <span>listIcon</span>
      </article>

      <article>
        <dile-icon id="loginIcon"></dile-icon>
        <span>loginIcon</span>
      </article>

      <article>
        <dile-icon id="logoutIcon"></dile-icon>
        <span>logoutIcon</span>
      </article>

      <article>
        <dile-icon id="moreIcon"></dile-icon>
        <span>moreIcon</span>
      </article>

      <article>
        <dile-icon id="moreVertIcon"></dile-icon>
        <span>moreVertIcon</span>
      </article>

      <article>
        <dile-icon id="newReleasesIcon"></dile-icon>
        <span>newReleasesIcon</span>
      </article>

      <article>
        <dile-icon id="notesIcon"></dile-icon>
        <span>notesIcon</span>
      </article>

      <article>
        <dile-icon id="notificationsIcon"></dile-icon>
        <span>notificationsIcon</span>
      </article>

      <article>
        <dile-icon id="openWithIcon"></dile-icon>
        <span>openWithIcon</span>
      </article>

      <article>
        <dile-icon id="paidIcon"></dile-icon>
        <span>paidIcon</span>
      </article>

      <article>
        <dile-icon id="paletteIcon"></dile-icon>
        <span>paletteIcon</span>
      </article>

      <article>
        <dile-icon id="panToolIcon"></dile-icon>
        <span>panToolIcon</span>
      </article>

      <article>
        <dile-icon id="pdfIcon"></dile-icon>
        <span>pdfIcon</span>
      </article>

      <article>
        <dile-icon id="photoCameraIcon"></dile-icon>
        <span>photoCameraIcon</span>
      </article>

      <article>
        <dile-icon id="priorityHighIcon"></dile-icon>
        <span>priorityHighIcon</span>
      </article>

      <article>
        <dile-icon id="questionAnswerIcon"></dile-icon>
        <span>questionAnswerIcon</span>
      </article>

      <article>
        <dile-icon id="radioCheckedIcon"></dile-icon>
        <span>radioCheckedIcon</span>
      </article>

      <article>
        <dile-icon id="receiptIcon"></dile-icon>
        <span>receiptIcon</span>
      </article>

      <article>
        <dile-icon id="receiptLongIcon"></dile-icon>
        <span>receiptLongIcon</span>
      </article>

      <article>
        <dile-icon id="redoIcon"></dile-icon>
        <span>redoIcon</span>
      </article>

      <article>
        <dile-icon id="refreshIcon"></dile-icon>
        <span>refreshIcon</span>
      </article>

      <article>
        <dile-icon id="rotateLeftIcon"></dile-icon>
        <span>rotateLeftIcon</span>
      </article>

      <article>
        <dile-icon id="rotateRightIcon"></dile-icon>
        <span>rotateRightIcon</span>
      </article>

      <article>
        <dile-icon id="saveIcon"></dile-icon>
        <span>saveIcon</span>
      </article>

      <article>
        <dile-icon id="scaleIcon"></dile-icon>
        <span>scaleIcon</span>
      </article>

      <article>
        <dile-icon id="searchIcon"></dile-icon>
        <span>searchIcon</span>
      </article>

      <article>
        <dile-icon id="settingsIcon"></dile-icon>
        <span>settingsIcon</span>
      </article>

      <article>
        <dile-icon id="shoppingCartIcon"></dile-icon>
        <span>shoppingCartIcon</span>
      </article>

      <article>
        <dile-icon id="sortIcon"></dile-icon>
        <span>sortIcon</span>
      </article>

      <article>
        <dile-icon id="starIcon"></dile-icon>
        <span>starIcon</span>
      </article>

      <article>
        <dile-icon id="starBorderIcon"></dile-icon>
        <span>starBorderIcon</span>
      </article>

      <article>
        <dile-icon id="starHalfIcon"></dile-icon>
        <span>starHalfIcon</span>
      </article>

      <article>
        <dile-icon id="swapIcon"></dile-icon>
        <span>swapIcon</span>
      </article>

      <article>
        <dile-icon id="switchLeftIcon"></dile-icon>
        <span>switchLeftIcon</span>
      </article>

      <article>
        <dile-icon id="textFieldsIcon"></dile-icon>
        <span>textFieldsIcon</span>
      </article>

      <article>
        <dile-icon id="thumbUpIcon"></dile-icon>
        <span>thumbUpIcon</span>
      </article>

      <article>
        <dile-icon id="thumbDownIcon"></dile-icon>
        <span>thumbDownIcon</span>
      </article>

      <article>
        <dile-icon id="timerIcon"></dile-icon>
        <span>timerIcon</span>
      </article>

      <article>
        <dile-icon id="tuneIcon"></dile-icon>
        <span>tuneIcon</span>
      </article>

      <article>
        <dile-icon id="undoIcon"></dile-icon>
        <span>undoIcon</span>
      </article>

      <article>
        <dile-icon id="uploadIcon"></dile-icon>
        <span>uploadIcon</span>
      </article>

      <article>
        <dile-icon id="videocamIcon"></dile-icon>
        <span>videocamIcon</span>
      </article>

      <article>
        <dile-icon id="warningIcon"></dile-icon>
        <span>warningIcon</span>
      </article>

      <article>
        <dile-icon id="zoomInIcon"></dile-icon>
        <span>zoomInIcon</span>
      </article>

      <article>
        <dile-icon id="zoomOutIcon"></dile-icon>
        <span>zoomOutIcon</span>
      </article>

      <article>
        <dile-icon id="zoomOutMapIcon"></dile-icon>
        <span>zoomOutMapIcon</span>
      </article>
    </div>
    `
  }
  
  firstUpdated() {
    // All this assignations should not be necessary but the component to show the demo does not work well with interpoplation of strings
    this.shadowRoot.getElementById('accountIcon').icon = accountIcon;
    this.shadowRoot.getElementById('addIcon').icon = addIcon;
    this.shadowRoot.getElementById('announcementIcon').icon = announcementIcon;
    this.shadowRoot.getElementById('appsIcon').icon = appsIcon;
    this.shadowRoot.getElementById('arrowDropDownIcon').icon = arrowDropDownIcon;
    this.shadowRoot.getElementById('arrowDropUpIcon').icon = arrowDropUpIcon;
    this.shadowRoot.getElementById('arrowRightIcon').icon = arrowRightIcon;
    this.shadowRoot.getElementById('attachFileIcon').icon = attachFileIcon;
    this.shadowRoot.getElementById('attachmentIcon').icon = attachmentIcon;
    this.shadowRoot.getElementById('autoAwesomeIcon').icon = autoAwesomeIcon;
    this.shadowRoot.getElementById('calendarIcon').icon = calendarIcon;
    this.shadowRoot.getElementById('checkboxBlankIcon').icon = checkboxBlankIcon;
    this.shadowRoot.getElementById('checkboxCheckedIcon').icon = checkboxCheckedIcon;
    this.shadowRoot.getElementById('circleIcon').icon = circleIcon;
    this.shadowRoot.getElementById('circleBorderIcon').icon = circleBorderIcon;
    this.shadowRoot.getElementById('clearIcon').icon = clearIcon;
    this.shadowRoot.getElementById('closeIcon').icon = closeIcon;
    this.shadowRoot.getElementById('codeIcon').icon = codeIcon;
    this.shadowRoot.getElementById('cookieIcon').icon = cookieIcon;
    this.shadowRoot.getElementById('cropIcon').icon = cropIcon;
    this.shadowRoot.getElementById('deleteIcon').icon = deleteIcon;
    this.shadowRoot.getElementById('descriptionIcon').icon = descriptionIcon;
    this.shadowRoot.getElementById('doneIcon').icon = doneIcon;
    this.shadowRoot.getElementById('doubleArrowLeftIcon').icon = doubleArrowLeftIcon;
    this.shadowRoot.getElementById('doubleArrowRightIcon').icon = doubleArrowRightIcon;
    this.shadowRoot.getElementById('downloadIcon').icon = downloadIcon;
    this.shadowRoot.getElementById('eastIcon').icon = eastIcon;
    this.shadowRoot.getElementById('editIcon').icon = editIcon;
    this.shadowRoot.getElementById('emailIcon').icon = emailIcon;
    this.shadowRoot.getElementById('euroIcon').icon = euroIcon;
    this.shadowRoot.getElementById('favoriteIcon').icon = favoriteIcon;
    this.shadowRoot.getElementById('filterIcon').icon = filterIcon;
    this.shadowRoot.getElementById('filterListIcon').icon = filterListIcon;
    this.shadowRoot.getElementById('folderIcon').icon = folderIcon;
    this.shadowRoot.getElementById('folderZipIcon').icon = folderZipIcon;
    this.shadowRoot.getElementById('formatAlignCenterIcon').icon = formatAlignCenterIcon;
    this.shadowRoot.getElementById('formatAlignLeftIcon').icon = formatAlignLeftIcon;
    this.shadowRoot.getElementById('formatAlignRightIcon').icon = formatAlignRightIcon;
    this.shadowRoot.getElementById('formatBoldIcon').icon = formatBoldIcon;
    this.shadowRoot.getElementById('formatColorTextIcon').icon = formatColorTextIcon;
    this.shadowRoot.getElementById('formatIndentDecreaseIcon').icon = formatIndentDecreaseIcon;
    this.shadowRoot.getElementById('formatIndentIncreaseIcon').icon = formatIndentIncreaseIcon;
    this.shadowRoot.getElementById('formatItalicIcon').icon = formatItalicIcon;
    this.shadowRoot.getElementById('formatListBulletedIcon').icon = formatListBulletedIcon;
    this.shadowRoot.getElementById('formatListNumberedIcon').icon = formatListNumberedIcon;
    this.shadowRoot.getElementById('formatQuoteIcon').icon = formatQuoteIcon;
    this.shadowRoot.getElementById('formatUnderlinedIcon').icon = formatUnderlinedIcon;
    this.shadowRoot.getElementById('helpIcon').icon = helpIcon;
    this.shadowRoot.getElementById('homeIcon').icon = homeIcon;
    this.shadowRoot.getElementById('imageIcon').icon = imageIcon;
    this.shadowRoot.getElementById('infoIcon').icon = infoIcon;
    this.shadowRoot.getElementById('insertLinkIcon').icon = insertLinkIcon;
    this.shadowRoot.getElementById('insertPhotoIcon').icon = insertPhotoIcon;
    this.shadowRoot.getElementById('labelIcon').icon = labelIcon;
    this.shadowRoot.getElementById('lightbulbIcon').icon = lightbulbIcon;
    this.shadowRoot.getElementById('linkOffIcon').icon = linkOffIcon;
    this.shadowRoot.getElementById('listIcon').icon = listIcon;
    this.shadowRoot.getElementById('logoutIcon').icon = logoutIcon;
    this.shadowRoot.getElementById('loginIcon').icon = loginIcon;
    this.shadowRoot.getElementById('moreIcon').icon = moreIcon;
    this.shadowRoot.getElementById('moreVertIcon').icon = moreVertIcon;
    this.shadowRoot.getElementById('newReleasesIcon').icon = newReleasesIcon;
    this.shadowRoot.getElementById('notesIcon').icon = notesIcon;
    this.shadowRoot.getElementById('notificationsIcon').icon = notificationsIcon;
    this.shadowRoot.getElementById('openWithIcon').icon = openWithIcon;
    this.shadowRoot.getElementById('paidIcon').icon = paidIcon;
    this.shadowRoot.getElementById('panToolIcon').icon = panToolIcon;
    this.shadowRoot.getElementById('paletteIcon').icon = paletteIcon;
    this.shadowRoot.getElementById('pdfIcon').icon = pdfIcon;
    this.shadowRoot.getElementById('photoCameraIcon').icon = photoCameraIcon;
    this.shadowRoot.getElementById('priorityHighIcon').icon = priorityHighIcon;
    this.shadowRoot.getElementById('questionAnswerIcon').icon = questionAnswerIcon;
    this.shadowRoot.getElementById('radioCheckedIcon').icon = radioCheckedIcon;
    this.shadowRoot.getElementById('receiptIcon').icon = receiptIcon;
    this.shadowRoot.getElementById('receiptLongIcon').icon = receiptLongIcon;
    this.shadowRoot.getElementById('redoIcon').icon = redoIcon;
    this.shadowRoot.getElementById('refreshIcon').icon = refreshIcon;
    this.shadowRoot.getElementById('rotateLeftIcon').icon = rotateLeftIcon;
    this.shadowRoot.getElementById('rotateRightIcon').icon = rotateRightIcon;
    this.shadowRoot.getElementById('saveIcon').icon = saveIcon;
    this.shadowRoot.getElementById('scaleIcon').icon = scaleIcon;
    this.shadowRoot.getElementById('searchIcon').icon = searchIcon;
    this.shadowRoot.getElementById('settingsIcon').icon = settingsIcon;
    this.shadowRoot.getElementById('shoppingCartIcon').icon = shoppingCartIcon;
    this.shadowRoot.getElementById('sortIcon').icon = sortIcon;
    this.shadowRoot.getElementById('starIcon').icon = starIcon;
    this.shadowRoot.getElementById('starBorderIcon').icon = starBorderIcon;
    this.shadowRoot.getElementById('starHalfIcon').icon = starHalfIcon;
    this.shadowRoot.getElementById('swapIcon').icon = swapIcon;
    this.shadowRoot.getElementById('switchLeftIcon').icon = switchLeftIcon;
    this.shadowRoot.getElementById('textFieldsIcon').icon = textFieldsIcon;
    this.shadowRoot.getElementById('thumbUpIcon').icon = thumbUpIcon;
    this.shadowRoot.getElementById('thumbDownIcon').icon = thumbDownIcon;
    this.shadowRoot.getElementById('timerIcon').icon = timerIcon;
    this.shadowRoot.getElementById('tuneIcon').icon = tuneIcon;
    this.shadowRoot.getElementById('undoIcon').icon = undoIcon;
    this.shadowRoot.getElementById('uploadIcon').icon = uploadIcon;
    this.shadowRoot.getElementById('videocamIcon').icon = videocamIcon;
    this.shadowRoot.getElementById('warningIcon').icon = warningIcon;
    this.shadowRoot.getElementById('zoomInIcon').icon = zoomInIcon;
    this.shadowRoot.getElementById('zoomOutIcon').icon = zoomOutIcon;
    this.shadowRoot.getElementById('zoomOutMapIcon').icon = zoomOutMapIcon;
  }
}
customElements.define('my-component', MyComponent);
export const JsStory = () => html`<my-component></my-component>`;
```
