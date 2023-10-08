<script lang="ts">
	import WorkTitleDistribution from './WorkTitleDistributionEdit.svelte';

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
	import LoginWarningModal from '../../../../components/panels/LoginWarningModal.svelte';
	let work = new Work({});
	let department = new Department({
		workId: work.id
	});
	let property = new Property({
		departmentId: department.id
	});
	let distribution = new Distribution({
		workId: work.id
	});
	onMount(() => {
		BottomNavButton.set({
			label: _('Proceed'),
			onClick: async () => {
				if (!work.validate() || !department.validate() || !property.validate()) {
					return false;
				}
				$BottomNavButton.busy = true;
				await work.create();
				await department.create();
				await property.create();
				await distribution.create();
				await new PropertyHasEntity({
					propertyId: property.id,
					entityId: $page.params.entityId
				}).create();

				goto('/crew/' + $page.params.entityId + '/edit');
			}
		});
	});
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

{#if $User.authenticated}
	<h2>{_('Create New Work')}</h2>

	<WorkTitleDistribution bind:work bind:distribution />
	<hr />
	<Heading label={_('Department')} />
	<DepartmentTitleInput {department} />
	<Heading label={_('Credit Title')} />
	<PropertyKeyInput {property} />
{:else if $User.authenticated === false}
	<LoginWarningModal />
{/if}
