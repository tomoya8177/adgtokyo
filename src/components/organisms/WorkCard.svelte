<script lang="ts">
	import type { Work } from '$lib/frontend/class/Work';
	import { DateTime } from 'luxon';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import SquareThumbnail from '../atoms/SquareThumbnail.svelte';
	import { _ } from '$lib/frontend/i18n';

	export let work: Work;
	let attachment = work.attachments[0];
</script>

<article>
	<main>
		<div class="justified-flex">
			<div>
				<a href={'/work/' + work.id} class="contrast">
					<strong>
						{#if $LocalEnSwitch == 'local'}
							{work.titleLocal}
						{:else}
							{work.titleEn}
						{/if}
					</strong>
				</a>
			</div>
			<div>
				<small
					><em>
						{#if $LocalEnSwitch == 'local'}
							{work.formatLocal}
						{:else}
							{work.formatEn}
						{/if}
					</em>
				</small>
			</div>
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
	footer {
		text-align: right;
	}
</style>
