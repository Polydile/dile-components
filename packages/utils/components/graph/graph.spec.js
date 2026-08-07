import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import './graph.js';

// DileGraph relies on a global `Chart` (Chart.js), normally loaded via <script> tag
// in consuming pages, not a module import. Stub it so firstUpdated() doesn't throw.
describe('dile-graph', () => {
  beforeEach(() => {
    window.Chart = class {
      constructor(ctx, config) {
        this.ctx = ctx;
        this.config = config;
      }
    };
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete window.Chart;
  });

  async function renderGraph(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-graph');
    await el.updateComplete;
    return el;
  }

  it('renders a canvas and initializes a Chart instance', async () => {
    const el = await renderGraph('<dile-graph></dile-graph>');
    expect(el.shadowRoot.querySelector('canvas')).toBeTruthy();
    expect(el.myChart).toBeInstanceOf(window.Chart);
  });

  it('defaults chartType to line', async () => {
    const el = await renderGraph('<dile-graph></dile-graph>');
    expect(el.chartType).toBe('line');
  });
});
