import { LitElement, html, css } from 'lit';
import '../../icon/icon.js';

export class DileFloatingFeedback extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .feedback-anchor {
        display: inline-block;
      }
    `
  ];

  static get properties() {
    return {
      feedback: { type: String },
      duration: { type: Number },
      icon: { type: Object },
      hideIcon: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.feedback = '';
    this.duration = 1000;
    this.icon = null;
    this.hideIcon = false;
    this.activeInstances = new Set();
  }

  render() {
    return html`
      <div class="feedback-anchor"></div>
    `;
  }

  show(text) {
    const feedbackText = text || this.feedback;
    if (!feedbackText) {
      console.warn('dile-floating-feedback: No text provided');
      return;
    }

    this.createFloatingElement(feedbackText);
  }

  createFloatingElement(text) {
    // Create instance ID and add to active set
    const instanceId = Math.random();
    this.activeInstances.add(instanceId);
    
    // Calculate delay based on number of active instances
    const delay = (this.activeInstances.size - 1) * 50;

    // Create the floating element
    const floatingElement = document.createElement('div');
    floatingElement.className = 'dile-floating-feedback-text';

    // Get computed CSS variables from the component
    const computedStyle = window.getComputedStyle(this);
    const bgColor = computedStyle.getPropertyValue('--dile-floating-feedback-background-color').trim() || 'rgba(0, 0, 0, 0.8)';
    const textColor = computedStyle.getPropertyValue('--dile-floating-feedback-text-color').trim() || '#fff';
    const fontSize = computedStyle.getPropertyValue('--dile-floating-feedback-font-size').trim() || '0.875rem';
    const fontWeight = computedStyle.getPropertyValue('--dile-floating-feedback-font-weight').trim() || '500';
    const padding = computedStyle.getPropertyValue('--dile-floating-feedback-padding').trim() || '0.5rem 0.75rem';
    const borderRadius = computedStyle.getPropertyValue('--dile-floating-feedback-border-radius').trim() || '4px';

    // Style the floating element with computed values
    Object.assign(floatingElement.style, {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: '10000',
      fontFamily: 'inherit',
      fontSize: fontSize,
      fontWeight: fontWeight,
      backgroundColor: bgColor,
      color: textColor,
      padding: padding,
      borderRadius: borderRadius,
      animation: `dile-floating-feedback-animation ${this.duration}ms ease-out forwards`,
      animationDelay: delay + 'ms'
    });

    // Create content container (flexbox if there's an icon)
    const contentContainer = document.createElement('div');
    if (!this.hideIcon && this.icon) {
      Object.assign(contentContainer.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        whiteSpace: 'nowrap'
      });
      
      // Create and add icon element
      const iconElement = document.createElement('dile-icon');
      iconElement.icon = this.icon;
      iconElement.style.setProperty('--dile-icon-size', 'var(--dile-floating-feedback-icon-size, 1.2em)');
      iconElement.style.setProperty('--dile-icon-color', textColor);
      contentContainer.appendChild(iconElement);
    } else {
      Object.assign(contentContainer.style, {
        whiteSpace: 'nowrap'
      });
    }

    // Create and add text element
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    contentContainer.appendChild(textSpan);

    // Add content container to floating element
    floatingElement.appendChild(contentContainer);

    // Calculate position relative to this component
    const rect = this.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    floatingElement.style.left = (x - 50) + 'px'; // Center roughly
    floatingElement.style.top = y + 'px';

    // Add animation keyframes to document if not already present
    this.ensureAnimationStyles();

    // Add to document body
    document.body.appendChild(floatingElement);

    // Remove element after animation completes
    const totalTime = this.duration + delay;
    setTimeout(() => {
      floatingElement.remove();
      this.activeInstances.delete(instanceId);
    }, totalTime);
  }

  ensureAnimationStyles() {
    // Check if styles are already injected
    if (document.getElementById('dile-floating-feedback-styles')) {
      return;
    }

    const styleElement = document.createElement('style');
    styleElement.id = 'dile-floating-feedback-styles';
    styleElement.textContent = `
      @keyframes dile-floating-feedback-animation {
        0% {
          opacity: 0;
          transform: translateY(0) scale(0.8);
        }
        50% {
          opacity: 1;
          transform: translateY(-15px) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-30px) scale(1);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        @keyframes dile-floating-feedback-animation {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(0);
          }
        }
      }

      .dile-floating-feedback-text {
        --dile-floating-feedback-duration: 1000ms;
        --dile-floating-feedback-font-size: 0.875rem;
        --dile-floating-feedback-font-weight: 500;
        --dile-floating-feedback-color: #fff;
        --dile-floating-feedback-background-color: rgba(0, 0, 0, 0.8);
        --dile-floating-feedback-padding: 0.5rem 0.75rem;
        --dile-floating-feedback-border-radius: 4px;
        --dile-floating-feedback-translate-y: 30px;
      }
    `;

    document.head.appendChild(styleElement);
  }
}
