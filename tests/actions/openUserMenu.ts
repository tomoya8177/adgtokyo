import { expect, type Page } from '@playwright/test';
import closeUserMenu from './closeUserMenu';

export default async (page: Page) => {
	const menuButton = page.getByRole('link', {
		name: 'menu'
	});
	await expect(menuButton).toBeVisible();
	//await closeUserMenu(page);
	//click the menu button
	await menuButton.click();
};
