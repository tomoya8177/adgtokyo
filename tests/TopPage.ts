import { workCategory } from '../src/lib/Category';
import { test, expect, type Page } from '@playwright/test';
import openUserMenu from './actions/openUserMenu';
import closeUserMenu from './actions/closeUserMenu';

export default async (page: Page) => {
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
	await openUserMenu(page);
	const loginButton = page.getByRole('button', { name: 'Login/Sign up' });
	const logoutButton = page.locator('button:has-text("Logout")');
	await expect(loginButton.or(logoutButton)).toBeVisible();

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

	await closeUserMenu(page);
	//goto one work and come back
	const firstArticle = articles.first();
	const firstArticleTitle = await firstArticle.locator('strong').innerText();
	const firstArticleLink = await firstArticle.getByRole('link', { name: firstArticleTitle });
	await firstArticleLink.click();
	await page.waitForURL('**/work/*');
	//make sure the title is the same
	const workTitle = page.getByRole('heading', {
		name: firstArticleTitle
	});
	await expect(workTitle).toBeVisible();
	//go back to the top page by clicking the logo
	const logo = page.getByRole('link', { name: 'ADG Tokyo', exact: true });
	await logo.click();
	await page.waitForURL('**/');
};
