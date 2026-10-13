import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { visualFixture } from '../tests/fixtures';
const origin = process.env.APP_URL ?? 'http://localhost:8081';
async function main() {
  await mkdir('artifacts/screenshots', { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce', timezoneId: 'Asia/Kathmandu' });
  const page = await context.newPage(); const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.clock.install({ time: new Date('2026-10-13T06:15:00Z') });
  await page.goto(origin, { waitUntil: 'networkidle', timeout: 120000 });
  await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible({ timeout: 60000 });
  await page.screenshot({ path: 'artifacts/screenshots/welcome-390.png' });
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('textbox', { name: 'Your name' }).fill('Asha');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('checkbox').first().click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('radio').first().click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('radio', { name: 'Forest Green' }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Let’s Go!' }).click();
  await expect(page.getByText('No tasks yet!', { exact: true })).toBeVisible();
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByText('No tasks yet!', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Add task', exact: true }).click();
  await page.screenshot({ path: 'artifacts/screenshots/add-task-390.png' });
  await page.getByRole('textbox', { name: 'Task Name' }).fill('Read ten pages');
  await page.getByRole('button', { name: 'Save Task', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Complete Read ten pages' }).click();
  await page.getByRole('button', { name: 'Awesome!' }).click();
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByRole('checkbox', { name: 'Undo Read ten pages' })).toBeVisible();
  await page.getByRole('checkbox', { name: 'Undo Read ten pages' }).click();
  await page.getByRole('checkbox', { name: 'Complete Read ten pages' }).click();
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('penguin-task-v2')!));
  expect(state.transactions.reduce((sum: number, t: { amount: number }) => sum + t.amount, 0)).toBe(10);
  await page.evaluate(data => localStorage.setItem('penguin-task-v2', JSON.stringify(data)), visualFixture());
  await page.reload({ waitUntil: 'networkidle' });
  for (const width of [390, 360, 412]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ['home', 'progress', 'rewards', 'settings', 'calendar']) {
      await page.goto(`${origin}/${route}`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `artifacts/screenshots/${route}-${width}.png` });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    }
  }
  await page.goto(`${origin}/rewards`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Redeem', exact: true }).first().click();
  await expect(page.getByRole('button', { name: 'Equipped ✓' })).toBeVisible();
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByRole('button', { name: 'Equipped ✓' })).toBeVisible();
  if (errors.length) throw new Error(errors.join('\n'));
  console.log('Browser journey, persistence, rewards and 15 responsive screenshots passed.');
  await browser.close();
}
main().catch(e => { console.error(e); process.exit(1); });
