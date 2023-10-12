import { workCategory } from '../src/lib/Category';
import { expect, test } from '@playwright/test';
test('Top page has everything in tact.', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	// expect title to be there more than one time
	await expect(
		page.getByRole('heading', {
			name: 'ADG Tokyo'
		})
	).toBeVisible();
	//top navigation bar is there
	//search box is there
	await expect(page.locator('input[type=search]')).toBeVisible();
	//menu button is there
	const menuButton = page.getByRole('link', {
		name: 'menu'
	});
	await expect(menuButton).toBeVisible();
	//click the menu button
	await menuButton.click();
	//login button is there
	await expect(page.locator('button:has-text("Login/Sign up")')).toBeVisible();

	const RecentlyAddedWorksHeading = page.getByRole('heading', {
		name: 'Recently Added Works'
	});
	await expect(RecentlyAddedWorksHeading).toBeVisible();
	const container = page.locator('section').filter({ has: RecentlyAddedWorksHeading });
	const articles = container.locator('article');
	const articleCount = await articles.count();
	expect(articleCount).toBeGreaterThan(0);
	for (let i = 0; i < articleCount; ++i) {
		const article = articles.nth(i);
		const title = await article.locator('strong').innerText();
		expect(title).toBeTruthy();
		const category = await article.locator('mark').innerText();
		expect(category).toBeTruthy();
		//category should be one of workCategory
		const oneOfCategories = workCategory.some((c) => c.title == category);
		expect(oneOfCategories).toBeTruthy();
	}
	//bottom nav content
	const createNewWorkButton = page.locator('a:has-text("Create New Work")');
	await expect(createNewWorkButton).toBeVisible();
	const localButton = page.locator('a:has-text("Local")');
	await expect(localButton).toBeVisible();
	const engButton = page.locator('a:has-text("English")');
	await expect(engButton).toBeVisible();
});
