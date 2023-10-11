<script lang="ts">
	import { workCategory } from '$lib/Category';
	import type { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import PairOfInputs from '$components/UIComponents/PairOfInputs.svelte';
	export let work: Work;
</script>

<PairOfInputs label={_('Title')} bind:local={work.titleLocal} bind:en={work.titleEn} />
{_('Category')}
<select bind:value={work.category}>
	{#each workCategory as category}
		<option value={category.title}>{_(category.title)}</option>
	{/each}
</select>
