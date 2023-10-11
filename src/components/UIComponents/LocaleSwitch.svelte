<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { cookies } from '$lib/frontend/cookies';
	import { onMount } from 'svelte';
	let locale: string;
	onMount(() => {
		locale = cookies.get('locale');
	});
</script>

<select
	bind:value={locale}
	on:change={() => {
		console.log(locale);
		cookies.set('locale', locale);
		location.reload();
	}}
>
	<option value="ja">{_('Japanese')}</option>
	<option value="en">{_('English')}</option>
</select>
