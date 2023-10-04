<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$lib/frontend/class/API';
	import { Work } from '$lib/frontend/class/Work';
	import { search } from '$lib/frontend/search';
	import WorkCard from '../../../../components/organisms/WorkCard.svelte';
	import SearchResults from '../../../../components/panels/SearchResults.svelte';
	import type { PageData } from './$types';

	$: results = search($page.params.keywords, 'work').then((works) => {
		return works.map((work) => {
			return new Work(work);
		});
	});
</script>

{#await results}
	Searching
{:then works}
	{#each works as work}
		<WorkCard {work} />
	{/each}
{/await}
