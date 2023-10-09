<script lang="ts">
	import WorkTitleInput from './WorkTitleInput.svelte';
	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import Heading from '../atoms/Heading.svelte';
	import type { Distribution } from '$lib/frontend/class/Distribution';
	import DistributionInput from '../atoms/DistributionInput.svelte';
	import Icon from '../atoms/Icon.svelte';
	import { search } from '$lib/frontend/search';
	import { api } from '$lib/frontend/class/API';
	export let work: Work;
	export let distribution: Distribution;
	let searching = false;
	const findExistingEntity = async (inputLocal: string, inputEn: string) => {
		console.log({ work, inputLocal, inputEn });
		const keyword = `${inputLocal.length > 2 ? inputLocal : ''} ${
			inputEn.length > 2 ? inputEn : ''
		}`.trim();
		console.log({ keyword });
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
		console.log({ possibleDuplicates });
	};
	$: findExistingEntity(work.titleLocal, work.titleEn);
	let possibleDuplicates: any[] = [];
</script>

<Heading label={_('Work')} />
<WorkTitleInput bind:work />
{#if possibleDuplicates.length > 0}
	<div>
		{_('Possible duplicates')}:
	</div>
	{#each possibleDuplicates as option}
		<div class="justified-flex">
			<div style="display:flex">
				<Icon icon="movie" />
				<span>
					<small>
						{option.titleLocal}
						{option.titleEn}
						(ID:
						{option.id} )
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
