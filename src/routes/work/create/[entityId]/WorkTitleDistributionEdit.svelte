<script lang="ts">
	import WorkTitleInput from '../../../../components/molecules/WorkTitleInput.svelte';
	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, User, auth0 } from '$lib/frontend/store';
	import { Department } from '$lib/frontend/class/Department';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { History } from '$lib/frontend/class/History';
	import Heading from '../../../../components/atoms/Heading.svelte';
	import DepartmentTitleInput from '../../../../components/molecules/DepartmentTitleInput.svelte';
	import PropertyKeyInput from '../../../../components/organisms/PropertyKeyInput.svelte';
	import { Property } from '$lib/frontend/class/Property';
	import { Distribution } from '$lib/frontend/class/Distribution';
	import DistributionRow from '../../../../components/organisms/DistributionRow.svelte';
	import DistributionInput from '../../../../components/atoms/DistributionInput.svelte';
	import { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { page } from '$app/stores';
	import Icon from '../../../../components/atoms/Icon.svelte';
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
				{_('Create credit under this work')}
			</a>
		</div>
	{/each}
	{_('Or create as new work by filling the information belopw.')}
{/if}
<hr />
<Heading label={_('Release Info')} />
<DistributionInput bind:distribution />
