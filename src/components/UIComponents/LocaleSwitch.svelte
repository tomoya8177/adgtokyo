<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { cookies } from '$lib/frontend/cookies';
	import { onMount } from 'svelte';
	import { locales } from '$lib/frontend/locales';
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
	{#each locales as loc}
		<option value={loc.key}>{_(loc.name)}</option>
	{/each}
</select>
