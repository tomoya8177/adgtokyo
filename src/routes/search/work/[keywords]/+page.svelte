<script lang="ts">
	import { page } from '$app/stores';
	import { Work } from '$lib/frontend/class/Work';
	import { search } from '$lib/frontend/search';
	import Searching from '$components/UIComponents/Searching.svelte';
	import WorkCard from '$components/organisms/WorkCard.svelte';
	import NoResults from '$components/UIComponents/NoResults.svelte';

	$: results = search($page.params.keywords, 'work').then((works) => {
		return works.map((work) => {
			return new Work(work);
		});
	});
</script>

{#await results}
	<Searching />
{:then works}
	{#if works.length}
		{#each works as work}
			<WorkCard {work} />
		{/each}
	{:else}
		<NoResults />
	{/if}
{/await}
