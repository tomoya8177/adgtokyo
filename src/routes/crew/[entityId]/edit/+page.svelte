<script lang="ts">
	import EntityCreditRow from '../../../../components/organisms/EntityCreditRow.svelte';
	import EntityNameEdit from '../../../../components/molecules/EntityNameEdit.svelte';
	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, User } from '$lib/frontend/store';
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
	export let data: PageData;
	let person = new Entity(data.person);
	person.build(data);
	onMount(() => {
		BottomNavButton.set({
			label: _('Done Editing'),
			onClick: () => {
				location.href = `/crew/${person.id}`;
			}
		});
	});
</script>

{#if $User.authenticated}
	<div class="justified-flex">
		<div>
			{#if !person.editing}
				<EntityNameStatic entity={person} />
			{:else}
				<EntityNameEdit bind:person />
			{/if}
		</div>
		<div>
			<EditControlButtons
				bind:editing={person.editing}
				onDelete={async () => {
					if (!(await myConfirm(_('Are you sure you want to delete this person?')))) return;

					await person.delete();
					goto('/');
				}}
				onSave={async () => {
					person.update({
						nameLocal: person.nameLocal,
						nameEn: person.nameEn,
						descriptionLocal: person.descriptionLocal,
						descriptionEn: person.descriptionEn,
						imdbURL: person.imdbURL,
						officialWebsiteURL: person.officialWebsiteURL
					});
					person.editing = false;
				}}
			/>
		</div>
	</div>
	<hr />
	<Heading label={_('Filmography')} />
	{#each workCategory as category}
		{@const hasEntities = person.hasEntities.filter((has) => has.work.category == category.title)}
		{#if hasEntities.length}
			<HeadingLabel label={_(category.title)} />

			{#each hasEntities as hasEntity, index}
				<EntityCreditRow
					bind:hasEntity
					editable
					onDelete={() => {
						person.hasEntities = person.hasEntities.filter((h) => h.id != hasEntity.id);
					}}
					onUp={index != 0
						? () => {
								hasEntity.weight = index;
								api.put('/api/WeightForEntity/' + hasEntity.weightId, { weight: hasEntity.weight });
								const prev = hasEntities[index - 1];
								prev.weight += 1;
								api.put('/api/WeightForEntity/' + prev.weightId, { weight: prev.weight });
								person.hasEntities.sort((a, b) => (a.weight > b.weight ? 1 : -1));

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
								person.hasEntities.sort((a, b) => (a.weight > b.weight ? 1 : -1));
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
			goto(`/work/create/${person.id}`);
		}}
	/>
{:else if $User.authenticated === false}
	<LoginWarningModal />
{/if}
