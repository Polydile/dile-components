import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
page.on('pageerror', err => console.log('PAGEERROR:', err.message));
await page.goto('http://localhost:5183/ui/dile-tooltip.html');
await page.waitForTimeout(500);

await page.evaluate(() => window.scrollTo(0, 300));
await page.waitForTimeout(200);

const containerTooltip = page.locator('.containertooltip dile-tooltip');
await containerTooltip.scrollIntoViewIfNeeded();
const box = await containerTooltip.boundingBox();
console.log('trigger box', box);

await page.mouse.move(box.x + box.width/2, box.y + box.height/2);
await page.waitForTimeout(700);

const result = await page.evaluate(() => {
  const el = document.querySelectorAll('.containertooltip dile-tooltip')[0];
  const tooltipSpan = el.shadowRoot.querySelector('.tooltiptext');
  const rect = tooltipSpan.getBoundingClientRect();
  const style = getComputedStyle(tooltipSpan);
  const containerRect = document.querySelector('.containertooltip').getBoundingClientRect();
  return {
    tooltipRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height, bottom: rect.bottom, right: rect.right },
    containerRect: { top: containerRect.top, left: containerRect.left, bottom: containerRect.bottom, right: containerRect.right },
    visibility: style.visibility,
    opacity: style.opacity,
  };
});
console.log('tooltip result', JSON.stringify(result, null, 2));

await page.screenshot({ path: '/tmp/tooltip_check.png', fullPage: false });
await browser.close();
