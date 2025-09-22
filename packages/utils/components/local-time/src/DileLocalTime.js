import { html, css, LitElement } from "lit";

export class DileLocalTime extends LitElement {
  static properties = {
    isoDatetime: { 
      type: String
    },
    withoutTwoDigit: {
      type: Boolean
    },
    showSeconds: {
      type: Boolean
    },
    hour12: {
      type: Boolean
    },
    showTimezone: {
      type: Boolean
    },
    timeZoneLong: {
      type: Boolean
    }
  };

  constructor() {
    super();
    this.withoutTwoDigit = false;
    this.showSeconds = false;
    this.hour12 = false;
    this.showTimezone = false;
    this.timeZoneLong = false;
  }

  getFormatOptions() {
    const digitStyle = this.withoutTwoDigit ? 'numeric' : '2-digit';

    const options = {
      hour: digitStyle,
      minute: digitStyle,
      hour12: this.hour12,
    };

    if (this.showSeconds) {
      options.second = digitStyle;
    }

    if (this.showTimezone) {
      options.timeZoneName = this.timeZoneLong ? 'long' : 'short';
    }

    return options;
  }

  getLocalTime() {
    if (!this.isoDatetime) return '';
    const date = new Date(this.isoDatetime);
    return new Intl.DateTimeFormat(undefined, this.getFormatOptions()).format(date);
  }

  render() {
    return html`${this.getLocalTime()}`;
  }
}
