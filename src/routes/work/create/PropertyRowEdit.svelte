<script lang="ts">
	import HasEntityEdit from './HasEntityEdit.svelte';

	import type { Property } from '$lib/frontend/class/Property';
	import { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { User, auth0 } from '$lib/frontend/store';
	import Button from '../../../components/atoms/Button.svelte';
	import { Entity } from '$lib/frontend/class/Entity';
	let work = new Work({});
	export let property: Property;
</script>

<div style="display:flex;">
	<div>
		{property.weight}
	</div>
	<div>
		<div>
			<label
				>Credit Title (Local)
				<input bind:value={property.keyLocal} />
			</label>
		</div>
		<div>
			<label
				>Credit Title (English)
				<input bind:value={property.keyEn} />
			</label>
		</div>
	</div>
	<div style="padding-left:1rem">
		{#each property.hasEntities as hasEntity}
			<div style="display:flex;border-bottom:1px solid grey">
				<div>
					{hasEntity.weight}
				</div>
				<HasEntityEdit {hasEntity} />
				<div>
					<div>
						<label
							>Memo (Local)
							<input bind:value={hasEntity.subtextLocal} />
						</label>
					</div>
					<div>
						<label
							>Memo (English)
							<input bind:value={hasEntity.subtextEn} />
						</label>
					</div>
				</div>
			</div>
		{/each}
		<Button
			icon="add"
			className="secondary"
			label={_('Add Name')}
			onclick={() => {
				property.hasEntities = [
					...property.hasEntities,
					new PropertyHasEntity({ weight: property.hasEntities.length + 1 })
				];
			}}
		/>
	</div>
</div>
