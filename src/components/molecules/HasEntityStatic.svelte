<script lang="ts">
	import EntityNameStaticSmall from './EntityNameStaticSmall.svelte';

	import HasEntitySubtextStatic from './HasEntitySubtextStatic.svelte';

	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';

	export let hasEntity: PropertyHasEntity;
</script>

{#if hasEntity.entity}
	<div style="margin-right:var(--pico-spacing)">
		<EntityNameStaticSmall entity={hasEntity.entity} />
	</div>
{/if}

<HasEntitySubtextStatic {hasEntity} />
