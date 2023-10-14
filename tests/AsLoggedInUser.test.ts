import { test } from '@playwright/test';
import 'dotenv/config';

import TopPage from './TopPage';
import Login from './Login';
import UserMenu from './UserMenu';

test.beforeEach(async ({ page }, testInfo) => {
	await page.goto('http://localhost:' + process.env.RUN_APP_PORT + '/');
	await Login(page);
	testInfo.setTimeout(testInfo.timeout + 30000);
});
test('Top page', async ({ page }) => {
	await TopPage(page);
});
test('User Menu', async ({ page }) => {
	await UserMenu(page);
});
