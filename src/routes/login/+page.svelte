<script lang="ts">
	import { page } from '$app/stores';

	import { PUBLIC_AUTH0_CLIENT_ID, PUBLIC_AUTH0_DOMAIN } from '$env/static/public';
	import { createAuth0Client } from '@auth0/auth0-spa-js';
	import { onMount } from 'svelte';
	let auth0;
	onMount(async () => {
		auth0 = await createAuth0Client({
			domain: PUBLIC_AUTH0_DOMAIN,
			clientId: PUBLIC_AUTH0_CLIENT_ID,
			authorizationParams: {
				redirect_uri: `${$page.url.origin}/login`
			}
		});
		if (
			location.search.includes('state=') &&
			(location.search.includes('code=') || location.search.includes('error='))
		) {
			await auth0.handleRedirectCallback();
			console.log({ auth0 });
			const userProfile = await auth0.getUser();
			console.log({ userProfile });
			window.history.replaceState({}, document.title, '/');
		}
	});
</script>

{#if auth0?.isAuthenticated}
	<button
		on:click={() => {
			auth0.logout();
		}}>Logout</button
	>
{/if}
