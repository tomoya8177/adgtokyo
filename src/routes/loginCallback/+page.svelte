<script lang="ts">
	import Auth0 from '$lib/frontend/class/Auth0';
	import { cookies } from '$lib/frontend/cookies';
	import { onMount } from 'svelte';

	onMount(async () => {
		const auth0 = new Auth0();
		await auth0.init();
		await auth0.handleRedirectCallback();
		location.href = cookies.get('backTo') || '/';
	});
</script>

Please click
<a href="/"> here </a>
if the page doesn't redirect you automatically.
