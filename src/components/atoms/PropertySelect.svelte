<script lang="ts">
	import { api } from '$lib/frontend/class/API';
	import type { Department } from '$lib/frontend/class/Department';
	import type { Work } from '$lib/frontend/class/Work';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import { onMount } from 'svelte';

	export let work: Work;
	export let value: string;
	let departments: Department[] = [];

	onMount(async () => {
		departments = await api.get(`/api/Department?wordId='${work.id}'`).then((res) => res.data);
		const properties = await api
			.get(
				`/api/Property?departmentId=in:'${departments
					.map((department) => department.id)
					.join("','")}'`
			)
			.then((res) => res.data);
		departments = departments.map((department) => {
			department.properties = properties.filter(
				(property) => property.departmentId == department.id
			);
			return department;
		});
	});
</script>

<select bind:value>
	{#each departments as department}
		{#each department.properties || [] as property}
			<option value={property.id}>
				{#if $LocalEnSwitch == 'local'}
					{department.titleLocal}
				{:else}
					{department.titleEn}
				{/if}
				-
				{#if $LocalEnSwitch == 'local'}
					{property.keyLocal}
				{:else}
					{property.keyEn}
				{/if}
			</option>{/each}
	{/each}
</select>
