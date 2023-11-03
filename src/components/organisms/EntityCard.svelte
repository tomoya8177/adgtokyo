<script lang="ts">
	import TotalGoodJobCount from '$components/UIComponents/TotalGoodJobCount.svelte';
	import PopularFilmography from '$components/atoms/PopularFilmography.svelte';
	import type { Entity } from '$lib/frontend/class/Entity';
	import { GoodJob } from '$lib/frontend/class/GoodJob';
	import EntityNameStaticSmall from '../molecules/EntityNameStaticSmall.svelte';

	export let entity: Entity;
</script>

<article class="card">
	<h3>
		<EntityNameStaticSmall {entity} />
	</h3>
	<PopularFilmography {entity} />
	<div class="totalGoodJobs">
		<TotalGoodJobCount withLabel={false} count={entity.totalGoodJobs} />
	</div>
</article>

<style>
	.totalGoodJobs {
		display: flex;
		justify-content: flex-end;
	}
</style>
