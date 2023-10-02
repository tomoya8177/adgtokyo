<script lang="ts">
	import Auth0 from '$lib/frontend/class/Auth0';
	import { onMount, setContext } from 'svelte';
	import { User, auth0 } from '$lib/frontend/store';
	import { page } from '$app/stores';
	import axios from 'axios';
	import { PUBLIC_API_KEY } from '$env/static/public';
	import { api } from '$lib/frontend/class/API';
	import TopNav from '../components/organisms/TopNav.svelte';
	import SearchBox from '../components/molecules/SearchBox.svelte';
	import { goto } from '$app/navigation';
	import BottomNav from '../components/organisms/BottomNav.svelte';
	let authenticated = false;
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

<div class="container main">
	<TopNav />
	<SearchBox bind:value={searchKeywords} onchange={onKeywordsChange} />
	<hr />
	<slot />
</div>
<div class="container">
	<BottomNav />
</div>

<style>
	.main {
		height: 100dvh;
		position: relative;
		overflow-y: auto;
		padding-bottom: 4rem;
	}
</style>
