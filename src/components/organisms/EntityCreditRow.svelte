<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import PropertyRowStatic from '../atoms/PropertyRowStatic.svelte';
	import DistributionRowStatic from './DistributionRowStatic.svelte';
	import EditControlButtons from '../molecules/EditControlButtons.svelte';
	import HasEntitySubtextStatic from '../molecules/HasEntitySubtextStatic.svelte';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import Icon from '../atoms/Icon.svelte';
	import { goto } from '$app/navigation';
	import Button from '../atoms/Button.svelte';
	import { workCategory } from '$lib/Category';
	import PairOfInputs from '../atoms/PairOfInputs.svelte';
	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import GoodJobButton from '../molecules/GoodJobButton.svelte';
	import type { Filmography } from '$lib/frontend/class/Entity';
	export let filmography: PropertyHasEntity;
	export let editable = false;
	export let onUp: (() => void) | false = false;
	export let onDown: (() => void) | false = false;
	export let onDelete: (() => void) | false = false;
	export let onUpdate: (hasEntity: PropertyHasEntity) => void;
</script>

<div
	class="justified-flex"
	style="border-bottom:1px solid var--pico-muted-border-color);margin-bottom:var(--pico-spacing);margin-left:0.5rem;"
>
	<div>
		<div class="grid">
			<div>
				<PropertyRowStatic property={filmography.property} />
				<small
					><em>
						{#if $LocalEnSwitch == 'local'}
							{filmography.department.titleLocal}
						{:else}
							{filmography.department.titleEn}
						{/if}
					</em>
				</small>
				{#if !filmography.editing}
					<HasEntitySubtextStatic hasEntity={filmography} />
				{:else}
					<div>
						<Button
							className="outline"
							icon="edit"
							label={_('Edit Work')}
							onclick={() => {
								goto(`/work/${filmography.work.id}/edit`, {
									invalidateAll: true
								});
							}}
						/>
					</div>
					<PairOfInputs
						bind:local={filmography.subtextLocal}
						bind:en={filmography.subtextEn}
						label={_('Memo')}
					/>
				{/if}
			</div>
			<div style="margin-left:1rem">
				<div class="flex">
					<div style="flex:1; display:flex">
						<a class="contrast" href="/work/{filmography.work.id}">
							{#if $LocalEnSwitch == 'local'}
								{filmography.work.titleLocal}
							{:else}
								{filmography.work.titleEn}
							{/if}
						</a>
						{#if filmography.work.videoURL}
							<span style="margin-left:var(--pico-spacing)">
								<Icon icon="smart_display" />
							</span>
						{/if}
					</div>

					<div>
						{#if filmography.distributions && filmography.distributions.length}
							{#each filmography.distributions as distribution}
								<div>
									<small>
										<DistributionRowStatic {distribution} />
									</small>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
	{#if editable}
		<div style="min-width:6rem; display:flex;justify-content:end">
			<EditControlButtons
				onDelete={async () => {
					if (!(await myConfirm(_('Are you sure?')))) return;
					await filmography.delete();
					filmography.editing = false;
					if (onDelete) {
						onDelete();
					}
				}}
				onSave={async () => {
					onUpdate(filmography);
					filmography.editing = false;
				}}
				{onUp}
				{onDown}
				bind:editing={filmography.editing}
			/>
		</div>
	{:else}
		<GoodJobButton bind:goodJobs={filmography.goodJobs} bind:filmography />
	{/if}
</div>

<style>
	.flex {
		display: flex;
		gap: 0.4rem;
	}
</style>
