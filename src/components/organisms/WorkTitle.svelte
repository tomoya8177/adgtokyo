<script lang="ts">
	import { goto } from '$app/navigation';
	import { workCategory } from '$lib/Category';
	import { Attachment } from '$lib/frontend/class/Attachments';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import type { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';

	import { LocalEnSwitch, User } from '$lib/frontend/store';
	import Button from '../atoms/Button.svelte';
	import RichTextarea from '../atoms/RichTextarea.svelte';
	import TranslateButton from '../atoms/TranslateButton.svelte';
	import Uploader from '../atoms/Uploader.svelte';
	import WorkTitleStatic from '../atoms/WorkTitleStatic.svelte';
	import EditControlButtons from '../molecules/EditControlButtons.svelte';
	import WorkTitleInput from '../molecules/WorkTitleInput.svelte';
	export let work: Work;
</script>

<div class="flex">
	<div>
		{#if work.editing}
			<WorkTitleInput bind:work />

			<label for="description-local">
				{_('Description')}
				({_('Local')})
				<RichTextarea id="description-local" bind:value={work.descriptionLocal} />
			</label>
			<label for="description-en">
				{_('Description')}
				({_('English')})
				<TranslateButton bind:local={work.descriptionLocal} bind:en={work.descriptionEn} />
				<RichTextarea id="description-en" bind:value={work.descriptionEn} />
			</label>
			<label>
				{_('IMDb')}
				<input type="text" bind:value={work.imdbURL} />
			</label>
			<label>
				{_('Official Website')}
				<input type="text" bind:value={work.officialWebsiteURL} />
			</label>
			<label>
				{_('Video')}
				<input type="text" bind:value={work.videoURL} />
			</label>
		{:else}
			<WorkTitleStatic {work} />
		{/if}
	</div>
	<div>
		<EditControlButtons
			bind:editing={work.editing}
			onSave={() => {
				if (!work.validate()) return;
				work.update({
					titleLocal: work.titleLocal,
					titleEn: work.titleEn,
					// formatLocal: work.formatLocal,
					// formatEn: work.formatEn,
					descriptionLocal: work.descriptionLocal,
					descriptionEn: work.descriptionEn,
					imdbURL: work.imdbURL,
					officialWebsiteURL: work.officialWebsiteURL,
					videoURL: work.videoURL,
					category: work.category
				});
				work.editing = false;
			}}
			onDelete={async () => {
				if (!(await myConfirm(_('Are you sure?')))) return;
				work.delete();
				location.href = '/';
			}}
		/>
	</div>
</div>

<style>
	.flex {
		display: flex;
		justify-content: space-between;
	}
</style>
