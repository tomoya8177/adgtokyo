<script lang="ts">
	import IMDbButton from '$components/UIComponents/IMDbButton.svelte';

	import type { Entity } from '$lib/frontend/class/Entity';
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import Button from '$components/UIComponents/Button.svelte';
	import PopularFilmography from './PopularFilmography.svelte';
	import TotalGoodJobCount from '$components/UIComponents/TotalGoodJobCount.svelte';

	export let entity: Entity;
</script>

{#if $LocalEnSwitch == 'local'}
	<div style="display:flex;gap:1rem;align-items:center">
		<h2>
			{entity.nameLocal}
		</h2>
		<TotalGoodJobCount count={entity.totalGoodJobs} />
	</div>
	<section>
		<PopularFilmography {entity} />
	</section>
	<section>
		<p>
			{@html entity.descriptionLocal}
		</p>
	</section>
{:else}
	<div style="display:flex;gap:1rem;align-items:center">
		<h2>
			{entity.nameEn}
		</h2>
		<TotalGoodJobCount count={entity.totalGoodJobs} />
	</div>
	<section>
		<PopularFilmography {entity} />
	</section>
	<section>
		<p>
			{@html entity.descriptionEn}
		</p>
	</section>
{/if}
<section>
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
</section>
