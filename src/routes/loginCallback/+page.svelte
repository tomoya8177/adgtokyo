<script lang="ts">
	import Auth0 from '$lib/frontend/class/Auth0';
	import { cookies } from '$lib/frontend/cookies';
	import { _ } from '$lib/frontend/i18n';
	import { onMount } from 'svelte';

	onMount(async () => {
		const auth0 = new Auth0();
		await auth0.init();
		await auth0.handleRedirectCallback();
		setTimeout(() => {
			cookies.remove('backTo');
			location.href = cookies.get('backTo') || '/';
		}, 1000);
	});
</script>

{_("Please click the button below if the page doesn't redirect you automatically.")}
{_(
	'If you used Line login, and used the external app to login, clicking the login button at the top right again, will get you logged in safely.'
)}
<div>
	<a role="button" href="/"> {_('Proceed')} </a>
</div>
