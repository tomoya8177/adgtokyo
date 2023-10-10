<script lang="ts">
	import TotalGoodJobCount from './TotalGoodJobCount.svelte';

	import type { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import Button from './Button.svelte';
	import ImDbButton from './IMDbButton.svelte';
	import Icon from './Icon.svelte';

	export let work: Work;
</script>

{#if $LocalEnSwitch == 'local'}
	<div style="display:flex;gap:1rem;align-items:center">
		<h2>
			{work.titleLocal}
		</h2>
		<TotalGoodJobCount count={work.goodJobNumber} />
	</div>

	{#if work.category}
		<mark>
			{_(work.category)}
		</mark>
	{/if}

	<p>
		{@html work.descriptionLocal}
	</p>
{:else}
	<div style="display:flex;gap:1rem;align-items:center">
		<h2>
			{work.titleEn}
		</h2>
		<TotalGoodJobCount count={work.goodJobNumber} />
	</div>

	{#if work.category}
		<mark>
			{_(work.category)}
		</mark>
	{/if}

	<p>
		{@html work.descriptionEn}
	</p>
{/if}
<div style="display:flex;gap:0.4rem">
	{#if work.imdbURL}
		<ImDbButton url={work.imdbURL} />
	{/if}
	{#if work.officialWebsiteURL}
		<Button
			onclick={() => {
				window.open(work.officialWebsiteURL);
			}}
			icon="language"
			label={_('Official Website')}
		/>
	{/if}
	{#if work.videoURL}
		<Button
			onclick={() => {
				window.open(work.videoURL);
			}}
			icon="play_arrow"
			label={_('Video')}
		/>
	{/if}
</div>
