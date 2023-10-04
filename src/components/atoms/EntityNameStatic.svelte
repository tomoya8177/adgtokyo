<script lang="ts">
	import type { Business } from '$lib/frontend/class/Business';
	import type { Person } from '$lib/frontend/class/Person';
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

	export let entity: Person | Business;
</script>

{#if $LocalEnSwitch == 'local'}
	<h2>
		{entity.nameLocal}
	</h2>
	<p>
		{@html entity.descriptionLocal}
	</p>
{:else}
	<h2>
		{entity.nameEn}
	</h2>
	<p>
		{@html entity.descriptionEn}
	</p>
{/if}
<div style="display:flex;gap:0.4rem">
	{#if entity.imdbURL}
		<small>
			<a role="button" href={entity.imdbURL} target="_blank"> IMDB </a>
		</small>
	{/if}
	{#if entity.officialWebsiteURL}
		<Button
			onclick={() => {
				window.open(entity.officialWebsiteURL);
			}}
			icon="language"
			label={_('Official Website')}
		/>
	{/if}
</div>
