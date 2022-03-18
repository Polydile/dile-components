import {html,css, LitElement} from 'lit';

export class DileDateWithoutCalendar extends LitElement {

  static get properties() {
    return {
      options: { type: Object },
      value: { type: String },
      isPopupOpen: { type: Boolean },
      disabled: { type: Boolean },
      readonly: { type: Boolean }
    };
  }

  static get styles() {
    return [css `      
        :host {
          display: inline-block;
          position: relative;
        }
        
        :host([disabled]) { /* style when host has disabled attribute. */
          background-color: #F0F0F0;
        }
        
        :host([disabled]), :host([readonly]){
            opacity: .6;        
        }

        :host([disabled]) {
          -moz-user-select: none;
          pointer-events: none;
        }
        
        .datetime-input-box-wrapper {
          
          display: inline-block;
          vertical-align: middle;
          
          font-size: 13px;
          letter-spacing: 1px;
          
          padding: .125rem;
          background-clip: padding-box;
          border-style: solid;
          border-width: var(--dileDateWithoutCalendar-Inputbox-border-width, 1px);
          border-color: var(--dileDateWithoutCalendar-Inputbox-border-color, #7A7A7A);
          
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          
          cursor: default;
          
          background-color:  var(--dileDateWithoutCalendar-Inputbox-background-color, transparent);
          color: var(--dileDateWithoutCalendar-Inputbox-text-color, currentColor);
          
        }
        
        .box-wrapper-focus {
          
          border-color: var(--dileDateWithoutCalendar-InputboxFocus-border-color, rgba(43,58,66,0.17));
          box-shadow: 0 0 0 var(--dileDateWithoutCalendar-InputboxFocus-box-shadow-width, .1rem) var(--dileDateWithoutCalendar-InputboxFocus-box-shadow, rgba(43,58,66,0.25));
          outline: 0;
          
        }
        
        .box-wrapper-err {
          
          border-color: var(--dileDateWithoutCalendar-InputboxErr-border-color, rgba(244,67,54));
          box-shadow: 0 0 0 var(--dileDateWithoutCalendar-InputboxErr-box-shadow-width, .1rem) var(--dileDateWithoutCalendar-InputboxErr-shadow, rgba(244,67,54,.25));
          outline: 0;
              
        }
        
        .datetime-input-edit-wrapper {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          vertical-align: middle;
        }
        
        .datetime-edit-field {
        
          display: inline-block;
          text-align: center;
          padding: 1px 2px;
          vertical-align: middle;
          cursor: pointer;
          
          color: var(--dileDateWithoutCalendar-field-color, currentColor);
        
        }
        
        .datetime-edit-field{
          outline: 0;
        }
        
        .datetime-edit-field:focus  {
        
          background-color: var(--dileDateWithoutCalendar-field-background-color, #2792FF);
          color: var(--dileDateWithoutCalendar-field-text-color, #FFF);
          
        }
        
        :host([disabled]) .datetime-edit-field:focus {
        
            background: none;
            color: inherit;
            
        }
        
        .datetime-reset-button:hover {
          
          opacity: 1;
          
        }
        
        .datetime-reset-button-svg{
            height: 12px;
            width: 12px;
            z-index: -1;
        }
        
        .datetime-reset-button-svg, .datetime-down-button-svg{
            fill: var(--dileDateWithoutCalendar-buttons-color, currentColor);
        } 
        
        .datetime-reset-button {
        
          display: inline-block;
          vertical-align: middle;
          height: 16px;
          width: 16px;

          opacity: .5;
          background-color: transparent;
          border: none;
          margin: 0 2px;
          padding: 0;
          cursor: pointer;
          outline: 0;
          
        }
        
        .separate{
          
          display: inline-block;
          margin: -1px 0 -1px;
          vertical-align: middle;
          
        }
        
        [upbutton]:hover, [downbutton]:hover {
            opacity: 1;
        }
        
        [upbutton], [downbutton] {
        
          position: absolute;
          background-color: transparent;
          padding: 0;
          cursor: pointer;
          opacity: .5;
          right: 2px;
          border: none;
          height: 25px;
          width: 12px;
        
        }
        
        .upbutton-svg, .downbutton-svg{
            
            position: relative;
            height: 16px;
            width: 16px;
            left: -3px;
            z-index: -1;
            fill: var(--dileDateWithoutCalendar-PopupButtons-color, currentColor);
        }
        
        [upbutton] {
            top: 0;
        }
        
        [downbutton]{
            bottom: 0;
        }
        
        .datetime-down-button:hover{
        
          opacity: 1;
          
        }
        
        .datetime-down-button {
          
          display: inline-block;
          vertical-align: middle;
          background-color: transparent;
          
          width: 16px;
          height: 16px;
          
          padding: 0;
          cursor: pointer;
          
          border-left: 1px solid var(--dileDateWithoutCalendar-Inputbox-border-color, #999);
          
          border-bottom: none;
          border-top: none;
          border-right: none;
          opacity: .5;
          outline: 0;
          
        }
        
        .datetime-down-button-svg{
            height: 16px;
            width: 16px;
            z-index: -1;
        }
        
        .datetime-popup.show{
            
            opacity: 1;
            height: auto;
        
        }
      
        .datetime-popup {
            
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            display: flex;
            height: 40px;
            
            transition: all 0.1s ease-in-out;
            -webkit-transition: all 0.1s ease-in-out;
            opacity: 0;
                        
            padding: 5px;
            margin: 8px 0 0;
            list-style: none;
            background-color: var(--dileDateWithoutCalendar-Popup-background-color, #fff);
            border: 1px solid #A0A0A0;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
            background-clip: padding-box;
            
        }
        
        .datetime-popup::after {
          
          content: '';
          display: inline-block;
          border-left: 9px solid transparent;
          border-right: 9px solid transparent;
          border-bottom: 9px solid var(--dileDateWithoutCalendar-Popup-background-color, #fff);
          position: absolute;
          top: -9px;
          left: 6px;
          
        }
        
        .datetime-popup::before {
    
          content: '';
          display: inline-block;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid #A0A0A0;
          position: absolute;
          top: -10px;
          left: 5px;
          
        }
        
        [datetimeScrollField]{
            
            height: 100%;
            
        }
        
        [datetimeScrollField]#day{
            min-width: var(--dileDateWithoutCalendar-PopupFieldDay-min-width, auto);
        }
        
        [datetimeScrollField]#day .datetime-field {
            text-align: var(--dileDateWithoutCalendar-PopupFieldDay-text-align, center);
        }
        
        [datetimeScrollField]#month{
            min-width: var(--dileDateWithoutCalendar-PopupFieldMonth-min-width, auto);
        }
        
        [datetimeScrollField]#month .datetime-field{
            text-align: var(--dileDateWithoutCalendar-PopupFieldMonth-text-align, center);
        }
        
        [datetimeScrollField]#year{
            min-width: var(--dileDateWithoutCalendar-PopupFieldYear-min-width, auto);
        }
        
        [datetimeScrollField]#year .datetime-field{
            text-align: var(--dileDateWithoutCalendar-PopupFieldYear-text-align, center);
        }
        
        
        
        .datetime-scroll-box-wrapper:hover{
            
          border-color: var(--dileDateWithoutCalendar-PopupFieldBox-hover-border-color, rgba(130,190,255,0.17));
          box-shadow: 0 0 0 var(--dileDateWithoutCalendar-PopupFieldBox-shadow-width, .1rem) var(--dileDateWithoutCalendar-PopupFieldBox-hover-box-shadow, rgba(0,123,255,.25));
          
        }
        
        
        .datetime-scroll-box-wrapper{
            
            display: block;
            position: relative;
            border: 1px solid transparent;
            overflow: hidden;
            
        } 
        
        .datetime-popup-wrapper{
            display: flex;
        }
        
        .scroll-field-tag {
        
            display: block;
            text-align: center;
            margin-bottom: 5px;
            font-weight: var(--dileDateWithoutCalendar-PopupfieldTag-font-weight, bold);
            color: var(--dileDateWithoutCalendar-PopupfieldTag-text-color, currentColor);
            
        }
        
        .datetime-field {
        
            height: 25px;
            line-height: 25px;
            padding-right: 16px;
            padding-left: 10px;
            font-size: var(--dileDateWithoutCalendar-Popupfield-font-size, 12px);
            color: var(--dileDateWithoutCalendar-Popupfield-text-color, #000);
        
        }
        
        .datetime-field:hover, .datetime-field.active{
            cursor: pointer;
        }
        
        .datetime-field:hover {
        
          background-color: var(--dileDateWithoutCalendar-Popupfield-hover-background-color, #2792FF);
          color: var(--dileDateWithoutCalendar-Popupfield-hover-text-color, #FFF);
        
        }
 
        .datetime-field.active{
        
          background-color: var(--dileDateWithoutCalendar-Popupfield-active-background-color, #2792FF);
          color: var(--dileDateWithoutCalendar-Popupfield-active-text-color, #FFF);
          cursor: pointer;
        
        }
        
    `];
  }

  render() {

    return html `
    <div class="datetime-input-box-wrapper">
        <div class="datetime-input-edit-wrapper">
            <span class="datetime-edit-field" editfield id="day">${this.day}</span>
            <span class="separate"≯</span>
            <span class="datetime-edit-field" editfield id="month">${this.month}</span>
            <span class="separate"≯</span>
            <span class="datetime-edit-field" editfield id="year">${this.year}</span>
        </div><button class="datetime-reset-button" id="resetButton" aria-label="Clear All" @click="${this.resetButton}">
            <svg xmlns="http://www.w3.org/2000/svg" class="datetime-reset-button-svg"><path d="M 3.9,3 3,3.9 5.1,6 3,8.1 3.9,9 6,6.9 8.1,9 9,8.1 6.9,6 9,3.9 8.1,3 6,5.1 Z M 12,6 A 6,6 0 0 1 6,12 6,6 0 0 1 0,6 6,6 0 0 1 6,0 6,6 0 0 1 12,6 Z" /></svg>
        </button>
        <button class="datetime-down-button" id="showPopupButton" aria-label="Show Popup" @click="${this.openDateTimePopup}">
            <svg version="1.1" class="datetime-down-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493.258 493.258"><g><path d="M131.564,219.258h230.13c9.314,0,17.857-5.16,22.203-13.389c4.34-8.246,3.769-18.193-1.494-25.895 L265.92,9.772C261.75,3.68,254.846,0.033,247.461,0c-7.377-0.018-14.303,3.584-18.507,9.658L110.935,179.863 c-5.319,7.668-5.938,17.664-1.607,25.941C113.659,214.067,122.225,219.258,131.564,219.258z"/><path d="M361.694,273.998h-230.13c-9.339,0-17.905,5.193-22.236,13.455c-4.331,8.277-3.711,18.273,1.607,25.939 l118.019,170.205c4.204,6.074,11.13,9.676,18.507,9.66c7.385-0.031,14.289-3.682,18.459-9.772l116.483-170.205 c5.263-7.699,5.834-17.648,1.494-25.895C379.551,279.158,371.008,273.998,361.694,273.998z"/></g></svg>
        </button>
        ${ this.isPopupOpen 
        ? html `
        
        <div class="datetime-popup">
          <div class="datetime-popup-wrapper">
              
              <div class="scroll-field">
              
                ${ this.options.locale.daysTag 
                    ? html `<span class="scroll-field-tag">${this.options.locale.daysTag}</span>`  : '' }
              
                <div class="datetime-scroll-box-wrapper">
                   
                    ${this.upButtonTemplate}

                    ${this.downButtonTemplate}
                
                     <div datetimeScrollField tabindex="0" id="day">
                    
                        ${this.fieldPopupday.map(data => html `<div class="datetime-field${data.active ? ' active' : ''}" datetimefield="${data.value}">${data.tag}</div>`)}                  
                    
                    </div>
                    
                </div>
              </div>
              
              <div class="scroll-field">
                
                ${ this.options.locale.monthsTag
                    ? html `<span class="scroll-field-tag">${this.options.locale.monthsTag}</span>`  : '' }
                
                <div class="datetime-scroll-box-wrapper">
                
                    ${this.upButtonTemplate}
                    ${this.downButtonTemplate}
                    
                    <div datetimeScrollField tabindex="0" id="month">
                        
                        ${this.fieldPopupmonth.map(data => html `<div class="datetime-field${data.active ? ' active' : ''}" datetimefield="${data.value}">${data.tag}</div>`)}
                    
                    </div>
                    
                </div>
              
              </div>
              
              <div class="scroll-field">
                
                ${ this.options.locale.yearsTag
                  ? html `<span class="scroll-field-tag">${this.options.locale.yearsTag}</span>`  : '' }

                <div class="datetime-scroll-box-wrapper" id="datePopupFieldYear">
                
                    ${this.upButtonTemplate}

                    ${this.downButtonTemplate}
                    
                    <div datetimeScrollField tabindex="0" id="year">
                    
                         ${this.fieldPopupyear.map(data => html `<div class="datetime-field${data.active ? ' active' : ''}" datetimefield="${data.value}">${data.tag}</div>`)}
                    
                    </div>
                  </div>
                  
              </div>
  
          </div>
        </div>
        ` 
        : ''}
    </div>`;

  }

  get upButtonTemplate() {
    return html`
      <button upbutton>
        <svg version="1.1" class="upbutton-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493.258 493.258"><g><path d="M131.564,219.258h230.13c9.314,0,17.857-5.16,22.203-13.389c4.34-8.246,3.769-18.193-1.494-25.895 L265.92,9.772C261.75,3.68,254.846,0.033,247.461,0c-7.377-0.018-14.303,3.584-18.507,9.658L110.935,179.863 c-5.319,7.668-5.938,17.664-1.607,25.941C113.659,214.067,122.225,219.258,131.564,219.258z"/></g></svg>
      </button>
    `;
  }

  get downButtonTemplate() {
    return html`
      <button downbutton>
        <svg version="1.1" class="downbutton-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493.258 493.258"><g><path d="M361.694,273.998h-230.13c-9.339,0-17.905,5.193-22.236,13.455c-4.331,8.277-3.711,18.273,1.607,25.939 l118.019,170.205c4.204,6.074,11.13,9.676,18.507,9.66c7.385-0.031,14.289-3.682,18.459-9.772l116.483-170.205 c5.263-7.699,5.834-17.648,1.494-25.895C379.551,279.158,371.008,273.998,361.694,273.998z"/></g></svg>
      </button>
    `
  }

  constructor(){
    super();

    this.isPopupOpen = false;
    this._active = false;
    this.init = false;

    // Determina el selector para el box Wrapper al que se le va a color un borde de foco
    // cuando alguna casilla es seleccionada, por defecto es .datetime-input-box-wrapper
    this.boxWrapSelector = '.datetime-input-box-wrapper';

    this.value = '';
    this.disabled = false;
    this.readonly = false;

    this.dayMask = 'dd';
    this.monthMask = 'mm';
    this.yearMask = 'aaaa';

    this.maxLengthyear = 5;
    this.maxLengthmonth = 2;
    this.maxLengthday = 2;

    this.minLengthyear = 4;
    this.minLengthmonth = this.minLengthday = 2;

    this.minmonth = 1;
    this.maxmonth = 12;
    this.minday = 1;
    this.maxday = 31;
    this.minyear = 1;

    this.maxyear = 99999;

    this.monthPageUpDown = 3;
    this.dayPageUpDown = 7;
    this.yearPageUpDown = 10;
    this.keypress.buffer = {};

    this.fieldPopupyear = this.fieldPopupmonth = this.fieldPopupday = [];

    this.day = this.dayMask;
    this.month = this.monthMask;
    this.year = this.yearMask;

    // Eventos
    this._keydown = (event) => {

      const target = this.originalTarget(event), field = target.getAttribute('id');

      (field === 'year' || field === 'month' || field === 'day') && this.keypress(event, event.key, field);

    };
    this._fnBlur = (event) =>(event.otarget = this.originalTarget(event), this.fieldBlur(event));
    this._fnFocus = (event) =>{

      this.isPopupOpen && this.closeDateTimePopup();

      event.otarget = this.originalTarget(event);
      this.fieldFocus(event);

    };
    this._datePopupFieldMousewheel = (event) => {

      event.stopPropagation();
      event.preventDefault();

      let deltaY = -1 * event.deltaY;

      let target = this.originalTarget(event), active = false, field = '';

      if (target.hasAttribute('editfield')){

        if (target.classList.contains('active')) {

          active = target.classList.contains('active');
          field = target.getAttribute('id')

        } else if (this.shadowRoot.querySelector('.datetime-edit-field.active')) {

          active = true;
          field = this.shadowRoot.querySelector('.datetime-edit-field.active').getAttribute('id');

        }

      } else if (target.parentElement && target.parentElement.getAttribute('id') && target.hasAttribute('datetimefield')) {

        active = true;
        field = target.parentElement.getAttribute('id');

      }else if(target.parentElement && (target.hasAttribute('downbutton') || target.hasAttribute('upbutton'))){

        const parent = target.parentElement;

        if(parent.querySelector('[datetimeScrollField]') && parent.querySelector('[datetimeScrollField]').getAttribute('id')){

          active = true;
          field = parent.querySelector('[datetimeScrollField]').getAttribute('id');

        }

      }

      if(active && (field === 'year' || field === 'month' || field === 'day')){

        if(deltaY < 0){

          this.incrementFieldValue(field, -1);

        }else{

          this.incrementFieldValue(field, 1);

        }

      }

    };

    this._arrowScrollPopupMousedown = (event)=>{

      const target = this.originalTarget(event);

      if(target.parentElement && (target.hasAttribute('downbutton') || target.hasAttribute('upbutton'))){

        let parent = target.parentElement, datetimeScrollField = parent.querySelector('[datetimeScrollField]'), field = null;
        datetimeScrollField && (field = datetimeScrollField.getAttribute('id'));

        if(field){

          let incre;

          if(target.hasAttribute('downbutton')){

            incre = -1;

            this.incrementFieldValue(field, incre);
            this.arrowScroll(incre);

          }else if(target.hasAttribute('upbutton')){

            incre = 1;

            this.incrementFieldValue(field, incre);


          }else{

            return;

          }

          this.arrowScroll.onPress = true;
          this.arrowScroll(field, incre);

        }
      }
    };

    this._arrowScrollPopupMouseup = (event)=>(this.arrowScroll.onPress = false, (this.arrowScroll.timeout = 200),clearTimeout(this.arrowScroll.timerepeat));
    this._documentClick = (event) =>{

      const target = this.originalTarget(event);

      if(event.target === this){

        let value, field;

        this.isNotOperate() ||(this._active = true);

        // click en los flield Popup
        if (target.parentElement && target.parentElement.getAttribute('id') && target.hasAttribute('datetimefield')) {

          value = target.getAttribute('datetimefield');
          field = target.parentElement.getAttribute('id');

          this.setFieldValue(field, value);

          if(field === 'day' && (this.day !== this.dayMask &&  this.month !== this.monthMask && this.year !== this.yearMask )){

            moment(`${this.year}-${this.month}-${this.day}`, 'YYYYY-MM-DD').isValid() && (this.closeDateTimePopup());

          }

        }

      }else if(this._active){

        this._active = false;
        this.isPopupOpen && this.closeDateTimePopup();

        if( this.day !== this.dayMask &&  this.month !== this.monthMask && this.year !== this.yearMask ){

          const momentObj = moment(`${this.year}-${this.month}-${this.day}`, 'YYYYY-MM-DD');

          this.validate(momentObj);

        }

      }

    };

    this._documentBlur = (event) =>{

      if(event.target !== this) {

        if (this._active) {

          this._active = false;
          this.isPopupOpen && this.closeDateTimePopup();

        }

      }

    };

    this._documentKeydown = (event) => {

      if(this._active && event.key === 'Escape'){

        this._active = false;
        this.isPopupOpen && this.closeDateTimePopup();

      }

    };

    // funcion que incrementa segun el click en las flechitas del scroll del Popup
    this.arrowScroll = (field, incre)=>{

      this.arrowScroll.timeout || (this.arrowScroll.timeout = 200);

      clearTimeout(this.arrowScroll.timerepeat);

      if(this.arrowScroll.onPress) {

        this.arrowScroll.timerepeat = setTimeout(() => ((this.arrowScroll.timeout = 110), this.arrowScroll(field, incre), this.incrementFieldValue(field, incre)), this.arrowScroll.timeout);

      }

    };

  }

  connectedCallback() {
    super.connectedCallback();

    // Los idiomas y configuraciones
    this.options = {
      monthsNames: false,
      locale: {
        months: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        daysTag: 'Days',
        monthsTag: 'Months',
        yearsTag: 'Years'
      },
      ...this.options
    };

  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // se eliminan los eventos
    this.fields.forEach(obj =>{

      obj.removeEventListener('blur', this._fnBlur);
      obj.removeEventListener('blur', this._fnFocus);

    });

    this.removeEventListener('keydown', this._keydown);
    this.removeEventListener('wheel', this._datePopupFieldMousewheel);
    this.removeEventListener('mousewheel', this._datePopupFieldMousewheel);
    this.removeEventListener('DOMMouseScroll', this._datePopupFieldMousewheel);

    this.removeEventListener('mousedown', this._arrowScrollPopupMousedown);
    this.removeEventListener('mouseup', this._arrowScrollPopupMouseup);

    document.removeEventListener('click', this._documentClick);
    document.removeEventListener('blur', this._documentBlur);
    document.removeEventListener('keydown', this._documentKeydown);

    /*-----------------------------------------*/

  }

  firstUpdated(changedProperties) {
    super.firstUpdated();

    this.init = true;

    this.fields = this.shadowRoot.querySelectorAll('.datetime-edit-field');
    this.resetBtn = this.shadowRoot.getElementById('resetButton');
    this.showPopupBtn = this.shadowRoot.getElementById('showPopupButton');

    // Add Events
    this.addEventListener('keydown',  this._keydown, {passive: false});

    //Eventos para la rueda del mouse
    this.addEventListener('wheel', this._datePopupFieldMousewheel, {passive: false});
    this.addEventListener('mousewheel', this._datePopupFieldMousewheel, {passive: false});
    this.addEventListener('DOMMouseScroll', this._datePopupFieldMousewheel, {passive: false});


    this.addEventListener('mousedown', this._arrowScrollPopupMousedown, {passive: false});
    this.addEventListener('mouseup', this._arrowScrollPopupMouseup, {passive: false});

    this.fields.forEach(obj =>{

      obj.addEventListener('blur',  this._fnBlur);
      obj.addEventListener('focus',  this._fnFocus);

    });

    this.updateTabIndex();

    document.addEventListener('click', this._documentClick);
    document.addEventListener('blur', this._documentBlur);
    document.addEventListener('keydown',  this._documentKeydown);

    /* Add Events END -*/

    this._boxWrap = this.shadowRoot.querySelector(this.boxWrapSelector);

    this.setInputsValue();

  }

  attributeChangedCallback(name, old, value) {
    super.attributeChangedCallback(name, old, value);

    (name === 'disabled' || name === 'readonly') && this.updateTabIndex();

  }

  setInputsValue(){

    let value = this.value;
    if (!value) {
      return;
    }

    const date = moment(value, 'YYYYY-MM-DD');

    if(date.isValid()) {

      this.setFieldValue('year', date.format('YYYY'), true);
      this.setFieldValue('month', date.format('MM'), true);
      this.setFieldValue('day', date.format('DD'), true);

    }

  }

  setFieldValue(field, value, setInit = false) {

    let nField = this.shadowRoot.getElementById(field), change = false;

    nField.setAttribute('value', value);

    nField.value !== value && !setInit && (change = true);
    nField.value = this[field] = value;

    change && (this.onChange());

    if( this._boxWrap.classList.contains('box-wrapper-err') && (this.day !== this.dayMask &&
      this.month !== this.monthMask && this.year !== this.yearMask )){

      const momentObj = moment(`${this.year}-${this.month}-${this.day}`, 'YYYYY-MM-DD');
      this.validate(momentObj);

    }

    this.requestUpdate();

    if(this.isPopupOpen) this.setInputValuePopup(field);

  }

  onChange(){

    this.onChange.wait && clearTimeout(this.onChange.wait);

    this.onChange.wait = setTimeout(()=>{

      if( this.day !== this.dayMask &&  this.month !== this.monthMask && this.year !== this.yearMask ) {

        const momentObj = moment(`${this.year}-${this.month}-${this.day}`, 'YYYYY-MM-DD');

        if(momentObj.isValid()) {

          const newValue = momentObj.format('YYYY-MM-DD');

          this.dispatchEvent(new CustomEvent('dileDateWithoutCalendar-change', {
            bubbles: true,
            composed: true,
            detail: {
              value: newValue,
              date: {
                year: momentObj.format('YYYY'),
                months: momentObj.format('MM'),
                day: momentObj.format('DD')
              }
            }
          }));

        }

      }

    }, 750);

  }

  setInputValuePopup(field){

    if(typeof field === 'undefined') return;

    let typeField = this.getValuesPopup()[field],
      maxLength = this['maxLength' + field], valueLength,
      selectValue = typeField, valueUp = typeField, valueDown = typeField, upI = 0, downI = 0;

    function getfieldValue(field, value){

      let newValue;

      if(field === 'year'){

        newValue = (('0'.repeat((maxLength - 1) > (valueLength - 1)
          ? ((maxLength - 1) - valueLength)
          : (maxLength - valueLength))) + value);

      }else{

        newValue = ('0'.repeat((maxLength - valueLength))) + value;

      }

      return newValue;

    }

    let normalize = (function () {

      return function normalize(field, value) {

        let n = Number(value), min, max;

        min = this['min' + field];
        max = this['max' + field];

        if (n < min) {

          value = this['max' + field];

        } else if (n > max) {

          value = this['min' + field];

        }

        return value;

      }

    })().bind(this);

    this['fieldPopup' + field] = [];

    valueLength = String(selectValue).length;

    selectValue = getfieldValue('year', typeField);

    this['fieldPopup' + field].push({value: selectValue, tag: (field === 'month' ? this.getMonthsNames(selectValue) : selectValue),  active: true});

    for (let i = 1; i <= 4; i++ ){

      ++upI; ++downI;

      let newValue = (valueDown - downI), normalizeValue = normalize(field, newValue );
      normalizeValue !== newValue && (downI = 0, newValue = valueDown = normalizeValue);

      valueLength = String(newValue).length;
      let newfieldValue = (('0'.repeat((maxLength - 1) > (valueLength - 1)
        ? ((maxLength - 1) - valueLength)
        : (maxLength - valueLength))) + newValue);

      this['fieldPopup' + field].push({value: newfieldValue, tag: (field === 'month' ? this.getMonthsNames(newfieldValue) : newfieldValue)});

      /*-----------------------------------------*/

      newValue = (valueUp + upI), normalizeValue = normalize(field, newValue );
      normalizeValue !== newValue && (upI = 0, newValue = valueUp = normalizeValue);

      valueLength = String(newValue).length;
      newfieldValue = (('0'.repeat((maxLength - 1) > (valueLength - 1)
        ? ((maxLength - 1) - valueLength)
        : (maxLength - valueLength))) + newValue);

      this['fieldPopup' + field].unshift({value: newfieldValue, tag: (field === 'month' ? this.getMonthsNames(newfieldValue) : newfieldValue)});

    }

    this.update('fieldPopup' + field);

  }

  incrementFieldValue(field, incre){

    if(this.isNotOperate()) return;

    let value = this.shadowRoot.getElementById(field).value, currentValue = Number(value);

    if('undefined' === typeof value){

      const currentDae = moment(new Date());

      if(field ===  'year'){

        value = currentDae.get('year');

      }else if(field ===  'month'){

        value = currentDae.get('month');

      }else if(field ===  'day'){

        value = currentDae.get('date');

      }

    }

    value = Number(value) + Number(incre);

    let n = value,
      min = this['min' + field],
      max = this['max' + field];

    if (n < min) {

      value = (currentValue === min ? max : min);

    } else if (n > max) {

      value = (currentValue === max ? min : max);

    }

    let maxLength = this['maxLength' + field],
      valueLength = String(value).length;

    if(field ===  'year'){

      value = ('0'.repeat((maxLength - 1) > (valueLength - 1)  ? ((maxLength - 1) - valueLength) : (maxLength - valueLength))) + value;

    }else{

      value = ('0'.repeat((maxLength - valueLength))) + value;

    }

    this.keypress.buffer[field] = String(value);

    this[field] = value;

    this.setFieldValue(field, value);

  }

  fieldFocus(event){

    if(this.isNotOperate()) return;

    this._boxWrap && (this._boxWrap.classList.add('box-wrapper-focus'), event.otarget.classList.add('active'))

  }

  fieldBlur(event){

    if(this.isNotOperate()) return;

    const field = event.otarget.getAttribute('id');

    this._boxWrap && (this._boxWrap.classList.remove('box-wrapper-focus'), event.otarget.classList.remove('active'));

    this.numberbufferDelete(field);

  }

  keypress(event, key, field) {

    if(this.isNotOperate()) return;

    switch (key) {

      case 'ArrowUp': case 'ArrowDown': case 'PageUp':
      case 'PageDown': case 'Backspace': case 'Delete': {

        event.preventDefault();

        this.keyboardNav(key, field);

        break;

      } default: {

        if (key.match(/^[0-9]+$/)) {

          let value;

          if (this.keypress.buffer[field]) {

            value = this.keypress.buffer[field].concat(key);

            value.length > this['maxLength' + field] && value.charAt(0) === '0' && (value = value.substr(1));

            this.keypress.buffer[field] = value;

          } else {

            value = key;

          }

          let n = Number(value);

          if (value.length <= this['maxLength' + field]) {

            if (value.length === this['maxLength' + field]) {

              let min = this['min' + field], max = this['max' + field];

              if (n < min) {

                value = min;

              } else if (n > max) {

                value = max;
              }

            }

            let maxLength = this['maxLength' + field],
              valueLength = String(value).length,
              nValue;

            if(field ===  'year'){

              if(value.length === 1 && key === '0') return;

              nValue = ('0'.repeat((maxLength - 1) > (valueLength - 1)  ? ((maxLength - 1) - valueLength) : (maxLength - valueLength))) + value;

            }else{

              nValue = ('0'.repeat((maxLength - valueLength))) + value;

            }

            this.keypress.buffer[field] = String(value);

            this[field] = nValue;

            if (String(value).length <= this['maxLength' + field]) {

              this.setFieldValue(field, this[field]);

            }

          } else if (this.keypress.buffer[field]) {

            clearTimeout(this.keypress.waitClear);
            this.keypress.waitClear = setTimeout(() => {

              let value = this.keypress.buffer[field];

              this.keypress.buffer[field] = value.substring(0, this['maxLength' + field] - 1);

              this.keypress(key, field);

            }, 100);

          }

        }

      }

    }

  }

  keyboardNav(key, field){

    if(this.isNotOperate()) return;

    this[field] === this[field + 'Mask'] && (delete this.shadowRoot.getElementById(field).value);

    if(key === 'ArrowUp'){

      this.incrementFieldValue(field, 1);

    }else if(key === 'ArrowDown'){

      this.incrementFieldValue(field, -1);

    }else if(key === 'PageUp'){

      this.incrementFieldValue(field, this[field + 'PageUpDown']);

    }else if(key === 'PageDown'){

      this.incrementFieldValue(field, 0 - this[field + 'PageUpDown']);

    }else if(key === 'Delete' || key === 'Backspace'){

      this.resetField(field);

    }

  }

  errors(momentObj){

    const dateParts = ['year',
        'month',
        'day',
        'hour',
        'minute',
        'seconds',
        'milliseconds'],
      numberErr = momentObj.invalidAt();

    const newValue = momentObj._i;

    // Se escala un evento de error
    this.dispatchEvent(new CustomEvent('dileDateWithoutCalendar-error', {
      bubbles: true,
      composed: false,
      detail: {
        momentObj,

        // Se manda un mensaje y el número de error
        statusError:{

          /*
            ----------------
            Err number
            ----------------
            0 =	años
            1	= meses
            2	= dias
            3	= horas
            4	= minutos
            5	= segundos
            6	= milisegundos

          */
          numberErr: momentObj.invalidAt(),
          msg: 'Invalid ' + dateParts[numberErr]
        },
        value: newValue
      }
    }));

  }

  validate(momentObj) {

    if(momentObj.isValid()){

      this._boxWrap && this._boxWrap.classList.remove('box-wrapper-err');

    }else{

      this._boxWrap && (
        this._boxWrap.classList.remove('box-wrapper-focus'),
          this._boxWrap.classList.add('box-wrapper-err')
      );

      this.errors(momentObj);

    }

  }

  numberbufferDelete(field){

    if(field === 'year' || field === 'month' || field === 'day') {

      this.keypress.buffer[field] && (delete this.keypress.buffer[field]);

    }

  }

  resetButton(){

    if(this.isNotOperate()) return;

    this.keypress.buffer = {};
    this.fields.forEach(obj =>(delete obj.value));

    this.day = this.dayMask;
    this.month = this.monthMask;
    this.year = this.yearMask;

    this.requestUpdate();

  }

  openDateTimePopup(){

    if(this.isNotOperate()) return;

    if(!this.isPopupOpen){

      this.isPopupOpen = true;
      this.updateComplete.then(()=>setTimeout(()=>{

        this.setInputValuePopup('year');
        this.setInputValuePopup('month');
        this.setInputValuePopup('day');

        const menu = this.shadowRoot.querySelector('.datetime-popup');
        menu.classList.add('show');

      }, 100));

    }else{

      this.closeDateTimePopup();

    }

  }

  closeDateTimePopup(){

    if(this.isNotOperate()) return;

    const menu = this.shadowRoot.querySelector('.datetime-popup');
    menu.classList.remove('show');
    setTimeout(()=>(this.isPopupOpen = false), 100);

  }

  getMonthsNames(value){

    return (this.options && this.options.monthsNames && this.options.locale && this.options.locale.months && this.options.locale.months.length)
      ? this.options.locale.months[value-1]
      : value;

  }

  getValuesPopup(){

    let currentDate = moment(new Date()), year, month, day;

    if( this.day !== this.dayMask &&  this.month !== this.monthMask && this.year !== this.yearMask ){

      const momentObj = moment(`${this.year}-${this.month}-${this.day}`, 'YYYYY-MM-DD');

      if(!momentObj.isValid()){

        const dateParts = ['year',
            'month',
            'day',
            'hour',
            'minute',
            'seconds',
            'milliseconds'],
          field = dateParts[momentObj.invalidAt()],
          parsedDateParts = momentObj.parsingFlags().parsedDateParts;

        if(field === 'day'){

          day = parsedDateParts[2];
          // formato 12 meses
          month = parsedDateParts[1] + 1;

        }

      }

    }

    this.year === this.yearMask || (currentDate.set('year', this.year));
    this.month === this.monthMask || (currentDate.set('month', this.month - 1));
    this.day === this.dayMask || (currentDate.set('date', this.day));


    return {
      year: year || Number(currentDate.format('YYYY')),
      month: month || Number(currentDate.format('MM')),
      day: day || Number(currentDate.format('DD')),
      value: currentDate.format('YYYY-MM-DD')
    };

  }

  resetField(field){

    if(this.isNotOperate()) return;

    this.numberbufferDelete(field);
    this[field] = this[field + 'Mask'];
    this._boxWrap.classList.remove('box-wrapper-focus');

    this.requestUpdate();

  }

  originalTarget(ev) {

    return ('composedPath' in ev)
      ? ev.composedPath()[0] : ('path' in ev)
        ? ev.path[0] : ('originalTarget' in ev)
          ? ev.originalTarget : ('srcElement' in ev)
            ? ev.srcElement : ev.target;

  }

  isNotOperate(){

    return (this.disabled || this.readonly ) ;

  }

  updateTabIndex(){

    if(!this.init) return;

    this.fields.forEach(obj =>this.disabled ? obj.removeAttribute('tabIndex') : obj.setAttribute('tabIndex', 0));

    if(this.isNotOperate()){

      this.resetBtn.setAttribute('tabIndex', -1);
      this.showPopupBtn.setAttribute('tabIndex', -1);

    }else{

      this.resetBtn.setAttribute('tabIndex', 0);
      this.showPopupBtn.setAttribute('tabIndex', 0);

    }

  }

}
