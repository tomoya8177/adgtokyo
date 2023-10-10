<script lang="ts">
	import PropertyKeyInput from './PropertyKeyInput.svelte';
	import type { Property } from '$lib/frontend/class/Property';
	import { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { _ } from '$lib/frontend/i18n';
	import EditControlButtons from '../molecules/EditControlButtons.svelte';
	import HasEntityRow from './HasEntityRow.svelte';
	import PropertyRowStatic from '../atoms/PropertyRowStatic.svelte';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import Button from '$components/UIComponents/Button.svelte';
	export let property: Property;
	export let onDelete: () => void;
	export let onUp: (() => void) | false;
	export let onDown: (() => void) | false;
	export let onUpdate: (property: Property) => void;
	export let onHasEntityUpdate: (hasEntity: PropertyHasEntity) => Promise<void>;
</script>

<article>
	<div class="justified-flex">
		<div style="flex:1">
			<!--TITLE-->
			{#if !property.editing}
				<PropertyRowStatic {property} />
			{:else}
				<PropertyKeyInput bind:property />
			{/if}
			<Button
				icon="add"
				className="outline"
				label={_('Add Person / Business')}
				onclick={async () => {
					const hasEntity = await new PropertyHasEntity({
						propertyId: property.id,
						weight: property.hasEntities.length + 1
					}).create();
					hasEntity.editing = true;
					property.hasEntities = [...property.hasEntities, hasEntity];
				}}
			/>
		</div>
		<div>
			<EditControlButtons
				{onUp}
				{onDown}
				bind:editing={property.editing}
				onSave={async () => {
					onUpdate(property);
					property.editing = false;
				}}
				onDelete={async () => {
					if (!(await myConfirm(_('Are you sure?')))) return;
					property.delete();
					onDelete();
				}}
			/>
		</div>
	</div>
	<div>
		<!--Entity-->
		{#each property.hasEntities as hasEntity, index}
			<HasEntityRow
				onUpdate={onHasEntityUpdate}
				onUp={index != 0
					? () => {
							hasEntity.weight = index;
							hasEntity.update({
								weight: hasEntity.weight
							});
							const prev = property.hasEntities[index - 1];
							prev.weight += 1;
							prev.update({
								weight: prev.weight
							});
							property.hasEntities.sort((a, b) => (a.weight > b.weight ? 1 : -1));
					  }
					: false}
				onDown={index != property.hasEntities.length - 1
					? () => {
							hasEntity.weight = index + 2;
							hasEntity.update({
								weight: hasEntity.weight
							});
							const next = property.hasEntities[index + 1];
							next.weight -= 1;
							next.update({
								weight: next.weight
							});
							property.hasEntities.sort((a, b) => (a.weight > b.weight ? 1 : -1));
					  }
					: false}
				bind:hasEntity
				onDelete={() => {
					property.hasEntities = property.hasEntities.filter((h) => h.id != hasEntity.id);
				}}
			/>
		{/each}
	</div>
</article>
