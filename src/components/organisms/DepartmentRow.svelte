<script lang="ts">
	import type { Department } from '$lib/frontend/class/Department';
	import { Property } from '$lib/frontend/class/Property';
	import { _ } from '$lib/frontend/i18n';
	import Button from '../UIComponents/Button.svelte';
	import DepartmentRowHeader from '../molecules/DepartmentRowHeader.svelte';
	import PropertyRow from './PropertyRow.svelte';
	import { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	export let department: Department;
	export let onDelete: () => void;
	export let onUp: (() => void) | false;
	export let onDown: (() => void) | false;
	export let onUpdate: (department: Department) => void;
	export let onPropertyUpdate: (property: Property) => void;
	export let onHasEntityUpdate: (hasEntity: PropertyHasEntity) => Promise<boolean>;
	let creditTitleBusy = false;
</script>

<article class="card">
	<DepartmentRowHeader {onUp} {onDown} bind:department {onDelete} {onUpdate} />
	<div>
		{#each department.properties as property, index}
			<PropertyRow
				onUpdate={onPropertyUpdate}
				{onHasEntityUpdate}
				onUp={index != 0
					? () => {
							property.weight = index;
							property.update({
								weight: property.weight
							});
							const prev = department.properties[index - 1];
							prev.weight += 1;
							prev.update({
								weight: prev.weight
							});
							department.properties.sort((a, b) => (a.weight > b.weight ? 1 : -1));
					  }
					: false}
				onDown={index != department.properties.length - 1
					? () => {
							property.weight = index + 2;
							property.update({
								weight: property.weight
							});
							const next = department.properties[index + 1];
							next.weight -= 1;
							next.update({
								weight: next.weight
							});
							department.properties.sort((a, b) => (a.weight > b.weight ? 1 : -1));
					  }
					: false}
				bind:property
				onDelete={() => {
					department.properties = department.properties.filter((p) => p.id !== property.id);
				}}
			/>
		{/each}
		<Button
			busy={creditTitleBusy}
			className="outline"
			icon="add"
			label={_('Add Credit Title')}
			onclick={async () => {
				creditTitleBusy = true;
				const property = await new Property({
					weight: department.properties.length + 1,
					departmentId: department.id
				}).create();
				const hasEntity = new PropertyHasEntity({
					propertyId: property.id,
					weight: 1,
					anew: true
				});
				hasEntity.editing = true;
				property.hasEntities = [hasEntity];
				property.editing = true;
				department.properties = [...department.properties, property];
				creditTitleBusy = false;
			}}
		/>
	</div>
</article>
