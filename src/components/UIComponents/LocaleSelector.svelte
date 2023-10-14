<script lang="ts">
	import type { Content } from '$lib/frontend/class/Content';

	import { _ } from '$lib/frontend/i18n';
	import { locales } from '$lib/frontend/locales';
	export let content: Content;
	export let onChange: () => void = () => {};
</script>

<label>
	{_('Language')}
	<select bind:value={content.locale} on:change={onChange}>
		{#each locales as locale}
			<option value={locale.key}>{_(locale.name)}</option>
		{/each}
	</select>
</label>
