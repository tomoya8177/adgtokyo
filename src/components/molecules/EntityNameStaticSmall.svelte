<script lang="ts">
	import { LocalEnSwitch } from '$lib/frontend/store';
	import type { Entity } from '$lib/frontend/class/Entity';
	export let entity: Entity;
</script>

<a class="contrast" href={`/crew/${entity.id}`}>
	{#if $LocalEnSwitch == 'local'}
		{entity.nameLocal}
	{:else}
		{entity.nameEn}
	{/if}
</a>

<style>
	a {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
</style>
