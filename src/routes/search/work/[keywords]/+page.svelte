<script lang="ts">
	import { page } from '$app/stores';
	import SearchResults from '../../../../components/panels/SearchResults.svelte';
	let searchKeywords = '';
	const search = (keywords: string) => {
		if (keywords) {
			searchKeywords = keywords.split('/').pop() || '';
			searchKeywords = decodeURI(searchKeywords).replace(/　/g, ' ');
		}
		console.log(searchKeywords);
	};
	$: search($page.url.pathname);
</script>

{#key searchKeywords}
	<SearchResults {searchKeywords} category="work" />
{/key}
