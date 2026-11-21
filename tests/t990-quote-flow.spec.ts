import { test, expect } from '@playwright/test';

const T990_URL = process.env.STOREFRONT_URL || 'https://www.tianlaitoys.com/products/t990/';

test.describe('Tianlai Toys T-990 storefront QA', () => {
  test('renders product page without console or page errors', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));

    const response = await page.goto(T990_URL, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBeLessThan(400);

    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/T-?990/i);
    expect(pageErrors).toEqual([]);
  });

  test('quote/inquiry action is accessible on desktop and mobile', async ({ page }) => {
    await page.goto(T990_URL, { waitUntil: 'domcontentloaded' });

    const quoteTrigger = page
      .locator('a, button')
      .filter({ hasText: /quote|inquiry|contact|inquire/i })
      .first();

    await expect(quoteTrigger).toBeVisible();
    await quoteTrigger.click();

    const formOrModal = page.locator('form, [role="dialog"], input[type="email"]').first();
    await expect(formOrModal).toBeVisible();
  });
});
