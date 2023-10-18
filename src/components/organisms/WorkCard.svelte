<script lang="ts">
	import type { Work } from '$lib/frontend/class/Work';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import SquareThumbnail from '$components/UIComponents/SquareThumbnail.svelte';
	import { _ } from '$lib/frontend/i18n';

	export let work: Work;
	let attachment = work.attachments[0];
</script>

<article class="card">
	<main>
		<div style="margin-bottom:var(--pico-spacing)">
			<div>
				<a href={'/work/' + work.id} class="contrast">
					<h3>
						{#if $LocalEnSwitch == 'local'}
							{work.titleLocal}
						{:else}
							{work.titleEn}
						{/if}
					</h3>
				</a>
			</div>
			{#if work.category}
				<div>
					<mark>
						<small>
							{_(work.category)}
						</small>
					</mark>
				</div>
			{/if}
		</div>
		{#if attachment || work.descriptionLocal != '' || work.descriptionEn != ''}
			<div class="justified-flex">
				<div>
					{#if $LocalEnSwitch == 'local'}
						<p>
							{@html work.descriptionLocal}
						</p>
					{:else}
						<p>
							{@html work.descriptionEn}
						</p>
					{/if}
				</div>
				<div>
					{#if attachment}
						<a href={'/work/' + work.id} style="text-decoration:none">
							<SquareThumbnail url={attachment.thumbnailURL} />
						</a>
					{/if}
				</div>
			</div>
		{/if}
	</main>
</article>

<style>
	p {
		padding: var(--pico-spacing);
	}
</style>
