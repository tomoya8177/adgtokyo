<script lang="ts">
	import NoResults from './NoResults.svelte';

	import Searching from './Searching.svelte';

	import { page } from '$app/stores';
	import { Entity } from '$lib/frontend/class/Entity';
	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { search } from '$lib/frontend/search';
	import EntityCard from '../../../../components/organisms/EntityCard.svelte';
	import WorkCard from '../../../../components/organisms/WorkCard.svelte';

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
