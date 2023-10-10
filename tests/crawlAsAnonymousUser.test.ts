import { expect, test } from '@playwright/test';

test('Top page has everything in tact.', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('ADG Tokyo')).toBeVisible();
});
