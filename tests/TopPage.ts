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
	await closeUserMenu(page);
	const recentPostsHeading = page.getByRole('heading', { name: 'Recently Added Posts' });
	await expect(recentPostsHeading).toBeVisible();
	const postContainer = page.locator('section').filter({ has: recentPostsHeading });
	const posts = postContainer.locator('article');
	const postCount = await posts.count();
	expect(postCount).toBeGreaterThan(0);
	for (let i = 0; i < postCount; ++i) {
		const post = posts.nth(i);
		const title = await post.locator('strong').innerText();
		expect(title).toBeTruthy();
		const body = await post.locator('main').innerText();
		expect(body).toBeTruthy();
	}

	const RecentlyAddedWorksHeading = page.getByRole('heading', {
		name: 'Recently Added Works'
	});
	await expect(RecentlyAddedWorksHeading).toBeVisible();
	//find the closest container that has the heading
	const container = page.locator('section').filter({ has: RecentlyAddedWorksHeading });
	const articles = container.locator('article');
	const articleCount = await articles.count();
	expect(articleCount).toBeGreaterThan(0);
	for (let i = 0; i < articleCount; ++i) {
		const article = articles.nth(i);
		const title = await article.locator('strong').innerText();
		expect(title).toBeTruthy();
	}
	//bottom nav content
	const createNewWorkButton = page.locator('a:has-text("Create New Work")');
	await expect(createNewWorkButton).toBeVisible();
	//const localButton = page.locator('a:has-text("Local")');
	//await expect(localButton).toBeVisible();
	//const engButton = page.locator('a:has-text("English")');
	//await expect(engButton).toBeVisible();
	const firstPost = posts.first();
	const firstPostTitle = await firstPost.locator('strong').innerText();
	const firstPostLink = firstPost.getByRole('link', { name: firstPostTitle });
	await firstPostLink.click();
	await page.waitForURL('**/post/*/*');
	//make sure the title is the same
	const postTitle = page.getByRole('heading', {
		name: firstPostTitle
	});
	await expect(postTitle).toBeVisible();
	//go back to the top page by clicking the logo
	const logo = page.getByRole('link', { name: 'ADG Tokyo', exact: true });
	await logo.click();
	await page.waitForURL('**/');

	//goto one work and come back
	const firstArticle = articles.first();
	console.log({ firstArticle });
	const firstArticleTitle = await firstArticle.locator('strong').innerText();
	const firstArticleLink = firstArticle.getByRole('link', { name: firstArticleTitle });
	await firstArticleLink.click();
	await page.waitForURL('**/work/*');
	//make sure the title is the same
	const workTitle = page.getByRole('heading', {
		name: firstArticleTitle
	});
	await expect(workTitle).toBeVisible();
	//go back to the top page by clicking the logo
	await logo.click();
	await page.waitForURL('**/');

	//go to one post and come back
};
