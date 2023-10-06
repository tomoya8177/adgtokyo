<script lang="ts">
	import type { Entity } from '$lib/frontend/class/Entity';
	import { LocalEnSwitch } from '$lib/frontend/store';

	export let entity: Entity;
</script>

{#each entity.popularCreditTitles as title, index}
	{#if $LocalEnSwitch == 'local'}
		{title.local}
	{:else}
		{title.en}
	{/if}
	{#if index != entity.popularCreditTitles.length - 1}
		<span> | </span>
	{/if}
{/each}
