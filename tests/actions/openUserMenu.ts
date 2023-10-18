import { expect, type Page } from '@playwright/test';
import closeUserMenu from './closeUserMenu';

export default async (page: Page) => {
	const menuButton = page.getByTestId('navMenu');
	await expect(menuButton).toBeVisible();
	//await closeUserMenu(page);
	//click the menu button
	//wait for  a second
	await page.waitForTimeout(1000);

	await menuButton.click();
	const sideBar = page.locator('.sidebar');
	await expect(sideBar).toBeVisible();
};
