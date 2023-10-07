<script lang="ts">
	import IMDbButton from './IMDbButton.svelte';

	import type { Entity } from '$lib/frontend/class/Entity';
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import PopularFilmography from './PopularFilmography.svelte';

	export let entity: Entity;
</script>

{#if $LocalEnSwitch == 'local'}
	<h2>
		{entity.nameLocal}
	</h2>
	<PopularFilmography {entity} />
	<p>
		{@html entity.descriptionLocal}
	</p>
{:else}
	<h2>
		{entity.nameEn}
	</h2>
	<PopularFilmography {entity} />

	<p>
		{@html entity.descriptionEn}
	</p>
{/if}
<div style="display:flex;gap:0.4rem">
	{#if entity.imdbURL}
		<IMDbButton url={entity.imdbURL} />
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
