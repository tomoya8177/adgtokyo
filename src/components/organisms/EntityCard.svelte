<script lang="ts">
	import type { Entity } from '$lib/frontend/class/Entity';
	import EntityNameStaticSmall from '../molecules/EntityNameStaticSmall.svelte';

	export let entity: Entity;
</script>

<article class="card">
	<EntityNameStaticSmall {entity} />
</article>
