<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import PropertyRowStatic from '../../../../components/atoms/PropertyRowStatic.svelte';
	import DistributionRowStatic from '../../../../components/organisms/DistributionRowStatic.svelte';
	import EditControlButtons from '../../../../components/molecules/EditControlButtons.svelte';
	import HasEntitySubtextStatic from '../../../../components/molecules/HasEntitySubtextStatic.svelte';
	import HasEntitySubtextInput from '../../../../components/molecules/HasEntitySubtextInput.svelte';
	export let hasEntity: any;
	export let editable = false;
	export let onUp: (() => void) | false = false;
	export let onDown: (() => void) | false = false;
	export let onDelete: (() => void) | false = false;
</script>

<div class="justified-flex" style="border-bottom:1px solid var(--pico-card-border-color)">
	<div>
		<div class="grid">
			<div>
				<PropertyRowStatic property={hasEntity.property} />
				{#if !hasEntity.editing}
					<HasEntitySubtextStatic {hasEntity} />
				{/if}
				<small
					><em>
						{#if $LocalEnSwitch == 'local'}
							{hasEntity.department.titleLocal}
						{:else}
							{hasEntity.department.titleEn}
						{/if}
					</em>
				</small>
				{#if hasEntity.editing}
					<HasEntitySubtextInput {hasEntity} />
				{/if}
			</div>
			<div style="margin-left:1rem">
				<div class="flex">
					<div>
						<a href="/work/{hasEntity.work.id}">
							{#if $LocalEnSwitch == 'local'}
								{hasEntity.work.titleLocal}
							{:else}
								{hasEntity.work.titleEn}
							{/if}
						</a>
					</div>
					<div>
						<small>
							{#if $LocalEnSwitch == 'local'}
								{hasEntity.work.formatLocal}
							{:else}
								{hasEntity.work.formatEn}
							{/if}
						</small>
					</div>
					<div>
						{#each hasEntity.distributions as distribution}
							<div>
								<small>
									<DistributionRowStatic {distribution} />
								</small>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
	{#if editable}
		<div>
			<EditControlButtons
				onDelete={async () => {
					if (!confirm(_('Are you sure?'))) return;
					await hasEntity.delete();
					hasEntity.editing = false;
					if (onDelete) {
						onDelete();
					}
				}}
				onSave={async () => {
					await hasEntity.update({
						subtextLocal: hasEntity.subtextLocal,
						subtextEn: hasEntity.subtextEn
					});
					hasEntity.editing = false;
				}}
				{onUp}
				{onDown}
				bind:editing={hasEntity.editing}
			/>
		</div>
	{/if}
</div>

<style>
	.flex {
		display: flex;
		gap: 0.4rem;
	}
</style>
