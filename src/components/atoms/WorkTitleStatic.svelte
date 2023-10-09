<script lang="ts">
	import type { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import Button from './Button.svelte';
	import ImDbButton from './IMDbButton.svelte';

	export let work: Work;
</script>

{#if $LocalEnSwitch == 'local'}
	<h2>
		{work.titleLocal}
	</h2>
	{#if work.category}
		<mark>
			{_(work.category)}
		</mark>
	{/if}

	<p>
		{@html work.descriptionLocal}
	</p>
{:else}
	<h2>
		{work.titleEn}
	</h2>
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
