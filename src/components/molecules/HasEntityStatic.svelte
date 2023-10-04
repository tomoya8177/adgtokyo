<script lang="ts">
	import HasEntitySubtextStatic from './HasEntitySubtextStatic.svelte';

	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';

	import { LocalEnSwitch } from '$lib/frontend/store';
	export let hasEntity: PropertyHasEntity;
</script>

<div style="margin-right:var(--pico-spacing)">
	<a href={`/crew/${hasEntity.entity?.id}`}>
		{#if $LocalEnSwitch == 'local'}
			{hasEntity.entity?.nameLocal}
		{:else}
			{hasEntity.entity?.nameEn}
		{/if}
	</a>
</div>

<HasEntitySubtextStatic {hasEntity} />
