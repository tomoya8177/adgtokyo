<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, LocalEnSwitch, UpdatedData } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import EntityNameStatic from '../../../components/atoms/EntityNameStatic.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import EntityCreditRow from '../../../components/organisms/EntityCreditRow.svelte';
	import Heading from '../../../components/atoms/Heading.svelte';
	import { workCategory } from '$lib/Category';
	import HeadingLabel from '../../../components/atoms/HeadingLabel.svelte';
	import { Entity } from '$lib/frontend/class/Entity';
	import ImageSlider from '../../../components/organisms/ImageSlider.svelte';
	import { myConfirm } from '$lib/frontend/class/Confirm';
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

<div style="text-align:right">
	<a href={`/crew/${entity.id}/edit`}>{_('Edit This Page')}</a>

	|
	<a
		on:click={async () => {
			if (
				await myConfirm(
					_(
						'Please contact support for claiming the entity ownership. Do you want to proceed to the support form?'
					)
				)
			) {
				goto('https://adgtokyo.channel.io/home');
			}
		}}
		href={'#'}>{_('Claim this is me')}</a
	>
</div>

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
				<EntityCreditRow onUpdate={() => {}} bind:hasEntity />
			{/each}
		</section>
	{/if}
{/each}
