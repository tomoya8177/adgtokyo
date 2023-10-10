<script lang="ts">
	import { goto } from '$app/navigation';
	import { Work } from '$lib/frontend/class/Work';
	import { BottomNavButton } from '$lib/frontend/store';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _ } from '$lib/frontend/i18n';
	import { Attachment } from '$lib/frontend/class/Attachments';
	import WorkCard from '$components/organisms/WorkCard.svelte';
	import TopSlideShow from '$components/atoms/TopSlideShow.svelte';
	import Heading from '$components/atoms/Heading.svelte';
	export let data: PageData;

	let works = data.works.map((work) => {
		work.attachments = data.attachments
			.filter((attachment) => attachment.attachedTo == work.id)
			.map((attachment) => {
				return new Attachment(attachment);
			});
		return new Work(work);
	});
	onMount(async () => {
		BottomNavButton.set({
			label: _('Create New Work'),
			onClick: () => {
				goto(`/work/create`);
			}
		});
	});
</script>

<svelte:head>
	<title>ADG Tokyo</title>
</svelte:head>
<section>
	<TopSlideShow />
</section>
<Heading label={_('Recently Added Works')} />

{#each works as work}
	<WorkCard {work} />
{/each}
