import { expect, type Page } from '@playwright/test';

export default async (page: Page) => {
	const userMenu = page.locator('.sidebar');

	if (await userMenu.isVisible()) {
		const closeButton = userMenu.getByRole('link', { name: 'close' });
		await expect(closeButton).toBeVisible();
		await closeButton.click();
	}
	//click the menu button
};
