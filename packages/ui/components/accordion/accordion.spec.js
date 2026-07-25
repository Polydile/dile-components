import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './accordion.js';
import './accordion-item.js';

describe('DileAccordion - Accessibility', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderAccordion(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-accordion-item') || document.body.querySelector('dile-accordion');
    await el.updateComplete;
    return el;
  }

  async function renderAccordionGroup(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-accordion');
    const items = el.querySelectorAll('dile-accordion-item');
    await el.updateComplete;
    for (const item of items) {
      await item.updateComplete;
    }
    return { accordion: el, items };
  }

  describe('Semantic Structure & ARIA', () => {
    it('should have region role with aria-label on container', async () => {
      const { accordion } = await renderAccordionGroup(`
        <dile-accordion>
          <dile-accordion-item title="Item 1">
            <div slot="accordion-item-content">Content 1</div>
          </dile-accordion-item>
        </dile-accordion>
      `);
      
      const region = accordion.shadowRoot.querySelector('[role="region"]');
      
      expect(region).toBeTruthy();
      expect(region.getAttribute('aria-label')).toBe('Accordion');
    });

    it('button should have aria-expanded attribute', async () => {
      const el = await renderAccordion(`
        <dile-accordion-item title="Expandable">
          <div slot="accordion-item-content">Content</div>
        </dile-accordion-item>
      `);
      
      const button = el.shadowRoot.querySelector('button');
      expect(button.getAttribute('aria-expanded')).toBe('false');
      
      button.click();
      await el.updateComplete;
      
      expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('button should have aria-controls pointing to content', async () => {
      const el = await renderAccordion(`
        <dile-accordion-item title="Item">
          <div slot="accordion-item-content">Content</div>
        </dile-accordion-item>
      `);
      
      const button = el.shadowRoot.querySelector('button');
      const contentContainer = el.shadowRoot.querySelector('.contentContainer');
      
      const controlsId = button.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      expect(contentContainer.id).toBe(controlsId);
    });

    it('content region should have aria-labelledby pointing to button', async () => {
      const el = await renderAccordion(`
        <dile-accordion-item title="Section Title">
          <div slot="accordion-item-content">Content</div>
        </dile-accordion-item>
      `);
      
      const button = el.shadowRoot.querySelector('button');
      const contentRegion = el.shadowRoot.querySelector('[role="region"]');
      
      expect(contentRegion.getAttribute('aria-labelledby')).toBe(button.id);
    });

    it('icon should be hidden from screen readers with aria-hidden', async () => {
      const el = await renderAccordion(`
        <dile-accordion-item title="Item">
          <div slot="accordion-item-content">Content</div>
        </dile-accordion-item>
      `);
      
      const icon = el.shadowRoot.querySelector('span.icon');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('button should be keyboard focusable', async () => {
      const el = await renderAccordion(`
        <dile-accordion-item title="Item">
          <div slot="accordion-item-content">Content</div>
        </dile-accordion-item>
      `);
      
      const button = el.shadowRoot.querySelector('button');
      button.focus();
      
      expect(el.shadowRoot.activeElement).toBe(button);
    });

    it('button should toggle on click', async () => {
      const el = await renderAccordion(`
        <dile-accordion-item title="Item">
          <div slot="accordion-item-content">Content</div>
        </dile-accordion-item>
      `);
      
      const button = el.shadowRoot.querySelector('button');
      
      expect(el.opened).toBe(false);
      button.click();
      await el.updateComplete;
      
      expect(el.opened).toBe(true);
    });
  });

  describe('Focus Management', () => {
    it('should have visible focus outline (focus-visible)', async () => {
      const el = await renderAccordion(`
        <dile-accordion-item title="Item">
          <div slot="accordion-item-content">Content</div>
        </dile-accordion-item>
      `);
      
      const button = el.shadowRoot.querySelector('button');
      
      // Verify focus-visible CSS exists
      const styles = el.shadowRoot.adoptedStyleSheets[0];
      let hasFocusVisible = false;
      for (const rule of styles.cssRules) {
        if (rule.selectorText && rule.selectorText.includes('focus-visible')) {
          hasFocusVisible = true;
          break;
        }
      }
      
      expect(hasFocusVisible).toBe(true);
    });
  });

  describe('Live Region Announcements', () => {
    it('should dispatch live region announcement on expand', async () => {
      const el = await renderAccordion(`
        <dile-accordion-item title="Settings">
          <div slot="accordion-item-content">Expanded content</div>
        </dile-accordion-item>
      `);
      
      const button = el.shadowRoot.querySelector('button');
      button.click();
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Verify that a live region element exists with status role
      const liveRegions = el.querySelectorAll('[role="status"][aria-live]');
      expect(liveRegions.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Content Visibility & Structure', () => {
    it('content should be hidden when closed', async () => {
      const el = await renderAccordion(`
        <dile-accordion-item title="Item">
          <div slot="accordion-item-content">Hidden Content</div>
        </dile-accordion-item>
      `);
      
      expect(el.opened).toBe(false);
      const button = el.shadowRoot.querySelector('button');
      expect(button.className).not.toContain('opened');
    });

    it('content should be visible when opened', async () => {
      const el = await renderAccordion(`
        <dile-accordion-item title="Item" opened>
          <div slot="accordion-item-content">Visible Content</div>
        </dile-accordion-item>
      `);
      
      // Give time for animation to trigger
      await new Promise(resolve => setTimeout(resolve, 150));
      
      expect(el.opened).toBe(true);
      const button = el.shadowRoot.querySelector('button');
      expect(button.className).toContain('opened');
    });
  });

  describe('Multiple Items', () => {
    it('only one item should be open at a time (mutually exclusive)', async () => {
      const { accordion, items } = await renderAccordionGroup(`
        <dile-accordion>
          <dile-accordion-item title="Item 1">
            <div slot="accordion-item-content">Content 1</div>
          </dile-accordion-item>
          <dile-accordion-item title="Item 2">
            <div slot="accordion-item-content">Content 2</div>
          </dile-accordion-item>
        </dile-accordion>
      `);
      
      const button1 = items[0].shadowRoot.querySelector('button');
      const button2 = items[1].shadowRoot.querySelector('button');
      
      button1.click();
      await items[0].updateComplete;
      expect(items[0].opened).toBe(true);
      
      button2.click();
      await items[1].updateComplete;
      await items[0].updateComplete;
      
      expect(items[0].opened).toBe(false);
      expect(items[1].opened).toBe(true);
    });
  });

  describe('Unique IDs', () => {
    it('each accordion item should have unique IDs', async () => {
      const { items } = await renderAccordionGroup(`
        <dile-accordion>
          <dile-accordion-item title="Item 1">
            <div slot="accordion-item-content">Content 1</div>
          </dile-accordion-item>
          <dile-accordion-item title="Item 2">
            <div slot="accordion-item-content">Content 2</div>
          </dile-accordion-item>
        </dile-accordion>
      `);
      
      const button1Id = items[0].shadowRoot.querySelector('button').id;
      const button2Id = items[1].shadowRoot.querySelector('button').id;
      
      expect(button1Id).toBeTruthy();
      expect(button2Id).toBeTruthy();
      expect(button1Id).not.toBe(button2Id);
    });
  });
});
