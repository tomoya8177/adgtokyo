<script lang="ts">
	import OwnershipDisplay from '$components/organisms/OwnershipDisplay.svelte';

	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import EntityNameStatic from '$components/atoms/EntityNameStatic.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import EntityCreditRow from '$components/organisms/EntityCreditRow.svelte';
	import Heading from '$components/UIComponents/Heading.svelte';
	import { workCategory } from '$lib/Category';
	import HeadingLabel from '$components/UIComponents/HeadingLabel.svelte';
	import { Entity } from '$lib/frontend/class/Entity';
	import ImageSlider from '$components/organisms/ImageSlider.svelte';
	export let data: PageData;
	let entity = new Entity(data.entity);
	entity.build(data);
	onMount(() => {
		BottomNavButton.set({
			label: _('Edit This Page'),
			onClick: () => {
				goto(`/crew/${entity.id}/edit#updated`, {
					invalidateAll: true
				});
			}
		});
	});
</script>

<div class="justified-flex">
	<div />
	<div style="display:flex; gap:0.4rem">
		<div>
			<a href={`/crew/${entity.id}/edit`}>{_('Edit This Page')}</a>
		</div>
		<div>|</div>
		<OwnershipDisplay {entity} />
	</div>
</div>

<EntityNameStatic {entity} />
{#if entity.attachments.length > 0}
	<hr />
	<ImageSlider isStatic bind:images={entity.attachments} editing={false} />
{/if}

<hr />
<div class="filmography">
	<Heading label={_('Filmography')} />
	{#each workCategory as category}
		{@const filmographies = entity.filmographies.filter((has) => {
			if (!has.work) return false;
			return has.work.category == category.title;
		})}

		{#if filmographies.length}
			<section>
				<HeadingLabel label={_(category.title)} />
				{#each filmographies as filmography}
					<EntityCreditRow onUpdate={() => {}} bind:filmography />
				{/each}
			</section>
		{/if}
	{/each}
</div>

<style>
	.filmography {
		overflow: hidden;
	}
</style>
