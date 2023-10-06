<script lang="ts">
	import { Work } from '$lib/frontend/class/Work';

	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton, LocalEnSwitch } from '$lib/frontend/store';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ImageSlider from '../../../components/organisms/ImageSlider.svelte';
	import WorkTitleStatic from '../../../components/atoms/WorkTitleStatic.svelte';
	import DepartmentHeaderStatic from '../../../components/atoms/DepartmentHeaderStatic.svelte';
	import PropertyRowStatic from '../../../components/atoms/PropertyRowStatic.svelte';
	import HasEntityStatic from '../../../components/molecules/HasEntityStatic.svelte';
	export let data: PageData;
	let work = new Work(data.work);
	console.log({ departments: data.departments });
	work.build(data);

	console.log({ work });
	onMount(() => {
		BottomNavButton.set({
			label: _('Edit This Page'),
			onClick: () => {
				goto(`/work/${work.id}/edit`);
			}
		});
	});
</script>

<WorkTitleStatic {work} />
{#if work.attachments.length > 0}
	<ImageSlider isStatic bind:images={work.attachments} editing={false} />
{/if}
<hr />
<h4>
	{_('Release Info')}
</h4>
{#each work.distributions as distribution}
	<div>
		{distribution.year}
		{#if $LocalEnSwitch == 'local'}
			{distribution.regionLocal}
		{:else}
			{distribution.regionEn}
		{/if}
	</div>
{/each}
<hr />
<h4>
	{_('Crew List')}
</h4>
{#each work.departments as department, index}
	<section>
		<DepartmentHeaderStatic {department} />
		{#each department.properties as property}
			<div class="grid">
				<div class="titles">
					<PropertyRowStatic {property} />
				</div>
				<div class="names">
					{#each property.hasEntities as hasEntity}
						<div style="display:flex">
							<HasEntityStatic {hasEntity} />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>
{/each}

<style>
	.grid {
		margin-left: 1rem;
		margin-bottom: var(--pico-spacing);
		border-bottom: solid 1px var(--pico-card-border-color);
	}

	.names {
		margin-left: 1rem;
	}
</style>
