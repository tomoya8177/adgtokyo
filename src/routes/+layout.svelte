<script lang="ts">
	import Auth0 from '$lib/frontend/class/Auth0';
	import { onMount } from 'svelte';
	import { User, auth0 } from '$lib/frontend/store';
	import { page } from '$app/stores';
	import TopNav from '../components/organisms/TopNav.svelte';
	import { goto } from '$app/navigation';
	import BottomNav from '../components/organisms/BottomNav.svelte';
	import Toasts from '../components/organisms/Toasts.svelte';
	onMount(async () => {
		auth0.set(new Auth0());
		await $auth0.init();
		$User.authenticated = await $auth0.check();
		if ($User.authenticated) {
			$User.profile = await $auth0.getUser();
		}
	});
	let searchKeywords = '';
	const onKeywordsChange = (value: string) => {
		console.log(searchKeywords);
		if ($page.url.pathname.includes('/search/')) {
			if ($page.url.pathname.includes('/work/')) {
				goto('/search/work/' + searchKeywords);
			} else if ($page.url.pathname.includes('/person/')) {
				goto('/search/person/' + searchKeywords);
			} else if ($page.url.pathname.includes('/business/')) {
				goto('/search/business/' + searchKeywords);
			} else {
				goto('/search/work/' + searchKeywords);
			}
		} else {
			goto('/search/work/' + searchKeywords);
		}
	};
</script>

<div class="height">
	<div class=" header">
		<TopNav bind:searchKeywords {onKeywordsChange} />
	</div>
	<div class="container body">
		<slot />
	</div>
	<div class=" footer">
		<BottomNav />
	</div>
</div>
<Toasts />

<style>
	.height {
		height: 100dvh;
		overflow: visible;
	}
	.header {
		height: 3.5rem;
		overflow: visible;
		border-bottom: 1px solid var(--pico-card-border-color);
		box-shadow: var(--pico-card-box-shadow);
		background-color: var(--my-background-color);
	}
	.body {
		padding: var(--pico-spacing);
		height: calc(100dvh - 7rem);
		position: relative;
		overflow-y: auto;
		border-right: solid 1px var(--pico-card-border-color);
		border-left: solid 1px var(--pico-card-border-color);
	}
	.footer {
		box-shadow: var(--pico-card-box-shadow);
		border-top: 1px solid var(--pico-card-border-color);
		height: 3.5rem;
		overflow: hidden;
	}
</style>
