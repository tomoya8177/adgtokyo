<script lang="ts">
	import PropertyRowEdit from './PropertyRowEdit.svelte';

	import { Work } from '$lib/frontend/class/Work';
	import { _ } from '$lib/frontend/i18n';
	import { User, auth0 } from '$lib/frontend/store';
	import Button from '../../../components/atoms/Button.svelte';
	import { Entity } from '$lib/frontend/class/Entity';
	import { PropertyHasEntity } from '$lib/frontend/class/PropertyHasEntity';
	import { Property } from '$lib/frontend/class/Property';
	import { Department } from '$lib/frontend/class/Department';
	let work = new Work({});
</script>

{#if $User.authenticated}
	<h2>{_('Create New Work')}</h2>
	<label>
		{_('Title')}
		({_('Local')})

		<input type="text" bind:value={work.titleLocal} />
	</label>
	<label>
		{_('Title')}
		({_('English')})
		<input type="text" bind:value={work.titleEn} />
	</label>
	<h3>
		{_('Departments')}
	</h3>
	{#each work.departments as department}
		<div class="box">
			<div style="display:flex">
				<div>
					{department.weight}
				</div>
				<label>
					{_('Department')}
					({_('Local')})

					<input type="text" bind:value={department.titleLocal} />
				</label>
				<label>
					{_('Department')}
					({_('Local')})
					<input type="text" bind:value={department.titleEn} />
				</label>
			</div>
			<div style="padding-left:2rem">
				{#each department.properties as property}
					<div class="box">
						<PropertyRowEdit bind:property />
					</div>
				{/each}
				<Button
					className="secondary"
					icon="add"
					label={_('Add A Parameter')}
					onclick={() => {
						department.properties = [
							...department.properties,
							new Property({ weight: department.properties.length + 1 })
						];
					}}
				/>
			</div>
		</div>
	{/each}
	<Button
		className="secondary"
		icon="add"
		label={_('Add A Department')}
		onclick={() => {
			work.departments = [
				...work.departments,
				new Department({ weight: work.departments.length + 1 })
			];
		}}
	/>
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

<style>
	.box {
		border: 1px solid rgba(100, 100, 100, 0.5);
		padding: var(--spacing);
		margin-bottom: var(--spacing);
		border-radius: var(--border-radius);
	}
</style>
