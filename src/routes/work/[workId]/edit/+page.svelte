<script lang="ts">
	import { Department } from '$lib/frontend/class/Department';
	import { Property } from '$lib/frontend/class/Property';
	import { Work } from '$lib/frontend/class/Work';

	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import Button from '../../../../components/atoms/Button.svelte';
	import PropertyRowEdit from '../../create/PropertyRowEdit.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let work = new Work(data.work);
</script>

<h2>
	{#if $LocalEnSwitch == 'local'}
		{work.titleLocal}
	{:else}
		{work.titleEn}
	{/if}
</h2>

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
