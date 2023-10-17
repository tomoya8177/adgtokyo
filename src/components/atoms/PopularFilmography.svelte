<script lang="ts">
	import type { Entity } from '$lib/frontend/class/Entity';
	import { LocalEnSwitch } from '$lib/frontend/store';

	export let entity: Entity;
	export let simple = false;
</script>

<div>
	{#each entity.popularCreditTitles as title, index}
		{#if $LocalEnSwitch == 'local'}
			<svelte:element this={simple ? 'span' : 'mark'}>
				{title.local}
			</svelte:element>
		{:else}
			<svelte:element this={simple ? 'span' : 'mark'}>
				{title.en}
			</svelte:element>
		{/if}
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
</style>
