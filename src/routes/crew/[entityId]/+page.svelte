<script lang="ts">
	import { Person } from '$lib/frontend/class/Person';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, LocalEnSwitch } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import DepartmentHeaderStatic from '../../../components/atoms/DepartmentHeaderStatic.svelte';
	import EntityNameStatic from '../../../components/atoms/EntityNameStatic.svelte';
	import PropertyRowStatic from '../../../components/atoms/PropertyRowStatic.svelte';
	import WorkTitleStatic from '../../../components/atoms/WorkTitleStatic.svelte';
	import DistributionRowStatic from '../../../components/organisms/DistributionRowStatic.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import HasEntitySubtextStatic from '../../../components/molecules/HasEntitySubtextStatic.svelte';
	import EntityCreditRow from '../../../components/organisms/EntityCreditRow.svelte';
	import Heading from '../../../components/atoms/Heading.svelte';
	export let data: PageData;
	console.log(data.person);
	let person = new Person(data.person);
	person.build(data);
	console.log({ person });
	onMount(() => {
		BottomNavButton.set({
			label: _('Edit This Page'),
			onClick: () => {
				goto(`/crew/${person.id}/edit`);
			}
		});
	});
</script>

<EntityNameStatic entity={person} />
<hr />
<Heading label={_('Filmography')} />
{#each person.hasEntities as hasEntity, index}
	<EntityCreditRow bind:hasEntity />
{/each}

<style>
	.flex {
		display: flex;
		gap: 1rem;
	}
</style>
