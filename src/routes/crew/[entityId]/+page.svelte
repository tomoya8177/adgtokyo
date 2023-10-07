<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, LocalEnSwitch, UpdatedData } from '$lib/frontend/store';
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
	import { workCategory } from '$lib/Category';
	import HeadingLabel from '../../../components/atoms/HeadingLabel.svelte';
	import { Entity } from '$lib/frontend/class/Entity';
	import ImageSlider from '../../../components/organisms/ImageSlider.svelte';
	import { page } from '$app/stores';
	export let data: PageData;
	let entity = new Entity(data.entity);
	entity.build(data);
	onMount(() => {
		if ($page.url.href.includes('#updated') && $UpdatedData && $UpdatedData instanceof Entity) {
			console.log('updated');
			//need to reload data
			entity = $UpdatedData;
		}
		BottomNavButton.set({
			label: _('Edit This Page'),
			onClick: () => {
				goto(`/crew/${entity.id}/edit`);
			}
		});
	});
</script>

<EntityNameStatic {entity} />
{#if entity.attachments.length > 0}
	<hr />
	<ImageSlider isStatic bind:images={entity.attachments} editing={false} />
{/if}

<hr />
<Heading label={_('Filmography')} />
{#each workCategory as category}
	{@const hasEntities = entity.hasEntities.filter((has) => has.work.category == category.title)}
	{#if hasEntities.length}
		<section>
			<HeadingLabel label={_(category.title)} />
			{#each hasEntities as hasEntity}
				<EntityCreditRow bind:hasEntity />
			{/each}
		</section>
	{/if}
{/each}
