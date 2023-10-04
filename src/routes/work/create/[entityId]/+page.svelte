<script lang="ts">
	import WorkInitialInput from './../WorkInitialInput.svelte';
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
				if (!work.validate()) {
					return;
				}
				await work.create();
				await department.create();
				await property.create();
				await distribution.create();
				await new PropertyHasEntity({
					propertyId: property.id,
					entityId: $page.params.entityId
				}).create();
				await new History({
					userId: $User.profile.sub,
					action: 'create',
					target: 'work',
					workId: work.id
				}).create();

				goto('/crew/' + $page.params.entityId + '/edit');
			}
		});
	});
</script>

{#if $User.authenticated}
	<h2>{_('Create New Work')}</h2>
	<Heading label={_('Work')} />
	<WorkInitialInput bind:work />
	<Heading label={_('Release Info')} />
	<DistributionInput bind:distribution />
	<hr />
	<Heading label={_('Department')} />
	<DepartmentTitleInput {department} />
	<Heading label={_('Credit Title')} />
	<PropertyKeyInput {property} />
{:else if $User.authenticated === false}
	{_('You need to be logged in to create a work.')}
	<button
		on:click={() => {
			$auth0.login();
		}}
	>
		{_('Login')}
	</button>
{/if}
