<script lang="ts">
	import type { Work } from '$lib/frontend/class/Work';

	import { _ } from '$lib/frontend/i18n';
	import { LocalEnSwitch } from '$lib/frontend/store';
	import ImageSlider from '$components/organisms/ImageSlider.svelte';
	import WorkTitleStatic from '$components/atoms/WorkTitleStatic.svelte';
	import DepartmentHeaderStatic from '$components/atoms/DepartmentHeaderStatic.svelte';
	import PropertyRowStatic from '$components/atoms/PropertyRowStatic.svelte';
	import HasEntityStatic from '$components/molecules/HasEntityStatic.svelte';
	import GoodJobButton from '$components/molecules/GoodJobButton.svelte';
	import Heading from '$components/UIComponents/Heading.svelte';
	export let work: Work;
</script>

<WorkTitleStatic {work} />
{#if work.attachments?.length > 0}
	<hr />

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
<div class="crewList">
	<Heading label={_('Crew List')} />
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
							<div class="justified-flex">
								<HasEntityStatic {hasEntity} />
								<GoodJobButton bind:filmography={hasEntity} bind:goodJobs={hasEntity.goodJobs} />
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</section>
	{/each}
</div>

<style>
	.crewList {
		overflow: hidden;
	}
	.grid {
		margin-left: 1rem;
		margin-bottom: var(--pico-spacing);
		border-bottom: solid 1px var(--pico-muted-border-color);
	}

	.names {
		margin-left: 1rem;
	}
</style>
