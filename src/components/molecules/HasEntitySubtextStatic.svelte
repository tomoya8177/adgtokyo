<script lang="ts">
	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';

	import { LocalEnSwitch } from '$lib/frontend/store';
	export let hasEntity: PropertyHasEntity;
</script>

<em>
	{#if $LocalEnSwitch == 'local'}
		<small>
			{#if hasEntity.subtextLocal}
				(
				{hasEntity.subtextLocal}
				)
			{/if}
		</small>
	{:else}
		<small>
			{#if hasEntity.subtextEn}
				(
				{hasEntity.subtextEn}
				)
			{/if}
		</small>
	{/if}
</em>
