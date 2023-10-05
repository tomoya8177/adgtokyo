<script lang="ts">
	import WorkInitialInput from '../../../components/molecules/WorkTitleInput.svelte';
	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, User, auth0 } from '$lib/frontend/store';
	import { Department } from '$lib/frontend/class/Department';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { History } from '$lib/frontend/class/History';
	import LoginWarningModal from '../../../components/panels/LoginWarningModal.svelte';
	import { Distribution } from '$lib/frontend/class/Distribution';
	import WorkTitleDistributionEdit from './[entityId]/WorkTitleDistributionEdit.svelte';
	let work = new Work({});
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
				const response = await work.create();
				console.log({ response }, work.id);
				await new History({
					userId: $User.profile.sub,
					action: 'create',
					target: 'work',
					workId: work.id
				}).create();
				await new Department({
					titleLocal: _('Art Department'),
					titleEn: 'Art Department',
					weight: 1,
					workId: work.id
				}).create();
				await new Department({
					titleLocal: _('Other Department'),
					titleEn: 'Other Department',
					weight: 2,
					workId: work.id
				}).create();

				goto('/work/' + work.id + '/edit');
			}
		});
	});
</script>

{#if $User.authenticated}
	<h2>{_('Create New Work')}</h2>
	<WorkTitleDistributionEdit bind:work bind:distribution />
{:else if $User.authenticated === false}
	<LoginWarningModal />
{/if}
