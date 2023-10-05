<script lang="ts">
	import { _ } from '$lib/frontend/i18n';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { BottomNavButton } from '$lib/frontend/store';
	import { goto } from '$app/navigation';
	onMount(() => {
		BottomNavButton.set({
			label: _('Create New Work'),
			onClick: () => {
				goto(`/work/create`);
			}
		});
	});
</script>

<div role="group" style="width:100%">
	<a
		role="button"
		class:outline={!$page.url.pathname.includes('/search/work')}
		href={`/search/work/${$page.params.keywords}`}>{_('Works')}</a
	>
	<a
		class:outline={!$page.url.pathname.includes('/search/person')}
		role="button"
		href={`/search/person/${$page.params.keywords}`}>{_('People')}</a
	>
	<a
		class:outline={!$page.url.pathname.includes('/search/business')}
		role="button"
		href={`/search/business/${$page.params.keywords}`}>{_('Businesses')}</a
	>
</div>
<slot />
