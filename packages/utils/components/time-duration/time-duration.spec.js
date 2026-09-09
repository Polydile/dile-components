import { describe, it, expect, afterEach } from 'vitest';
import './time-duration.js';

describe('dile-time-duration', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderTimeDuration(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-time-duration');
    await el.updateComplete;
    return el;
  }

  it('renders 80 seconds as "1m 20s"', async () => {
    const el = await renderTimeDuration('<dile-time-duration seconds="80"></dile-time-duration>');
    const timeText = el.shadowRoot.querySelector('.time-text').textContent;
    expect(timeText).toContain('1m');
    expect(timeText).toContain('20s');
  });

  it('renders 3665 seconds as "1h 1m"', async () => {
    const el = await renderTimeDuration('<dile-time-duration seconds="3665"></dile-time-duration>');
    const timeText = el.shadowRoot.querySelector('.time-text').textContent;
    expect(timeText).toContain('1h');
    expect(timeText).toContain('1m');
  });

  it('renders with extended format', async () => {
    const el = await renderTimeDuration('<dile-time-duration seconds="3665" extended></dile-time-duration>');
    const timeText = el.shadowRoot.querySelector('.time-text').textContent;
    expect(timeText).toContain('hour');
    expect(timeText).toContain('minute');
  });

  it('renders with Spanish language', async () => {
    const el = await renderTimeDuration('<dile-time-duration seconds="3665" extended language="es"></dile-time-duration>');
    const timeText = el.shadowRoot.querySelector('.time-text').textContent;
    expect(timeText).toContain('hora');
    expect(timeText).toContain('minuto');
  });

  it('renders with days', async () => {
    const el = await renderTimeDuration('<dile-time-duration seconds="90061"></dile-time-duration>');
    const timeText = el.shadowRoot.querySelector('.time-text').textContent;
    expect(timeText).toContain('1d');
    expect(timeText).toContain('1h');
  });

  it('respects precision attribute', async () => {
    const el = await renderTimeDuration('<dile-time-duration seconds="80" precision="seconds"></dile-time-duration>');
    const timeText = el.shadowRoot.querySelector('.time-text').textContent;
    expect(timeText).toContain('1m');
    expect(timeText).toContain('20s');
  });

  it('renders 0 seconds with smallest allowed unit', async () => {
    const el = await renderTimeDuration('<dile-time-duration seconds="0"></dile-time-duration>');
    const timeText = el.shadowRoot.querySelector('.time-text').textContent;
    expect(timeText).toContain('0s');
  });

  it('displays custom icon', async () => {
    const el = await renderTimeDuration('<dile-time-duration seconds="80" icon="material.timer"></dile-time-duration>');
    expect(el.shadowRoot.querySelector('dile-iconlib').getAttribute('icon')).toBe('material.timer');
  });
});
