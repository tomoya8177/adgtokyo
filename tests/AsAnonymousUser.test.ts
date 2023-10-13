import { workCategory } from '../src/lib/Category';
import { expect, test } from '@playwright/test';
import 'dotenv/config';
import TopPage from './TopPage';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:' + process.env.RUN_APP_PORT + '/');
});

test('Top page', async ({ page }) => {
	await TopPage(page);
});
