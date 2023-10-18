<script lang="ts">
	import { page } from '$app/stores';
	import { Entity } from '$lib/frontend/class/Entity';
	import { _ } from '$lib/frontend/i18n';
	import { search } from '$lib/frontend/search';
	import Searching from '$components/UIComponents/Searching.svelte';
	import EntityCard from '$components/organisms/EntityCard.svelte';
	import NoResults from '$components/UIComponents/NoResults.svelte';
	import { onMount } from 'svelte';

	$: results = search($page.params.keywords, $page.params.personOrBusiness).then((entities) => {
		return entities.map((entity) => {
			entity = new Entity(entity);
			console.log(entity);
			return entity;
		});
	});
</script>

{#await results}
	<Searching />
{:then entities}
	{#if entities.length}
		{#each entities as entity}
			<EntityCard {entity} />
		{/each}
	{:else}
		<NoResults />
	{/if}
{/await}
