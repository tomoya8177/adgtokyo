<script lang="ts">
	import { goto } from '$app/navigation';
	import { DateTime } from 'luxon';
	import { page } from '$app/stores';
	import { PUBLIC_API_KEY, PUBLIC_AUTH0_CLIENT_ID, PUBLIC_AUTH0_DOMAIN } from '$env/static/public';
	import { Work } from '$lib/frontend/class/Work';
	import { BottomNavButton, LocalEnSwitch } from '$lib/frontend/store';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { _ } from '$lib/frontend/i18n';
	import { Attachment } from '$lib/frontend/class/Attachments';
	import SquareThumbnail from '../components/atoms/SquareThumbnail.svelte';
	import DistributionRowStatic from '../components/organisms/DistributionRowStatic.svelte';
	import WorkCard from '../components/organisms/WorkCard.svelte';
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

<h4>
	{_('Recently Added Works')}
</h4>
{#each works as work}
	<WorkCard {work} />
{/each}
