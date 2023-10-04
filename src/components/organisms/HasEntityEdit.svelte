<script lang="ts">
	import { Entity } from '$lib/frontend/class/Entity';
	import type { Property } from '$lib/frontend/class/Property';
	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { User, auth0 } from '$lib/frontend/store';
	import Button from '../atoms/Button.svelte';
	let work = new Work({});
	export let hasEntity: PropertyHasEntity;
	let inputLocal: string = '';
	let inputEn: string = '';
	let dialogOpen = false;
	let category: 'person' | 'business' = 'person';
	let existings: Entity[] = [];
</script>

<div>
	<label
		>{_('Name')} ({_('Local')})
		<input bind:value={inputLocal} />
	</label>
	<label
		>{_('Name')} ({_('English')})
		<input bind:value={inputEn} />
	</label>
	<button
		on:click={() => {
			dialogOpen = true;
		}}
		>Register
	</button>
</div>
<dialog open={dialogOpen}>
	<article>
		<label
			>{_('Name')} ({_('Local')})
			<input bind:value={inputLocal} />
		</label>
		<label
			>{_('Name')} ({_('English')})
			<input bind:value={inputEn} />
		</label>
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
		{#if existings.length}
			{_('Possible Duplicates')}
			{#each existings as entity}
				<div>
					{entity.nameLocal}
					{entity.nameEn}
				</div>
			{/each}
		{/if}
		<footer>
			<button
				on:click={() => {
					dialogOpen = false;
				}}
				class="outline"
			>
				{_('Cancel')}
			</button>
			<button
				on:click={async () => {
					const entity = await new Entity({
						nameLocal: inputLocal,
						nameEn: inputEn,
						category: category
					}).create();
					hasEntity.entityId = entity.id;
					hasEntity.entity = entity;
				}}
			>
				{_('Register As New Entity')}
			</button>
		</footer>
	</article>
</dialog>

<style>
	.noGap {
		display: flex;
		gap: 0px;
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
		padding: 0.2rem;
	}
</style>
