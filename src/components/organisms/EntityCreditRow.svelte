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
	export let hasEntity: any;
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
				<PropertyRowStatic property={hasEntity.property} />
				<small
					><em>
						{#if $LocalEnSwitch == 'local'}
							{hasEntity.department.titleLocal}
						{:else}
							{hasEntity.department.titleEn}
						{/if}
					</em>
				</small>
				{#if !hasEntity.editing}
					<HasEntitySubtextStatic {hasEntity} />
				{:else}
					<div>
						<Button
							className="outline"
							icon="edit"
							label={_('Edit Work')}
							onclick={() => {
								goto(`/work/${hasEntity.work.id}/edit`, {
									invalidateAll: true
								});
							}}
						/>
					</div>
					<PairOfInputs
						bind:local={hasEntity.subtextLocal}
						bind:en={hasEntity.subtextEn}
						label={_('Memo')}
					/>
				{/if}
			</div>
			<div style="margin-left:1rem">
				<div class="flex">
					<div style="flex:1; display:flex">
						<a class="contrast" href="/work/{hasEntity.work.id}">
							{#if $LocalEnSwitch == 'local'}
								{hasEntity.work.titleLocal}
							{:else}
								{hasEntity.work.titleEn}
							{/if}
						</a>
						{#if hasEntity.work.videoURL}
							<span style="margin-left:var(--pico-spacing)">
								<Icon icon="smart_display" />
							</span>
						{/if}
					</div>

					<div>
						{#if hasEntity.distributions && hasEntity.distributions.length}
							{#each hasEntity.distributions as distribution}
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
					await hasEntity.delete();
					hasEntity.editing = false;
					if (onDelete) {
						onDelete();
					}
				}}
				onSave={async () => {
					onUpdate(hasEntity);
					hasEntity.editing = false;
				}}
				{onUp}
				{onDown}
				bind:editing={hasEntity.editing}
			/>
		</div>
	{:else}
		<GoodJobButton {hasEntity} />
	{/if}
</div>

<style>
	.flex {
		display: flex;
		gap: 0.4rem;
	}
</style>
