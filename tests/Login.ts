import { expect, type Page } from '@playwright/test';
import openUserMenu from './actions/openUserMenu';

export default async (page: Page) => {
	await openUserMenu(page);
	const menuButton = page.getByRole('link', {
		name: 'menu'
	});
	await expect(menuButton).toBeVisible();
	//click the menu button
	await menuButton.click();
	//login button is there
	const loginButton = page.locator('button:has-text("Login/Sign up")');
	await expect(loginButton).toBeVisible();

	await loginButton.click();
	const continueWithLineButton = page.locator('button:has-text("Continue with LINE")');
	await expect(continueWithLineButton).toBeVisible();
	await continueWithLineButton.click();

	const emailInput = page.locator('input[name=tid]');
	await expect(emailInput).toBeVisible();
	await emailInput.fill('tomoyaimai8177@gmail.com');

	const passwordInput = page.locator('input[name=tpasswd]');
	await expect(passwordInput).toBeVisible();
	await passwordInput.fill(process.env.LINE_PASSWORD || '');

	const loginButtonLine = page.locator('button:has-text("Log in")');

	await expect(loginButtonLine).toBeVisible();
	await loginButtonLine.click();

	//let's wait for the page to load
	await page.waitForURL('http://localhost:' + process.env.RUN_APP_PORT + '/');
};
