<script lang="ts">
	import EntityCreditRow from '$components/organisms/EntityCreditRow.svelte';
	import EntityNameEdit from '$components/molecules/EntityNameEdit.svelte';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, User } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import EntityNameStatic from '$components/atoms/EntityNameStatic.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import EditControlButtons from '$components/molecules/EditControlButtons.svelte';
	import { api } from '$lib/frontend/class/API';
	import Heading from '$components/atoms/Heading.svelte';
	import { myConfirm } from '$lib/frontend/class/Confirm';
	import LoginWarningModal from '$components/panels/LoginWarningModal.svelte';
	import { workCategory } from '$lib/Category';
	import HeadingLabel from '$components/atoms/HeadingLabel.svelte';
	import { Entity } from '$lib/frontend/class/Entity';
	import type { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import Button from '$components/UIComponents/Button.svelte';
	export let data: PageData;
	let entity = new Entity(data.entity);
	entity.build(data);
	onMount(() => {
		BottomNavButton.set({
			label: _('Done Editing'),
			onClick: async () => {
				$BottomNavButton.busy = true;
				if (entity.editing) {
					await entityUpdate(entity);
				}
				const promises: Promise<any>[] = [];
				entity.filmographies.forEach((hasEntity) => {
					if (hasEntity.editing) {
						promises.push(hasEntityUpdate(hasEntity));
					}
				});
				await Promise.all(promises);
				goto(`/crew/${entity.id}`, {
					invalidateAll: true
				});
			}
		});
	});
	const hasEntityUpdate = async (hasEntity: PropertyHasEntity) => {
		await hasEntity.update({
			subtextLocal: hasEntity.subtextLocal,
			subtextEn: hasEntity.subtextEn
		});
		hasEntity.editing = false;
		return true;
	};
	const entityUpdate = async (entity: Entity) => {
		await entity.update({
			nameLocal: entity.nameLocal,
			nameEn: entity.nameEn,
			descriptionLocal: entity.descriptionLocal,
			descriptionEn: entity.descriptionEn,
			imdbURL: entity.imdbURL,
			officialWebsiteURL: entity.officialWebsiteURL
		});
		entity.editing = false;
		return true;
	};
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
					entityUpdate(entity);
					entity.editing = false;
				}}
			/>
		</div>
	</div>
	<hr />
	<Heading label={_('Filmography')} />
	{#each workCategory as category}
		{@const filmographies = entity.filmographies.filter((has) => {
			if (!has.work) return false;
			return has.work.category == category.title;
		})}
		{#if filmographies.length}
			<HeadingLabel label={_(category.title)} />

			{#each filmographies as filmography, index}
				<EntityCreditRow
					bind:filmography
					editable
					onUpdate={hasEntityUpdate}
					onDelete={() => {
						entity.filmographies = entity.filmographies.filter((h) => h.id != filmography.id);
					}}
					onUp={index != 0
						? () => {
								filmography.weight = index;
								api.put('/api/WeightForEntity/' + filmography.weightId, {
									weight: filmography.weight
								});
								const prev = filmographies[index - 1];
								prev.weight += 1;
								api.put('/api/WeightForEntity/' + prev.weightId, { weight: prev.weight });
								entity.filmographies.sort((a, b) => (a.weight > b.weight ? 1 : -1));

								//sort view
						  }
						: false}
					onDown={index != filmographies.length - 1
						? () => {
								filmography.weight = index + 2;
								api.put('/api/WeightForEntity/' + filmography.weightId, {
									weight: filmography.weight
								});
								const next = filmographies[index + 1];
								next.weight -= 1;
								api.put('/api/WeightForEntity/' + next.weightId, { weight: next.weight });
								entity.filmographies.sort((a, b) => (a.weight > b.weight ? 1 : -1));
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
