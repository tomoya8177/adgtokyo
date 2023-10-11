<script lang="ts">
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import type { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import RichTextarea from '$components/UIComponents/RichTextarea.svelte';
	import WorkTitleStatic from '$components/atoms/WorkTitleStatic.svelte';
	import EditControlButtons from '$components/molecules/EditControlButtons.svelte';
	import WorkTitleInput from '$components/molecules/WorkTitleInput.svelte';
	import TranslateButton from '$components/UIComponents/TranslateButton.svelte';
	export let work: Work;
	export let onUpdate: (work: Work) => void;
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
				<TranslateButton
					bind:local={work.descriptionLocal}
					bind:en={work.descriptionEn}
					forTitle={false}
				/>
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
				onUpdate(work);
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
