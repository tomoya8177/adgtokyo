<script lang="ts">
	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import HasEntityEdit from './HasEntityEdit.svelte';
	import Button from '../atoms/Button.svelte';
	import EditControlButtons from '../molecules/EditControlButtons.svelte';
	import HasEntityStatic from '../molecules/HasEntityStatic.svelte';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import PairOfInputs from '../atoms/PairOfInputs.svelte';
	import GoodJobButton from '../molecules/GoodJobButton.svelte';

	export let hasEntity: PropertyHasEntity;
	export let onDelete: () => void;
	export let onUp: (() => void) | false;
	export let onDown: (() => void) | false;
	export let onUpdate: (hasEntity: PropertyHasEntity) => Promise<void | false>;
</script>

<div class="row">
	<div class="flex" style="flex:1">
		{#if hasEntity.editing}
			<div class="flex" style="flex:1">
				<div style="flex:1">
					{#if hasEntity.entityId && hasEntity.entity}
						<div class="flex">
							<div>
								{#if $LocalEnSwitch == 'local'}
									{hasEntity.entity.nameLocal}
								{:else}
									{hasEntity.entity.nameEn}
								{/if}
							</div>
						</div>
						<div>
							<PairOfInputs
								bind:local={hasEntity.subtextLocal}
								bind:en={hasEntity.subtextEn}
								label={_('Memo')}
							/>
						</div>
					{:else}
						<HasEntityEdit bind:hasEntity />
					{/if}
				</div>
			</div>
		{:else}
			<div class="flex">
				<div class="flex">
					<HasEntityStatic {hasEntity} />
				</div>
			</div>
		{/if}
		<div>
			<EditControlButtons
				{onUp}
				{onDown}
				bind:editing={hasEntity.editing}
				onSave={async () => {
					const result = await onUpdate(hasEntity);
					if (result === false) return;
					hasEntity.editing = false;
				}}
				onDelete={async () => {
					if (!(await myConfirm(_('Are you sure?')))) return;
					await hasEntity.delete();
					onDelete();
				}}
			/>
		</div>
	</div>
</div>

<style>
	.row {
		margin-top: var(--pico-spacing);
		border-bottom: 1px solid var(--pico-muted-border-color);
	}
	.flex {
		display: flex;
		justify-content: space-between;
	}
</style>
