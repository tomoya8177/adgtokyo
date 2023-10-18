<script lang="ts">
	import WorkTitleInput from './WorkTitleInput.svelte';
	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import Heading from '$components/UIComponents/Heading.svelte';
	import type { Distribution } from '$lib/frontend/class/Distribution';
	import DistributionInput from '$components/atoms/DistributionInput.svelte';
	import Icon from '$components/UIComponents/Icon.svelte';
	import { search } from '$lib/frontend/search';
	import { api } from '$lib/frontend/class/API';
	export let work: Work;
	export let distribution: Distribution;
	let searching = false;
	const findExistingEntity = async (inputLocal: string, inputEn: string) => {
		const keyword = `${inputLocal.length > 2 ? inputLocal : ''} ${
			inputEn.length > 2 ? inputEn : ''
		}`.trim();
		if (!keyword) return;
		searching = true;
		const workResults = await search(keyword, 'work', 'AND');
		const promises = workResults.map(async (result) => {
			return api.get('/work/' + result.id).then((res) => res.data);
		});
		const results = await Promise.all(promises);
		console.log({ results });
		possibleDuplicates = results.map((result) => {
			const work = new Work(result.work);
			work.build(result);
			return work;
		});
		searching = false;
	};
	$: findExistingEntity(work.titleLocal, work.titleEn);
	let possibleDuplicates: any[] = [];
</script>

<Heading label={_('Work')} />
<WorkTitleInput bind:work />
{#if searching}
	<span aria-busy={true}>
		{_('Searching...')}
	</span>
{/if}
{#if possibleDuplicates.length > 0}
	<div>
		{_('Possible duplicates')}:
	</div>
	{#each possibleDuplicates as option}
		<div class="justified-flex">
			<div style="display:flex">
				<span>
					{option.titleLocal}
					/
					{option.titleEn}
					<small>
						(

						{#each option.distributions as distribution}
							{distribution.year}
							{distribution.regionLocal}
							{distribution.regionEn}
						{/each}
						)
					</small>
				</span>
			</div>
			<a role="button" href={'/work/' + option.id + '/edit'}>
				{_('Jump to work and create credit under this work')}
			</a>
		</div>
	{/each}
	{_('Or create as new work by filling the information belopw.')}
{/if}
<hr />
<Heading label={_('Release Info')} />
<DistributionInput bind:distribution />
