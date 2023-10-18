<script lang="ts">
	import { Work } from '$lib/frontend/class/Work';

	import { _ } from '$lib/frontend/i18n';
	import { BottomNavButton } from '$lib/frontend/store';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import WorkPanel from '$components/panels/WorkPanel.svelte';
	export let data: PageData;
	let work = new Work(data.work);
	work.build(data);

	onMount(async () => {
		BottomNavButton.set({
			label: _('Edit This Page'),
			onClick: () => {
				goto(`/work/${work.id}/edit`, {
					invalidateAll: true
				});
			}
		});
	});
</script>

<WorkPanel {work} />
