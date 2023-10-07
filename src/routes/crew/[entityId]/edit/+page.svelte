<script lang="ts">
	import EntityCreditRow from '../../../../components/organisms/EntityCreditRow.svelte';
	import EntityNameEdit from '../../../../components/molecules/EntityNameEdit.svelte';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, UpdatedData, User } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import EntityNameStatic from '../../../../components/atoms/EntityNameStatic.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import EditControlButtons from '../../../../components/molecules/EditControlButtons.svelte';
	import Button from '../../../../components/atoms/Button.svelte';
	import { api } from '$lib/frontend/class/API';
	import Heading from '../../../../components/atoms/Heading.svelte';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import LoginWarningModal from '../../../../components/panels/LoginWarningModal.svelte';
	import { workCategory } from '$lib/Category';
	import HeadingLabel from '../../../../components/atoms/HeadingLabel.svelte';
	import { Entity } from '$lib/frontend/class/Entity';
	import { toast } from '$lib/frontend/toast';
	export let data: PageData;
	let entity = new Entity(data.entity);
	entity.build(data);
	onMount(() => {
		BottomNavButton.set({
			label: _('Done Editing'),
			onClick: () => {
				if (entity.editing || entity.hasEntities.some((has) => has.editing)) {
					toast(_('Please save your changes first'));
					return;
				}
				UpdatedData.set(entity);
				goto(`/crew/${entity.id}#updated`);
			}
		});
	});
</script>

{#if $User.authenticated}
	<div class="justified-flex">
		<div>
			{#if !entity.editing}
				<EntityNameStatic {entity} />
			{:else}
				<EntityNameEdit bind:entity />
			{/if}
		</div>
		<div>
			<EditControlButtons
				bind:editing={entity.editing}
				onDelete={async () => {
					if (!(await myConfirm(_('Are you sure you want to delete this entity?')))) return;

					await entity.delete();
					goto('/');
				}}
				onSave={async () => {
					entity.update({
						nameLocal: entity.nameLocal,
						nameEn: entity.nameEn,
						descriptionLocal: entity.descriptionLocal,
						descriptionEn: entity.descriptionEn,
						imdbURL: entity.imdbURL,
						officialWebsiteURL: entity.officialWebsiteURL
					});
					entity.editing = false;
				}}
			/>
		</div>
	</div>
	<hr />
	<Heading label={_('Filmography')} />
	{#each workCategory as category}
		{@const hasEntities = entity.hasEntities.filter((has) => has.work.category == category.title)}
		{#if hasEntities.length}
			<HeadingLabel label={_(category.title)} />

			{#each hasEntities as hasEntity, index}
				<EntityCreditRow
					bind:hasEntity
					editable
					onDelete={() => {
						entity.hasEntities = entity.hasEntities.filter((h) => h.id != hasEntity.id);
					}}
					onUp={index != 0
						? () => {
								hasEntity.weight = index;
								api.put('/api/WeightForEntity/' + hasEntity.weightId, { weight: hasEntity.weight });
								const prev = hasEntities[index - 1];
								prev.weight += 1;
								api.put('/api/WeightForEntity/' + prev.weightId, { weight: prev.weight });
								entity.hasEntities.sort((a, b) => (a.weight > b.weight ? 1 : -1));

								//sort view
						  }
						: false}
					onDown={index != hasEntities.length - 1
						? () => {
								hasEntity.weight = index + 2;
								api.put('/api/WeightForEntity/' + hasEntity.weightId, { weight: hasEntity.weight });
								const next = hasEntities[index + 1];
								next.weight -= 1;
								api.put('/api/WeightForEntity/' + next.weightId, { weight: next.weight });
								entity.hasEntities.sort((a, b) => (a.weight > b.weight ? 1 : -1));
						  }
						: false}
				/>
			{/each}
		{/if}
	{/each}

	<Button
		className="outline"
		icon="add"
		label={_('Add Work')}
		onclick={async () => {
			goto(`/work/create/${entity.id}`);
		}}
	/>
{:else if $User.authenticated === false}
	<LoginWarningModal />
{/if}
