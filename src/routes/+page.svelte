<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API_KEY, PUBLIC_AUTH0_CLIENT_ID, PUBLIC_AUTH0_DOMAIN } from '$env/static/public';
	import axios from 'axios';
	import { onMount } from 'svelte';
	let auth0;
	let authenticated = false;
	onMount(async () => {
		//authenticated = await auth0.isAuthenticated();

		const works = await axios.get('/api/Work').then((res) => res.data);
		console.log(works);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
