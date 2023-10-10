<script lang="ts">
	import type { Entity } from '$lib/frontend/class/Entity';
	import { LocalEnSwitch } from '$lib/frontend/store';

	export let entity: Entity;
</script>

<div>
	{#each entity.popularCreditTitles as title, index}
		{#if $LocalEnSwitch == 'local'}
			<mark>
				{title.local}
			</mark>
		{:else}
			<mark>
				{title.en}
			</mark>
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
