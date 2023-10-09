<script lang="ts">
	import EntityNameInput from './EntityNameInput.svelte';
	import { Entity } from '$lib/frontend/class/Entity';
	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { _ } from '$lib/frontend/i18n';
	export let hasEntity: PropertyHasEntity;
	let inputLocal: string = '';
	let inputEn: string = '';
	let category: 'person' | 'business' = 'person';
	let registerBusy = false;
</script>

<div>
	<EntityNameInput
		bind:inputLocal
		bind:inputEn
		onExistingClicked={async (entity) => {
			hasEntity.entityId = entity.id;
			hasEntity.entity = entity;
			await hasEntity.update({
				entityId: entity.id
			});
		}}
	/>
	<div class="noGap">
		<a
			href={'#'}
			role="button"
			class="leftButton"
			class:outline={category == 'business'}
			on:click={() => {
				category = 'person';
			}}
		>
			{_('Person')}
		</a>
		<a
			href={'#'}
			role="button"
			class="rightButton"
			class:outline={category == 'person'}
			on:click={() => {
				category = 'business';
			}}
		>
			{_('Business')}
		</a>
	</div>
	<button
		aria-busy={registerBusy}
		on:click={async () => {
			registerBusy = true;
			const entity = await new Entity({
				nameLocal: inputLocal,
				nameEn: inputEn,
				category: category
			}).create();
			hasEntity.entityId = entity.id;
			hasEntity.entity = entity;
			registerBusy = false;
		}}
	>
		{_('Register')}
	</button>
</div>

<style>
	.noGap {
		display: flex;
		gap: 0px;
		margin-bottom: var(--pico-spacing);
	}
	.leftButton {
		border-top-right-radius: 0rem;
		border-bottom-right-radius: 0rem;
	}
	.rightButton {
		border-top-left-radius: 0rem;
		border-bottom-left-radius: 0rem;
	}
	a {
		/* padding: 0.2rem; */
	}
</style>
