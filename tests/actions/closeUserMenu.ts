import { expect, type Page } from '@playwright/test';

export default async (page: Page) => {
	const menuButton = page.getByRole('link', {
		name: 'menu'
	});
	await expect(menuButton).toBeVisible();
	const userMenu = page.locator('ul[dir=rtl]');

	if (await userMenu.isVisible()) {
		await menuButton.click();
	}
	//click the menu button
};
