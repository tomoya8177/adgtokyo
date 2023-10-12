import { expect, type Page } from '@playwright/test';
import openUserMenu from './actions/openUserMenu';
import closeUserMenu from './actions/closeUserMenu';
import 'dotenv/config';

export default async (page: Page) => {
	await openUserMenu(page);
	const loggedInAs = page.getByText('Logged in as: ' + process.env.TEST_USER_NICKNAME);
	await expect(loggedInAs).toBeVisible();

	const updateNicknameButton = page.getByText('Update Nickname');
	await expect(updateNicknameButton).toBeVisible();
	await updateNicknameButton.click();
	const inputField = page.locator('dialog[open] article input');
	await expect(inputField).toBeVisible();
	await inputField.fill('test\'s"Nickname"');
	const OKButton = page.locator('dialog[open] article button:has-text("OK")');
	await expect(OKButton).toBeVisible();
	await OKButton.click();

	const updatedToast = page.getByText('Nickname updated');
	await expect(updatedToast).toBeVisible();

	//wait for the reload event

	await page.waitForEvent('load');
	await openUserMenu(page);
	const loggedInAsUpdated = page.getByText('Logged in as: test\'s"Nickname"');
	await expect(loggedInAsUpdated).toBeVisible();
	await updateNicknameButton.click();
	await expect(inputField).toBeVisible();

	await inputField.fill(process.env.TEST_USER_NICKNAME || '');
	await OKButton.click();
	const updatedToastRevised = page.getByText('Nickname updated');
	await expect(updatedToastRevised).toBeVisible();

	await page.waitForEvent('load');

	await openUserMenu(page);
	const loggedInAsOriginal = page.getByText('Logged in as: ' + process.env.TEST_USER_NICKNAME);
	await expect(loggedInAsOriginal).toBeVisible();

	//set the nickname back to ADG Tokyo
	await closeUserMenu(page);
};
